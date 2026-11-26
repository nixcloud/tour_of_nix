# vm

Real `nix-instantiate` in the browser: the unkernel Linux kernel (compiled
to wasm), one read-only erofs disk with Nix and nixpkgs' `lib`, and a page
(`vm.html`, `vm.js`) that the tour drives over `postMessage` through
`client.js`. `demo.html` is a minimal outer page.

    nix build                  # the whole static site in ./result
    nix run .#serve            # serve it on http://127.0.0.1:8137/

Serve `result/`, not the repository: `vm/` holds only the glue code, and
the build adds the kernel, the terminal and the disk. For example:

    nix build && python3 -m http.server -d result

## Hosting

`result/` is a plain static site: copy it to any web server. Nothing runs
on the server.

Any server works, with or without Range requests or compression: the
kernel and the disk are gzipped by the build, and the page unpacks them.
With COOP/COEP headers the guest gets two CPUs instead of one.

By default the page downloads the gzipped disk once and keeps it in memory
(and in the Cache API for the next visit). `?disk=lazy` on `vm/vm.html`
reads it in pieces with Range requests instead, which only pays off for a
disk much larger than what Nix reads of it.

The server must send `.mjs` as `text/javascript` (browsers refuse module
scripts otherwise) and should send `.wasm` as `application/wasm`.
`nix build .#mimeTypes` has a `mime.types` with both.

The headers for two CPUs, if your server can set them:

    Cross-Origin-Opener-Policy: same-origin
    Cross-Origin-Embedder-Policy: require-corp

`nix.<hash>.erofs` and its `.gz` change name whenever their contents
change, so they can be cached forever; `disk.json` names the current pair
and should not be cached.

## What a visit downloads

Measured on the tour's first evaluation, by a server that compresses
nothing:

| | MB |
| --- | --- |
| the disk, gzipped: the static nix (33 MB stripped) and nixpkgs' `lib` | 14.6 |
| the kernel, gzipped | 4.4 |
| the SDK and the terminal | 1.9 |

Later evaluations download nothing. A second visit reads the disk from
the Cache API, and the rest from the HTTP cache as far as the server
lets it. With `?disk=lazy` the first evaluation reads 32 MB of the disk
in 256 KiB ranges, uncompressed.
