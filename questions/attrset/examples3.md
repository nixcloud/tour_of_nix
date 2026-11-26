---
topic: Attribute sets: examples 3
youtube: https://www.youtube.com/watch?v=IbRyAUZ7aKw&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

To learn the basic syntax replace every XX in the `rec scope` with 
values from the `let scope`.

Now:

* Exercise should evaluate to true.

```nix code
let
  attrSetBonus = {f = {add = (x: y: x + y);
                       mul = (x: y: x * y);};
                  n = {one = 1; two = 2;};};
in
rec {
  #Bonus: use only the attrSetBonus to solve this one
  exBonus = 5 == XX ( XX XX XX ) XX;
}
```

```nix solution
let
  attrSetBonus = {f = {add = (x: y: x + y);
                       mul = (x: y: x * y);};
                  n = {one = 1; two = 2;};};
in
rec {
  #Bonus: use only the attrSetBonus to solve this one
  exBonus = with attrSetBonus; 5 == f.add (f.mul n.two n.two) n.one ;
}
```
