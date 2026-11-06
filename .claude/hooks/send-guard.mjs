#!/usr/bin/env node
// PreToolUse guard for the Resend MCP server.
// Blocks (exit 2) any send that could reach someone other than
// Resend's test addresses (@resend.dev) or my own email (MY_EMAIL).

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => (raw += chunk));
process.stdin.on('end', () => {
  let call;
  try {
    call = JSON.parse(raw);
  } catch {
    block('Send guard could not read the tool call, so it blocked it to be safe.');
  }

  // "mcp__resend__send-email" -> "send-email"
  const tool = String(call.tool_name || '').replace(/^mcp__resend__/, '');
  const input = call.tool_input || {};
  const myEmail = (process.env.MY_EMAIL || '').trim().toLowerCase();

  // Tools that can reach whole lists, or people we never checked.
  const alwaysBlock = {
    'send-broadcast': 'broadcasts go to a whole audience',
    'create-automation': 'automations can email whole lists by themselves',
    'send-inbox-draft': 'inbox drafts can go to anyone',
    'send-new-inbox-email': 'inbox emails can go to anyone',
    // Not in the course prompt, but these send mail too:
    'reply-to-inbox-thread-email': 'replies go to whoever wrote in',
    'forward-inbox-thread-email': 'forwards can go to anyone',
  };
  if (alwaysBlock[tool]) {
    block(`Send guard blocked ${tool}: ${alwaysBlock[tool]}. Send single emails to test addresses instead.`);
  }

  if (tool === 'send-email' || tool === 'send-batch-emails') {
    // send-email has to/cc/bcc at the top. send-batch-emails nests them in emails[].
    const messages = tool === 'send-batch-emails' ? input.emails || [] : [input];
    const addresses = [];
    for (const m of messages) {
      for (const field of ['to', 'cc', 'bcc']) {
        const v = m?.[field];
        if (Array.isArray(v)) addresses.push(...v);
        else if (typeof v === 'string') addresses.push(...v.split(','));
      }
    }
    if (addresses.length === 0) {
      block(`Send guard blocked ${tool}: no recipients found to check.`);
    }
    for (const a of addresses) {
      // Accept "Name <addr>" as well as plain addresses.
      const addr = (a.match(/<([^>]+)>/)?.[1] || a).trim().toLowerCase();
      const ok = addr.endsWith('@resend.dev') || (myEmail && addr === myEmail);
      if (!ok) {
        block(`Send guard blocked ${tool}: ${addr} is not a Resend test address (@resend.dev) or your own email (MY_EMAIL). Never email real people from the studio.`);
      }
    }
  }

  process.exit(0); // anything else is allowed
});

function block(reason) {
  // For exit code 2, Claude Code shows stderr to Claude as the reason.
  process.stderr.write(reason + '\n');
  process.exit(2);
}
