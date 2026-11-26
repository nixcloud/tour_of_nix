---
topic: Lists & attribute sets
youtube: https://www.youtube.com/watch?v=Qg4tM_ebCoU&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

To learn the basic syntax replace every XX in the attrset with values from the let scope.


Every exercise should evaluate to true.

```nix code
let
  attrSet = {x = "a"; y = "b"; b = {t = true; f = false;};};
  attrSet.c = 1;
  attrSet.d = 2;
  attrSet.e.f = "g";

  list1 = [attrSet.c attrSet.d];
  list2 = [attrSet.x attrSet.y];

in
{
  #List concatenation.
  ex0 = ["a" "b" 1 2] == XX ++ XX;
}
```

```nix solution
let
  attrSet = {x = "a"; y = "b"; b = {t = true; f = false;};};
  attrSet.c = 1;
  attrSet.d = 2;
  attrSet.e.f = "g";

  list1 = [attrSet.c attrSet.d];
  list2 = [attrSet.x attrSet.y];

in
{
  #List concatenation.
  ex0 = ["a" "b" 1 2] == list2 ++ list1;
}
```
