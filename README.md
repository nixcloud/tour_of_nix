# introduction

this repository contains 'a tour of nix', an interactive programming guide dedicated to the 
nix programming language. there is also a standalone version called 'nix-tour' which 
is based on 'electron' and can be installed and used offline.

https://nixcloud.io/tour/ 

happy learning!

![meerkats FTW](https://raw.githubusercontent.com/nixcloud/tour_of_nix/master/tour_of_nix.jpg)

# building & running

building nix with emscripten was a huge challenge and back in 2014 i managed to pull it off but lost all 
the source code so you have to use the generated javascript binaries in this repository.

technical background: 

  https://lastlog.de/blog/tour_of_nix.html

## firefox

    firefox index.html

## chromium

    nix-shell -p python3 --command 'python3 -m http.server 9000'
    chromium localhost:8000

**note:** chromium won't load xhr requests from file:// but instead requires a webserver to work.

# collaboration

if you want to contribute questions or fixes to them, there is a file called `questions.json`. 
just edit this file and reload the 'tour' in your browser. there is a guide on how to edit questions
contained in the last question of the tour https://nixcloud.io/tour/?id=end

    ctrl+, - loads markdown into the editor
    ctrl+. - compiles markdown2html into the right side
    ctrl+s - save the questions to questions.json into you downloads directory
    
**note:** this workflow is a big buggy, copy your questions also to a text editor as backup.

# future work

## source code rework

thanks to https://github.com/tomberek we have this now:

https://github.com/nixcloud/tour_of_nix/issues/22

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

![meerkats FTW](https://raw.githubusercontent.com/nixcloud/tour_of_nix/master/footerFG.png)
