const fs = require('fs');
const sql = fs.readFileSync('complete-database.sql', 'utf8');

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
        if (inQuote) { current += ch; if (ch === quoteChar) inQuote = false; continue; }
        if (ch === "'" || ch === '"') { inQuote = true; quoteChar = ch; current += ch; continue; }
        if (ch === ',') { values.push(cleanValue(current)); current = ''; continue; }
        current += ch;
    }
    if (current.trim()) values.push(cleanValue(current));
    return values;
}

const regex = /INSERT INTO operating_systems.*?VALUES\s*(.*?);/gs;
let match;
const urls = new Set();
let totalRows = 0;

while ((match = regex.exec(sql)) !== null) {
    const rows = extractValues(match[1]);
    rows.forEach(row => {
        totalRows++;
        const vals = parseRowValues(row);
        if (vals.length >= 14 && vals[13]) {
            urls.add(vals[13]);
        }
    });
}

console.log(`Total rows: ${totalRows}`);
console.log(`Unique URLs: ${urls.size}`);
console.log('\n--- Sample URLs ---');
[...urls].slice(0, 30).forEach(u => console.log(u));
