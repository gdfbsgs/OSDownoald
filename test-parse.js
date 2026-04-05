const fs = require('fs');
const sql = fs.readFileSync('complete-database.sql', 'utf8').replace(/^\uFEFF/, '');

function extractValues(str) {
    const rows = [];
    let depth = 0;
    let current = '';
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (ch === '(') { depth++; if (depth === 1) { current = ''; continue; } }
        if (ch === ')') { depth--; if (depth === 0) { rows.push(current); current = ''; continue; } }
        if (depth >= 1) current += ch;
    }
    return rows;
}

function cleanValue(v) {
    v = v.trim();
    if (v === 'NULL') return null;
    if ((v.startsWith("'") && v.endsWith("'")) || (v.startsWith('"') && v.endsWith('"'))) {
        return v.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"');
    }
    return v;
}

function parseRowValues(str) {
    const values = [];
    let current = '';
    let inQuote = false;
    let quoteChar = '';
    let escaped = false;

    for (let i = 0; i < str.length; i++) {
        const ch = str[i];

        if (escaped) { current += ch; escaped = false; continue; }
        if (ch === '\\') { escaped = true; current += ch; continue; }

        if (inQuote) {
            current += ch;
            if (ch === quoteChar) inQuote = false;
            continue;
        }

        if (ch === "'" || ch === '"') {
            inQuote = true;
            quoteChar = ch;
            current += ch;
            continue;
        }

        if (ch === ',') {
            values.push(cleanValue(current));
            current = '';
            continue;
        }

        current += ch;
    }

    if (current.trim()) values.push(cleanValue(current));
    return values;
}

// Test families
console.log('=== TESTING FAMILIES ===');
const famRegex = /INSERT INTO os_families.*?VALUES\s*(.*?);/gs;
let famMatch;
while ((famMatch = famRegex.exec(sql)) !== null) {
    const rows = extractValues(famMatch[1]);
    console.log('Extracted rows:', rows.length);
    rows.forEach((row, idx) => {
        const vals = parseRowValues(row);
        console.log(`  Row ${idx}:`, vals.length, vals);
    });
}

// Test OS parsing
console.log('\n=== TESTING OS (first 3 rows) ===');
const osRegex = /INSERT INTO operating_systems.*?VALUES\s*(.*?);/gs;
let osMatch;
let count = 0;
while ((osMatch = osRegex.exec(sql)) !== null && count < 3) {
    const rows = extractValues(osMatch[1]);
    console.log(`Block ${count}: ${rows.length} rows`);
    if (rows.length > 0) {
        const vals = parseRowValues(rows[0]);
        console.log(`  First row vals:`, vals.length);
        console.log(`  family_id:`, vals[0]);
        console.log(`  name:`, vals[1]);
        console.log(`  version:`, vals[2]);
    }
    count++;
}
