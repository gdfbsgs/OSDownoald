// ============================================================
// OSClick - Operating Systems Database
// Fetches and parses data from db.sql
// ============================================================

// ============================================================
// SQL Parser
// ============================================================
function parseSQL(sql) {
    const osFamilies = [];
    const operatingSystems = [];

    // Parse os_families INSERT statements
    const familiesRegex = /INSERT INTO os_families \(([^)]+)\)\s+VALUES\s+([^;]+);/gi;
    let familiesMatch;
    while ((familiesMatch = familiesRegex.exec(sql)) !== null) {
        const columns = familiesMatch[1].split(',').map(c => c.trim());
        const valuesBlock = familiesMatch[2];
        
        // Parse each row
        const rowRegex = /\(([^)]+)\)/g;
        let rowMatch;
        while ((rowMatch = rowRegex.exec(valuesBlock)) !== null) {
            const values = rowMatch[1].split(',').map(v => v.trim().replace(/^'|'$/g, ''));
            const row = {};
            columns.forEach((col, i) => {
                row[col] = values[i];
            });
            osFamilies.push(row);
        }
    }

    // Parse operating_systems INSERT statements
    const osRegex = /INSERT INTO operating_systems \(([^)]+)\)\s+VALUES\s+([^;]+);/gi;
    let osMatch;
    while ((osMatch = osRegex.exec(sql)) !== null) {
        const columns = osMatch[1].split(',').map(c => c.trim());
        const valuesBlock = osMatch[2];
        
        // Parse each row - handle nested parentheses in values
        let depth = 0;
        let currentRow = '';
        let inString = false;
        let stringChar = '';
        
        for (let i = 0; i < valuesBlock.length; i++) {
            const char = valuesBlock[i];
            
            if (!inString && (char === "'" || char === '"')) {
                inString = true;
                stringChar = char;
                currentRow += char;
            } else if (inString && char === stringChar) {
                inString = false;
                currentRow += char;
            } else if (!inString && char === '(') {
                depth++;
                if (depth === 1) {
                    currentRow = '';
                } else {
                    currentRow += char;
                }
            } else if (!inString && char === ')') {
                depth--;
                if (depth === 0) {
                    // Parse the row
                    const values = [];
                    let inRowString = false;
                    let rowStringChar = '';
                    let currentValue = '';
                    
                    for (let j = 0; j < currentRow.length; j++) {
                        const c = currentRow[j];
                        if (!inRowString && (c === "'" || c === '"')) {
                            inRowString = true;
                            rowStringChar = c;
                        } else if (inRowString && c === rowStringChar) {
                            inRowString = false;
                        } else if (!inRowString && c === ',') {
                            values.push(currentValue.trim());
                            currentValue = '';
                        } else {
                            currentValue += c;
                        }
                    }
                    values.push(currentValue.trim());
                    
                    const row = {};
                    columns.forEach((col, idx) => {
                        let val = values[idx] || '';
                        // Remove surrounding quotes
                        if ((val.startsWith("'") && val.endsWith("'")) || 
                            (val.startsWith('"') && val.endsWith('"'))) {
                            val = val.slice(1, -1);
                        }
                        // Convert NULL strings to null
                        if (val.toUpperCase() === 'NULL') {
                            val = null;
                        }
                        row[col] = val;
                    });
                    operatingSystems.push(row);
                } else {
                    currentRow += char;
                }
            } else {
                currentRow += char;
            }
        }
    }

    return { osFamilies, operatingSystems };
}

// ============================================================
// Transform SQL data to website format
// ============================================================
function transformData(osFamilies, operatingSystems) {
    const familyMap = {};
    osFamilies.forEach(family => {
        familyMap[family.id] = {
            name: family.name,
            icon: family.icon
        };
    });

    // Icon backgrounds by family
    const iconBgs = {
        'Windows': '#0078D4',
        'Linux': '#E95420',
        'macOS': '#A3AAAE'
    };

    // Additional icons by OS name (for variety)
    const osIcons = {
        'Ubuntu': '🟠',
        'Debian': '🔵',
        'Fedora': '🔴',
        'Linux Mint': '🍃',
        'Pop!_OS': '🎯',
        'Arch Linux': '🏹',
        'Manjaro': '🧩',
        'Zorin OS': '⚡',
        'elementary OS': '✴️',
        'openSUSE Leap': '🟢',
        'openSUSE Tumbleweed': '🟢',
        'Kali Linux': '💀',
        'CentOS Stream': '🔶',
        'Rocky Linux': '🪨',
        'AlmaLinux': '🦁',
        'Tails': '🔒',
        'Whonix': '🔒',
        'Parrot OS': '🦜'
    };

    return operatingSystems.map(os => {
        const family = familyMap[os.family_id] || { name: 'Unknown', icon: '❓' };
        const iconBg = iconBgs[family.name] || '#6B7280';
        const icon = osIcons[os.name] || family.icon;

        return {
            id: os.id,
            family: family.name,
            familyIcon: family.icon,
            name: os.name,
            version: os.version,
            codename: os.codename,
            architecture: os.architecture,
            size: os.size_gb ? `${os.size_gb} GB` : 'Unknown',
            description: os.description,
            releaseDate: os.release_date,
            eosDate: os.eos_date,
            isLTS: os.is_lts === '1' || os.is_lts === 1,
            isSupported: os.is_supported === '1' || os.is_supported === 1,
            language: os.language || 'English',
            edition: os.edition || 'Standard',
            downloadUrl: os.download_url,
            iconBg: iconBg,
            icon: icon
        };
    });
}

