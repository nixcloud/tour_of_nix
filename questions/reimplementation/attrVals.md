---
topic: Reimplementation: attrVals
youtube: https://www.youtube.com/watch?v=CQAeAyRX1zs&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

Write your own implementation of the `attrVals` function.

 It consumes a list of `attribute names` and an 
 `attribute set`. It returnes the values of each 
 `attribute name`.
 
**Note**: Remember that `attrSet ? "a"` returns `true` and `attrSet ? "j"` => `false`!

**Note**: Remember that `key = "a"; attrSet.${key}` returns `1`!

###`attrVals` vs `attrValues`:  

* `attrVals` -> given a list of names, extract their values from the set and return a list of them

 `attrVals ["a" "b" "c"] attrSet; => should be [1 2 3]` 

* `attrValues` -> extract all values in the given set and return a list of them

 `attrValues attrSet; => [1 2 3 4]`

**Warning:** This is hard!

```nix code
with import <nixpkgs> { };
let
  attrSet = {c = 3; a = 1; b = 2; d=4;};

  #tips: use the map function and access the attribute values 
  attrVals = XXX;

in
rec {

  solution = attrVals ["a" "b" "c"] attrSet; #should be [1 2 3]
}
```

```nix solution
with import <nixpkgs> { };
let
  attrSet = {c = 3; a = 1; b = 2; d=4;};
  attrVals = kys: se: lib.foldr (el: c: if se ? "${el}" then [(se.${el})] ++ c else c) [] kys;

in
rec {

  solution = attrVals ["a" "b" "c"] attrSet; #should be [1 2 3]
}
```
