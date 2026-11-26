---
topic: Reimplementation: attrValues
youtube: https://www.youtube.com/watch?v=oikq0CBWR4w&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

Write your own implementation of the `attrValues` function.

 This function consumes an `attribute set` and returns all values 
 sorted by the `attribute name`.

 You are allowed to use the builtin function `attrNames` 
 and the `attrVals` function you just implemented in the 
 last lecture.
 
### `attrVals` vs `attrValues`:  

* `attrVals` -> given a list of names, extract their values from the set and return a list of them

 `attrVals ["a" "b" "c"] attrSet; => should be [1 2 3]` 

* `attrValues` -> extract all values in the given set and return a list of them

 `attrValues attrSet; => [1 2 3 4]`

**Warning:** This is hard!

```nix code
with import <nixpkgs> { };
let
  attrSet = {c = 3; a = 1; b = 2;};

  attrValues = XXX;
in
rec {
  solution = attrValues attrSet; #should be [1 2 3]
}
```

```nix solution
with import <nixpkgs> { };
let
  attrSet = {c = 3; a = 1; b = 2;};

  attrValues = attrSet: lib.attrVals (builtins.attrNames attrSet) attrSet;
in
rec {
  solution = attrValues attrSet; #should be [1 2 3]
}
```
