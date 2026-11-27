# Design Reference: YNAB (ynab.com)

An analysis of the ynab.com homepage and features page, and what to take from it for this expense tracker.

> **Use it as a reference, not a template.** Borrow layout patterns, structure and tone. Do not copy YNAB's name, logo, illustrations, colours or copy. Every example line below is written for our app.

**Sources:** https://www.ynab.com/ and https://www.ynab.com/features, read on 2026-11-27.
**Limitation:** The pages were read as text, so exact hex colours, font names and spacing are not captured. Anything about visual style marked *(inferred)* comes from image file names and layout order, not from measured CSS.

---

## 1. Homepage structure (top to bottom)

| # | Section | What it does | Key content |
|---|---------|--------------|-------------|
| 1 | Announcement bar | Cross-sell, closable | Promotes the founder's book |
| 2 | Hero | Asks about the pain, then gives the promise | H1 is a question ("Do you worry about money?"). Subhead promises an outcome. One CTA, "Start Your Free Trial", plus microcopy: "No credit card required." Visual: a phone mockup of the app and a playful money illustration |
| 3 | Press / rating strip | Instant trust | Forbes, NYT, WIRED, WSJ, CNBC, Apple "App of the Day", Trustpilot 4.6, app stores 4.7 from 105k reviews |
| 4 | Empathy block | Removes shame | "Being bad at money isn't a character flaw. It's a skill gap." CTA repeated |
| 5 | Stats block | Proof in big numbers | Four large percentages (90%, 91%, 70%, 93%) with one-line captions and a survey footnote |
| 6 | Founder quote | Human voice | A single pull quote with name and title |
| 7 | 3-step "how it works" | Makes starting feel easy | "It takes 20 minutes…". Join → Make a plan → Outcome |
| 8 | Product shot | Shows the real UI | Desktop and two phones showing categories, balances and a spending breakdown |
| 9 | Savings claim | A concrete result | "$600 first month, $6,000 first year" |
| 10 | Testimonials | Story-based proof | 3 cards: photo, quote, first name, "member since 2015" |
| 11 | Goal selector | Lets visitors route themselves | "I want to…" plus 7 icon cards (pay off debt, save more, stop arguing with a partner, irregular income…) |
| 12 | Closing CTA | Final push | Tagline repeated. Primary CTA "Start Your Free Trial" and secondary "Browse App Features" |
| 13 | Footer | Utility | 4 link columns (Company, Programs, App, Legal), social icons, regulatory note |

**Pattern:** a CTA appears about every two sections, roughly 4 times in total. Every section has one job.

## 2. Features page: product UI ideas

These are the most useful parts for our app, because they describe the product, not the marketing.

- **"Reflect" view:** a monthly spending breakdown, net worth, and **savings goals shown as progress bars** (for example, a bike or a trip).
- **Targets / goals:** each category can have a target with progress toward it.
- **Reports:** average spend per category (groceries is their example) and a net worth line chart. They call charts "eye candy" in a self-aware tone.
- **Category templates:** preset category sets for quick setup.
- **Loan / debt payoff planner:** a "what if I pay more each month" simulator.
- **Customizable views** and **mobile widgets**.
- **Trust pillars** shown as three columns: *Always ad-free*, *Bank-grade security*, *World-class support*.

## 3. Visual style

- **Palette** *(inferred from asset names: "blurple", "meadow", "buttermilk", "firefly")*: a blue-purple primary, a fresh green accent, a warm cream background tone, and a dark ink colour. The overall feel is friendly, light and optimistic, not "bank blue".
- **Illustration:** consistent **outline (line-art) icons**, sparkle motifs, a hand-drawn scribble arrow, and a blob shape behind the phone mockup. It feels playful but restrained.
- **Photography:** candid, real-looking portraits on testimonials. No stock "handshake" photos.
- **Product imagery:** clean device mockups showing real-looking data.
- **Hierarchy:** a big question as H1, H2s written as full statements, short H3 card titles. It has lots of vertical whitespace and alternating full-width sections.
- **Buttons** *(inferred)*: rounded or pill-shaped primary CTAs, with one strong primary style used everywhere.

## 4. Copy and tone

