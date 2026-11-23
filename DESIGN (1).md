# Playlist Hub: Page Design Specification

Page-level specification for Playlist Hub. It uses the tokens and components in `STYLE_GUIDE.md` (referred to below as **SG §n**). The value labels are the same: **[R]** from the reference, **[E]** estimated, **[I]** inferred, **[A]** accessibility adjustment.

**What the reference shows.** The reference image (`playlist-hub-homepage.png`) shows **only the desktop homepage at 1920 × 1080**. Everything about the playlist/player page, dialogs, empty, loading and error states, and smaller screens is **inferred** from the product requirements, using the same design language. Each section heading says which it is.

---

## 1. Product UI Overview

Playlist Hub lets people save YouTube videos into their own playlists, play a playlist video by video, and resume later. There is no login: all data lives in the browser's `localStorage`. The interface is a dark media library: a fixed sidebar, a header with search, and a content area where thumbnails take the most space.

| Screen | Route (hash) | Source |
|---|---|---|
| Home | `#` / `#home` | Visible in reference |
| Playlist / player | `#playlist-{id}` | Inferred |
| Recently watched, Favourites | `#recent`, `#favourites` | Nav items visible. Pages inferred: they reuse the homepage's continue-watching card list |
| Dialogs (create, rename, add video, confirm delete) | Overlay, no route | Inferred |

Data model the UI relies on **[I]**: `Playlist { id, name, color, createdAt, updatedAt, videos[], lastVideoId }`, `Video { id, youtubeId, title, channel, durationSec?, addedAt, progressSec?, unavailable? }`.

---

## 2. Overall Application Layout: visible in reference

| Aspect | Specification |
|---|---|
| Purpose | One persistent shell for every screen, so moving between pages never changes the frame. |
| Structure | Grid of `288px` sidebar and `1fr` main column, filling 100% of the viewport height. Main column = 92 px header plus a scrolling content area. [R] |
| Hierarchy | Content area (thumbnails, headings) is most prominent. Header comes second. Sidebar is quietest: darker background, smaller text. [R] |
| Spacing | Content padding 30 px top and 44 px on the sides. 34 px between sections. [R] |
| Scrolling | Sidebar is fixed and scrolls on its own if its list overflows. Header is sticky. Only the content area scrolls. [I] |
| Responsive | See §12. |

---

## 3. Main Navigation Structure: visible in reference

| Group | Items | Behaviour |
|---|---|---|
| Primary nav (sidebar) | Home, Recently watched, Favourites [R] | Single selection. The active item uses the SG §10.4 active style and `aria-current="page"`. |
| Library (sidebar) | "My playlists" label with a "+" icon button, then one row per playlist, sorted by last updated [R] | A row opens that playlist page. "+" opens the Create Playlist dialog. |
| Global actions (header) | Search, Create playlist, Settings, Profile [R] | Profile is visual only (no account). It opens a menu with "Export data", "Import data" and "Clear all data" [I]. Settings opens a settings dialog [I]. |
| In-page | "View history" → Recently watched. "View all" → all playlists. Sort dropdown [R] | — |
| Back | On the playlist page, a back icon button returns to the previous screen (default: Home) [I] | — |

---

## 4. Sidebar Specification: visible in reference

**Purpose:** brand, page navigation and quick access to every playlist.

