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
let osDatabase = [];
let searchTerm = '';
let selection = {
    family: '',
    name: '',
    version: '',
    edition: '',
    language: ''
};


// Track which selectors are currently active (have a meaningful selection)
let activeSelectors = new Set();

// ============================================================
 // DOM Elements
// ============================================================
const osGrid = document.getElementById('osGrid');
const noResults = document.getElementById('noResults');
const resultCount = document.getElementById('resultCount');
const familySelect = document.getElementById('familySelect');
const mainSelect = document.getElementById('mainSelect');
const versionSelect = document.getElementById('versionSelect');
const editionSelect = document.getElementById('editionSelect');
const languageSelect = document.getElementById('languageSelect');
const resetBtn = document.getElementById('resetBtn');

// Set data-field for selects
familySelect.dataset.field = 'family';
mainSelect.dataset.field = 'name';
versionSelect.dataset.field = 'version';
editionSelect.dataset.field = 'edition';
languageSelect.dataset.field = 'language';

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
async function validateLink(url) {
  if (!url || url === '#') return false;
  try {
    const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
    return response.ok;
  } catch {
    return false;
  }
}

async function createOSCard(os, index) {
  const eol = isEOL(os.eosDate);
  const initialWorking = os.downloadUrl ? 'pending' : false;
  const ltsTag = os.isLTS ? `<span class="tag tag-lts">LTS</span>` : '';
  const eolTag = eol ? `<span class="tag tag-eol">EOL</span>` : '';
  const supportedTag = !eol && os.isSupported ? `<span class="tag tag-supported">Supported</span>` : '';
  const codenameHtml = os.codename ? `<span class="os-codename">${os.codename}</span>` : '';

  const card = document.createElement('article');
  card.className = `os-card${eol ? ' os-card--eol' : ''}`;
  card.style.animationDelay = `${index * 40}ms`;
  card.dataset.url = os.downloadUrl || '';
  card.innerHTML = `
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
      <span class="meta-item">${os.edition}</span>
      <span class="meta-item">${os.language}</span>
    </div>
    <p class="os-description">${os.description}</p>
    <a href="${os.downloadUrl || '#'}" class="download-btn${eol ? ' download-btn--eol' : ''} download-btn--pending" target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7,10 12,15 17,10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      ${!os.downloadUrl ? 'No Download Link' : (eol ? 'Download (EOL)' : 'Checking...')}
    </a>
  `;

  // Validate link async
  if (os.downloadUrl) {
    setTimeout(async () => {
      const working = await validateLink(os.downloadUrl);
      const btn = card.querySelector('.download-btn');
      if (btn) {
        btn.classList.remove('download-btn--pending');
        if (working) {
          btn.classList.add('download-btn--working');
          btn.textContent = btn.textContent.replace('Checking...', eol ? 'Download (EOL)' : 'Download ISO');
        } else {
          btn.classList.add('download-btn--disabled');
          btn.textContent = btn.textContent.replace('Checking...', 'Link Not Available');
        }
      }
    }, 100 + index * 50); // Staggered check
  }

  return card;
}

// ============================================================
// Render OS Cards
// ============================================================
async function renderOS(osList) {
    if (osList.length === 0) {
        osGrid.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        // Virtual pagination - show first 50 only
        const pageSize = 50;
        const page1 = osList.slice(0, pageSize);
        osGrid.innerHTML = '';
        for (let i = 0; i < page1.length; i++) {
            const card = await createOSCard(page1[i], i);
            osGrid.appendChild(card);
        }
        
        // Load More button
        const loadMore = document.createElement('button');
        loadMore.textContent = `Load More (${osList.length - pageSize} remaining)`;
        loadMore.className = 'load-more-btn';
        loadMore.onclick = () => loadMoreResults(osList, pageSize);
        osGrid.appendChild(loadMore);
    }
    resultCount.textContent = osList.length;
}

let currentOffset = 50;

function loadMoreResults(fullList, pageSize) {
    const more = fullList.slice(currentOffset, currentOffset + pageSize);
    if (more.length === 0) return;
    
    more.forEach((os, idx) => {
        const card = document.createElement('article');
        card.className = 'os-card';
        card.style.animationDelay = '0ms';
        card.innerHTML = createOSCard(os, 0).slice(0, -7); // remove </article>
        osGrid.insertBefore(card, osGrid.lastElementChild);
    });
    currentOffset += pageSize;
    
    // Update button
    const btn = osGrid.querySelector('.load-more-btn');
    const remaining = fullList.length - currentOffset;
    if (remaining > 0) {
        btn.textContent = `Load More (${remaining} remaining)`;
    } else {
        btn.remove();
    }
}

// ============================================================
 // Search Function (fuzzy match on key fields)
 // ============================================================
function performSearch(query, data) {
    if (!query.trim()) return data;
    const q = query.toLowerCase().trim();
    return data.filter(os => 
        os.name.toLowerCase().includes(q) ||
        os.version.toLowerCase().includes(q) ||
        (os.edition || '').toLowerCase().includes(q) ||
        (os.description || '').toLowerCase().includes(q) ||
        os.family.toLowerCase().includes(q) ||
        os.language.toLowerCase().includes(q)
    );
}

// ============================================================
 // Filter Data (search first, then selectors)
 // ============================================================
function getFilteredData() {
    let filtered = osDatabase;
    if (searchTerm) {
        filtered = performSearch(searchTerm, filtered);
    }
    return filtered.filter(os => 
        (!selection.family || os.family === selection.family) &&
        (!selection.name || os.name === selection.name) &&
        (!selection.version || os.version === selection.version) &&
        (!selection.edition || (os.edition || 'Standard') === selection.edition) &&
        (!selection.language || os.language === selection.language)
    );
}


