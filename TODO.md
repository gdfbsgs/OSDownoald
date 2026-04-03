# OSClick Improvement Plan (Approved & Updated - Progress: Database partially deduped)

## Task: Improve UI + Organize Database + Better ISO Search Method

**Information Gathered Summary:**
- Database: dedup-simple.js reduced to 13 unique lines (basic dedup done), dedup-db.js failed (no sqlite3). Still ~6000 entries with duplicates/[object Object] bugs.
- UI Files analyzed: script.js (hierarchical filtering, SQL parser), index.html (selectors/cards), styles.css (dark theme, responsive).
- Current search: Pure hierarchical selectors → slow on large db, no global search.
- Next: Fix db (manual clean + new entries), implement hybrid search (global text search + refiners).

## Detailed Steps:

### 1. ✅ Analyzed files & created detailed plan
### 2. ✅ Created/Updated this TODO.md  
### 3. ✅ **Database Organization (Partial)**
   - ✅ `node dedup-simple.js` → 13 unique INSERT lines (basic line dedup)
   - ❌ `node dedup-db.js` → Missing sqlite3 module
   - ☐ Manual fix: Replace [object Object] languages, append 500+ new Linux/macOS/Android entries
### 4. ☐ **Improve Search Method (Priority 1 Now)**
   - Add global search bar (#searchInput) above selectors
   - script.js: Add fuzzy search on name/version/edition/description + hierarchical refine on results
   - Debounced input, show/hide selectors based on search
### 5. ☐ **Fix Database Issues**
   - Edit complete-database.sql: Fix language='[object Object]' → proper codes (en-US etc.)
   - Add ~200 Linux (Ubuntu/Fedora/Debian + derivatives), 100 macOS, 100 others
### 6. ☐ **UI Polish & Perf**
   - styles.css: Search styling, mobile improvements
   - script.js: Fix parser for languages, optimize filtering (debounce, virtual scroll)
### 7. ☐ **Testing**  
   - run-server.bat: Test search \"ubuntu\", hierarchical refine, no errors
### 8. ☐ attempt_completion

**Progress Tracking:** Update ✓/✗ as completed.
**Next Action:** Add global search + fix [object Object] languages.




