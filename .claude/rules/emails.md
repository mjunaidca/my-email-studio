---
paths:
  - "campaigns/**/emails/*.md"
---

# Email file rules

These rules apply to every email file in any campaign's `emails/` folder.

Each email file must:

1. **Start with the subject and preview.** The first line is `Subject: ...`, 50 characters or fewer (counting the whole line's text after `Subject: `). The second line is `Preview: ...`, 90 characters or fewer (counting the text after `Preview: `). Write one subject only, not options.
2. **Greet the reader with `{{first_name}}`**, for example "Hi {{first_name}},".
3. **Have exactly one main link**, written as `[Button text](https://kettlebird.example/steep-club)`. No other links anywhere in the email.
4. **End with our sign-off from `brand/voice.md`**:

   Steep well,
   The Kettlebird team

   Then this two-line footer, as plain text, **not** inside a code block:

   You're getting this because you joined the Kettlebird Tea waitlist.
   Kettlebird Tea, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Only the email goes in the file: no notes, no alternatives, no headings about the email.
