---
topic: Integer to string
youtube: https://www.youtube.com/watch?v=fyhPbWVCv_g&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

Inserting `Strings` using the pattern `${attribute}` works great 
with `Strings`. But `${}` can do more. You can even run functions within it.

Use this and the builtin function `toString` to make the code work.

**Note:** See also <https://noogle.dev/>

**Note:** More builtin functions can be found in the [Nix manual](https://nixos.org/manual/nix/stable/expressions/builtins.html#built-in-functions).

```nix code
let 
  h = "Strings";
  v = 4;
in
{
  helloWorld = "${h} ${v} the win!";
}
```

```nix solution
let 
  h = "Strings";
  v = 4;
in
{
  helloWorld = "${h} ${toString v} the win!";
}
```
