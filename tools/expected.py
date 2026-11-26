"""Evaluate every question's solution and write expected.json:

    { "<path>": { "solution": "<the solution's text>", "value": "<stdout>" } }

The page uses `value` only while its question's solution is still this
text; an edited solution is evaluated in the browser instead."""

import json
import os
import subprocess
import sys
import tempfile

questions_file, out_file = sys.argv[1:]
expected = {}
failed = []
with tempfile.TemporaryDirectory() as tmp:
    test = os.path.join(tmp, "test.nix")
    for question in json.load(open(questions_file)):
        with open(test, "w") as f:
            f.write(question["solution"])
        run = subprocess.run(
            ["nix-instantiate", "--eval", "--strict", "--show-trace", test],
            capture_output=True,
            text=True,
        )
        if run.returncode != 0:
            failed.append(f"{question['path']}:\n{run.stderr}")
            continue
        expected[question["path"]] = {
            "solution": question["solution"],
            "value": run.stdout.rstrip(),
        }

if failed:
    sys.exit("solutions that do not evaluate:\n\n" + "\n".join(failed))
json.dump(expected, open(out_file, "w"), indent=2, ensure_ascii=False)
