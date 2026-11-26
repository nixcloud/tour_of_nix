---
topic: Functions: attribute sets arguments
youtube: https://www.youtube.com/watch?v=4Cfk41ylC2E&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

When passing an `attribute set` to `function`, you can set default values.

Doing so, allows the function to be called without that parameter, making 
it optional.

**Note:** A default value is defined with a '?'. 

Now:

* Change the `function` 'func' in a way that **foobar** is 
evaluated to **'foobar'**.

```nix code
let
  f = "f";
  o = "o";
  b = "b";
  func = {a ? f, b , c }: a+b+c; #only modify this line!
in
rec {
  foo = func {b="o"; c=o;}; #must evaluate to "foo"
  bar = func {a=b; c="r";}; #must evaluate to "bar"
  foobar = func {a=foo;b=bar;}; #must evaluate to "foobar"
}
```

```nix solution
let
  f = "f";
  o = "o";
  b = "b";
  func = {a ? f, b ? "a", c ? ""}: a+b+c; #Only modify this line! 
in
rec {
  foo = func {b="o"; c=o;}; #should be foo
  bar = func {a=b; c="r";}; #should be bar
  foobar = func {a=foo;b=bar;}; #should be foobar
}
```
