with import <nixpkgs> { };

let

nix-tour = stdenv.mkDerivation rec {
  name = "nix-tour";

  buildInputs = [ electron ];

  version = "master";

  src = ./.;
#   src = fetchgit {
#     url = "https://github.com/nixcloud/tour_of_nix";
#     rev = "refs/tags/${version}";
#     sha256 = "0s9h6147v2vkd4l4k3pr3850n0k1mcbhwhbr09dzq97m6vi9lfdi";
#   };

  phases = [ "unpackPhase" "installPhase" ];

  installPhase = ''
    mkdir -p $out/bin
    mkdir -p $out/share
    cp -R * $out/share
    chmod 0755 $out/share/ -R
    echo "#!${stdenv.shell}" > $out/bin/nix-tour
    echo "cd $out/share/" >> $out/bin/nix-tour
    echo "${electron}/bin/electron $out/share/electron-main.js" >> $out/bin/nix-tour
    chmod 0755 $out/bin/nix-tour
  '';

};

in

stdenv.mkDerivation rec {
  # either use
  #   nix-shell
  # or
  #  nix-env -f default.nix -iA nix-tour
  #
  inherit nix-tour;

  name = "nix-tour";

  buildInputs = [ electron python ];

  shellHook = ''
    export HISTFILE=".project_history"
    alias s="python -m SimpleHTTPServer"
    echo "welcome to the 'tour of nix' environment"
  '';
}

