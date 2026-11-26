---
topic: Attribute sets and booleans
youtube: https://www.youtube.com/watch?v=BZACbPJg9Oo&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

To learn the basic syntax of Nix, replace every XX in the attrset
with values from the attribute `attrSet` bound in the let scope.

Each individual exercise `ex00, ex01, ...` should evaluate to `true`. 

**Note:** Remove the `#` to uncomment the exercises as you proceed.

See [Nix documentation](https://nixos.org/manual/nix/stable/language/values#attribute-set) 
for more details on `attribute sets`.

```nix code
let
  attrSet = {x = "a"; y = "b"; b = {t = true; f = false;};};
  attrSet.c = 1;
  attrSet.d = null;
  attrSet.e.f = "g";
in
rec {
  #boolean
  ex0 = attrSet.b.t;
  #equal
#  ex01 =  "a" == attrSet.XX; 
  #unequal 
#  ex02 = !("b" != attrSet.XX );
  #and/or/neg
#  ex03 = ex01 && !ex02 || ! attrSet.XX;
  #implication
#  ex04 = true -> attrSet.XX;
#  ex05 = attrSet.XX ? e;
}
```

```nix solution
let
  attrSet = {x = "a"; y = "b"; b = {t = true; f = false;};};
  attrSet.c = 1;
  attrSet.d = null;
  attrSet.e.f = "g";
in
rec {
  ex0 = attrSet.b.t;
  #equal
  ex01 = "a" == attrSet.x;
  #unequal 
  ex02 = !("b" != attrSet.y);
  #and/or/neg
  ex03 = ex01 && !ex02 || !attrSet.b.f;
  #implication
  ex04 = true -> attrSet.b.t;
  #contains attribute
  ex05 = attrSet ? e;
}
```
