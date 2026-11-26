---
topic: Partial application II
youtube: https://www.youtube.com/watch?v=WaiIcgidSgs&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

Functions can be called with an `attribute set`, as we have seen. This is another common 
example of partial application, so solve it!

Complete the arguments `attribute set`:

  * A must evaluate to 'HappyFunctionsAreCalled'

```nix code
let
  arguments = {a="Happy"; b="Awesome";};

  func = {a, b}: {d, b, c}: a+b+c+d;
in
{
  A = func arguments XXX #only modify this line
}
```

```nix solution
let
  arguments = {a="Happy"; b="Awesome";};

  func = {a, b}: {d, b, c}: a+b+c+d;
in
{
  A = func arguments {d="Called"; b = "Functions"; c="Are";};
}
```
