// One question per Markdown file, and back: shared by the build
// (tools/build-questions.mjs, under node) and by the page, whose ctrl+s
// saves the question being edited as such a file.
//
//   ---
//   topic: Strings
//   youtube: https://www.youtube.com/watch?v=…
//   ---
//
//   The question's text, in Markdown.
//
//   ```nix code
//   the code the reader starts from
//   ```
//
//   ```nix solution
//   the solution
//   ```
//
// The file's path below questions/, without .md, is the question's path:
// the id in the tour's URL. Front matter lines are `key: value`; topic is
// required, youtube optional. A fence is three backticks, or more where
// the code itself holds three in a row.

// The fields a question has in questions.json, in their order there.
const FIELDS = ["topic", "path", "question", "code", "solution", "youtube"];

const FRONT_MATTER = /^---\n([\s\S]*?)\n---\n/;
const BLOCKS =
  /\n(`{3,})nix code\n([\s\S]*?)\n?\1\n+(`{3,})nix solution\n([\s\S]*?)\n?\3\n*$/;

// What a code block holds: the code without its final newline.
const blockOf = (code) => code.replace(/\n$/, "");
// And back: code ends with one newline, unless there is none.
const codeOf = (block) => (block === "" ? "" : block + "\n");

function fenceFor(code) {
  const longest = Math.max(0, ...(code.match(/`+/g) ?? []).map((run) => run.length));
  return "`".repeat(Math.max(3, longest + 1));
}

// The canonical form of a question: what a file can hold. Its text
// starts and ends with no whitespace, and its code with no blank lines.
export function normalize(question) {
  const code = (text) => codeOf(text.replace(/^\s*\n/, "").replace(/\s+$/, ""));
  return {
    topic: question.topic.trim(),
    path: question.path,
    question: question.question.trim(),
    code: code(question.code),
    solution: code(question.solution),
    youtube: question.youtube ?? "",
  };
}

// A question (with or without its path) as the text of its file.
export function formatQuestion(question) {
  const q = normalize({ path: "", ...question });
  const block = (kind, code) => {
    const fence = fenceFor(code);
    return `${fence}nix ${kind}\n${code}${fence}\n`;
  };
  return [
    "---",
    `topic: ${q.topic}`,
    ...(q.youtube ? [`youtube: ${q.youtube}`] : []),
    "---",
    "",
    q.question,
    "",
    block("code", q.code),
    block("solution", q.solution),
  ]
    .join("\n")
    .replace(/\n+$/, "\n");
}

// The text of the file at `path` (below questions/, without .md) as a
// question. Throws, naming the path, when the file is not in the format.
export function parseQuestion(path, text) {
  const fail = (why) => {
    throw new Error(`questions/${path}.md: ${why}`);
  };
  const front = FRONT_MATTER.exec(text);
  if (!front) fail("no front matter between --- lines at the top");

  const meta = {};
  for (const line of front[1].split("\n")) {
    const at = line.indexOf(": ");
    if (at === -1) fail(`not a "key: value" line: ${line}`);
    const key = line.slice(0, at);
    if (key !== "topic" && key !== "youtube") fail(`unknown key: ${key}`);
    meta[key] = line.slice(at + 2);
  }
  if (!meta.topic) fail("no topic");

  const body = text.slice(front[0].length);
  const blocks = BLOCKS.exec(body);
  if (!blocks) fail("it does not end with a ```nix code block and a ```nix solution block");

  const question = {
    topic: meta.topic,
    path,
    question: body.slice(0, blocks.index).trim(),
    code: codeOf(blocks[2]),
    solution: codeOf(blocks[4]),
    youtube: meta.youtube ?? "",
  };
  return Object.fromEntries(FIELDS.map((field) => [field, question[field]]));
}
