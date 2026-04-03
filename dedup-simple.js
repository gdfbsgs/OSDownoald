const fs = require('fs');

const data = fs.readFileSync('complete-database.sql', 'utf8');
const lines = data.split('\n');
const seen = new Set();
const uniqueLines = [];

let insertStart = false;

for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed.startsWith('INSERT INTO operating_systems')) {
    insertStart = true;
    uniqueLines.push(line);
    continue;
  }
  if (insertStart && trimmed.startsWith('(') && trimmed.endsWith(');')) {
    // Skip entire line if duplicate
    const valuesStr = trimmed.slice(0, -1); // Remove ;
    if (!seen.has(valuesStr)) {
      seen.add(valuesStr);
      uniqueLines.push(line);
    }
    continue;
  }
  if (insertStart && trimmed === '') {
    insertStart = false; // End of batch
  }
  uniqueLines.push(line);
}

const newSql = uniqueLines.join('\n');
fs.writeFileSync('complete-database.sql', newSql);

console.log(`Deduplicated to ${seen.size} unique INSERT VALUES lines`);
console.log('File overwritten successfully. Original had duplicates across batches.');

