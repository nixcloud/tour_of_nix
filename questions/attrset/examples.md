---
topic: Attribute sets: examples 1
youtube: https://www.youtube.com/watch?v=GQO1HUV0A9E&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

Make all `ex0` up to `ex7` evaluate to true.

**Note:** For the '?' operator, see <https://nixos.org/manual/nix/stable/language/operators#has-attribute>

**Note:** <https://nixos.org/manual/nix/stable/language/builtins.html#builtins-listToAttrs>

```nix code
with import <nixpkgs> { };
with lib;
let
  attr = {a="a"; b = 1; c = true;};
  s = "b";
in
{
  #replace all X, everything should evaluate to true
  ex0 = isAttrs X;
#  ex1 = attr.a == X;
#  ex2 = attr.${s} == X;
#  ex3 = attrVals ["c" "b"] attr == [ XXX ];
#  ex4 = attrValues attr == [ XXX ];
#  ex5 = builtins.intersectAttrs attr {a="b"; d=234; c="";} 
#    == { X = X; X = X;};
#  ex6 = removeAttrs attr ["b" "c"] == { XXX };
#  ex7 = ! attr ? a == XXX;
}
```

```nix solution
with import <nixpkgs> { };
with lib;
let
  attr = {a="a"; b = 1; c = true;};
  s = "b";
in
{
  #replace all X, everything should evaluate to true
  ex0 = isAttrs attr;
  ex1 = attr.a == "a";
  ex2 = attr.${s} == 1;
  ex3 = attrVals ["c" "b"] attr == [true 1];
  ex4 = attrValues attr == ["a" 1 true];
  ex5 = builtins.intersectAttrs attr {a="b"; d=234; c="";} == { a = "b"; c="";};
  ex6 = removeAttrs attr ["b" "c"] == {a = "a";};
  ex7 = ! attr ? a == false;
}
```
