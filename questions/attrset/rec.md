---
topic: Attribute sets: rec
youtube: https://www.youtube.com/watch?v=dc79E_EC-E8&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

`Sets` or `attribute sets` are really **the core of the Nix language**, since ultimately the language 
is all about creating derivations, which are really 
just `sets of attributes` to be passed to build scripts.

Sets are just a list of name/value pairs (called attributes) 
enclosed in curly brackets, where each value is an arbitrary 
expression terminated by a semicolon. For example:

    { x = 123;
      text = "Hello";
      y = f { bla = 456; };
    }

This defines a set with attributes named x, text, y. The order of the attributes is irrelevant. An attribute name may only occur once.

Now:

* Find out what the `rec` keyword does and what the difference to an `attribute set` without `rec` is.
* Delete the `rec` before the `attribute set` and observe the different behaviour of the nix interpreter.

**Hint:** You find the answer within the solution section.

**Note:** That is all for now, but you can continue reading in the [nix documentation](https://nix.dev/manual/nix/stable/language/constructs#recursive-sets).

```nix code
rec {
  x = "a";
  y = x;
}
```

```nix solution
rec {
  x = "a";
  y = x;
}
#Recursive sets are just normal sets, but the attributes can refer to each other.
#Be aware of infinite recursions. They are not possible!
#rec {
#  x = y;
#  y = x;
#} Does not Work.
```
