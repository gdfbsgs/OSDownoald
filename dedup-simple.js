const fs = require('fs');

const sql = fs.readFileSync('complete-database.sql', 'utf8');
const lines = sql.split('\n');

const seen = new Set();
const output = [];
let inInsertBlock = false;

for (let i = 0; i < lines.length; i++) {
  const trimmed = lines[i].trim();

  if (trimmed.startsWith('INSERT INTO operating_systems')) {
    inInsertBlock = true;
    output.push(lines[i]);
    continue;
  }

  if (inInsertBlock) {
    if (trimmed.startsWith('(')) {
      if (!seen.has(trimmed)) {
        seen.add(trimmed);
        output.push(lines[i]);
      }
      continue;
    }
    if (trimmed === '' || trimmed.startsWith('--')) {
      inInsertBlock = false;
      output.push(lines[i]);
      continue;
    }
    if (trimmed === '') {
      inInsertBlock = false;
    }
  }

  output.push(lines[i]);
}

const newSql = output.join('\n');
fs.writeFileSync('complete-database.sql', newSql);

console.log(`Deduplicated: ${seen.size} unique data rows kept`);
console.log(`Original lines: ${lines.length}, New lines: ${output.length}`);
