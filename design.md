# Design System — Personal Portfolio

> **Reference:** the visual language is modelled on [rameerez.com](https://rameerez.com/) (WordPress theme "orangito", Tailwind v4).
> We borrow the *design system* — tokens, type scale, component styles. We do **not** copy that site's text, photos, logos, illustrations or branding; all content here is our own.

---

## 1. Concept: "the portfolio is a piece of hardware"

The whole page is styled like a physical device / synth / rack unit:

- Sections are **plates** — warm-grey panels with a subtle grain texture, soft inset highlight and drop shadow, sitting on a slightly darker **body** background.
- Labels are **silkscreen print** — tiny, uppercase, widely tracked text, like the markings printed on a device.
- Section headers are **strips** — a bar with an **orange number tab** (`01`, `02`…), the section name, and a studded texture filling the rest.
- Buttons are **keys** — chunky dark keycaps with a pressed state.
- Round icon links are **knobs**; small round icon holders are **seats** (recessed sockets).
- A single loud accent — **signal orange** — is used sparingly for numbers, primary actions and focus rings.

**Tone:** minimal, tactile, industrial, confident. Lots of whitespace inside plates, very bold display headings, small precise labels.

---

## 2. Color tokens

| Token | Value | Use |
|---|---|---|
| `--color-orange` | `#fa5b01` | Accent: number tabs, primary key, focus outline, `theme-color` |
| `--color-orange-deep` | `#d44d00` | Pressed / track of switches |
| `--color-orange-soft` | `#ff8a3d` | Soft highlights |
| `--color-on-orange` | `#0a0a0a` | Text on orange |
| `--color-ink` | `#0a0a0a` | Strongest text, headings |
| `--color-graphite` | `#303032` | Default key / knob face |
| `--color-slate` | `#646568` | Secondary UI grey |
| `--color-steel` | `#8a8a8c` | Tertiary grey |
| `--color-groove` | `#cdccc7` | Borders, dividers between rows |
| `--color-body` | `#e2e1dd` | **Page background** |
| `--color-plate` | `#f3f2ef` | **Panel/card surface** |
| `--color-paper` | `#ffffff` | Pure white (reading pages) |
| `--color-paper-warm` | `#fef6ea` | Warm highlight surface |
| `--color-on-dark` | `#ffffff` | Text on graphite |

Text is ink with opacity, not separate greys:

| Token | Value |
|---|---|
| `--color-text-strong` | `#0a0a0a` (100%) |
| `--color-text` | `#0a0a0a` @ 85% → `#0a0a0ad9` |
| `--color-text-muted` | `#0a0a0a` @ 60% → `#0a0a0a99` |
| `--color-text-faint` | `#0a0a0a` @ 42% → `#0a0a0a6b` |
| `--color-link-underline` | `#0a0a0a` @ 30% → `#0a0a0a4d` |
| `--color-rule` (hairlines) | `#0a0a0a` @ 12% → `#0a0a0a1f` |

There is **no dark mode** on the reference site — light only.

---

## 3. Typography

Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Inter+Tight:wght@500;600;700;800;900&family=Zalando+Sans+Expanded:ital,wght@0,200..900;1,200..900&display=swap">
```

| Role | Stack | Notes |
|---|---|---|
| **Display** (headings, labels, buttons) | `"Zalando Sans Expanded", "Inter Tight", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Wide, heavy (800) |
| **Body / UI** | `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `font-feature-settings: "ss01", "cv11"` |
| **Mono / figures** | `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", "Courier New", monospace` | Numbers, dates, codes — `tabular-nums` |
| **Long-form reading** | `"SF Pro Display", -apple-system, system-ui, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif` | Blog/article pages |

### Type scale

| Element | Font | Size (mobile → ≥40rem → ≥64rem) | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| `h1.display-1` (hero) | Display | `2.5rem → 3.5rem → 4.25rem` | 800 | 1.02 | `-0.05em` |
| `h2.pitch-title` (big section title) | Display | `2.25rem → 3rem → 3.5rem` | 800 | 1.04 | `-0.05em` |
| Card title (`.product-name`) | Display | `1.125rem → 1.25rem` | 800 | 1.25 | `-0.025em` |
| Body | Inter | `1rem` | 400 | 1.625 | normal |
| Small / secondary | Inter | `0.875rem` | 400 | 1.375 | normal |
| **Silk label** (`.silk`) | Display | `0.6875rem` (11px) | 500 (700 for `--strong`) | 1.25 | `0.11em`, UPPERCASE |
| Silk small (`.silk--sm`) | Display | `0.59375rem` (9.5px) | 500 | 1.25 | `0.11em`, UPPERCASE |
| Figures / numbers | Mono | inherit | 600 | — | `0` / `0.04em` |

Other tracking tokens: `--tracking-cap: .06em`, `--tracking-cap-wide: .14em`.

---

## 4. Spacing, layout & shape

**Base unit:** `--spacing: 0.25rem` (4px) — Tailwind scale.

| Token | Value | Use |
|---|---|---|
| `--container-rack` | `86rem` (1376px) | Max page width |
| `--container-reading` | `48rem` (768px) | Max width of article text |
| `--spacing-gutter` | `clamp(.625rem, 1.6vw, 1.25rem)` | Page side padding **and** gap between plates |
| `--spacing-plate` | `clamp(1.25rem, 4.2vw, 3.75rem)` | Inner padding of plates |
| `--spacing-card` | `clamp(1rem, 2.4vw, 1.5rem)` | Inner padding of cards/rows on small screens |
| `--spacing-knob` | `clamp(3.25rem, 17vw, 4.5rem)` | Knob diameter |
| `--spacing-pitch` | `0.75rem` | Stud texture grid |
| `--spacing-screw` / `--spacing-screw-head` | `.75rem` / `1.375rem` | Decorative corner screws on plates |
| `--spacing-masthead` | `2.75rem` | Header height |

**Layout:** `.rack` = a single-column CSS grid, `max-width: var(--container-rack)`, `gap` and `padding-inline` = gutter, centered. Every section is a full-width plate stacked in that rack. Inside plates, use 2-column grids at larger widths (e.g. hero `grid-template-columns: 1fr 1.05fr`, gap `2rem → 3.5rem`).

**Breakpoints (mobile-first, `min-width`):** `40rem` (640px), `48rem` (768px), `64rem` (1024px), `80rem` (1280px), `96rem` (1536px). Also use `@media (hover:hover)` for hover effects and respect `prefers-reduced-motion: reduce`.

**Radii**

| Token | Value | Use |
|---|---|---|
| `--radius-plate` | `0.625rem` | Plates/sections |
| `--radius-lg` / `--radius-md` | `0.5rem` / `0.375rem` | General |
| `--radius-key` | `0.25rem` | Buttons |
| `--radius-cell` | `0.125rem` | Thumbnails, tiny badges |
| pill | `9999px` | Knobs, seats, avatar, switch |

**Shadows**

```css
--shadow-plate:   inset 0 1px 0 #ffffffe6, 0 1px 0 #0000001a, 0 14px 28px -22px #00000073;
--shadow-key:     0 0 0 2px #000000b8, inset 0 1px 0 #ffffff47, inset 0 -2px 0 #00000038;
--shadow-key-pressed: 0 0 0 2px #000000b8, inset 0 2px 3px #00000059;
--shadow-recess:  inset 0 1px 2px #00000038, 0 1px 0 #fffc;   /* sockets, inputs, thumbnails */
```

**Grain texture** — an inline SVG `feTurbulence` noise tile (200×200), applied to `body` and `.plate` with `background-size: 12.5rem; background-blend-mode: soft-light`.

---

## 5. Components

### Plate (section panel)
```css
.plate {
  position: relative;
  border-radius: var(--radius-plate);
  background-color: var(--color-plate);
  box-shadow: var(--shadow-plate);
  background-image: var(--texture-grain);
  background-size: var(--spacing-grain) var(--spacing-grain);
  background-blend-mode: soft-light;
}
```
Optional: small decorative "screws" in the corners.

### Strip (section header bar)
A bar on top of a plate: **orange number tab → section name → studded filler → optional note**.
```css
.strip      { display:flex; align-items:stretch; min-height:2.25rem; overflow:hidden;
              border-bottom:1px solid var(--color-groove);
              border-radius: var(--radius-plate) var(--radius-plate) 0 0; }
.strip-no   { display:grid; place-items:center; min-width:2.75rem; padding-inline:.75rem;
              background:var(--color-orange); color:var(--color-on-orange);
              font-family:var(--font-mono); font-size:var(--text-silk); font-weight:600; letter-spacing:.04em; }
.strip-name { display:flex; align-items:center; padding-inline:.875rem; margin:0; }  /* + .silk.silk--strong */
.strip::after { content:""; flex:1; /* repeating radial-gradient "studs", 0.75rem pitch */ }
.strip-note { border-left:1px solid var(--color-groove); padding-inline:.875rem; /* shown ≥40rem */ }
```
Example: `[01] SELECTED PROJECTS ::::::::::: 3 OF 12`

### Silk label
```css
.silk { font-family:var(--font-display); font-size:.6875rem; line-height:1.25; font-weight:500;
        letter-spacing:.11em; text-transform:uppercase; color:var(--color-text-muted); }
.silk--strong { font-weight:700; color:var(--color-text-strong); }
```
Used for: section names, meta labels, codes like `PRJ–01 2025`, "As featured in", captions (`FIG. 1`).

### Key (button)
```css
.key { --key-face:var(--color-graphite); --key-print:var(--color-on-dark);
       display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
       min-height:2.5rem; padding-inline:1rem; border:0; border-radius:var(--radius-key);
       background:var(--key-face); color:var(--key-print); box-shadow:var(--shadow-key);
       font-family:var(--font-display); font-weight:700; font-size:.6875rem;
       letter-spacing:.11em; text-transform:uppercase; line-height:1; white-space:nowrap;
       transition: transform 80ms ease-out, box-shadow 80ms ease-out, background-color .12s, color .12s; }
.key:active          { box-shadow:var(--shadow-key-pressed); transform:translateY(1px); }
.key:focus-visible   { outline:2px solid var(--color-orange); outline-offset:4px; }
.key svg             { width:.875rem; height:.875rem; stroke-width:2.25px; transition:transform .2s; }
.key:hover svg       { transform:translateX(3px); }   /* arrow nudges right */
.key--orange         { --key-face:var(--color-orange); --key-print:var(--color-on-orange); }
.key--orange:hover   { --key-face:var(--color-graphite); --key-print:var(--color-on-dark); }
```

### Knob (round icon link, e.g. "open project")
Graphite circle, `var(--spacing-knob)` diameter, white icon, layered shadow
`inset 0 0 0 1px #00000029, inset 0 1.5px .5px #ffffff8c, .25rem .6rem .9rem -.35rem #0000008c, .05rem .15rem .2rem #00000047`,
with a small indicator notch at the top that rotates on hover (`transition: transform .38s cubic-bezier(.3,1.5,.5,1)`).

### Seat (recessed icon socket)
`2rem` circle, `background: var(--color-plate)`, `box-shadow: var(--shadow-recess)`, ink icon; background/color transition `.12s`.

### Tab (orange link tab inside a strip)
Orange background, display font 700, `.6875rem`, `.11em` tracking, uppercase, `padding-inline: .875rem`.

### Switch (toggle)
Track `2.5rem × 1.375rem`, `background: var(--color-orange-deep)`, `box-shadow: inset 0 1px 2px #0006`; thumb is an orange circle with `inset 0 1px #ffffff73, 0 1px 2px #00000073`, moves with `transform .18s cubic-bezier(.3,1.4,.5,1)`.

### Project card (`.product`)
CSS grid areas `"top top" "mark mark" "name go" "does go"`, `min-height: 21rem`, padding `1.25rem 1.5rem 1.5rem` (→ `1.25rem 2rem 1.75rem` on desktop).
- **top:** silk code + year, e.g. `PRJ–01 · 2025`
- **mark:** project logo/icon centered, `3.5rem` → `7rem` square
- **name:** display font 800, `1.125–1.25rem`, tight tracking
- **does:** one-line description, `0.875rem`, muted
- **go:** a knob linking to the project

### Thumbnail shelf (`.shelf-item`)
Small project thumbnails `3.75rem × 2.35rem`, `border-radius: var(--radius-cell)`, `box-shadow: var(--shadow-recess)`, `opacity: .75` → `1` on hover (`.15s`).

### List row (`.post-row`) — blog posts / experience / anything chronological
```css
.post-row { display:grid; grid-template-columns:auto minmax(0,1fr) auto; align-items:center;
            column-gap:1.25rem; /* 2rem on desktop */
            padding:1.125rem var(--spacing-plate); border-bottom:1px solid var(--color-groove);
            color:var(--color-ink); text-decoration:none; transition:background-color .16s; }
```
Columns: **date** (mono, `2025 NOV`) · **title + excerpt** · **arrow**. Whole row is one link.

### Avatar
`1.75rem` circle, `object-fit: cover`, `box-shadow: 0 0 0 1.5px var(--color-ink)`.

### Links
Inherit color; inside prose use ink text with an underline in `--color-link-underline` (30% ink).

### Inputs (newsletter / contact)
Inline row: input `flex: 1` + submit key, `min-height: 2.75rem`; input styled as a recessed slot (`--shadow-recess`, plate background).

---

## 6. Page structure (for our portfolio)

Header sits absolutely on top of the first plate (`.site-header`, `z-index: 40`): avatar + handle on the left, text nav (About · Projects · Blog · Contact) on the right.

1. **Hero plate** — 2-column grid: left = `display-1` greeting ("Hi, I'm …"), short bio, primary `key--orange` CTA + secondary links; right = portrait / illustration (`width: min(100%, 27rem)` → `42rem` on desktop).
2. **Social proof strip** (optional) — silk label "As featured in" / "Worked with" + row of grayscale logos.
3. **`01` Selected projects** — strip with note `3 OF N`; 3 featured project cards in a grid; below, a shelf of small thumbnails + "See all projects" link.
4. **`02` About** — `pitch-title` heading, short story, bullet list of highlights, photo with silk caption `FIG. 1 — …`.
5. **`03` Skills / Experience** — post-row style list: years (mono) · role/company · arrow.
6. **`04` Writing** (optional) — post-row list of latest posts + "See all posts" key.
7. **Contact plate** — email key + social links as seats (GitHub, LinkedIn, X, …).
8. **Footer** — on `--color-body`, silk text `© 2026 · Your Name`.

Sections are separated only by the rack gap (`--spacing-gutter`) — never by hairlines.

---

## 7. Motion & interaction

- Default transition: `150ms cubic-bezier(.4, 0, .2, 1)`.
- Color changes: `.12s`; keys press `80ms ease-out` + `translateY(1px)`.
- Springy UI (knob notch, switch thumb): `cubic-bezier(.3, 1.4–1.5, .5, 1)`.
- Arrow icons nudge `3px` right on hover; thumbnails go from 75% → 100% opacity.
- Focus: `outline: 2px solid var(--color-orange); outline-offset: 3–4px` everywhere.
- `html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }`
- Wrap hover effects in `@media (hover:hover)`; disable motion under `prefers-reduced-motion: reduce`.

---

## 8. Starter `:root`

```css
:root {
  /* color */
  --color-orange:#fa5b01; --color-orange-deep:#d44d00; --color-orange-soft:#ff8a3d;
  --color-on-orange:#0a0a0a; --color-on-dark:#fff;
  --color-ink:#0a0a0a; --color-graphite:#303032; --color-slate:#646568; --color-steel:#8a8a8c;
  --color-groove:#cdccc7; --color-body:#e2e1dd; --color-plate:#f3f2ef;
  --color-paper:#fff; --color-paper-warm:#fef6ea;
  --color-text-strong:#0a0a0a; --color-text:#0a0a0ad9; --color-text-muted:#0a0a0a99;
  --color-text-faint:#0a0a0a6b; --color-link-underline:#0a0a0a4d; --color-rule:#0a0a0a1f;

  /* type */
  --font-display:"Zalando Sans Expanded","Inter Tight","Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  --font-sans:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  --font-mono:ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono","Courier New",monospace;
  --weight-display:800; --weight-label:700; --weight-silk:500;
  --text-silk:.6875rem; --text-silk-sm:.59375rem;
  --tracking-display:-.05em; --tracking-silk:.11em;

  /* space & shape */
  --spacing:.25rem;
  --container-rack:86rem; --container-reading:48rem;
  --spacing-gutter:clamp(.625rem,1.6vw,1.25rem);
  --spacing-plate:clamp(1.25rem,4.2vw,3.75rem);
  --spacing-card:clamp(1rem,2.4vw,1.5rem);
  --spacing-knob:clamp(3.25rem,17vw,4.5rem);
  --spacing-pitch:.75rem; --spacing-grain:12.5rem;
  --radius-plate:.625rem; --radius-key:.25rem; --radius-cell:.125rem;

  /* depth */
  --shadow-plate:inset 0 1px 0 #ffffffe6,0 1px 0 #0000001a,0 14px 28px -22px #00000073;
  --shadow-key:0 0 0 2px #000000b8,inset 0 1px 0 #ffffff47,inset 0 -2px 0 #00000038;
  --shadow-key-pressed:0 0 0 2px #000000b8,inset 0 2px 3px #00000059;
  --shadow-recess:inset 0 1px 2px #00000038,0 1px 0 #fffc;
}

body {
  background: var(--color-body);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-feature-settings: "ss01", "cv11";
  line-height: 1.625;
}
```
