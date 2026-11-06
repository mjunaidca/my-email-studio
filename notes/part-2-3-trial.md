# Part 2 and 3 trial run · what worked, what didn't

Run on 2026-11-06 on branch `part-2-3-trial`, without driving `claude -p` or interactive sessions. Tools were tested directly: the MCP server over stdio, the hooks with the same JSON Claude Code sends them, and `review.mjs` against a stand-in `claude`.

## Worked as written

- Step 9: `npx emulate@0.12.3 start --service resend` is ready on http://localhost:4000. `resend-mcp@2.27.1` starts with the `.mcp.json` defaults, a send to `delivered@resend.dev` gets an id, and `list-emails` shows `email.delivered`. No real `re_` key anywhere in git history.
- Step 10: all six tool names in the prompt exist in resend-mcp 2.27.1. The guard blocks Ayesha and allows `delivered@resend.dev` and `MY_EMAIL`.
- Step 11: three emails tagged `[tea-curious]`, `[gift-buyers]` and `[daily-drinkers]`, all delivered.
- Step 12: `-n`, `--resume` and `--fork-session` all exist in Claude Code 2.1.319.
- Step 14: `claude plugin validate` passes. The kit guard runs via `${CLAUDE_PLUGIN_ROOT}` and blocks a bakery lead.

## Traps to watch in class

1. **`send-batch-emails` nests its addresses.** They sit in `emails[].to`, not a top-level `to`. A guard that only checks `tool_input.to/cc/bcc` lets a batch send to real leads through. Our guard checks both shapes.
2. **Two more tools can send mail:** `reply-to-inbox-thread-email` and `forward-inbox-thread-email`. The prompt's list misses them, so our guard blocks them too.
3. **Write the block reason to stderr.** With exit code 2, Claude Code shows stderr to Claude. The prompt says "print", and `console.log` goes to stdout, so Claude may not see the reason.
4. **If `MY_EMAIL` is unset, sends to your own email are blocked.** That fails safe, but students who skip step 10.3 will see their own address blocked.
5. **`review/findings.json` holds one folder at a time.** Reviewing `steep-club-launch` overwrites the `test-bad` findings, so the re-review test only works when the same folder is reviewed twice in a row (as Build 2 does).
6. **`review.mjs` doesn't travel as written.** It reads the schema from `review/` in the current folder. In the kit, it must find the schema next to the script and create `review/` in the client repo.
7. **`plugin validate` now also checks for a LICENSE** (it reports a directory problem but still passes). Adding `license` to plugin.json clears it.

## Not tested here (needs a live session)

- Approving the resend server, and `/mcp` showing it connected.
- Step 12's resume and fork behaviour, and the handoff file.
- A real `claude -p` run of `review.mjs`: is `structured_output` filled with `--json-schema`? The parsing, exit codes and re-review prompt were checked with a stand-in.
- Step 14 in `client-two` with `claude --plugin-dir ../studio-kit`: seeing `studio-kit:personalize` and `studio-kit:email-reviewer`, and running personalize on the bakery groups.
