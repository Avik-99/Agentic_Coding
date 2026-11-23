# Playlist Hub: Style Guide

Design system for Playlist Hub, taken from the homepage reference image (`playlist-hub-homepage.png`, 3840 × 2160, a 1920 × 1080 layout rendered at 2×). All pixel values are **logical px at 1920 × 1080**.

**Value labels used in both documents**

| Label | Meaning |
|---|---|
| **[R]** | Taken from the reference image. |
| **[E]** | Estimated: visible in the reference, but the exact value is rounded or normalized. |
| **[I]** | Inferred: not visible in the reference. Decided here so the design works for the product's requirements. |
| **[A]** | Accessibility adjustment: a small change to a reference value so that text contrast meets WCAG AA. |

---

## 1. Design Philosophy

1. **Content first.** Video thumbnails are the most colorful thing on screen. The interface around them stays neutral and dark, so the thumbnails carry the color.
2. **One accent.** Violet is used only for primary actions, the selected state, progress and links. No second accent color competes with it.
3. **Calm surfaces.** Depth comes from layered near-black surfaces and 1 px hairline borders, not heavy shadows. Violet glow is used only for emphasis: the primary button, the hovered card and the welcome panel.
4. **Large and readable.** Body text is 15–19 px, card titles 18–20 px and section titles 26 px. Nothing that people need to read is smaller than 13 px.
5. **Tactile but restrained.** Corners are rounded (12–26 px), hover gives a small lift, and transitions are short. Nothing is purely decorative.

## 2. Visual Direction

| Aspect | Direction |
|---|---|
| Genre | A premium dark media app (streaming library), not an admin dashboard. [R] |
| Mood | Night-time, focused, quietly polished. [R] |
| Contrast model | Light text on a near-black page, with surfaces that get a step lighter as they rise (page → sidebar → card → control). [R] |
| Color use | Neutral UI, violet accent, full-color thumbnails. Each playlist also gets a small color dot as an identifier. [R] |
| Type | Inter for text and Inter Display for headings. Sans-serif only. No serif or editorial fonts anywhere. [R] |
| Gradients | Allowed in only four places: the logo mark, the primary button, the welcome panel's glow and the welcome headline's second line. Use nowhere else. [R] |

---

## 3. Color System

### 3.1 Primary (accent): violet

| Token | Value | Use | Label |
|---|---|---|---|
| `--color-accent` | `#8b5cf6` | Progress fill, active indicators, focus rings, solid accent fills | [R] |
| `--color-accent-strong` | `#7c3aed` | Bottom of the primary button gradient, logo gradient end, pressed state | [R] |
| `--color-accent-soft` | `#a78bfa` | Accent text and links ("View all", "Resume · 14:20 left"), the icon in the active nav item, the dashed Create border | [R] |
| `--color-accent-tint` | `#c4b5fd` | Start of the welcome headline's text gradient | [R] |
| `--color-accent-bg` | `rgba(139, 92, 246, 0.14)` | Background of the active nav item and selected list row | [R] |
| `--color-accent-ring` | `rgba(139, 92, 246, 0.25)` | 1 px inset outline on active nav, outer ring on hovered card | [R] |
| `--color-accent-glow` | `rgba(139, 92, 246, 0.18)` | Large soft glow behind a hovered card | [R] |

Primary button gradient: reference `#9466f8 → #7c3aed` (top to bottom) **[R]**. Implement it as `#8b5cf6 → #6d28d9` **[A]**, so that white text is ≥ 4.2:1 at the top and ≥ 5:1 on average. It looks almost the same.

### 3.2 Secondary colors

The playlist identity colors appear as 8 px dots in the playlist card tags. Assign them in order to new playlists. They are never used for text or controls.

| Token | Value | Label |
|---|---|---|
| `--playlist-violet` | `#8b5cf6` | [R] |
| `--playlist-sky` | `#38bdf8` | [R] |
| `--playlist-orange` | `#f97316` | [R] |
| `--playlist-teal` | `#2dd4bf` | [R] |
| `--playlist-pink` | `#f472b6` | [I] |
| `--playlist-lime` | `#a3e635` | [I] |

