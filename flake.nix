{
  description = "A tour of Nix: real nix-instantiate in the browser, on unkernel (pins from fzakaria/trynix)";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};

      # The guest only runs aarch64 programs. Substituted, never built here.
      # The static build is one file: the dynamic one maps 78 libraries
      # (102 MB, ICU and curl among them) that evaluation never uses.
      guestNix = nixpkgs.legacyPackages.aarch64-linux.nixStatic;

      npm =
        name: version: sha256:
        pkgs.fetchurl {
          url = "https://registry.npmjs.org/${name}/-/${name}-${version}.tgz";
          inherit sha256;
        };

      # Same versions and hashes as trynix's nix/vendor.nix.
      unkernel = npm "unkernel" "0.2.0-261124-75694e2" "1x5zf9a30ajvg0kd93andxs7kngyx0ir2la39rhsihfm1w2i64qv";
      ghostty = npm "ghostty-web" "0.4.0-next.20.g1858a59" "18gi29xv0f4qnc4znqpb6id2xvv745gyj3i9mabfggg0gkf6nd7g";
      # xz in the page, for the kernel and the disk. With trynix's fix
      # (patches/xzwasm/), without which a chunk can be overwritten
      # before it is read.
      xzwasm = npm "xzwasm" "0.1.2" "18zc8z5hfy34cy3z7a5baz07hccl2y0y17y7qsxiy4wsw8v6ig7n";

      # What <nixpkgs> is for the tour: nixpkgs' lib, and a default.nix
      # that answers `import <nixpkgs> { }` with lib alone.
      tourNixpkgs = pkgs.runCommand "tour-nixpkgs" { } ''
        mkdir $out
        cp -r ${nixpkgs}/lib $out/lib
        echo '{ ... }: { lib = import ./lib; }' > $out/default.nix
      '';

      # The output of every question's solution, from the same Nix the
      # guest runs, built for this machine: the page compares a run's
      # output with it, so a click evaluates once. The build fails when a
      # solution does not evaluate.
      expected =
        assert pkgs.nix.version == guestNix.version;
        pkgs.runCommand "expected.json"
          {
            nativeBuildInputs = [
              pkgs.nix
              pkgs.python3
            ];
          }
          ''
            export HOME=$TMPDIR NIX_STATE_DIR=$TMPDIR/state NIX_REMOTE=dummy://
            export NIX_PATH=nixpkgs=${tourNixpkgs}
            python3 ${./tools/expected.py} ${./questions.json} $out
          '';

      # One read-only erofs disk, mounted at /nix in the guest:
      #   /nix/bin      nix, without its debug symbols, and nix-instantiate
      #   /nix/nixpkgs  lib and the shim
      # Uncompressed: the guest kernel cannot decompress erofs.
      image =
        pkgs.runCommand "nix.erofs"
          {
            nativeBuildInputs = [
              pkgs.erofs-utils
              pkgs.llvm
            ];
          }
          ''
            mkdir -p root/nixpkgs root/bin
            llvm-strip -o root/bin/nix $(readlink -f ${guestNix}/bin/nix)
            ln -s nix root/bin/nix-instantiate
            cp -r ${tourNixpkgs}/. root/nixpkgs/
            mkfs.erofs --all-root -T1 -U clear $out root
          '';

      # The tour's own files, as they are in the repository.
      tourFiles = [
        "index.html"
        "questions.json"
        "style.css"
        "style_mobile.css"
        "markdown.min.js"
        "FileSaver.min.js"
        "favicon.ico"
        "footerBG.jpg"
        "footerFG.png"
        "github-mark.png"
        "nix.gif"
        "paypal.gif"
        "rotate.png"
        "tour_of_nix.jpg"
        "bootstrap-5.0.2"
        "font"
      ];

      # The site: the tour at the top, and in vm/ the page that runs Nix
      # (vm/vm.html), the kernel, the terminal and the disk.
      site = pkgs.runCommand "tour-of-nix-site" { } ''
        mkdir -p $out/vendor/unkernel/_chunks $out/codemirror-5.5/addon $out/codemirror-5.5/mode
        ${pkgs.lib.concatMapStringsSep "\n" (f: "cp -r ${./. + "/${f}"} $out/${f}") tourFiles}
        cp -r ${./codemirror-5.5/lib} $out/codemirror-5.5/lib
        cp -r ${./codemirror-5.5/addon/lint} $out/codemirror-5.5/addon/lint
        cp -r ${./codemirror-5.5/mode/shell} $out/codemirror-5.5/mode/shell
        cp ${./codemirror-5.5/LICENSE} $out/codemirror-5.5/LICENSE
        cp ${expected} $out/expected.json

        cp -r ${./vm}/. $out/vm/
        chmod -R u+w $out
        mv $out/vendor $out/vm/vendor
        cd $out/vm

        mkdir $TMPDIR/unpack
        tar -xzf ${unkernel} -C $TMPDIR/unpack
        d=$TMPDIR/unpack/package
        cp $d/dist/web.mjs vendor/unkernel/
        xz -9 -T1 -c $d/dist/unkernel.wasm > vendor/unkernel/unkernel.wasm.xz
        cp $d/dist/_chunks/core.mjs vendor/unkernel/_chunks/
        cp $d/LICENSE* $d/THIRD-PARTY.md vendor/unkernel/
        rm -r $d

        tar -xzf ${ghostty} -C $TMPDIR/unpack
        cp $d/dist/ghostty-web.js vendor/
        cp $d/dist/__vite-browser-external-*.js vendor/ 2>/dev/null || true
        cp $d/ghostty-vt.wasm $d/LICENSE vendor/
        rm -r $d

        tar -xzf ${xzwasm} -C $TMPDIR/unpack
        cp $d/dist/package/xzwasm.js vendor/xzwasm.js
        patch -d vendor -p1 < ${./patches/xzwasm/0001-copy-each-decoded-chunk-out-of-the-decoder-memory.patch}

        # The disk under a name that changes with its contents, so any
        # HTTP cache may keep it: xz-compressed, which the page downloads
        # whole, and as it is, for ?disk=lazy. disk.json is the one fixed
        # name the page reads.
        hash=$(sha256sum ${image} | cut -c1-16)
        cp ${image} nix.$hash.erofs
        xz -9 -T1 -c ${image} > nix.$hash.erofs.xz
        cat > disk.json <<EOF
        {
          "lazy": "nix.$hash.erofs",
          "full": "nix.$hash.erofs.xz",
          "size": $(stat -c %s ${image}),
          "fullSize": $(stat -c %s nix.$hash.erofs.xz)
        }
        EOF
      '';

      # The types a static server has to send: browsers refuse a module
      # script served as anything else, and compile wasm while it
      # downloads only when it comes as application/wasm.
      mimeTypes = pkgs.writeText "mime.types" ''
        text/html html
        text/javascript js mjs
        text/css css
        application/json json
        application/wasm wasm
        application/octet-stream erofs xz
        image/png png
        image/jpeg jpg
        image/gif gif
        image/x-icon ico
        font/ttf ttf
      '';
    in
    {
      packages.${system} = {
        inherit
          image
          site
          expected
          mimeTypes
          ;
        default = site;
      };

      # nix run .#serve -- [port]
      #
      # Any static server will do (see README.md); this one is darkhttpd,
      # with the headers that make the page cross-origin isolated, which
      # gives the guest a second CPU.
      apps.${system}.serve = {
        type = "app";
        program = "${pkgs.writeShellScript "serve" ''
          exec ${pkgs.darkhttpd}/bin/darkhttpd ${site} \
            --addr 127.0.0.1 --port "''${1:-8137}" --mimetypes ${mimeTypes} \
            --header 'Cross-Origin-Opener-Policy: same-origin' \
            --header 'Cross-Origin-Embedder-Policy: require-corp' \
            --header 'Cross-Origin-Resource-Policy: same-origin'
        ''}";
      };
    };
}
