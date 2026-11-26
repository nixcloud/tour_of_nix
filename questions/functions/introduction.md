---
topic: Functions: Introduction
youtube: https://www.youtube.com/watch?v=rKWJFfBr7cg&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

Next we will have a look into `functions` and how they are defined and called. Don't forget to to use spaces between the arguments of the functions you write!

 Now:

* Write a `function` that consumes 3 `Strings` and combines them to one. 

**Note:** Strings concatenation can be done with the '+' operator.

**Note:** Read about writing functions in <https://nixos.org/manual/nix/stable/language/constructs#functions>

**Note:** There are builtin functions you can always use, see <https://nixos.org/manual/nix/stable/language/builtins>

```nix code
let
  f = "f";
  o = "o";
  func = a: b: c: XXX; 
in
{
  foo = func f o "o";
}
```

```nix solution
let
  f = "f";
  o = "o";
  func = a: b: c: a+b+c; 
in
{
  foo = func f o "o";
}
```
