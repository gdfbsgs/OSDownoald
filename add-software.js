const fs = require('fs');
const sql = fs.readFileSync('complete-database.sql', 'utf8');

const newEntries = `,

// Find the last INSERT INTO operating_systems block and insert before its final );
const lines = sql.split('\n');
let lastInsertIdx = -1;
for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes('INSERT INTO operating_systems')) {
        lastInsertIdx = i;
        break;
    }
}

if (lastInsertIdx === -1) {
    console.error('No INSERT INTO operating_systems found');
    process.exit(1);
}

// Find the line with ); that ends the last INSERT block
let endIdx = -1;
for (let i = lastInsertIdx + 1; i < lines.length; i++) {
    if (lines[i].trim().endsWith(');')) {
        endIdx = i;
        break;
    }
}

if (endIdx === -1) {
    console.error('Could not find end of INSERT block');
    process.exit(1);
}

// Insert new entries before the ); line
const lastLine = lines[endIdx];
lines[endIdx] = newEntries + '\n' + lastLine;

fs.writeFileSync('complete-database.sql', lines.join('\n'));
console.log('Added 100 new software entries');
