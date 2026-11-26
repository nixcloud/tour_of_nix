---
topic: The end
youtube: https://www.youtube.com/watch?v=qWxGtbeRGhU&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

## It is done!
Congratulations! You reached the end of this course and you made it!

**We hope you liked 'A tour of Nix'!** If you want to get in **contact**, 
please raise an issue at [https://github.com/nixcloud/tour_of_nix](https://github.com/nixcloud/tour_of_nix/issues)

##Education 

An excellent resource is <https://nixcademy.com/>

## Consulting

An excellent resource is <https://nixos.org/community/commercial-support>

## Further reading

* [NixPkgs manual](https://nixos.org/nixpkgs/manual) 

  Covers topics such as: buildPhases, override(s) and support for specific 
  programming languages.

* [NixOS Wiki](https://nixos.wiki/)

  Practical usage examples, like the 
  [Cheatsheet](https://nixos.wiki/wiki/Cheatsheet).

* [nix.dev](https://nix.dev/)

  Introduction to nix-shell, flakes and workflows.

* [Nix by example](https://medium.com/@MrJamesFisher/nix-by-example-a0063a1a4c55)

  Parse trees, evaluation order, composite data-types, laziness, conditionals, Let expressions, and much more...

* [Luca Bruno's nix pill(s)](https://lethalman.blogspot.de/2014/07/nix-pill-1-why-you-should-give-it-try.html)
  
  The Nix Pills are a wonderful introduction into Nix programming and you will 
  have much joy reading them!

## Donations

Financial support for hosting the tour of nix is appreciated: 

 ??PAYPAL??

##Contributing

You are welcome to extend the tour of nix, it is an open source project! Create issues on <https://github.com/nixcloud/tour_of_nix/issues> or edit a question and create a PR!

### Manual editing
Every question is one Markdown file in the 
[questions directory](https://github.com/nixcloud/tour_of_nix/tree/master/questions): 
its text, then the starting code in a `nix code` block and the solution in a 
`nix solution` block. This page is `questions/end.md`, the same as its `?id=end`. 
`questions/order.txt` lists their files in order; add a new question there too.

### Using the inline editor

Shortcuts:

* `ctrl+,` - loads markdown into the editor
* `ctrl+.` - compiles markdown2html into the right side

  **Note:** do this twice and the editor is restored to the previous state!

* `ctrl+i` - reset the editor to the default content
* `ctrl+s` - save this question, with the code in the editor and the solution 
  box, as its Markdown file into your `downloads` directory, for example 
  `functions--minmax.md` for `questions/functions/minmax.md`

**Warning:** You might want to play with the workflow for some time as
you can easily 'overwrite' or 'reset' your contributions by accident!

```nix code
with import <nixpkgs> { }; 
rec {
  made_it = "it is done";
}
```

```nix solution
with import <nixpkgs> { }; 
rec {
  made_it = "it is done";
}
```
