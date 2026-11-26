---
topic: Fold: Introduction
youtube: https://www.youtube.com/watch?v=TrUmPnKIKbI&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

### Exercise

Your job:

* `ex0`: use `foldr` to write a function that counts all `strings` 
with value "a" in a given `list`

* `ex1`: use `foldr` to multiply each element by 2 and add the [ 8 ] to it

### foldr

`foldr func init [x_1 x_2 ... x_n] == func x_1 (func x_2 ... (func x_n init))`

* `func`, a function like `(el: container: container + el)`
* `init` as the initial starting value

String examples: 

* `lib.foldr (el: c: el + c) "z" [ "a" "b" "c" ] => "abcz"`
* `lib.foldr (el: c: c ++ [el]) [0] [1 2 3] => [ 0 3 2 1 ]`

**Note:** Older nixpkgs also called it `lib.fold`.

### foldl

`foldl func init [x_1 x_2 ... x_n] == func (... (func (func init x_1) x_2) ... x_n)`. 

* `func`, a function like `(container: el: container + el)`
* `init` as the initial starting value

List examples: 

* `lib.foldl (c: el: el + c) "z" [ "a" "b" "c" ] => "cbaz"`
* `lib.foldl (c: el: c ++ [el]) [0] [1 2 3] => [ 0 1 2 3 ]`

**Note:** See <https://nixos.org/manual/nixpkgs/stable/#chap-functions>, search **lib.lists.foldr**

**Note:** See <https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-repl>

```nix code
with import <nixpkgs> { };
with lib;
let
  list = ["a" "b" "a" "c" "d" "a"];
  intList = [ 1 2 3 ];
  countA = XXX
  #mulB = XXX
in
rec {
  example = foldr (x: y: x + y) "z" ["a" "b" "c"]; #is "abcz"
  ex0 = countA list; #should be 3
  #ex1 = mulB intList; #should be [ 2 4 6 8 ]
}
```

```nix solution
with import <nixpkgs> { };
with lib;
let
  list = ["a" "b" "a" "c" "d" "a"];
  intList = [ 1 2 3 ];
  countA = l: foldr (el: c: if el == "a" then c + 1 else c) 0 l;
  mulB = l: foldr (el: c: [(el * 2)] ++ c) [8] l;
in
rec {
  example = foldr (x: y: x + y) "z" ["a" "b" "c"]; #is "abcz"
  ex0 = countA list; #should be 3
  ex1 = mulB intList; #should be [ 2 4 6 8 ]
}
```
