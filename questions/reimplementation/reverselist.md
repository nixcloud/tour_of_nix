---
topic: Reimplementation: reverseList
youtube: https://www.youtube.com/watch?v=LApNEuzt9Is&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

Use `foldr` to implement the `reverseList` function.

**Note:** You basically implement the function `lib.reverseList`.
Your function should behave exactly the same!

```nix code
with import <nixpkgs> { };
let
  listOfNumbers = [2 4 6 9 27];
  reverseList = lib.foldr XXX;
in
rec {
  example = lib.reverseList listOfNumbers;
  result = reverseList listOfNumbers;
}
```

```nix solution
with import <nixpkgs> { };
let
  listOfNumbers = [2 4 6 9 27];
  reverseList = lib.foldr (e: acc: acc ++ [ e ]) [];
in
rec {
  example = lib.reverseList listOfNumbers;
  result = reverseList listOfNumbers;
}
```
