---
topic: Functions: the @-pattern II
youtube: https://www.youtube.com/watch?v=Rwcwcw169P8&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

`Attribute sets` can contain additional attributes which are not part of 
the function definition.

Inside a function, those `attributes` can be accessed with the 
`@-pattern`.

**Note:** `bargs@{a, b, ...}:` is equivalent to `{a, b, ...}@bargs:`.

Now complete the last line: 

* It should evaluate to 'foobar'

See usage in [nixpkgs/all-packages](https://github.com/NixOS/nixpkgs/blob/5a237aecb57296f67276ac9ab296a41c23981f56/pkgs/top-level/all-packages.nix#L16761).

```nix code
let
  func = {a, b, ...}@bargs: if a == "foo" then
    b + bargs.c else b + bargs.x + bargs.y;
in
{
  #complete next line so it evaluates to "foobar"
  foobar = func {a="bar"; XXX #ONLY EDIT THIS LINE
}
```

```nix solution
let
  func = {a, b, ...}@bargs: if a == "foo" then
    b + bargs.c else b + bargs.x + bargs.y;
in
{
  #complete next line so it evaluates to "foobar"
  foobar = func {a="bar"; b="foo"; x="bar"; y="";}; 
}
```
