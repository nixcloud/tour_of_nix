// What an evaluation said, from nix's --log-format internal-json.

const USER_FILE = "/tour/test.nix";
// 128 + SIGKILL.
const KILLED = 137;
const ESC = /\x1b\[[0-9;]*m/g;

// `file` carries a ":line:column" suffix in nix 2.34.
const inUserFile = (pos) =>
  typeof pos.line === "number" && (pos.file ?? "").startsWith(USER_FILE);

export function toResult({ exitCode, stdout, stderr }) {
  const full = [];
  let error = null;
  for (const line of stderr.split("\n")) {
    if (!line.startsWith("@nix ")) {
      if (line !== "") full.push(line);
      continue;
    }
    const event = JSON.parse(line.slice("@nix ".length));
    if (event.action !== "msg") continue;
    full.push(event.msg);
    if (event.raw_msg !== undefined) error = event;
  }

  // The error's own position when it is in the user's file, else the
  // innermost trace frame that is (throw, abort and errors inside lib).
  const at =
    error && [error, ...(error.trace ?? [])].find((pos) => inUserFile(pos));
  const message = error ? error.raw_msg.replace(ESC, "") : null;
  const ok = exitCode === 0;
  return {
    ok,
    exitCode,
    value: ok ? stdout.trimEnd() : null,
    line: at?.line ?? null,
    column: at?.column ?? null,
    short: ok
      ? null
      : message === null
        ? exitCode === KILLED
          ? "stopped (by you, the time limit, or out of memory)"
          : `nix-instantiate exited with ${exitCode}`
        : `${at ? `line ${at.line}: ` : ""}${message}`,
    full: [...full, ok ? stdout : ""].filter(Boolean).join("\n"),
  };
}