// ============================================================
// State
// ============================================================
let currentFilter = "all";
let currentSearch = "";
let osDatabase = [];

// ============================================================
// DOM Elements
// ============================================================
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const osGrid = document.getElementById('osGrid');
const noResults = document.getElementById('noResults');
const resultCount = document.getElementById('resultCount');
const filterBtns = document.querySelectorAll('.filter-btn');

// ============================================================
// Helpers
// ============================================================
function formatDate(dateStr) {
    if (!dateStr) return "Ongoing";
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function isEOL(eosDate) {
    if (!eosDate) return false;
    return new Date(eosDate) < new Date();
}

// ============================================================
// Create OS Card HTML
// ============================================================
function createOSCard(os, index) {
    const eol = isEOL(os.eosDate);
    const ltsTag = os.isLTS ? `<span class="tag tag-lts">LTS</span>` : '';
    const eolTag = eol ? `<span class="tag tag-eol">EOL</span>` : '';
    const supportedTag = !eol && os.isSupported ? `<span class="tag tag-supported">Supported</span>` : '';
    const codenameHtml = os.codename ? `<span class="os-codename">${os.codename}</span>` : '';

    return `
        <article class="os-card${eol ? ' os-card--eol' : ''}" style="animation-delay: ${index * 40}ms">
            <div class="os-header">
                <div class="os-icon" style="background-color: ${os.iconBg};">
                    <span>${os.icon}</span>
                </div>
                <div class="os-info">
                    <h2 class="os-name">${os.name}</h2>
                    <div class="os-version-row">
                        <span class="os-version">${os.version}</span>
                        ${codenameHtml}
                    </div>
                </div>
            </div>
            <div class="os-tags">
                ${ltsTag}${supportedTag}${eolTag}
            </div>
            <div class="os-meta">
                <span class="meta-item arch">${os.architecture}</span>
                <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    ${os.size}
                </span>
                <span class="meta-item family-tag">${os.familyIcon} ${os.family}</span>
            </div>
            <p class="os-description">${os.description}</p>
            <a href="${os.downloadUrl}" class="download-btn${eol ? ' download-btn--eol' : ''}" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                ${eol ? 'Download (EOL)' : 'Download ISO'}
            </a>
        </article>
    `;
}

// ============================================================
// Render OS Cards
// ============================================================
function renderOS(osList) {
    if (osList.length === 0) {
        osGrid.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        osGrid.innerHTML = osList.map((os, index) => createOSCard(os, index)).join('');
    }
    resultCount.textContent = osList.length;
}

// ============================================================
// Filter Operating Systems
// ============================================================
function getFilteredOS() {
    let list = osDatabase;

    // Family filter
    if (currentFilter !== "all") {
        list = list.filter(os => os.family.toLowerCase() === currentFilter.toLowerCase());
    }

    // Search filter
    const term = currentSearch.toLowerCase().trim();
    if (term) {
        list = list.filter(os =>
            os.name.toLowerCase().includes(term) ||
            os.version.toString().toLowerCase().includes(term) ||
            (os.codename && os.codename.toLowerCase().includes(term)) ||
            os.architecture.toLowerCase().includes(term) ||
            os.description.toLowerCase().includes(term) ||
            os.family.toLowerCase().includes(term)
        );
    }

    return list;
}

// ============================================================
// Event Listeners
// ============================================================
searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderOS(getFilteredOS());
});

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearch = '';
    renderOS(getFilteredOS());
    searchInput.focus();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderOS(getFilteredOS());
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
    }
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        currentSearch = '';
        renderOS(getFilteredOS());
        searchInput.blur();
    }
});

// ============================================================
// Initialize - Fetch and parse db.sql
// ============================================================
async function init() {
    try {
        // Show loading state
        osGrid.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-secondary);">Loading database...</div>';
        
        // Fetch db.sql
        const response = await fetch('db.sql');
        if (!response.ok) {
            throw new Error(`Failed to load db.sql: ${response.status}`);
        }
        const sql = await response.text();
        
        // Parse SQL
        const { osFamilies, operatingSystems } = parseSQL(sql);
        
        // Transform to website format
        osDatabase = transformData(osFamilies, operatingSystems);
        
        // Render
        renderOS(getFilteredOS());
        
        console.log(`Loaded ${osDatabase.length} operating systems from db.sql`);
    } catch (error) {
        console.error('Error loading database:', error);
        osGrid.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--danger);">
                <h3>Error loading database</h3>
                <p>${error.message}</p>
                <p>Make sure db.sql is accessible.</p>
            </div>
        `;
    }
}

// Start the application
init();