### 3.3 Background colors

| Token | Value | Use | Label |
|---|---|---|---|
| `--bg-app` | `#09090d` | Page background and main content area | [R] |
| `--bg-sidebar` | `#0d0e14` | App sidebar | [R] |
| `--bg-overlay` | `rgba(4, 5, 8, 0.72)` plus 6 px backdrop blur | Behind modals | [I] |
| `--bg-header` | `--bg-app` at 88% opacity plus 12 px backdrop blur, applied once content scrolls under the header | Sticky header | [I] |

### 3.4 Surface colors (in elevation order)

| Token | Value | Use | Label |
|---|---|---|---|
| `--surface-1` | `#14151d` | Cards (playlist, continue watching, storage), search field, icon buttons, sort control | [R] |
| `--surface-2` | `#1b1c26` | Secondary buttons, count chips, card play button at rest, dropdown menus | [R] |
| `--surface-3` | `#242533` | Keyboard-shortcut chip, progress and storage tracks, hover on `--surface-2`, skeletons | [R] |
| `--surface-inset` | `rgba(9, 9, 13, 0.70)` | Inputs placed on top of the welcome panel | [R] |
| `--surface-scrim` | `rgba(9, 9, 13, 0.62)` | "+N" overlay on a collage tile | [R] |
| `--surface-badge` | `rgba(0, 0, 0, 0.78)` | Duration badges on thumbnails | [R] |
| `--surface-tag` | `rgba(9, 9, 13, 0.75)` plus 6 px backdrop blur | "Updated …" tag on top of a thumbnail | [R] |

### 3.5 Text colors

| Token | Value | Contrast on `--surface-1` | Use | Label |
|---|---|---|---|---|
| `--text-primary` | `#f4f4f7` | 16.6:1 | Headings, titles, button labels | [R] |
| `--text-strong-2` | `#d6d7e0` | 12.7:1 | Sidebar playlist names | [R] |
| `--text-body` | `#b4b6c6` | 9.1:1 | Welcome-panel body text, long descriptions | [R] |
| `--text-secondary` | `#9b9db0` | 6.8:1 | Metadata, dates, counts, nav items at rest, placeholders in the search field | [R] |
| `--text-tertiary` | `#80839a` | 4.9:1 | Sidebar counts, section labels ("My playlists"), kebab icons, input placeholders | [A] (reference `#6c6e80` is 3.6:1) |
| `--text-on-accent` | `#ffffff` | — | Text on the primary button, the active play button and danger buttons | [R] |
| `--text-link` | `#a78bfa` | 6.7:1 | Links and accent text | [R] |

### 3.6 Border colors

| Token | Value | Use | Label |
|---|---|---|---|
| `--border-subtle` | `rgba(255, 255, 255, 0.07)` | All card, control and divider hairlines | [R] |
| `--border-input` | `rgba(255, 255, 255, 0.10)` | Inputs on the welcome panel | [R] |
| `--border-hover` | `rgba(255, 255, 255, 0.14)` | Hover on cards and controls | [I] |
| `--border-accent` | `rgba(167, 139, 250, 0.45)` | Hovered or selected playlist card | [R] |
| `--border-hero` | `rgba(167, 139, 250, 0.16)` | Welcome panel | [R] |
| `--border-dashed-accent` | 1.5 px dashed `rgba(167, 139, 250, 0.40)` | "Create playlist" entry in the sidebar | [R] |
| `--thumb-ring` | `rgba(255, 255, 255, 0.08)` | 1 px ring on floating thumbnails | [R] |

### 3.7 Semantic colors

The reference shows no semantic states, so these are all **[I]**. They are chosen to sit comfortably beside the violet accent.

