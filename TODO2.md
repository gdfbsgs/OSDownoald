# OSClick Performance + DB Expansion - Approved (Both)

## Steps (Prioritized: Performance → DB)

### [✅] 1. Performance: Virtualize script.js rendering
   - Pagination: First 50 cards + Load More button
   - Smooth incremental loading (50/page)
   - Filter client-side before render

### [✅] 2. DB Expansion: Merge full-os-db.sql + db-complete.sql → db-expanded.sql
   - Created db-expanded.sql (~700 new ISOs: legacy 32-bit Windows/Linux, Server, MS Office)
   - Ready to replace db.sql & test ~6700 total

### [ ] 3. UI: index.html pagination div + search improvements

### [ ] 4. Styles: CSS for infinite scroll/pagination

### [ ] 5. Test: localhost:3000 → <100ms filters, smooth scroll, 6700 OS

**Status**: Starting step 1 (script.js perf)

