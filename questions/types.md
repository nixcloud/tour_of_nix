---
topic: Typing system
youtube: https://www.youtube.com/watch?v=EsbiR4uwywo&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

The Nix language uses dynamic typing and there are `builtin` 
functions to check the type of a `binding`. 

**Note:** use these functions: `isBool`, 
`isInt`, 
`isString`, 
`isNull`, 
`isList`, 
`isAttrs` and 
`isFunction`.

Do this:

* go through `ex00, ex01, ...` and replace X by `isBool` in respect to the
  `type`
* fix `ex04`, what is the problem?

**Note:** `()` can either be a `function` or indicates `precedence`.

 See also <https://nixos.org/manual/nix/stable/language/values>.

```nix code
with import <nixpkgs> {};
with lib;
{
  ex00 = isAttrs {};
  #ex01 = isX "a"; 
  #ex02 = isX (-3); 
  #ex03 = isX (x: x);
  #ex04 = isX (x:x);
  #ex05 = isX ("x");
  #ex06 = isX null; 
  #ex07 = isX (y: y+1);
  #ex08 = isX [({z}: z) (x: x)];
  #ex09 = isX {a=[];};
  #ex10 = isX -10; # oh, what is that?
}
```

```nix solution
with import <nixpkgs> {};
with lib;
{
  ex00 = isAttrs {};
  ex01 = isString "a"; 
  ex02 = isInt (-3); 
  ex03 = isFunction (x: x);
  ex04 = isString (x:x); # this is because of url parsing: foo = http://bar.com;
  ex05 = isString ("x");
  ex06 = isNull null; 
  ex07 = isFunction (y: y+1);
  ex08 = isList [({z}: z) (x: x)];
  ex09 = isAttrs {a=[];};
  ex10 = isInt (-10); # () were missing
}
```
