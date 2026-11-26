// questions/ to questions.json, which the page loads:
//
//   node tools/build-questions.mjs questions out/questions.json
//
// questions/order.txt lists every question's file, one per line, in the
// tour's order, relative to questions/ so that an editor opens it from
// there: functions/minmax.md, whose question's path (its id in the URL)
// is functions/minmax. tools/questions.mjs has the format. Fails on a listed file that is missing, a file that is
// not listed, and a file that does not read back as it is written, so
// that what is in the repository is exactly what the tour shows.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { formatQuestion, parseQuestion } from "./questions.mjs";

const [dir, out] = process.argv.slice(2);

const order = readFileSync(join(dir, "order.txt"), "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line !== "" && !line.startsWith("#"));
const notMarkdown = order.filter((line) => !line.endsWith(".md"));
if (notMarkdown.length > 0) {
  console.error(`order.txt lists files without .md: ${notMarkdown.join(", ")}`);
  process.exit(1);
}
const paths = order.map((file) => file.slice(0, -".md".length));

const files = readdirSync(dir, { recursive: true })
  .filter((file) => file.endsWith(".md"))
  .map((file) => relative(dir, join(dir, file)).slice(0, -".md".length));

const problems = [];
for (const path of files) {
  if (!paths.includes(path)) problems.push(`questions/${path}.md is not in order.txt`);
}
const seen = new Set();
for (const path of paths) {
  if (seen.has(path)) problems.push(`order.txt lists ${path}.md twice`);
  seen.add(path);
  if (!files.includes(path)) problems.push(`order.txt lists ${path}.md, but questions/${path}.md does not exist`);
}

const questions = [];
for (const path of paths.filter((path) => files.includes(path))) {
  const text = readFileSync(join(dir, `${path}.md`), "utf8");
  try {
    const question = parseQuestion(path, text);
    if (formatQuestion(question) !== text) {
      problems.push(`questions/${path}.md is not in the canonical form; it should read:\n${formatQuestion(question)}`);
    }
    questions.push(question);
  } catch (err) {
    problems.push(err.message);
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n\n"));
  process.exit(1);
}
writeFileSync(out, JSON.stringify(questions, null, 4) + "\n");
