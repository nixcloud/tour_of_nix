---
topic: How it works...
youtube: https://www.youtube.com/watch?v=pnzucIAFXn0&list=PLMr2KA8WWojv-4cgqIiVebml0FrMl8N_-
---

## Usability
1. You read the description/text on the `right pane`
  (That is what you are doing right now).

2. You write/fix code on the `left pane`:

  * First thing, **complete v on the left, like:**
  
    v = "understood";
    
  * Click `run` and if the grey 'output-box' turns 
  
    * **green**
    
    Everything is good! Change **v** to something else and hit `run` again!
  
    * **red**
    
    You have to fix something! If you can't think of what
    we want from you, then, and only then, click the `solution`
    button and adapt your solution.
    
3. Finally there is the `reset` button. If you screwed the code,
  just hit `reset`. 
  
  **Note:** Using `reset` you will lose the text you had
  there before.

## The shell

A small Linux runs inside this web page. Whenever you hit `run`, this happens:

1. the editor's contents are written to the file `/tour/test.nix` in it

2. then its shell runs:

        nix-instantiate --eval --strict --show-trace /tour/test.nix

Click `shell` to watch it happen, to read the complete error message, or 
to type Nix commands yourself (try `nix-instantiate --eval -E '1 + 1'`).

**Note:** If you've got **Nix** or **NixOS** installed natively, then you 
can also execute these examples on your own shell.

## Privacy

We are:
* not using **cookies** and 
* **we don't store your results.**

Happy hacking & learning!

**Note:** If you hit `reload` in your browser, everything is gone!

```nix code
# code goes here
{
  v="";
}
```

```nix solution
{ v="understood"; }
```