- Second person, warm and reassuring: "You're not alone." "You're next."
- **Sells outcomes, not features:** less stress, freedom, confidence.
- **Reframes the problem:** money is a skill you can learn, not a personal failing.
- Light, self-aware humour, used sparingly.
- One tagline repeated at the top and bottom of the page.
- Microcopy next to CTAs removes friction ("No credit card required").

## 5. Trust and conversion patterns

1. A logo and rating strip directly under the hero.
2. Big-number stats with an honest footnote.
3. Named testimonials with tenure ("member since…").
4. A founder quote that gives the brand a human voice.
5. Self-segmentation by goal ("I want to…" cards).
6. A primary CTA plus a softer secondary CTA ("Browse features") for visitors who aren't ready.
7. A 3-step onboarding promise that makes the effort feel small.

---

## 6. What to adopt for our Expense Tracker

Our app is a single-page tool, not a sales site, so the patterns below are adapted for that. They also respect [direction.md](direction.md): one accent colour, no gradients, real numbers, tabular numerals and ৳ Taka.

### Keep our current theme

| Token | Value | Role |
|-------|-------|------|
| `paper` | `#0c2318` | Page background (dark forest green) |
| `card` | `#13301f` | Cards and panels |
| `ink` | `#e8f3ec` | Primary text |
| `mute` | `#9dbcaa` | Secondary text |
| `line` | `#24503a` | Borders |
| `accent` | `#8fe3a8` / focus `#a6ecbb` | The single accent |
| `danger` | `#f07a6a` | Errors, over budget |
| Font | Figtree 400–700 | One family, tabular numerals for money |

YNAB's lesson is to use **one confident accent** and **warm, friendly** touches, not to change our colours.

### High-value additions (in priority order)

1. **Monthly budget per category with progress bars.** This is YNAB's core idea. Show "৳4,200 of ৳6,000 spent" with a bar that turns `danger` above 100%.
2. **Savings goals card.** For example "Eid shopping ৳10,000" with a progress bar. A new small data model: `{ id, name, target, saved }`.
3. **"This month at a glance" hero.** Replace a generic header with a plain-language summary that uses real numbers: *"You've spent ৳18,450 this month. ৳3,200 less than last month."* This is the in-app version of YNAB's outcome-first hero.
4. **Stat tiles in YNAB's big-number style:** one large number and one short caption each. For example, total spent, daily average, biggest category, and days left in the month.
5. **Empty state with a 3-step start,** reusing the "it takes 20 minutes" idea: *1. Add your first expense → 2. Set a monthly budget → 3. Watch your month take shape.*
6. **Reports view:** average spend per category over months (bar chart) next to the existing doughnut.
7. **Category templates:** a "Student", "Family" or "Single" preset that fills in budgets on first load.
8. **Friendly microcopy:** short, second-person and calm. *"Nice, you're under budget on Food this week."* No emoji walls.

### Visual touches to borrow (within our rules)

- Consistent **outline icons** for categories (for example, Lucide icons via CDN) in place of plain dots.
- Big, bold numbers with small muted captions for every stat.
- One rounded primary button style, used for "Add expense" everywhere.
- Generous vertical spacing between sections, and thin borders rather than shadows.
- A subtle "member since"-style detail, such as *"Tracking since Jan 2026"*, from the first expense date.

### Skip

- Press strips, testimonials, pricing and free-trial CTAs. They're marketing and don't fit a personal tool.
- Heavy illustrations and blob shapes. They conflict with our no-decoration rule.
- Bank-connection features. We have no backend.

---

## 7. Suggested page layout after the changes

```
┌──────────────────────────────────────────────────────────┐
│ Header: App name · Month picker · [ + Add expense ]      │
├──────────────────────────────────────────────────────────┤
│ "You've spent ৳18,450 this month — ৳3,200 less than Oct"  │
├──────────┬──────────┬──────────┬─────────────────────────┤
│ Total    │ Daily avg│ Biggest  │ Days left               │
├──────────┴──────────┴──────────┴─────────────────────────┤
│ Budgets by category (progress bars)  │ Savings goals     │
├──────────────────────────────────────┴───────────────────┤
│ Charts: doughnut by category │ bar by day/month          │
├──────────────────────────────────────────────────────────┤
│ Filters bar                                              │
├──────────────────────────────────────────────────────────┤
│ Expense list (table on desktop / cards on mobile)        │
└──────────────────────────────────────────────────────────┘
```