// ============================================================
 // Helper Functions
// ============================================================
function getUniqueFieldValues(field, filtered = osDatabase) {
    const values = filtered.map(os => {
        if (field === 'edition') return os.edition || 'Standard';
        if (field === 'language') return os.language || 'English';
        if (field === 'family') return os.family;
        return os[field];
    }).filter(v => v);
    return [...new Set(values)].sort();
}

function populateSelect(select, options, prompt = 'Select...') {
    select.innerHTML = `<option value="">${prompt}</option>` +
        options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
}

const selectOrder = ['familySelect', 'mainSelect', 'versionSelect', 'editionSelect', 'languageSelect'];

function getNextSelectId(currentId) {
    const index = selectOrder.indexOf(currentId);
    return index < selectOrder.length - 1 ? selectOrder[index + 1] : null;
}

function enableSelect(selectId, enabled = true) {
    const select = document.getElementById(selectId);
    if (select) select.disabled = !enabled;
}

function resetSelectorsAfter(currentSelectId) {
    const nextId = getNextSelectId(currentSelectId);
    if (nextId) {
        const nextSelect = document.getElementById(nextId);
        nextSelect.value = '';
        enableSelect(nextId, false);
        // Clear selection and active state for this field
        const nextField = nextSelect.dataset.field;
        selection[nextField] = '';
        activeSelectors.delete(nextField);
        resetSelectorsAfter(nextId);
    }
}

// ============================================================
  // Hierarchical Select Event Listeners
// ============================================================
function onSelectChange(e) {
    const select = e.target;
    const field = select.dataset.field;
    const value = select.value || '';
    selection[field] = value;

    if (value) {
        activeSelectors.add(field);
    } else {
        activeSelectors.delete(field);
    }

    // Reset and disable subsequent selectors
    resetSelectorsAfter(select.id);

    // If selection made, populate next selector
    if (value) {
        const nextId = getNextSelectId(select.id);
        if (nextId) {
            const filtered = getFilteredData();
            const nextField = document.getElementById(nextId).dataset.field;
            const options = getUniqueFieldValues(nextField, filtered);
            if (options.length > 0) {
                populateSelect(document.getElementById(nextId), options);
                enableSelect(nextId, true);
            }
        }
    } else {
        // If cleared, also reset subsequent selectors
        resetSelectorsAfter(select.id);
    }

    // Render filtered results
    renderOS(getFilteredData());
}

function onSearchChange() {
    const query = document.getElementById('searchInput').value;
    searchTerm = query;
    renderOS(getFilteredData());
    // Repopulate selectors based on search results
    const filtered = getFilteredData();
    const families = getUniqueFieldValues('family', filtered);
    populateSelect(familySelect, families, 'All Families');
}


[familySelect, mainSelect, versionSelect, editionSelect, languageSelect].forEach(select => {
    select.addEventListener('change', onSelectChange);
});

// ============================================================
 // Reset All Filters
// ============================================================
function resetAllFilters() {
    searchTerm = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchClear').style.display = 'none';
    selection = { family: '', name: '', version: '', edition: '', language: '' };
    activeSelectors.clear();
    
    selectOrder.forEach(id => {
        const select = document.getElementById(id);
        select.value = '';
        enableSelect(id, id === 'familySelect');
    });
    
    // Repopulate family select
    const families = getUniqueFieldValues('family');
    populateSelect(familySelect, families, 'Select OS Family...');
    
    // Clear results
    renderOS([]);
}


resetBtn.addEventListener('click', resetAllFilters);

// Search input listeners (debounced)
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');

let searchTimeout;
searchInput.addEventListener('input', (e) => {
    searchClear.style.display = e.target.value ? 'block' : 'none';
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(onSearchChange, 300);
});

searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.style.display = 'none';
    onSearchChange();
});

// ============================================================
 // Initialize - Fetch and parse db.sql
// ============================================================
async function init() {

    try {
        // Show loading state
        osGrid.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-secondary);">Loading operating systems...</div>';
        
        // Fetch complete unified database
        const response = await fetch('complete-database.sql');
        if (!response.ok) {
            throw new Error(`Failed to load db.sql: ${response.status} ${response.statusText}`);
        }
        const sql = await response.text();
        
        // Parse SQL
        const { osFamilies, operatingSystems } = parseSQL(sql);
        
        // Transform to website format
        osDatabase = transformData(osFamilies, operatingSystems);
        
        // Populate family selector
        const families = getUniqueFieldValues('family');
        populateSelect(familySelect, families, 'Select OS Family...');
        
        // Initial render - no results
        renderOS([]);
        
        console.log(`Loaded ${osDatabase.length} operating systems from db.sql`);
        console.log('Families loaded:', families.length);
    } catch (error) {
        console.error('Error loading database:', error);
        let errorMessage = error.message;
        if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Cannot load database file. This website must be served via a web server (not opened directly as a file). Use: npx serve';
        }
        osGrid.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--danger);">
                <h3>Error loading database</h3>
                <p>${errorMessage}</p>
            </div>
        `;
    }
}

// Download URLs from database (official/archive sources)

// Start the application
init();

// Update no results text
noResults.innerHTML = `
    <svg class="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
    </svg>
    <h3>No operating systems found</h3>
    <p>Select OS family to begin</p>
`;

