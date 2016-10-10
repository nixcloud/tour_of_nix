Welcome to 'A tour of Nix', a beautifully crafted introduction into the 
[Nix programming language](http://nixos.org/nix/manual/).


**'A tour of Nix' focuses on programming language constructs and how 
Nix can be algorithmically 
used to solve problems.** However, this is not an introduction into `nix-env`, 
`nix-shell`, `nix-repl` and 
we won't build/install software using `stdenv.mkDerivation`. Still 
we bundled [nixpkgs](https://github.com/nixos/nixpkgs) into 
'A tour of Nix' and you can use the **Nix library** functions' from 
**pkgs/lib**, which are used for packaging software.

When ready, just click the next button on the top right corner.

**Note:** 'A tour of Nix' can be used offline once it has loaded in the 
browser. 
##Shortcuts

* next page: `ctrl + j`
* prev page: `ctrl + k`
* run : `shift + return`


## Source

The **source code of 'A tour of Nix'** can be found here:
<https://github.com/nixcloud/tour_of_nix>

Please see the **LICENSE** file in that repository for more details.


## Authors

* [Joachim Schiele] (mailto:js@lastlog.de)
* [Paul Seitz] (mailto:paul.m.seitz@gmail.com)

Thanks to **contributors**:

* [lassulus](https://github.com/lassulus) (debugging the questions, workflows)
* [rashfael](https://github.com/rashfael) (design consulting)
* [aflatter](https://github.com/aflatter) (helping with spinner design)
* [goibhniu](https://github.com/cillianderoiste) (careful review)
* [lethalman](http://lethalman.blogspot.de/) (careful review)

**Note:** If we forgot to list you here, just let us know!

## License(s)

'A tour of Nix' contains this software:

* [Nix 1.9](https://github.com/nixos/nix) (compiled with emscripten)
* [nixpkgs](https://github.com/nixos/nixpkgs)
* [emscripten-1.29.10](https://github.com/kripken/emscripten)
* [codemirror 5.5](https://codemirror.net/)
* [markdown.js](https://github.com/evilstreak/markdown-js)
* [FileSaver.js](https://github.com/eligrey/FileSaver.js)


### emscripten (1.29.10)
-----
Emscripten is available under 2 licenses, the MIT license and the
University of Illinois/NCSA Open Source License.

Both are permissive open source licenses, with little if any
practical difference between them.

The reason for offering both is that (1) the MIT license is
well-known, while (2) the University of Illinois/NCSA Open Source
License allows Emscripten's code to be integrated upstream into
LLVM, which uses that license, should the opportunity arise.
-----


### Nix (1.9)

---

GNU LESSER GENERAL PUBLIC LICENSE

Version 2.1, February 1999

Copyright (C) 1991, 1999 Free Software Foundation, Inc.
51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.

[This is the first released version of the Lesser GPL.  It also counts
as the successor of the GNU Library Public License, version 2, hence
the version number 2.1.]

[full details](https://github.com/NixOS/nix/blob/master/COPYING)

---

### nixPkgs

-----

Copyright (c) 2003-2006 Eelco Dolstra

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

-----

Note: the license above does not apply to the packages built by the
Nix Packages collection, merely to the package descriptions (i.e., Nix
expressions, build scripts, etc.).  Also, the license does not apply
to some of the binaries used for bootstrapping Nixpkgs (e.g.,
pkgs/stdenv/linux/tools/bash).  It also might not apply to patches
included in Nixpkgs, which may be derivative works of the packages to
which they apply.  The aforementioned artifacts are all covered by the
licenses of the respective packages.

-----

### codemirror (5.5)
---

Copyright (C) 2015 by Marijn Haverbeke <marijnh@gmail.com> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---

### markdown.js

---

Released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in the 
Software without restriction, including without limitation the rights to use, copy, 
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the 
following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

### FileSaver.js

---

Copyright © 2015 [Eli Grey][1].

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included 
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS 
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN 
AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH 
THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  [1]: http://eligrey.com

---