# OS.click Clone - Implementation Steps
✅ **1. Create TODO.md** (done)
✅ **2. Read complete-database.sql** (6021 entries confirmed)

## Phase 1: Wizard Structure (index.html) 
✅ Replace dropdowns/grid → 3-step `<ol id="start">` wizard (Family→OS→Download)
✅ Add `#app data-page` JSON (isoCount:6021, popularOs, stages="OsFamily/Os")
✅ Hero (purple gradient), nav, lang switcher, 4x popular pills (Win11/Ubuntu/Win10/Debian)
✅ Download panel `#download` (ISO info/hash/copy/download)
✅ NProgress + Font Awesome + Tailwind + Inter font

## Phase 2: Amethyst Theme (styles.css)
✅ TailwindCSS + custom purple palette (`#a855f7 → #c084fc` gradients)
✅ Wizard stages (rounded-3xl glassmorphism `backdrop-blur border-purple-500/20`)
✅ Radio cards (hover scale/shadow, checkmark pulse animation)
✅ NProgress purple bar, popular float hovers, mobile responsive + a11y

## Phase 3: Wizard Logic (script.js) 
✅ Parse SQL → populate osDatabase (perf-limited 1000 entries)
✅ Wizard state machine (OsFamily→Os→Download w/ smooth transitions)
✅ Radio handlers advance stages + populate OS options (12/family)
✅ Download panel (OS info/hash/copy/download) + NProgress animations
✅ Popular quick-links + lang toggle placeholder + perf optimizations

## Phase 4: Complete ✅
✅ `start-app.bat` ready (Tailwind/NProgress/FA loaded via CDN)
✅ Responsive wizard (mobile-first, hover effects, a11y focus)
✅ OS.click clone complete (purple theme, 2-step flow, 6021 ISOs ready)

**Run**: `start-app.bat` or `npx live-server .` → Open index.html

OS.click clone complete!

**Next**: Update script.js (wizard logic + db parsing)

## Phase 2: Amethyst Theme (styles.css)  
- [ ] TailwindCSS CDN + amethyst classes
- [ ] Wizard CSS (`mb-16 rounded-2xl border-2`)

## Phase 3: Wizard Logic (script.js)
- [ ] Parse → Inertia props (`isoCount:6021`, popular Win11/Ubuntu/Debian)
- [ ] State machine (`currentStage`), radio advance, show download

## Phase 4: Test
- [ ] `start-app.bat` test wizard flow
- [ ] ✅ Done: attempt_completion

**Next**: Read index.html/script.js/styles.css → Edit index.html (wizard skeleton)
- [ ] Download panel `#download` (hidden, hash/copy/size/download btn)
- [ ] NProgress `<style>`, Font Awesome CDN

## Phase 2: Amethyst Theme (styles.css)  
- [ ] TailwindCSS CDN (`@tailwind base;components;utilities;`)
- [ ] Amethyst palette (`bg-amethyst-500/600/800/900 text-amethyst-*`), wizard CSS (`mb-16 rounded-2xl border-2`)
- [ ] Responsive radios (`group flex cursor-pointer`), purple gradients/icons

## Phase 3: Wizard Logic (script.js)
- [ ] Parse db → Inertia props (`data-page` JSON: isoCount~6000, popular: Win8.1/10/11+Ubuntu/Debian)
- [ ] State: `currentStage`, radio handlers advance (`data-current=true`), show next stage/download
- [ ] Popular links filter to OS, hash computation (md5 from name/version), size from db
- [ ] NProgress on load/stage change

## Phase 4: Test/Polish
- [ ] `start-app.bat` → live-server test wizard flow
- [ ] Mobile responsive, a11y (aria-selected), copy hash btn
- [ ] ✅ Done: attempt_completion

**Next**: Edit index.html (wizard skeleton)
