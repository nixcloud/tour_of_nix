---
topic: Fold: Implementing 'map'
youtube: https://www.youtube.com/watch?v=RZuWUn_QHnQ&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

Use `foldr` to write your own `map` function.

**Note:** The little error is intended, FIX IT!

```nix code
with import <nixpkgs> { };
let
  listOfNumbers = [2 4 6 9 27];
  myMap = XXX foldr XXX; 
in
rec {
  #your map should create the same result as the standard map function
  example = map (x: builtins.div x 2) listOfNumbers; 
  result = myMap (x: builtins.div x 2) listOfNumbers;
}
```

```nix solution
with import <nixpkgs> { };
let
  listOfNumbers = [2 4 6 9 27];
  myMap = op: list: lib.foldr (x: y: [(op x)] ++ y) [] list; 
in
rec {
  #your map should create the same result as the standard map function
  example = map (x: builtins.div x 2) listOfNumbers; 
  result = myMap (x: builtins.div x 2) listOfNumbers;
}
```