| Token | Text / icon | Solid fill (white text) | Tint background | Use |
|---|---|---|---|---|
| `--color-danger` | `#ff6b70` | `#d93a42` (white 4.5:1) | `rgba(217, 58, 66, 0.14)` | Delete and remove actions, unavailable video, errors |
| `--color-success` | `#34d399` | `#059669` | `rgba(52, 211, 153, 0.12)` | Video added, playlist saved |
| `--color-warning` | `#fbbf24` | `#b45309` | `rgba(251, 191, 36, 0.12)` | Storage nearly full, duplicate link |
| `--color-info` | `#38bdf8` | `#0284c7` | `rgba(56, 189, 248, 0.12)` | Neutral notices |
| `--color-youtube` | `#ff5a5f` | — | — | YouTube glyph in link inputs only [R] |

### 3.8 Token sheet

```css
:root {
  color-scheme: dark;
  /* accent */
  --color-accent: #8b5cf6;  --color-accent-strong: #7c3aed;
  --color-accent-soft: #a78bfa;  --color-accent-tint: #c4b5fd;
  --color-accent-bg: rgba(139,92,246,.14);  --color-accent-ring: rgba(139,92,246,.25);
  --color-accent-glow: rgba(139,92,246,.18);
  --gradient-primary: linear-gradient(180deg, #8b5cf6, #6d28d9);
  --gradient-logo: linear-gradient(140deg, #a78bfa, #7c3aed);
  --gradient-headline: linear-gradient(90deg, #c4b5fd, #8b5cf6);
  /* backgrounds & surfaces */
  --bg-app: #09090d;  --bg-sidebar: #0d0e14;
  --surface-1: #14151d;  --surface-2: #1b1c26;  --surface-3: #242533;
  --surface-inset: rgba(9,9,13,.70);  --surface-scrim: rgba(9,9,13,.62);
  --surface-badge: rgba(0,0,0,.78);  --surface-tag: rgba(9,9,13,.75);
  --bg-overlay: rgba(4,5,8,.72);
  /* text */
  --text-primary: #f4f4f7;  --text-strong-2: #d6d7e0;  --text-body: #b4b6c6;
  --text-secondary: #9b9db0;  --text-tertiary: #80839a;  --text-link: #a78bfa;
  /* borders */
  --border-subtle: rgba(255,255,255,.07);  --border-input: rgba(255,255,255,.10);
  --border-hover: rgba(255,255,255,.14);  --border-accent: rgba(167,139,250,.45);
  /* semantic */
  --color-danger: #ff6b70;  --color-danger-solid: #d93a42;
  --color-success: #34d399; --color-warning: #fbbf24; --color-info: #38bdf8;
}
```

---

## 4. Typography System

### 4.1 Font families

