---
topic: Debugging packaging of nano
youtube: https://www.youtube.com/watch?v=9EcFI_hFlHs&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

This is the `default.nix` of the nano text editor in nixpkgs.

* find and fix all errors so that a proper `attribute set` is evaluated

**Note:** We had to add some dummy functions or it wouldn't work in 
our simplified javascript environment.

```nix code
let
  #dummyfunctions
  fetchurl = x: x;
  ncurses = "ncurses";
  gettext = "gettext";
in
rec {
  pname = "nano"
  version = 2.3.6";

  name = "${pname}-${version}";

  src = fetchurl {
    url = "mirror://gnu/nano/{name}.tar.gz";
    sha256 = "a74bf3f18b12c1c777ae737c0e463152439e381aba8720b4bc67449f36a09534";
  };

  buildInputs = [ ncurses gettext ];

  configureFlags = "sysconfdir=/etc";

  meta = {
    homepage = http://www.nano-editor.org/;
    description  "A small, user-friendly console text editor";
  };
}
```

```nix solution
let
  #dummyfunctions
  fetchurl = x: x;
  ncurses = "ncurses";
  gettext = "gettext";
in
rec {
  pname = "nano";
  version = "2.3.6";

  name = "${pname}-${version}";

  src = fetchurl {
    url = "mirror://gnu/nano/${name}.tar.gz";
    sha256 = "a74bf3f18b12c1c777ae737c0e463152439e381aba8720b4bc67449f36a09534";
  };

  buildInputs = [ ncurses gettext ];

  configureFlags = "sysconfdir=/etc";

  meta = {
    homepage = http://www.nano-editor.org/;
    description = "A small, user-friendly console text editor";
  };
}
```
