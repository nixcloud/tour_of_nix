---
topic: Assertions
youtube: https://www.youtube.com/watch?v=g-qDaCr2rwQ&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

`Assertions` are generally used to check that certain requirements 
on or between features and dependencies hold. 

See also <https://nixos.org/manual/nix/stable/language/constructs#assertions>.

### form 1

    assert e1 || abort "e1 is true, so we abort with this error message";
    
    
where `e1` is an expression that should evaluate to a `boolean` value. 
If it evaluates to `true`, the `abort` call is executed.

### form 2

    assert e1; e2

where `e1` is an expression that should evaluate to a `boolean` value. 
If it evaluates to `true`, `e2` is returned; otherwise expression 
evaluation is aborted and a backtrace is printed.

```nix code
with import <nixpkgs> {};
let
  func = x: y: assert (x==2) || abort "x has to be 2 or it won't work!"; x + y;
  n = "-5"; # only modify this line
in

assert (lib.isInt n) || abort "Type error since supplied argument is no int!";

rec {
  ex00 = func (n+3) 3;
}
```

```nix solution
with import <nixpkgs> {};
let
  func = x: y: assert (x==2) || abort "x has to be 2 or it won't work!"; x + y;
  n = -1;
in

assert (lib.isInt n) || abort "Type error since supplied argument is no int!";
assert (lib.isInt n) -> (n > -5);

rec {
  ex00 = func (n+3) 3;
}
```