| Region | Specification | Label |
|---|---|---|
| Container | 288 px wide, `--bg-sidebar`, 1 px right border `--border-subtle`, padding 28 × 20, vertical flex | [R] |
| Logo | 40 × 40 mark (radius 12, `--gradient-logo`, `--shadow-accent-sm`, white 16 px solid play triangle) + "Playlist Hub" 22 / 800 Display. 12 px gap, 10 px left inset | [R] |
| Primary nav | 36 px below the logo. Three 50 px items, 4 px apart (SG §10.4) | [R] |
| Section label | 34 px below the nav. "My playlists", 14 / 600 `--text-tertiary`, inset 14 px, with an 18 px "+" icon button on the right (36 × 36 hit area) | [R] |
| Playlist rows | 46 px high, padding 0 14, radius 12, 12 px gap. 28 × 28 thumbnail (radius 8; first video's thumbnail, or a color tile in the playlist color if empty), name 16 / 500 `--text-strong-2` (one line, ellipsis), count 14 / 500 `--text-tertiary` on the right | [R] |
| Row states | Hover: `--surface-1`. Current playlist: active nav style. List scrolls inside the sidebar after about 8 rows, with a 12 px fade at top and bottom | [I] |
| Create entry | 14 px below the rows. Full-width dashed button, 50 px, "+ Create playlist" (SG §10.1) | [R] |
| Storage card | Pinned to the bottom (`margin-top: auto`). Lock icon + "Saved on this device", text "Your playlists live in this browser. No account needed.", 6 px meter showing `localStorage` use against a 5 MB budget (22% in reference). Meter turns `--color-warning` at ≥ 80% | [R] / [I] |

Interaction: clicking a row opens the playlist. A row's right-click or long press opens the same menu as the card kebab (Rename, Delete) [I].

---

## 5. Header Specification: visible in reference

**Purpose:** page identity plus the actions available from anywhere.

| Aspect | Specification | Label |
|---|---|---|
| Container | 92 px high, padding 0 44, flex, 28 px gap, 1 px bottom border | [R] |
| Left: title | "Welcome back" 28 / 700 Display. Below it, the date ("Monday, 23 November") 15 / 400 `--text-secondary`, 2 px gap. On other pages the title is the page name and there's no date line | [R] / [I] |
| Search | Pushed right (`margin-left: auto`), 520 × 52 (SG §10.3) | [R] |
| Create playlist | Primary button, 52 px, "+" icon | [R] |
| Settings | 52 × 52 icon button | [R] |
| Profile | 52 px circle, `--surface-1` → `--surface-2` gradient, 1 px border, 22 px user icon | [R] |
| Responsive | Below 1280 the search narrows to 360. Below 1024 a menu button appears on the left and the Create button becomes icon-only (52 × 52). Below 640 the search collapses to an icon that opens a full-width search bar over the header, and the date line is hidden | [I] |

---

## 6. Homepage Design: visible in reference

Vertical order: Welcome section → Continue watching → My playlists. At 1920 × 1080 all three fit in the first screen without scrolling. [R]

### 6.1 Welcome section (hero)

| Aspect | Specification | Label |
|---|---|---|
| Purpose | Says what the product does in one glance and offers the main action (add a video). | |
| Container | Full content width, 272 px high, radius 26, `--border-hero`. Background: base `linear-gradient(120deg, #15131f, #121320 60%, #171430)` with a radial glow `rgba(139,92,246,.42)` (700 × 340 at 82% / 30%) and a faint blue glow `rgba(59,130,246,.18)` at the bottom-right corner | [R] |
| Layout | Grid `1fr 600px`, padding 0 48, content vertically centred | [R] |
| Left: headline | "All your YouTube favourites," / "organised into playlists." 46 / 800, line-height 1.06, maximum width 700. Line 2 uses `--gradient-headline` text fill | [R] |
| Left: body | "Save videos into playlists and pick up right where you left off." 19 / 400 `--text-body`, 12 px below the headline | [R] |
| Left: quick add | 26 px below the body, maximum width 720, 12 px gap: input (58 px, `--surface-inset`, `--border-input`, red YouTube glyph, placeholder "Paste a YouTube link to add it to a playlist…") + primary button "Add video" (58 px) | [R] |
| Right: thumbnail fan | Three 16:9 thumbnails, radius 16, `--shadow-float`. Back-left 290 px wide, rotated −8°. Back-right 280 px, +8°. Front 320 px, −2°, overlapping the other two. Back ones at `brightness(.8)`. Front one has a 64 px white play circle and a duration badge. Content: the three most recently added videos | [R] / [I] |
| Interaction | "Add video" with a valid link opens the **Add to playlist** dialog (§8.3) with the link already filled in. Pressing Enter in the input does the same. An invalid link shows an inline error below the input. Clicking the front thumbnail plays that video in its playlist | [I] |
| Responsive | Below 1280: right column 420, fan scales to 75%. Below 1024: the fan is hidden and the panel's height fits its content (padding 32). Below 640: headline 32 px, input and button stack, button full width | [I] |

### 6.2 Search area

The search field is in the header (§5); there is no separate search block on the homepage. [R]
Behaviour **[I]**: typing (150 ms debounce) opens a dropdown below the field (SG §10.9, width = field width) with up to 4 **Playlists** (28 px thumbnail, name, count) and up to 6 **Videos** (64 px thumbnail, title, playlist name). Matching is case-insensitive on names, titles and channels; the matched text is shown in `--text-primary`, the rest in `--text-secondary`. Arrow keys move through results, Enter opens one, Esc closes the dropdown. If nothing matches: "No playlists or videos match "…"".

### 6.3 Continue Watching section

| Aspect | Specification | Label |
|---|---|---|
| Purpose | Get back into a partly watched video in one click. | |
| Header row | "Continue watching" (26 / 700) on the left. "View history ›" link on the right | [R] |
| Grid | 3 equal columns, 24 px gap. Show the 3 most recently played videos whose progress is between 5% and 95% | [R] / [I] |
| Card | SG §10.6: padding 14, radius 20, 18 px gap | [R] |
| Thumbnail | 224 × 126, radius 13, 5 px progress bar on the bottom edge | [R] |
| Text | Title 18 / 600, at most 2 lines. Meta "Channel · Playlist" 15 `--text-secondary`, 6 px below, at most 2 lines. Resume line 12 px below: solid play glyph 11 px + "Resume · 14:20 left" 14 / 600 `--color-accent-soft` | [R] |
| Interaction | Clicking the card opens the playlist page and starts the video at its saved position. Hover: border `--border-hover`, thumbnail brightness 1.08 | [I] |
| Empty | If there's no history, the section is hidden | [I] |
| Responsive | md: 2 columns plus horizontal scroll with snap. sm: horizontal scroll row of 360 px cards. xs: stacked cards with the thumbnail on top at full width | [I] |

Progress note **[I]**: the YouTube IFrame API reports the current time. Save `progressSec` every 5 s and when the video is paused or left. Clear it when a video reaches 95%.

### 6.4 My Playlists section

| Aspect | Specification | Label |
|---|---|---|
| Purpose | Browse and open every saved playlist. | |
| Header row | "My playlists" (26 / 700) + count chip "6 playlists" (SG chip: 14 / 600, `--surface-2`, padding 4 × 10, full radius). On the right: sort dropdown "Recently updated ⌄" (40 px) and "View all ›" link, 10 px gap | [R] |
| Sort options | Recently updated (default), Recently created, Name A–Z, Most videos | [I] |
| Grid | 4 equal columns, 24 px gap. The homepage shows the first 8 (2 rows). "View all" shows all of them on `#playlists` with the same grid | [R] / [I] |
| Responsive | lg/md: 3 columns. sm: 2. xs: 1 | [I] |

### 6.5 Playlist cards

| Part | Specification | Label |
|---|---|---|
| Container | `--surface-1`, `--border-subtle`, radius 22, overflow hidden. The whole card links to the playlist | [R] |
| Collage | 200 px high (at a 1920 viewport; scales with card width, keeping about a 1.75:1 ratio), padding 10 10 0, 3 px gap, grid `2fr 1fr` × 2 rows. Left tile spans both rows (corners 14/6/6/14). Top-right tile corners 6/14/6/6. Bottom-right tile corners 6/6/14/6. The bottom-right tile shows a "+N" overlay (`--surface-scrim`, 20 / 700) when more than 3 videos exist, where N = count − 3 | [R] |
| Collage with fewer videos | 2 videos: the right column shows video 2 across both rows. 1 video: one full tile. 0 videos: an empty tile (§10) | [I] |
| Tag | Top-left, 22 px from the card edge, `--surface-tag`, radius 8, padding 5 × 10, 13 / 600. Playlist color dot (8 px) + "Updated today" / "Updated 2 days ago" (relative time) | [R] |
| Body | Padding 16 18 18, flex, 12 px gap. Name 20 / 600 Display (one line, ellipsis). Meta "12 videos · 6h 40m" 15 `--text-secondary`, 3 px below | [R] |
| Actions | Round play button (46 px, SG §10.1). Kebab icon button (`more-vertical`, 22 px, `--text-tertiary`, 36 × 36 hit area) | [R] |
| Hover (shown on "Travel Vlogs" in the reference) | Lift −4 px, `--border-accent`, `--shadow-card-hover`, play button fills with `--color-accent` and gets a glow | [R] |
| Interaction | Card click → open the playlist where it was left off, paused. Play button → open and play from `lastVideoId` (or the first video). Kebab → menu: Play, Rename, Add videos, Delete playlist (destructive, separated by a divider) | [I] |
| Duration | Total of `durationSec` across the playlist's videos. Omit "· 6h 40m" if any duration is unknown | [I] |

### 6.6 Create Playlist entry point

There are three entry points, all visible in the reference **[R]**: the header primary button, the sidebar dashed button, and the sidebar "+" next to "My playlists". All three open the same **Create playlist** dialog (§8.1). **[I]** When there are no playlists, the playlists grid also shows a dashed create tile (§10.1).

---

## 7. Playlist Details / Video Player Page: inferred

Nothing on this page is visible in the reference. It follows the product requirement: *the playlist's videos are listed on the left and the selected video plays on the right at full size*. It uses the same shell, surfaces, radii and type.

### 7.1 Page layout

| Aspect | Specification |
|---|---|
| Shell | The app sidebar collapses to the 80 px icon rail (logo mark, nav icons, playlist thumbnails) to make room for the player. The header stays (title = playlist name). |
| Playlist info bar | Below the header, padding 24 × 44, flex: back icon button (52) · playlist block · add-video input group (right, width `min(560px, 40%)`). |
| Body | Grid `minmax(340px, 420px)` video list + `1fr` player column, 28 px gap, padding 0 44 40. |
| Proportions at 1920 × 1080 | 80 rail + 44 + 420 list + 28 + player about 1304 wide → 16:9 frame about 733 high. |

### 7.2 Video list sidebar

| Aspect | Specification |
|---|---|
| Purpose | Shows the whole playlist: pick, reorder and remove videos. |
| Container | `--surface-1`, `--border-subtle`, radius 22. Sticky at `top: header + 20px`, `max-height: calc(100vh − 132px)`, flex column. |
| List header | Padding 18 × 20, bottom border. "Videos" 20 / 700 Display + "12 videos · 6h 40m" 15 `--text-secondary` on the right. |
| List | Scrolls inside the panel, padding 8. |
| Row | Grid `28px 1fr 40px`, 8 px gap, padding 8, radius 14, 2 px transparent border (used to show where a dragged row will drop). **Index** 15 / 500 `--text-tertiary`, tabular numbers, centred (doubles as the drag handle). **Thumbnail** 132 × 74 (16:9), radius 10, with a duration badge (12 px text) and a 3 px progress bar if partly watched. **Text**: title 17 / 600 at most 2 lines, channel 15 `--text-secondary` one line. **Remove** button: 40 × 40, `x` icon, `--text-tertiary`, 55% opacity until the row is hovered or focused (100% on touch). |
| Row states | Hover `--surface-2`. **Current** row: `--color-accent-bg` fill, index in `--color-accent-soft`; while playing, the index becomes a 3-bar equaliser (SG §14). Unavailable: thumbnail greyscale at 50% opacity, channel line replaced by "Unavailable" in `--color-danger`. Drag: source row at 40% opacity, a 2 px `--color-accent` line marks the drop position. |
| Interaction | Clicking a row plays it. Rows can be dragged to reorder; with the keyboard, focus a row and press Alt+↑ / Alt+↓. Remove opens the confirmation dialog (§9). The current row scrolls into view when it changes. |

### 7.3 Main video player area

| Aspect | Specification |
|---|---|
| Purpose | The selected video at the largest size that fits the whole 16:9 frame on screen. |
| Frame | 16:9, `width: min(100%, (100vh − 300px) × 16/9)`, minimum 560 px, left-aligned in its column. Black background, radius 22, overflow hidden, `--shadow-float`. |
| Player | YouTube IFrame Player API (`youtube-nocookie.com` host, `rel=0`, `playsinline=1`) filling the frame. Uses YouTube's own controls. |
| Empty playlist | The frame shows the empty state (§10.2) in place of the player. |

### 7.4 Selected video information

Directly below the frame, 22 px gap, same width as the frame.

| Element | Specification |
|---|---|
| Title | 30 / 700 Display, −0.01em, at most 2 lines. |
| Meta | 18 `--text-secondary`: "Channel · Video 3 of 12 · Added 2 days ago". |
| Controls row | 20 px below, flex-wrap, 12 px gap: **Previous** (secondary button, `skip-back` icon), **Next** (secondary, `skip-forward` icon after the label) · spacer · **Autoplay next** toggle · **Loop playlist** toggle · edit-title icon button · "Open on YouTube" icon button (`external-link`, opens in a new tab). |
| Toggle | 46 × 28 track, `--surface-3` off / `--color-accent` on, 22 px white thumb, 17 / 500 label (`--text-secondary` off, `--text-primary` on). |

### 7.5 Playlist information

The **playlist block** in the info bar contains:
- The name (36 / 800 Display, one line, ellipsis), followed by two 46 px icon buttons: Rename (`pencil`) and Delete (`trash-2`, hover tinted `--color-danger`).
- Below it, 4 px gap: "12 videos · 6h 40m · Updated today", 16 `--text-secondary`, with the playlist color dot before it.

The **add-video group** is the welcome-panel quick-add control again: a 54 px input "Paste YouTube links (one or many)" + primary "Add" button. It accepts several links separated by spaces, commas or new lines.

### 7.6 Video navigation behaviour

| Event | Behaviour |
|---|---|
| Open playlist | Selects `lastVideoId` (or the first video), seeks to its saved progress, starts **paused**. Opening via a play button starts playing. |
| Video ends | Autoplay on: play the next video. At the last video: if Loop is on, go back to the first; if not, stop and show a toast "End of playlist". |
| Next / Previous | Next is disabled on the last video and Previous on the first, unless Loop is on. Keyboard: `N` / `P` (ignored while typing in a field). |
| Video errors (removed, embed disabled) | Mark the video unavailable, show a toast, and if Autoplay is on skip to the next video after 2 s. |
| Removing the current video | Select the video that takes its place (or the previous one if it was last), and cue it paused. |
| Leaving the page | Save progress, pause the player, update `lastVideoId` and `updatedAt`. |
| Preferences | Autoplay (default on) and Loop (default off) are saved globally in `localStorage`. |

### 7.7 Responsive

md (1024–1279): rail stays, list column 340. sm (< 1024): one column, ordered info bar → player (full width) → selected-video info → video list (not sticky, natural height); the add group moves to a full-width row. xs: controls wrap; Previous and Next share one row at 50% width each.

---

## 8. Playlist Creation and Editing UI: inferred

All of these use the dialog panel from SG §10.8.

### 8.1 Create playlist
Title "New playlist". **Name** field (54 px, required, 1–60 characters, autofocus). **Color** field: 6 swatch buttons (28 px circles from SG §3.2, selected one shows a 2 px white ring, first unused color preselected). Optional "Add videos now" textarea (3 rows, accepts many links). Actions: Cancel · **Create playlist** (primary, disabled until the name is filled in). On success: close the dialog, go to the new playlist page, toast "Playlist created". Duplicate names are allowed.

### 8.2 Rename / edit playlist
Same dialog, titled "Edit playlist", with the name and color filled in. Primary action "Save changes". Pressing Enter in the name field submits.

### 8.3 Add to playlist (from the welcome panel)
Title "Add to playlist". Shows a preview row: the video's thumbnail (132 × 74), with title and channel once fetched (oEmbed), or a skeleton while loading. Below it, a list of playlists (radio rows, 52 px, 28 px thumbnail, name, count), followed by a "+ New playlist" row that shows an inline name field. Primary action "Add video". If the video is already in the chosen playlist: inline warning "Already in this playlist" and the button is disabled.

### 8.4 Edit video title
Title "Edit video title", with one field filled in. Used when oEmbed can't fetch a title.

### 8.5 Validation messages
"Enter a playlist name." · "That doesn't look like a YouTube link." · "2 links weren't recognised and were skipped." Accepted link formats: `youtube.com/watch?v=`, `youtu.be/`, `/shorts/`, `/embed/`, `/live/`, or a bare 11-character ID.

---

## 9. Confirmation Dialog Design: inferred

Every destructive action requires an in-app confirmation (SG §10.8). **Native `confirm()` / `alert()` must never be used.**

| Action | Title | Body | Confirm button |
|---|---|---|---|
| Delete playlist | "Delete this playlist?" | ""Travel Vlogs" and its 15 videos will be removed from this browser. This can't be undone." | Danger: "Delete playlist" |
| Remove video | "Remove this video?" | ""Two Weeks Driving Iceland's Ring Road" will be removed from Travel Vlogs." | Danger: "Remove" |
| Clear all data | "Delete all playlists?" | "All 6 playlists and your watch history will be erased from this browser." Also requires typing `DELETE` into a field | Danger: "Delete everything" (disabled until the text matches) |

Layout: title 24 / 700 → body 17 `--text-secondary` → actions on the right (Cancel ghost, then danger). Initial focus is on Cancel; Enter does **not** confirm a destructive dialog unless focus is on the danger button. After confirming: close, apply the change, and show a toast with **Undo** (6 s). Undo restores the exact previous state (including position in the list).

---

## 10. Empty States: inferred

Shared pattern: centred stack, 64 px icon tile (radius 18, `--surface-2`, 28 px icon `--text-tertiary`), title 22 / 700 Display, body 17 `--text-secondary` (maximum width 420), optional primary action. 14 px gaps.

| # | Where | Content |
|---|---|---|
| 10.1 | Homepage, no playlists | Continue watching hidden. My playlists shows a dashed create tile in the first grid cell (dashed 2 px `--border-subtle`, radius 22, same height as a card, 64 px "+" circle, "Create your first playlist", "Group YouTube videos to watch later") with the empty-state message beside it on wide screens. The welcome panel stays as it is. |
| 10.2 | Playlist with no videos | Player frame: logo-mark tile, "This playlist is empty", "Paste a YouTube link above to add your first video." The list panel shows "No videos yet" in 17 `--text-secondary`, padding 28 × 20. |
| 10.3 | Search, no results | In the dropdown: `search-x` icon, "No results for "…"", "Try a playlist name or video title." |
| 10.4 | Recently watched, no history | `clock` icon, "Nothing watched yet", action "Browse playlists". |
| 10.5 | Favourites, none | `heart` icon, "No favourites yet", "Tap the heart on any video to save it here." |
| 10.6 | Empty playlist card | Collage area: `--surface-2` gradient tile with a `film` icon and "No videos yet" (16 `--text-secondary`). No play button; the meta line reads "0 videos". |

---

## 11. Loading and Error States: inferred

| State | Treatment |
|---|---|
| App start | Data is read from `localStorage` synchronously, so there is no loading screen. |
| Thumbnail loading | `--surface-2` fill, then the image fades in over 150 ms. |
| Video title fetch (oEmbed) | Title row shows a skeleton (two bars, 14 px tall, radius 7, `--surface-3`, shimmer 1.4 s). If it fails, show "Untitled video" + an edit-title link. |
| Player loading | Black frame with an 18 px spinner in the centre. |
| Skeletons | Same size as the real component, `--surface-2` base with a `--surface-3` sweep. Shimmer is off under reduced motion. |
| Thumbnail fails to load | Fallback tile (SG §10.7 placeholder). |
| Video unavailable | §7.2 unavailable row and §7.6 skip behaviour. Toast: "This video can't be played here." |
| Storage failure (quota or blocked) | Persistent toast in `--color-danger`: "Couldn't save. Browser storage is full or blocked." The storage meter turns red. |
| Invalid link | Input error state (SG §10.2) with a message from §8.5. |
| Offline | Thumbnails fall back to the placeholder. The player shows "You're offline. Videos will play when you reconnect." |

---

## 12. Responsive Layout Behavior: inferred

The reference is `xl` (≥ 1440). Breakpoints come from SG §12.

| Region | xl ≥1440 | lg 1280–1439 | md 1024–1279 | sm 640–1023 | xs <640 |
|---|---|---|---|---|---|
| Sidebar | 288 full | 256 full | 80 icon rail | Drawer (320, overlay) | Drawer (100% wide) |
| Header | As reference | Search 400 | Search 360 | Menu button, icon-only Create | Logo mark, search icon, Create icon |
| Hero | 2 columns + fan | Fan at 75% | Fan hidden | Text only | Headline 32, stacked input |
| Continue watching | 3 columns | 3 | 2 + scroll | Scroll row | Stacked |
| Playlists grid | 4 | 3 | 3 | 2 | 1 |
| Player page | List 420 + player | List 400 | List 340, rail | Stacked: player first | Stacked |
| Content side padding | 44 | 40 | 32 | 24 | 16 |

Touch devices (`hover: none`): hover-only details (remove buttons, card play glow) are always visible, and card lift is turned off.

---

## 13. Interaction and Navigation Rules: inferred unless marked

1. **Routing**: hash-based (`#home`, `#playlist-{id}`, `#recent`, `#favourites`, `#playlists`). Back and forward work. Unknown or deleted IDs redirect to Home with a toast "That playlist no longer exists".
2. **Persistence**: every change is written to `localStorage` immediately under one versioned key (`playlist-hub:v1`). `updatedAt` changes on rename, add, remove and reorder.
3. **One primary action per view**: Create playlist (header) and Add video (hero / info bar) are the only gradient buttons visible at the same time. [R]
4. **Clickable areas**: whole cards and rows are clickable. Nested buttons stop the click from reaching the card. Each card has a single tab stop plus its inner buttons.
5. **Destructive actions** always go through §9 and offer Undo.
6. **Keyboard**: `Ctrl/⌘ K` focuses search [R], `N` / `P` change video, `Esc` closes the top overlay, `Alt+↑/↓` reorders rows.
7. **Feedback**: every create, add, remove and rename shows a toast (SG §10.10). Adding several links reports "Added 3 videos · 1 already in playlist".
8. **Duplicates**: the same YouTube video can't be added to one playlist twice. It can be in different playlists.
9. **External links**: "Open on YouTube" opens a new tab with `rel="noopener"`.

---

## 14. Image and Thumbnail Treatment

| Context | Size (at 1920) | Radius | Overlays | Source |
|---|---|---|---|---|
| Welcome fan, front | 320 × 180 | 16 | Play circle 64, duration badge | [R] |
| Welcome fan, back | 290 × 163 / 280 × 158, rotated ±8° | 16 | `brightness(.8)` | [R] |
| Continue watching | 224 × 126 | 13 | 5 px progress bar | [R] |
| Playlist collage, main | about 237 × 190 (2 rows) | 14 / 6 / 6 / 14 | Tag (top-left) | [R] |
| Playlist collage, side | about 118 × 94 | 6 / 14 / 6 / 6 and 6 / 6 / 14 / 6 | "+N" scrim on the bottom tile | [R] |
| Sidebar row | 28 × 28 (cropped centre) | 8 | — | [R] |
| Player-page list row | 132 × 74 | 10 | Duration badge (12 px), 3 px progress bar | [I] |
| Search result | 64 × 36 | 6 | — | [I] |

Rules:
- Every thumbnail is 16:9 with `object-fit: cover` (the sidebar square is the only exception, cropped from the centre). Images are never stretched or letterboxed. [R]
- Use the YouTube thumbnail CDN: `hqdefault.jpg` for tiles wider than 200 px, `mqdefault.jpg` otherwise. Lazy-load below the first screen. [I]
- Thumbnails show at full colour and get no tints or filters, except the welcome-fan back cards, the unavailable state and the "+N" scrim. [R]
- Thumbnail edges get no borders; floating thumbnails get the 1 px `--thumb-ring` instead. [R]
- The thumbnails in the reference are illustrated placeholders. In the product, real YouTube thumbnails replace them; their size, radius and overlays don't change.
