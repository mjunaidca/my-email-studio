# Brand review · Steep Club launch emails (fresh session)

Run in a new session with `/marketing:brand-review campaigns/steep-club-launch/emails/` on 2026-11-06, before fixes.

## Summary

**The four emails aren't ready to send yet: 2 high, 5 medium and 6 low problems.** The voice is strong and the format is clean. The real problems are claims the team hasn't confirmed, mostly in emails 02 and 03.

- **Strengths:** The tone is warm and unhurried throughout. There are no banned words, prices, health claims or fake urgency, and email 04's "No rush" fits the brand well.
- **Biggest fixes:** Email 03 hints at a delivery time that nobody has confirmed. Email 02 names teas that have no source in this repo.

## High

| File and line | Problem | Suggested fix |
|---|---|---|
| `03-a-gift-that-arrives.md:10` | "joining this week gives the first box the best chance of arriving in time" hints at a delivery time and adds soft urgency. Gift shipping dates are still unconfirmed (`plan.md:56`, `plan.md:99`), and `voice.md` bans unconfirmed promises and made-up urgency. | Delete the sentence for now. Once the team confirms the dates, use: "If you're giving it for the holidays, join by [confirmed date] and the first box should arrive by [confirmed date]." |
| `02-inside-the-box.md:10` | The green, black and herbal teas aren't recorded anywhere else in the repo. The plan says box contents must be final before this email is written (`plan.md:55`). | Replace the line with the confirmed teas, ideally by name. If the team has already confirmed them elsewhere, add that to the repo and this drops off the list. |

## Medium

| File and line | Problem | Suggested fix |
|---|---|---|
| `03-a-gift-that-arrives.md:8` (also `:2`, `:12`) | "in their name" and "at their door" describe a gift process nobody has confirmed. The gift also sounds open-ended, with no word on how long it runs or how it stops, and skip/cancel is unconfirmed (`plan.md:31`). The "Give" button assumes the page has a gift option. | Confirm how gifting works, then match the wording to it. Until then, stay close to the plan: "One sign-up, and a new box arrives each month." |
| `02-inside-the-box.md:8` | "from small farms", "each in its own pouch", and the card listing leaf, water heat and steep time all go beyond the plan. The plan only confirms a simple brewing card and farms we buy from. | Confirm these details, or use: "Every Steep Club box holds a few small-batch teas. With them comes a simple card on how to brew each one." |
| `01-the-club-is-open.md:8` | "Every tea comes with a simple card" means one card per tea. The plan says one card per box (`plan.md:28`), and so does this email's own preview. | "Every box comes with a simple card on how to brew each tea, so there's no guesswork." |
| `02-inside-the-box.md:1` | "your first box" assumes the reader has joined. It's also wrong for anyone who joins later and gets a different first box. | `Subject: What's inside this month's box` (30 characters) |
| `04-room-for-one-more.md:2` | "for daily tea drinkers" exposes our audience label, and this email goes to the whole waitlist (`plan.md:44`). "A calm note" is also planning language, and `voice.md` says to talk to one person. | `Preview: New leaves to try alongside the ones you already love, whenever you're ready.` (77 characters) |

## Low

| File and line | Problem | Suggested fix |
|---|---|---|
| `04-room-for-one-more.md:6` | "You already know your favourite cup" won't fit tea-curious readers, who are still finding their way. The plan allows this lean, so it's minor. | "If you already have a favourite cup, The Steep Club isn't here to replace it." Or leave it for the group versions in step 8. |
| `02-inside-the-box.md:10` | "gentle herbal blend for the evening" could faintly suggest a sleep or calming benefit. `voice.md` bans even hints. | "a gentle herbal blend with no..." would be a new claim, so keep it simple: "and an herbal blend for a quiet moment." |
| `02-inside-the-box.md:12` | "See this month's box" promises a view of the box, but the plan only describes a sign-up page (`plan.md:67`). | Check that the page shows the box. If it doesn't, use "Join The Steep Club". |
| `04-room-for-one-more.md:8` | "It's here to sit next to it" uses "it" for two different things. | "It's here to sit next to your usual cup." |
| `01-the-club-is-open.md:6` | "Today it's open" will be wrong if this email is resent to non-openers (`plan.md:87`). | "It's open now." |
| All four, lines `14-15` and `17-18` | If your email tool converts Markdown, each pair of lines may merge into one. That would break the sign-off rule in `voice.md` and the two-line footer. | Send a test and check it. The files themselves match the rule. |

## What passed

| Check | 01 | 02 | 03 | 04 |
|---|---|---|---|---|
| Subject length, 50 max | 22 | 28 | 30 | 35 |
| Preview length, 90 max | 84 | 75 | 90 | 90 |
| `{{first_name}}` greeting | Pass | Pass | Pass | Pass |
| Exactly one link, correct URL | Pass | Pass | Pass | Pass |
| Sign-off and footer match exactly, no code block | Pass | Pass | Pass | Pass |
| Only the email in the file | Pass | Pass | Pass | Pass |

The previews for 03 and 04 are exactly at the limit, so any edit that adds a character will break the rule.

## Legal and compliance flags

- **Paid subscription not stated:** No email says the club is paid or recurring, and "Join" could read as free. Keeping prices out is correct under `voice.md`, but the sign-up page should clearly show the price, renewal and how to cancel. Have someone check the rules that apply to you.
- **Footer address:** `{{company_address}}` has no value anywhere in this repo, so it needs a real address before sending.
- **No other flags:** I found no health claims, superlatives, comparisons or testimonials.

## Plan gap to fix before sending

The plan calls email 04 a note for people who haven't joined (`plan.md:51`), but also says every email goes to the whole waitlist (`plan.md:44`). Without removing people who have joined, new members will be invited to join emails 02 to 04. That's a send-list fix, not a copy fix.

## Questions for the team

1. What are the gift shipping dates?
2. What's in this month's box, and are the farm, pouch and card details right?
3. How does gifting work, including how long it lasts and how it stops?

