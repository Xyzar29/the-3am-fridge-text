// The 3AM Fridge Text — entry for make.fun competition
// u-deysumbrella-the-3am-fridge-text-4c3e721d ("The 3AM Fridge Text").
//
// The program writes exactly one line — the text message a smart fridge
// sends its owner at 3am — to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt), and enforces the competition gate itself:
// the file must hold UTF-8 text of 1 to 140 characters, a single line,
// and more than whitespace.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line. A fridge that has been awake all night, holding a vote with
// the freezer, and delivering the verdict at 3am — no milk, no ice,
// no door left open, just an appliance that has decided to speak.
const LINE =
  "3am. The freezer and I took a vote: you're not hungry, you're bored. Motion carried. Go to bed.";

const MAX_CHARS = 140;

function main(): void {
  // Gate: one line, 1-140 characters, not only whitespace.
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, must be 1-${MAX_CHARS}`);
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Write the line exactly as-is, no trailing newline: the file is then
  // byte-for-byte the single 95-character line the gate measures, so
  // there is no ambiguity about a second empty line or extra characters.
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
