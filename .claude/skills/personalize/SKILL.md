---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize

Write one version of each campaign email for each lead group.

## Input

The campaign folder is: `$ARGUMENTS`

**If no campaign folder was given** (the line above is empty), stop. Do not write anything. Use Glob on `campaigns/*/` and reply with the list of campaign folders that exist, plus: "Run `/personalize <campaign folder>` with one of these."

If the folder has no `emails/` folder, stop and say so.

## Steps

1. **Find the groups.** Read `leads/leads.csv` and collect the distinct values in the `group` column (for Kettlebird: `tea-curious`, `gift-buyers`, `daily-drinkers`). Read `leads/CLAUDE.md` too, if it describes the groups.
2. **Read the rules.** Read `brand/voice.md` and `.claude/rules/emails.md`. Every version must still follow both.
3. **Read the emails.** Use Glob on `<campaign folder>/emails/*.md`. Read each one. Read `<campaign folder>/plan.md` too, if it exists, for what each group cares about.
4. **Write one version per email per group.** For each email and each group:
   - Keep **exactly the same**: the `Subject:` line, the `Preview:` line, the greeting, the single link and its button text, the sign-off and the footer, and every other line.
   - Change **only two things**:
     1. **The opening line** (the first sentence after the greeting), so it speaks to that group.
     2. **One example** (one sentence in the body), so it fits that group.
   - Don't add claims, prices, promises or words that `brand/voice.md` forbids.
   - Save it to `<campaign folder>/groups/<group>/emails/<same file name>`.
5. **Reply with a short summary only:**
   - How many files you wrote (emails × groups).
   - One example opening line per group.

Nothing else: don't paste the emails into the reply.