| Token | Stack | Use | Label |
|---|---|---|---|
| `--font-display` | `"Inter Display", "Inter", system-ui, sans-serif` | Logo, page and section headings, card titles (h1–h4) | [R] |
| `--font-text` | `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | Everything else | [R] |

Inter Display is the optical-size cut of Inter (Inter 4.0 or later, or variable Inter with `opsz`). If it isn't available, Inter alone is acceptable. **Never use serif, slab, editorial or monospace faces.** Keyboard chips also use Inter.

### 4.2 Weights

| Token | Value | Use |
|---|---|---|
| `--fw-regular` | 400 | Rarely used: long text only |
| `--fw-medium` | 500 | Nav items, sidebar rows, metadata, placeholders |
| `--fw-semibold` | 600 | Buttons, card titles, links, chips, tags, badges |
| `--fw-bold` | 700 | Page title, section titles, "+N" overlays |
| `--fw-extrabold` | 800 | Logo wordmark, welcome headline |

### 4.3 Type scale

| Token | Size / line-height | Weight | Letter-spacing | Font | Use | Label |
|---|---|---|---|---|---|---|
| `--text-hero` | 46 / 1.06 | 800 | −0.02em | Display | Welcome headline | [R] |
| `--text-page` | 28 / 1.2 | 700 | −0.02em | Display | Header title ("Welcome back"), dialog title uses 24 | [R] |
| `--text-section` | 26 / 1.2 | 700 | −0.02em | Display | Section titles ("Continue watching") | [R] |
| `--text-logo` | 22 / 1.2 | 800 | −0.02em | Display | Wordmark | [R] |
| `--text-card-title` | 20 / 1.25 | 600 | −0.01em | Display | Playlist card name | [R] |
| `--text-lead` | 19 / 1.5 | 400 | 0 | Text | Welcome panel body | [R] |
| `--text-title-sm` | 18 / 1.3 | 600 | 0 | Text | Continue-watching video title, list video title (17) | [R] |
| `--text-ui-lg` | 17 / 1.4 | 500–600 | 0 | Text | Buttons, nav items, input text, search placeholder | [R] |
| `--text-body` | 16 / 1.5 | 500 | 0 | Text | Sidebar rows, links, sort control | [R] |
| `--text-meta` | 15 / 1.45 | 400–500 | 0 | Text | Metadata lines, date, storage title | [R] |
| `--text-small` | 14 / 1.45 | 500–600 | 0 | Text | Chips, section labels, counts, resume line | [R] |
| `--text-micro` | 13 / 1.2 | 600 | 0 | Text | Tags, duration badges, keyboard chips (minimum size) | [R] |

### 4.4 Heading hierarchy

| Level | Token | Example |
|---|---|---|
| Welcome headline (one per page, homepage only) | `--text-hero` | "All your YouTube favourites, organised into playlists." |
| h1, page title in header | `--text-page` | "Welcome back"; on the player page, the playlist name at 36 px [I] |
| h2, section title | `--text-section` | "Continue watching", "My playlists" |
| h3, card title | `--text-card-title` | "Deep Focus Coding" |
| h4, item title | `--text-title-sm` | "Building a Tiny Rust CLI From Scratch" |

Rules: headings use sentence case. No all-caps labels and no tracked capitals. Titles that can run long are limited to 2 lines with an ellipsis. Numbers in counts and durations use `font-variant-numeric: tabular-nums`.

---

## 5. Spacing System

The reference uses a 2 px grid. Normalize it to these tokens. Reference values in brackets show where each token comes from. **[E]**

| Token | Value | Typical use (reference value) |
|---|---|---|
| `--space-1` | 4 | Gap between nav items (4), counter offset |
| `--space-2` | 8 | Icon-to-label gap in small items, badge inset (8) |
| `--space-3` | 12 | Gap between controls in one row (12), logo-to-wordmark (12), sidebar row gap (12) |
| `--space-4` | 16 | Card body padding (16–18), storage-card padding (16) |
| `--space-5` | 20 | Sidebar horizontal padding (20), list header padding |
| `--space-6` | 24 | Card grid gaps (24) |
| `--space-7` | 28 | Header item gap (28), sidebar top padding (28) |
| `--space-8` | 32 | Content top padding (30), section gap (34) |
| `--space-9` | 44 | Main content side padding (44) |
| `--space-10` | 48 | Welcome panel side padding (48) |

Fixed internal values from the reference: collage gap 3 px, collage padding 10 px, gap between continue-watching thumbnail and text 18 px, section-title-to-content 18 px.

---

## 6. Layout and Container Rules

| Rule | Value | Label |
|---|---|---|
| App shell | CSS grid: `288px` sidebar + `1fr` main, filling 100% of the viewport height | [R] |
| Sidebar width | 288 px (≥ 1440), 256 px (1280–1439), 80 px icon rail (1024–1279), drawer below 1024 | [R] / [I] |
| Header height | 92 px, with a 1 px `--border-subtle` bottom border | [R] |
| Main padding | 30 px top, 44 px on the sides | [R] |
| Content width | Fluid. Above 2000 px viewport, cap the main column at 1680 px and centre it | [I] |
| Section rhythm | 34 px between sections, 18 px between a section title and its content | [R] |
| Grids | Continue watching: 3 equal columns, 24 px gap. Playlists: 4 equal columns, 24 px gap | [R] |
| Alignment | All sections share the main column's left and right edges. The section title row puts the title on the left and actions on the right | [R] |
| Column tracks | Always `minmax(0, 1fr)` so long titles never widen the page | [I] |

---

## 7. Border Radius System

| Token | Value | Use | Label |
|---|---|---|---|
| `--radius-xs` | 6 | Duration badges, inner corners of collage tiles | [R] |
| `--radius-sm` | 8 | Thumbnail tags, 28 px sidebar thumbnails, keyboard chip (7) | [R] |
| `--radius-md` | 12 | Nav items, sidebar Create button, logo mark, sort control (11), list-row thumbnails (10) | [R] |
| `--radius-lg` | 14 | Buttons, inputs, search field, icon buttons, storage card, collage outer corners, toasts | [R] |
| `--radius-xl` | 16 | Floating welcome-panel thumbnails, continue-watching thumbnails (13) | [R] |
| `--radius-2xl` | 20 | Continue-watching cards | [R] |
| `--radius-3xl` | 22 | Playlist cards, video player frame, dialogs | [R] |
| `--radius-hero` | 26 | Welcome panel | [R] |
| `--radius-full` | 9999 | Avatar, play buttons, chips, toggles | [R] |

Rule: a nested element's radius is the parent's radius minus the padding between them (for example, the collage tile's outer corner is 14 inside a 22 card with 10 px padding).

---

## 8. Shadows and Elevation

| Level | Token | Value | Use | Label |
|---|---|---|---|---|
| 0 | — | none, plus `--border-subtle` | Cards and controls at rest | [R] |
| 1 | `--shadow-accent-sm` | `0 6px 20px rgba(139,92,246,.45)` | Logo mark, active play button (`.50`) | [R] |
| 2 | `--shadow-accent-md` | `0 8px 24px rgba(124,58,237,.35), inset 0 1px 0 rgba(255,255,255,.20)` | Primary button | [R] |
| 3 | `--shadow-card-hover` | `0 0 0 1px var(--color-accent-ring), 0 18px 50px var(--color-accent-glow)` | Hovered or selected playlist card | [R] |
| 4 | `--shadow-float` | `0 20px 50px rgba(0,0,0,.55), 0 0 0 1px var(--thumb-ring)` | Floating thumbnails, video player frame (`0 24px 60px rgba(0,0,0,.5)`) | [R] |
| 5 | `--shadow-overlay` | `0 30px 80px rgba(0,0,0,.60)` | Dialogs, dropdown menus (`0 16px 40px rgba(0,0,0,.5)`), toasts | [I] |

Rules: neutral cards never get a drop shadow at rest. Shadows show elevation (hover, floating, overlay), never decoration. Violet glow is used only for the primary action and the hovered card.

---

## 9. Iconography Guidelines

| Property | Value | Label |
|---|---|---|
| Style | Outline, 2 px stroke, round caps and joins, `currentColor` (Lucide-compatible) | [R] |
| Library | Lucide. Icons in the reference: `house`, `clock`, `heart`, `plus`, `search`, `settings`, `user`, `lock`, `chevron-right`, `chevron-down`, `more-vertical`, `youtube` (red glyph in inputs) | [E] |
| Sizes | 22 px default (nav, buttons, header). 18 px small (section-label "+", chevrons, storage lock). 15–20 px for the play triangle | [R] |
| Play glyph | A **solid** triangle optically nudged right by 2–4 px. It is the only filled icon | [R] |
| Colors | `--text-secondary` at rest, `--text-primary` on hover, `--color-accent-soft` in the active nav item, white inside accent fills | [R] |
| Containers | Icon-only buttons sit in a 46–52 px square (radius 14) or circle, and always have an `aria-label` | [R] |
| Prohibited | Emoji as icons, duotone or filled icon sets (except the play glyph), mixed stroke widths | [R] |

---

## 10. Component Design Rules

### 10.1 Buttons

| Variant | Height | Padding | Radius | Fill | Text | Border | Label |
|---|---|---|---|---|---|---|---|
| Primary | 52 (58 when paired with a 58 px input) | 0 22 | 14 | `--gradient-primary` | 17 / 600, white | none | [R] |
| Secondary | 52 | 0 22 | 14 | `--surface-2` | 17 / 600, `--text-primary` | `--border-subtle` | [R] |
| Ghost | 52 | 0 22 | 14 | transparent | 17 / 600 | `--border-subtle` | [I] |
| Danger | 52 | 0 22 | 14 | `--color-danger-solid` | 17 / 600, white | none | [I] |
| Dashed create | 50, full width | — | 12 | transparent | 16 / 600, `--color-accent-soft` | `--border-dashed-accent` | [R] |
| Icon button | 52 × 52 (46 × 46 in dense rows) | — | 14 | `--surface-1` | icon 22, `--text-secondary` | `--border-subtle` | [R] |
| Round play | 46 × 46 | — | full | `--surface-2` at rest, `--color-accent` on card hover | white 15 px triangle | `--border-subtle` | [R] |
| Text link | auto | — | — | none | 16 / 600, `--text-link`, followed by an 18 px chevron | none | [R] |

Icon-to-label gap is 10 px. Labels never wrap (`white-space: nowrap`). A button contains at most one icon.

### 10.2 Inputs

| Property | Value | Label |
|---|---|---|
| Height | 54 standard (forms, dialogs), 58 on the welcome panel | [R] / [I] |
| Padding | 0 18 (0 18 0 50 with a leading icon) | [R] |
| Radius | 14 (15 on the welcome panel) | [R] |
| Fill / border | `--surface-1` with `--border-subtle`, or `--surface-inset` with `--border-input` on tinted panels | [R] |
| Text | 17 / 500 `--text-primary`. Placeholder `--text-tertiary`. Never smaller than 16 px (avoids iOS zoom) | [R] |
| Leading icon | 22 px, 12 px gap. YouTube-link inputs use the red `--color-youtube` glyph | [R] |
| Label | Placed above the field, 15 / 600 `--text-secondary`, 8 px gap. Placeholders never replace labels in dialogs | [I] |
| Error | Border `--color-danger`, plus a message below in 14 / 500 `--color-danger` | [I] |

### 10.3 Search field

Width 520 px (fluid, minimum 280), height 52, radius 14, `--surface-1`, `--border-subtle`. It has a 22 px search icon on the left (`--text-secondary`), a 17 px placeholder "Search playlists or videos", and on the right a keyboard chip ("Ctrl K" or "⌘ K"; 13 / 600, padding 3 × 8, radius 7, `--surface-3`). **[R]** The shortcut focuses the field. Results appear in a dropdown (§10.9) grouped as *Playlists* and *Videos*. **[I]**

### 10.4 Navigation items

Height 50, padding 0 14, radius 12, 14 px gap between icon and label, 17 / 500. **[R]**
- Rest: `--text-secondary`, no fill.
- Active: fill `--color-accent-bg`, inset 1 px `--color-accent-ring`, label `--text-primary`, icon `--color-accent-soft`. **[R]**
- Hover: fill `--surface-1`, label `--text-primary`. **[I]**

### 10.5 Sidebar

Background `--bg-sidebar`, 1 px right border, padding 28 × 20, vertical stack: logo → nav (36 px below) → "My playlists" label (34 px below) → playlist rows → Create button (14 px below) → storage card (pinned to the bottom). **[R]** Full specification in DESIGN.md §4.

### 10.6 Cards

| Card | Container | Body | Label |
|---|---|---|---|
| Playlist card | `--surface-1`, `--border-subtle`, radius 22, no padding (collage carries its own 10 px) | Padding 16 18 18. Title, meta, round play button, kebab | [R] |
| Continue-watching card | `--surface-1`, `--border-subtle`, radius 20, padding 14, horizontal flex with 18 px gap | 224 × 126 thumbnail, then title (2 lines max), meta, resume line | [R] |
| Info card (storage) | `--surface-1`, `--border-subtle`, radius 14, padding 16 | Title 15 / 600 with an icon, body 14 `--text-secondary`, 6 px meter | [R] |
| Hero panel | Radius 26, `--border-hero`, dark base with violet radial glow at top right (see DESIGN.md §6.1) | — | [R] |

Card hover: lift by −4 px, border `--border-accent`, `--shadow-card-hover`, play button fills with accent. **[R]** The whole card is clickable. Inner buttons stop the click from also opening the card.

### 10.7 Video thumbnails

| Property | Value | Label |
|---|---|---|
| Aspect ratio | 16:9, `object-fit: cover`, always | [R] |
| Source | `https://i.ytimg.com/vi/{id}/hqdefault.jpg` for large tiles, `mqdefault.jpg` for 132 px or smaller | [I] |
| Radius | Per context (6–16). See DESIGN.md §14 | [R] |
| Duration badge | Bottom-right, 8 px inset, `--surface-badge`, 13 / 600 white, padding 3 × 7, radius 6 | [R] |
| Progress bar | Bottom edge, 5 px, track `rgba(255,255,255,.25)`, fill `--color-accent` | [R] |
| Play overlay (featured) | 64 px circle, `rgba(255,255,255,.92)`, 20 px dark triangle | [R] |
| Placeholder | `--surface-2` fill with a 22 px `film` icon in `--text-tertiary` | [I] |

