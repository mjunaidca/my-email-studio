# My Email Studio · Kettlebird Tea

A Claude Code email marketing studio, built in the **Email Studio Lab (FDE-102)** course. Claude plans a launch campaign for The Steep Club (a monthly tea box from Kettlebird Tea, a made-up tea shop), writes the emails and personalizes them for each customer group.

**Status: end of Part 1 (steps 1–8, Plan and write).** Nothing has been sent. Part 2 (Send safely: Resend MCP in practice mode, the send guard hook, a practice launch) starts from here.

## What's here

```
CLAUDE.md                     studio rules (imports brand/voice.md)
brand/voice.md                how the brand sounds
leads/leads.csv               24 made-up practice customers (@example.com only)
leads/CLAUDE.md               rules for the leads folder only
campaigns/steep-club-launch/
  plan.md                     the campaign plan
  emails/                     4 launch emails
  groups/<group>/emails/      a version of each email per customer group
.claude/settings.json         marketing plugin enabled for this project
.claude/rules/emails.md       rules for every email file (paths: pattern)
.claude/skills/personalize/   our own skill (context: fork)
notes/                        skills research, brand review, open questions
```

## Part 1 steps, one commit each

| Step | What | Where |
|---|---|---|
| 1 | Look before you build | `notes/skills-i-chose.md` |
| 2 | Studio set up, project-scoped marketing plugin | `CLAUDE.md`, `.claude/settings.json`, `.gitignore` |
| 3 | Brand voice | `brand/voice.md`, `@brand/voice.md` in `CLAUDE.md` |
| 4 | Campaign plan (`/marketing:campaign-plan`) | `campaigns/steep-club-launch/plan.md` |
| 5 | Practice leads + folder rules | `leads/` |
| 6 | Email path rule + 4 emails (`/marketing:email-sequence`) | `.claude/rules/emails.md`, `emails/` |
| 7 | Fresh-session brand review and fixes | `notes/brand-review.md`, `notes/for-me-to-confirm.md` |
| 8 | `personalize` skill and 12 group versions | `.claude/skills/personalize/`, `groups/` |

## Getting started

Needs Node.js 22+, Git and Claude Code.

```bash
git clone https://github.com/mjunaidca/my-email-studio.git
cd my-email-studio
claude
```

Accept the prompts to trust the folder and the marketing plugin. Type `/marketing:` to see its commands.

The `part-1-completed` branch keeps a copy of the studio as it was at the end of Part 1.
