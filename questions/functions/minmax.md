---
topic: Functions: Your first function!
youtube: https://www.youtube.com/watch?v=XD5si5Tz8QU&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

What to do:

* Implement the `min` and the `max` function using `if () then X else Y`

**Note:** those functions already exist and can be accessed with `lib.min` 
and `lib.max` (don't use lib.min and lib.max here but instead implement them yourself in this exercise).
 
**Experiments:** 

* What happens if you create an infinite recursion call to `min`?
* Now, instead of calling your `min` and `max` implementation, use `lib.min` and
`lib.max`. 

  The question is actually: what has to be added in order to use `lib`?
* Finally, compare: min/max with these arguments: 9 and -1, how to make negative numbers work?

```nix code
let
  min = XX #modify these
  max = XX #two lines only
in
{
  ex0 = min 5 3;
  ex1 = max 9 4;
}
```

```nix solution
let
  min = x: y: if x < y then x else y;
  max = x: y: if x > y then x else y;
in
{
  ex0 = min 5 3;
  ex1 = max 9 4;
}
# make lib available
# with import <nixpkgs> { };
# {
#   # finally make use of it
#   ex0 = lib.min 9 (-1);
#   ex1 = lib.max 9 (-1);
# }
# you need to use () precedence to not compute (9 -1) algebraic expression instead.
```
