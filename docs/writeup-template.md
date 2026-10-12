# Write-up template

Fill this in for each new write-up, then add an entry to `writeups/index.html` (newest
first) and, if it should be featured, to the Write-ups section of `index.html`.

## Before publishing a bug bounty report

- The program allows disclosure, and the issue is fixed. If either is not true, write a
  general technique article or a lab reproduction instead, without naming the target.
- No secrets, tokens, session ids, personal data, internal hostnames or other users' data
  in text or screenshots.
- No step-by-step exploit for anything that is not fixed everywhere it applies.

## Kind line

One of: `Bug bounty · public, disclosed`, `Bug bounty · technique, target withheld`,
`Security review · lab, not client work`, `CTF · <event name>`, `Lab`. Then the date.

## Sections

1. **Title** that names the issue or the lesson.
2. **Takeaway**: one sentence, with severity and impact where it applies.
3. **Context**: what kind of target, whether testing was authorised and how, disclosure
   status, and scope.
4. **Timeline** (only what is safe to publish): found, reported, acknowledged, fixed, disclosed.
5. **Technical explanation**, with sanitised evidence of the reproduction.
6. **Root cause.**
7. **Fix, and how the fix was checked.**
8. **What I learned**, or what I would test next.
9. **Links**: related project, tool or source.
