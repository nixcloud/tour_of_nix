---
topic: Map
youtube: https://www.youtube.com/watch?v=4fp-7_yz07I&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

A function called `builtins.map` exists.

The `map-function` requires these arguments: a `function` and a `list`. 
It evaluates the given function on every element of the given list. 

In the example it is used to multiply 
every number in a list by two. 

Your job:

* Use the map function to extend every `string` in **bar** with "bar". 

**Note:** You can modify the `Strings` in any way. 
They don't have to evaluate to 'foobar' (nor should they).

```nix code
let
  bar = ["bar" "foo" "bla"];
  numbers = [1 2 3 4];
in
{
  #multiplies every number by 2
  example = map (n: n * 2) numbers; 
  #complete this
#  foobar = map ( XXX ) XXX;
}
```

```nix solution
let
  bar = ["bar" "foo" "bla"];
  numbers = [1 2 3 4];
in
{
  #multiplies every number by 2
  example = map (n: n * 2) numbers; 
  #complete this
  foobar = map (x: x + "bar") bar;
}
```
