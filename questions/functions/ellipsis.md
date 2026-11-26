---
topic: Functions: the @-pattern
youtube: https://www.youtube.com/watch?v=4HE5hx8E_QA&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

## Ellipsis

Functions can be called with an `attribute set`, as we have seen.
This `attribute set` must contain all required 'function 
arguments`.

However, such an `Attribute set` can contain additional attributes but
you have to add `...` like this:

    func2 = args@{a, b, c, ...}: a+b+c+args.d;

**Note:** `...` is called `ellipsis`.

## @-pattern

Inside a function, those `attributes` can be accessed with the 
`@-pattern`.

Now complete the arguments `attribute set`:

  * **foo** must evaluate to 'foo'
  * **foobar** must evaluate to 'foobar'

```nix code
let
  arguments = {a="f"; b="o"; c=X; d=X;}; #only modify this line
  func = {a, b, c, ...}: a+b+c; 
  func2 = args@{a, b, c, ...}: a+b+c+args.d;
in
{
  #the argument d is not used 
  foo = func arguments;
  #now the argument d is used
  foobar = func2 arguments;
}
```

```nix solution
let
  arguments = {a="f"; b="o"; c="o"; d="bar";}; #only modify this line

  func = {a, b, c, ...}: a+b+c; 
  func2 = args@{a, b, c, ...}: a+b+c+args.d;
in
{
  #the argument d is not used 
  foo = func arguments;
  #now the argument d is used
  foobar = func2 arguments;
}
```
