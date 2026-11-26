---
topic: inherit/import/with!
youtube: https://www.youtube.com/watch?v=1XwNjrCVUvs&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

These 3 keywords can be confused pretty easily. Since we are using them
a lot in `A tour of Nix` we need to introduce them properly.

## With

A with-expression, introduces the `set e1` into the lexical scope of the `expression e2`. 

    let 
      as = { x = "foo"; y = "bar"; };
    in 
      with as; x + y

## Import

Load, parse and return the Nix expression in the file path. 
`import` implements Nix’s module system: you can put any Nix expression (such as a set or a function) in a separate file, and use it from Nix expressions in other files.

    rec {
      x = 123;
      y = import ./foo.nix;
    }

## Inherit
The `inherit` keyword causes the specified `attributes` to be bound to whatever 
attributes with the same name happen to be in scope.

    let 
      x = 123; 
    in
    { 
      inherit x;
      y = 456;
    }
`inherit` takes one or more arguments.

Do this:

* make it work!

```nix code
let 
  myImport = import <nixpkgs> {};
  x = 123; 
  as = { a = "foo"; b = "bar"; };
  
in with as; { 
  inherit x; #example
  #fix line below: we want a and b in this scope
  inherit X; 
  #also fix this line
  z = XXX.lib.isBool true;
}
```

```nix solution
let 
  myImport = import <nixpkgs> {};
  x = 123; 
  as = { a = "foo"; b = "bar"; };
  
in with as; { 
  inherit x;
  inherit a b;
  z = myImport.lib.isBool true;
}
```
