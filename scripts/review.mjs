#!/usr/bin/env node
// Headless email review. Usage: node scripts/review.mjs <campaign folder>
// Saves review/findings.json. Exits 1 if any finding is high severity.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const folder = (process.argv[2] || '').replace(/\/+$/, '');
if (!folder || !existsSync(folder)) {
  console.error('Usage: node scripts/review.mjs <campaign folder>   (for example campaigns/steep-club-launch)');
  process.exit(2);
}

const schema = readFileSync('review/findings.schema.json', 'utf8');
const findingsFile = 'review/findings.json';

let prompt = `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. Report only real problems.`;

// Re-review: include last findings for the same folder, so nothing is repeated.
if (existsSync(findingsFile)) {
  try {
    const last = JSON.parse(readFileSync(findingsFile, 'utf8'));
    if (last.folder === folder && Array.isArray(last.findings) && last.findings.length) {
      prompt += `\n\nThese are findings from the last review:\n${JSON.stringify(last.findings, null, 2)}\n\nThese are findings from the last review. Report only problems that are new or still not fixed. Don't repeat ones that have been fixed.`;
    }
  } catch {
    // A broken findings file just means a full review.
  }
}

const run = spawnSync('claude', [
  '-p', prompt,
  '--output-format', 'json',
  '--json-schema', schema,
  '--allowedTools', 'Read,Glob,Grep',
], { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });

if (run.error || run.status !== 0) {
  console.error(`Review failed: claude ${run.error ? `could not start (${run.error.message})` : `exited with code ${run.status}`}.`);
  if (run.stderr) console.error(run.stderr.trim());
  process.exit(2); // 2 = the review itself broke (not the same as "found problems")
}

let output;
try {
  output = JSON.parse(run.stdout);
} catch {
  console.error('Review failed: claude did not return JSON.');
  process.exit(2);
}

// The output may be one object, or a list whose last item is the result.
const result = Array.isArray(output) ? output.at(-1) : output;
const structured = result?.structured_output;
if (!structured || !Array.isArray(structured.findings)) {
  console.error('Review failed: no structured_output.findings in the result.');
  if (result?.result) console.error(String(result.result).slice(0, 500));
  process.exit(2);
}

const findings = structured.findings;
writeFileSync(findingsFile, JSON.stringify({ folder, reviewed_at: new Date().toISOString(), findings }, null, 2) + '\n');

const count = (s) => findings.filter((f) => f.severity === s).length;
console.log(`${folder}: ${findings.length} finding(s): ${count('high')} high, ${count('medium')} medium, ${count('low')} low. Saved to ${findingsFile}.`);
process.exit(count('high') > 0 ? 1 : 0);
