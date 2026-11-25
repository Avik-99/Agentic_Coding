# Expense Tracker: Plan

A personal expense tracker. Frontend only: HTML, CSS, JavaScript, Tailwind via CDN. Data lives in the browser (`localStorage`), so there is no backend.

## Goals

1. Add expenses: date, category, amount, description.
2. Edit and delete existing expenses.
3. Filter by category, date range, and amount range.
4. Summary: total spent, average per category, charts.

## File structure

```
Expense_Sheet/
├── index.html      # markup + Tailwind CDN
├── app.js          # state, rendering, events
├── style.css       # small custom touches Tailwind doesn't cover
├── direction.md    # this plan
└── Promt/          # saved prompts
```

No build step. Open `index.html` and it works.

## Data model

```js
{
  id: string,          // crypto.randomUUID()
  date: "YYYY-MM-DD",
  category: string,    // Food, Transport, Rent, Bills, Shopping, Health, Fun, Other
  amount: number,      // > 0, 2 decimals
  description: string
}
```

Stored as a JSON array under one `localStorage` key. Load on start, save after every change.

## Layout (single page)

- **Header**: app name and the current month's total.
- **Summary strip**: three stat cards (Total spent, Average per category, Biggest category).
- **Charts**: a doughnut chart (spend by category) and a bar chart (spend per month or per day in the filtered range).
- **Filters bar**: category dropdown, from/to dates, min/max amount, and a Clear button.
- **Expense list**: table on desktop, stacked cards on mobile. Each row has Edit and Delete.
- **Add/Edit form**: a modal opened by a prominent "Add expense" button. The same form is reused for editing.

## Behavior

- **Add**: validate (amount > 0, date required, category required), then prepend to the list.
- **Edit**: the form opens prefilled. Saving replaces the record with the same `id`.
- **Delete**: confirm first, then remove. Offer a short "Undo" toast.
- **Filters**: combine with AND logic. They apply live as the user types. The list, summary, and charts all reflect the filtered set.
- **Summary**: total = sum of the filtered set. Average per category = total ÷ number of categories that have expenses. The doughnut and bar charts redraw on every change.
- **Empty states**: a friendly message when there are no expenses or no filter matches.
- Sort by date, newest first. Column header click can toggle date/amount sort (optional).

## Design direction (simple, engaging, no "AI slop")

- One calm neutral base (warm off-white, near-black text) and **one** accent colour. Categories get muted, distinct colours used only in charts and small dots.
- No gradients, glassmorphism, emoji-stuffed headings, or generic hero blurbs. Real labels, real numbers.
- One typeface family, clear size hierarchy, tabular numerals for money so columns line up.
- Generous spacing, thin borders instead of heavy shadows.
- Small, purposeful motion only: modal fade, toast slide, chart transitions.
- Accessible: labelled inputs, visible focus rings, keyboard-closable modal (Esc), sufficient contrast.
- Responsive: usable at phone width.

## Charts

Use Chart.js from CDN (small, reliable). Colours come from the same category palette as the list dots, so the legend and rows match.

## Build steps

1. Scaffold `index.html` with Tailwind and Chart.js CDN links and the page skeleton.
2. Write the state layer in `app.js`: load, save, add, update, delete.
3. Build the form modal with validation. Wire add and edit.
4. Render the list, with delete, undo, and empty states.
5. Add filters and connect them to the list.
6. Compute summary stats and render the charts from the filtered set.
7. Polish: responsive layout, focus states, spacing, seed a few sample expenses for first load (removable).
8. Manual test pass: add, edit, delete, each filter alone and combined, empty states, page reload persistence, narrow screen.

## Decisions to confirm before building

- **Currency symbol**: default `$`. Say if you want something else (for example `৳`).
- **Categories**: the fixed list above. Should users be able to add their own?
- **Bar chart axis**: by month or by day? Default is by month, switching to by day when the filtered range is under about 45 days.