### 10.8 Modals and confirmation dialogs

**[I]** (not visible in the reference; uses the reference's surface and radius language)

| Property | Value |
|---|---|
| Overlay | `--bg-overlay` plus 6 px backdrop blur, fixed, centred, 16 px safe padding |
| Panel | Width `min(480px, 100%)`, padding 28, radius 22, `--surface-1`, `--border-subtle`, `--shadow-overlay` |
| Title | 24 / 700 Display, −0.01em |
| Body | 17 / 400 `--text-secondary`, 10 px below the title. Name the item in quotes |
| Actions | Right-aligned, 26 px above, 12 px gap: Cancel (ghost), then confirm (primary, or danger for destructive actions) |
| Behaviour | Built in-app. **Never** use `window.confirm`, `alert` or `prompt`. Focus stays inside the dialog. Esc and a backdrop click cancel. Focus returns to the element that opened it. For destructive dialogs the initial focus is on **Cancel** |

### 10.9 Dropdowns

The trigger is visible in the reference (the "Recently updated" sort control): height 40, padding 0 14, radius 11, `--surface-1`, `--border-subtle`, 16 / 500 `--text-secondary`, with an 18 px chevron-down. **[R]**
Menu **[I]**: 8 px below the trigger, aligned to its right edge, minimum width 220, `--surface-2`, `--border-subtle`, radius 14, padding 6, `--shadow-overlay`. Items are 44 high, padding 0 12, radius 10, 16 / 500. Hover fills `--surface-3`. The selected item shows a check icon in `--color-accent-soft`. Destructive items use `--color-danger` text and are separated by a 1 px divider. Kebab menus on cards use the same menu.

### 10.10 Toast notifications

**[I]** Position: bottom centre, 24 px from the bottom (bottom right on screens ≥ 1280 px wide is also acceptable; pick one and use it everywhere). Panel: `--surface-3`, `--border-subtle`, radius 14, padding 14 × 18, `--shadow-overlay`, maximum width 440. Content: 20 px semantic icon, message 16 / 600 `--text-primary`, and an optional text action ("Undo") in `--text-link`. Toasts close after 4 s (6 s if they have an action) and pause while hovered. Use `role="status"`. Show at most 1 at a time; a new toast replaces the old one.

---

## 11. Component Interaction States

| State | Buttons (primary / secondary) | Cards | Inputs / search | Nav items | Icon buttons |
|---|---|---|---|---|---|
| **Default** | As specified in §10.1 [R] | Flat surface, subtle border [R] | Subtle border [R] | Secondary text [R] | Secondary icon [R] |
| **Hover** | Primary: gradient lightens one step (`#9466f8 → #7c3aed`). Secondary: `--surface-3` [I] | Lift −4 px, accent border, accent glow, play button turns accent [R] | Border `--border-hover` [I] | `--surface-1` fill, primary text [I] | `--surface-2` fill, primary icon [I] |
| **Focus (keyboard)** | 3 px outline `--color-accent-soft`, 2 px offset [I] | Same outline on the card's link element [I] | Border `--color-accent-soft` plus 3 px ring `rgba(139,92,246,.30)` [I] | Outline as buttons [I] | Outline as buttons [I] |
| **Active / pressed** | `scale(0.98)`. Primary uses solid `--color-accent-strong` [I] | `translateY(-2px)` [I] | — | Selected uses the active style from §10.4 [R] | `--surface-3` fill [I] |
| **Selected** | — | Same as hover, but persistent (for example, current playlist) [I] | — | Active style [R] | Toggle on: accent fill [I] |
| **Disabled** | 40% opacity, `cursor: not-allowed`, no hover [I] | — | 50% opacity, `--surface-1` [I] | — | 40% opacity [I] |
| **Loading** | Label kept. An 18 px spinner (2 px stroke, `currentColor`) replaces the leading icon. Width stays the same. `aria-busy` [I] | Skeleton (§DESIGN 11) [I] | Trailing spinner 18 px [I] | — | Spinner replaces the icon [I] |

Use `:focus-visible` only. Mouse focus shows no ring.

---

## 12. Responsive Design Principles

| Breakpoint | Width | Shell | Homepage grids |
|---|---|---|---|
| `xl` | ≥ 1440 | Sidebar 288 (reference) | Continue watching 3, playlists 4 |
| `lg` | 1280–1439 | Sidebar 256 | Continue watching 3, playlists 3 |
| `md` | 1024–1279 | Sidebar becomes an 80 px icon rail; playlist names show as tooltips | Continue watching 2 plus horizontal scroll, playlists 3 |
| `sm` | 640–1023 | Sidebar becomes a drawer opened from a menu button in the header | Continue watching as a horizontal scroll row, playlists 2 |
| `xs` | < 640 | Drawer, compact header | Continue watching stacked (thumbnail on top), playlists 1 |

All breakpoints are **[I]**. Principles:
1. The layout keeps its order at every width: header → welcome → continue watching → playlists.
2. Touch targets are at least 44 × 44 at every size.
3. Type steps down at most one level below 640 px (welcome headline 46 → 32, section 26 → 22). Body text is never below 15 px.
4. Thumbnails always keep 16:9. Grids drop columns before cards shrink below 260 px.
5. There is never any horizontal page scroll. Only explicit carousels scroll sideways.

## 13. Accessibility and Readability Guidelines

- Contrast: body text must be ≥ 4.5:1 on its surface. All text tokens in §3.5 pass on every surface. `--text-tertiary` replaces the reference's `#6c6e80`. **[A]**
- White on primary: use the [A] gradient (§3.1). White on danger: `#d93a42` (4.5:1).
- Minimum text 13 px, and only for badges, tags and chips. Metadata is 15 px or larger.
- Focus: every interactive element shows the §11 focus style. Tab order follows the visual order (sidebar → header → main).
- Semantics: one `<h1>` per page, sections use `<h2>`, cards are `<article>` with a heading, nav uses `<nav aria-label>`, the current page is marked with `aria-current="page"`.
- Images: thumbnails are decorative (`alt=""`) when the title is next to them. The featured thumbnail gets the video title as `alt`.
- Icon-only buttons must have `aria-label`, for example "Play Deep Focus Coding" or "More actions for Deep Focus Coding".
- Colour is never the only signal: playlist dots also have names, progress also has text ("14:20 left"), and errors also have a message.
- Dialogs: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`. Toasts use `role="status"`.
- Respect `prefers-reduced-motion` (see §14).

## 14. Motion and Transition Guidelines

| Token | Value | Use | Label |
|---|---|---|---|
| `--ease-standard` | `cubic-bezier(.2, .8, .2, 1)` | All UI transitions | [I] |
| `--dur-fast` | 150 ms | Colour, background and border changes | [I] |
| `--dur-base` | 200 ms | Card lift, button press, toggle thumb, toast in/out | [I] |
| `--dur-slow` | 280 ms | Drawer, dialog entry (dialog: fade plus 8 px rise, 180 ms) | [I] |

Rules: animate only `opacity`, `transform`, `background-color`, `border-color` and `box-shadow`. Use no more than one moving thing per interaction. The now-playing equaliser (3 bars, 0.9 s loop) is the only looping animation. Under `prefers-reduced-motion: reduce`, remove transforms and loops but keep instant state changes.
