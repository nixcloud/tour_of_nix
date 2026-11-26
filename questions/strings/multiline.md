---
topic: Multiline string
youtube: https://www.youtube.com/watch?v=DiuMuzxOqtM&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

In Nix you are frequently using multiline `strings` to create text files using two quotes, i.e. `''xxx''` in combination with attributes:

    foo = ''
      foo: ${fooValue}
      bar: ${barValue}
    '';

Read <https://nixos.org/manual/nix/stable/language/values> about string handling in Nix!

So now:

 * Format ex0 as wanted by the solution checker!

**Note:** Play a little with the space indention depth and see what change it imposes on the generated string.

**Note:** If `vip` is `false`, we get an empty newline with indention! We could also append the vipString to ex0 like `ex0 = ''...'' + vipString` and rewrite vipString with `"` instead of `''`to fix this as `"` won't remove our leading spaces.

```nix code
let 
  user = "mrNix";
  pass = "99supersecret";
  vip = true;
  vipString = if vip == true then ''vip: XXX '' else XXX
in
{
  ex0 = ''
  ${user}
    password: XXX
    ${vipString}
  '';
}
```

```nix solution
let 
  user = "mrNix";
  pass = "99supersecret";
  vip = true;
  vipString = if vip == true then ''vip: "true" '' else "";
in
{
  ex0 = ''
  ${user}
    password: ${pass}
    ${vipString}
  '';
}
```
