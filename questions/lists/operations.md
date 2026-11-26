---
topic: Lists
youtube: https://www.youtube.com/watch?v=yUfMxGs1AZQ&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

To learn the basic syntax replace every XX in the attrset with values from the let scope.

Do this:

 * Every exercise should evaluate to true.

```nix code
with import <nixpkgs> { };
with lib;
let
  list = [2 "4" true false {a = 27;} false 3];
  f = x: isString x;
  s = "foobar";
in
{
  #replace all X, everything should evaluate to true
  ex00 = isList X;
#  ex01 = elemAt list 2 == X;
#  ex02 = length list == X;
#  ex03 = last list == X;
#  ex04 = filter f list == [ XX ];
#  ex05 = head list == X;
#  ex06 = tail list == [ XXX ];
#  ex07 = remove true list == [ XXX ];
#  ex08 = toList s == [ XXX ];
#  ex09 = take 3 list == [ XXX ];
#  ex10 = drop 4 list == [ XXX ];
#  ex11 = unique list == [ XXX ];
#  ex12 = list ++ ["x" "y"] == [ XXX ];
}
```

```nix solution
with import <nixpkgs> { };
with lib;
let
  list = [2 "4" true false {a = 27;} false 3];
  f = x: isString x;
  s = "foobar";
in
{
  #replace all X, everything should evaluate to true
  ex00 = isList list;
  ex01 = elemAt list 2 == true;
  ex02 = length list == 7;
  ex03 = last list == 3;
  ex04 = filter f list == ["4"];
  ex05 = head list == 2;
  ex06 = tail list == ["4" true false {a = 27;} false 3];
  ex07 = remove true list == [2 "4" false {a = 27;} false 3];
  ex08 = toList s == [s];
  ex09 = take 3 list == [2 "4" true];
  ex10 = drop 4 list == [{a = 27;} false 3];
  ex11 = unique list == [2 "4" true false {a = 27;} 3];
  ex12 = list ++ ["x" "y"] == [2 "4" true false {a = 27;} false 3 "x" "y"];
}
```
