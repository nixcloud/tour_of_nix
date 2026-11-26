---
topic: Attribute sets: examples 2
youtube: https://www.youtube.com/watch?v=GQO1HUV0A9E&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

Make `ex0` and `ex1` evaluate to true.

```nix code
let
  list = [ { name = "foo"; value = 123; }
           { name = "bar"; value = 456; } ];
  string = ''{"x": [1, 2, 3], "y": null}'';
in 
{
  ex0 = builtins.listToAttrs list == { XXX };
  ex1 = builtins.fromJSON string == { XXX };
}
```

```nix solution
let
  list = [ { name = "foo"; value = 123; }
           { name = "bar"; value = 456; } ];
  string = ''{"x": [1, 2, 3], "y": null}'';
in 
{
  ex0 = builtins.listToAttrs list == {foo = 123; bar = 456;};
  ex1 = builtins.fromJSON string == {x = [1 2 3]; y = null;};
}
```
