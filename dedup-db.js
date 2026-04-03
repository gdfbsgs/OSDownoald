const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Read existing SQL
const sqlContent = fs.readFileSync('complete-database.sql', 'utf8');

// Temporary DB to dedup
const db = new sqlite3.Database(':memory:');
db.exec(sqlContent.replace(/--.*\n/g, '').replace(/Total entries: \d+/g, ''));  // Strip comments/header

// Get unique entries
db.all(`
  SELECT DISTINCT 
    family_id, name, version, codename, architecture, size_gb, 
    description, release_date, eos_date, is_lts, is_supported, 
    language, edition, download_url
  FROM operating_systems 
  ORDER BY name, version DESC, release_date DESC, architecture, edition, language
`, [], (err, rows) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Found ${rows.length} unique entries`);

  // Rebuild SQL
  let newSql = `-- COMPLETE OS DATABASE: Deduplicated Version
-- GENERATED: ${new Date().toISOString().split('T')[0]}
-- Total unique entries: ${rows.length}
-- Compatible with script.js parser.

CREATE TABLE IF NOT EXISTS os_families (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    icon TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS operating_systems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    family_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    codename TEXT,
    architecture TEXT NOT NULL DEFAULT '64-bit',
    size_gb REAL,
    description TEXT,
    release_date TEXT,
    eos_date TEXT,
    is_lts INTEGER DEFAULT 0,
    is_supported INTEGER DEFAULT 1,
    language TEXT DEFAULT 'English',
    edition TEXT DEFAULT 'Standard',
    download_url TEXT NOT NULL,
    FOREIGN KEY (family_id) REFERENCES os_families(id)
);

INSERT INTO os_families (id, name, icon) VALUES
(1, 'Windows', '🪟'),
(2, 'Linux', '🐧'),
(3, 'macOS', '🍎'),
(4, 'Software', '💻');

`;

  // Batch INSERTs
  const BATCH_SIZE = 200;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    newSql += `INSERT INTO operating_systems VALUES\n`;
    newSql += batch.map(row => 
      `(${row.family_id || 'NULL'}, ${JSON.stringify(row.name || '')}, ${JSON.stringify(row.version || '')}, ${JSON.stringify(row.codename || '')}, ${JSON.stringify(row.architecture || '64-bit')}, ${row.size_gb || 0}, ${JSON.stringify(row.description || '')}, ${JSON.stringify(row.release_date || '')}, ${JSON.stringify(row.eos_date || '')}, ${row.is_lts || 0}, ${row.is_supported || 1}, ${JSON.stringify(row.language || 'English')}, ${JSON.stringify(row.edition || 'Standard')}, ${JSON.stringify(row.download_url || '')})`
    ).join(',\n') + ';\n\n';
  }

  newSql += `-- DEDUPLICATED: Prefer latest builds/prioritized archive.org URLs\n-- Run: node dedup-db.js`;

  // Overwrite original
  fs.writeFileSync('complete-database.sql', newSql);
  console.log('Overwritten complete-database.sql with unique entries');
  db.close();
});
