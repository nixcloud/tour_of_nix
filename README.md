# introduction

this repository contains 'a tour of nix', an interactive programming guide dedicated to the 
nix programming language. there is also a standalone version called 'nix-tour' which 
is based on 'electron' and can be installed and used offline.

https://nixcloud.io/tour/ 

happy learning!

**HINT:** we have a newer version of 'a tour of nix', which is based on 'bootstrap' but it is not released yet.



# building & running

nix does not build with emscripten on nixos out of the box. making nix-instantiate run in the browser
requires many modifications to the nix source base and lots of optimizations so that it is 'fast'.

technical background: 

  https://lastlog.de/blog/posts/tour_of_nix.html

to see the tour, simply do this:

## firefox

    firefox index.html

## chrome/chromium

    nix-shell -p python --command 'python -m SimpleHTTPServer'
    chromium localhost:8000

**note:** chromium won't load xhr requests from file:// but instead requires a webserver to work.

## electron 
with electron we can create a native executable so that one can use `nix-env` to install the tour locally.

manually invoking it:

    nix-shell
    electron electron-main.js

install it:

    nix-env -f default.nix -iA nix-tour

afterwards you can start it like this:

    nix-tour

# collaboration

if you want to contribute questions or fixes to them, there is a file called `questions.json`. 
just edit this file and reload the 'tour' in your browser. there is a guide on how to edit questions
contained in the last question of the tour.

# future work

## source code rework
we, the nixcloud devs, are working on a new emscripten based toolchain in nix. once this is final, we 
will redo the emscripten port cleanly and put the source on our repository.

see:

* https://lastlog.de/blog/posts/tour_of_nix.html
* https://github.com/NixOS/nixpkgs/pull/16208
* https://lastlog.de/blog/posts/emscripten-1.36.4_on_nixos.html

until that happens you can request the source code via email from us which currently is a 300mb git
repository in a very unusable state. this is also the reason why we didn't upload it yet.

# license

the bundled nix-instantiate as well as the questions.json file are licensed as:

       GNU LESSER GENERAL PUBLIC LICENSE
           Version 2.1, February 1999

exactly as the original nix codebase.

## third party

we bundled many different tools:

see `COPYING.md` for details on their license.

oh, and there is this font/ - directory. really don't have a clue what license that uses. was from google 
and is probably licensed 'world domination with no privacy' or something... not sure...

## bundled nix-instantiate

we added these files into this repository, which is used to evaluate so called nix-expressions:

* nix-instantiate.html.mem
* nix-instantiate.data
* nix-instantiate.js
* nix-instantiate.js.mem

**note:** if you want to use this library for other purposes than this 'tour of nix' you probably 
want to read the 'building & running' section above. and you really want to read the blog post 
listed there.

# authors

* Paul Seitz <paul.m.seitz@gmail.com>
* Joachim Schiele <js@lastlog.de>

![meerkats FTW](https://raw.githubusercontent.com/nixcloud/tour_of_nix/v0.0.1/footerFG.png)
