// The inner page: unkernel, the nix disk, a shell, and a message port.
//
// parent -> vm   { type: "eval", id, code }   { type: "stop" }
// vm -> parent   { type: "ready", ms }   { type: "progress", stage }
//                { type: "disk", mode }  ("lazy" or "full", see disk.js)
//                { type: "result", id, ... }  (see toResult)
//                { type: "failed", message }

import { checkSupport, createKernel } from "./vendor/unkernel/web.mjs";
import { FitAddon, init, Terminal } from "./vendor/ghostty-web.js";
import { toResult } from "./result.js";
import { openDisk } from "./disk.js";

// The kernel, gzipped by the build: 4.4 MB instead of 11.3, from any
// server, whether it compresses or not.
const KERNEL = "vendor/unkernel/unkernel.wasm.gz";

async function fetchKernel() {
  const res = await fetch(KERNEL);
  if (!res.ok) {
    throw new Error(`${KERNEL}: HTTP ${res.status}`);
  }
  // application/wasm lets the browser compile while it downloads.
  return new Response(res.body.pipeThrough(new DecompressionStream("gzip")), {
    headers: { "content-type": "application/wasm" },
  });
}

const PARENT_ORIGIN = location.origin;
const EVAL_LIMIT_SECONDS = 30;

const post = (message) => parent.postMessage(message, PARENT_ORIGIN);

// `run [id]` in the guest: evaluate /tour/test.nix once, and pipe stderr
// then stdout to the host command, which prints the error for the human
// and reports to the page. It first shows, dimmed, the command it runs.
const RUN_SCRIPT = `#!/bin/sh
cd /tour
printf '\\033[2m$ nix-instantiate --eval --strict --show-trace /tour/test.nix\\033[0m\\n'
t=$(mktemp -d)
timeout -s KILL ${EVAL_LIMIT_SECONDS} nix-instantiate --eval --strict --show-trace \\
  --log-format internal-json test.nix > $t/out 2> $t/err
rc=$?
cat $t/err $t/out | tour-report $rc $(wc -c < $t/err) "$1"
rm -r $t
exit $rc
`;

const ENV = {
  PATH: "/tour/bin:/nix/bin:/run/kw/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin",
  NIX_PATH: "nixpkgs=/nix/nixpkgs",
  NIX_REMOTE: "dummy://",
  HOME: "/tour",
  PS1: "nix-tour$ ",
};

const setup = `set -e
mkdir -p /nix /tour/bin
mount -t erofs -o ro /dev/wda /nix
cat > /tour/bin/run
chmod +x /tour/bin/run
`;

async function readAll(stream) {
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function main() {
  const started = performance.now();
  const running = new Map();
  let queue = Promise.resolve();
  const support = await checkSupport();
  if (!support.ok) {
    throw new Error(support.problems.join("\n"));
  }

  await init();
  const terminal = new Terminal({
    fontSize: 13,
    fontFamily: '"DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", monospace',
    convertEol: false,
  });
  const fit = new FitAddon();
  terminal.loadAddon(fit);
  terminal.open(document.getElementById("terminal"));
  fit.fit();

  const disk = await openDisk({
    mode: new URLSearchParams(location.search).get("disk"),
    onProgress: (stage) => post({ type: "progress", stage }),
  });
  post({ type: "disk", mode: disk.mode });

  const vm = await createKernel({
    kernel: await fetchKernel(),
    worker: true,
    cpus: crossOriginIsolated ? 2 : 1,
    memoryMiB: 1024,
    disks: [disk.spec],
    onProgress: ({ stage }) => post({ type: "progress", stage }),
    log: (message) => console.log("[vm]", message),

    // The channel out of the guest: a program on its PATH that is this
    // function.
    commands: {
      async "tour-report"({ args: [rc, errBytes, id], stdin }) {
        const bytes = await readAll(stdin);
        const text = (part) => new TextDecoder().decode(part);
        const result = toResult({
          exitCode: Number(rc),
          stderr: text(bytes.subarray(0, Number(errBytes))),
          stdout: text(bytes.subarray(Number(errBytes))),
        });
        post({ type: "result", id: id || null, ...result });
        running.get(id)?.();
        running.delete(id);
        return result.full.replace(/\n?$/, "\n");
      },
    },
  });
  vm.exited.then(({ kind, reason }) =>
    post({ type: "failed", message: `guest ended: ${kind} ${reason ?? ""}` }),
  );

  const sh = async (script, input) => {
    const r = await vm.exec("/bin/sh", ["-c", script], { env: ENV, input });
    if (r.exitCode !== 0) {
      throw new Error(`guest: ${r.stderr.trim() || r.exitCode}`);
    }
    return r;
  };
  await sh(setup, RUN_SCRIPT);

  const shell = await vm.spawn("/bin/sh", [], {
    cols: terminal.cols,
    rows: terminal.rows,
    cwd: "/tour",
    env: ENV,
  });
  terminal.onData((data) => shell.write(data));
  terminal.onResize(({ cols, rows }) => shell.resize(cols, rows));
  new ResizeObserver(() => fit.fit()).observe(
    document.getElementById("terminal"),
  );
  shell.output.pipeTo(
    new WritableStream({ write: (bytes) => terminal.write(bytes) }),
  );

  addEventListener("message", async (event) => {
    if (event.source !== parent || event.origin !== PARENT_ORIGIN) {
      return;
    }
    const { type, id, code } = event.data;
    if (type === "stop") {
      // SIGKILL: nix does not act on SIGINT or SIGTERM inside a long
      // builtin. `run` goes on to report exit 137.
      await vm.exec("/bin/sh", ["-c", "pkill -KILL -f nix-instantiate"]);
    }
    if (type === "eval") {
      // Through stdin onto the guest's own tmpfs: no quoting, and none of
      // 9p's one-second attribute cache. One evaluation at a time: the
      // file is shared, and so is the shell.
      queue = queue.then(async () => {
        const done = new Promise((resolve) => running.set(String(id), resolve));
        await sh("cat > /tour/test.nix", code);
        shell.write(`run ${Number(id)}\n`);
        await done;
      });
    }
  });
  post({ type: "ready", ms: Math.round(performance.now() - started) });
}

main().catch((err) => post({ type: "failed", message: String(err.stack ?? err) }));
