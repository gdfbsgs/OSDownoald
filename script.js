// OS.click Wizard Logic
// Parses SQL → Inertia props → Wizard state machine → Download panel

// Globals
let osDatabase = [];
let currentStage = 'OsFamily';
let selectedOs = null;
let NProgress = window.NProgress;

// DOM Elements
const appEl = document.getElementById('app');
const startEl = document.getElementById('start');
const osOptionsEl = document.getElementById('os-options');
const downloadEl = document.getElementById('download');

// Stage elements
const familyStage = document.querySelector('[data-stage="OsFamily"]');
const osStage = document.querySelector('[data-stage="Os"]');
const downloadStage = document.querySelector('[data-stage="Download"]');

// Download panel elements
const selectedIconEl = document.getElementById('selected-os-icon');
const selectedNameEl = document.getElementById('selected-os-name');
const selectedVersionEl = document.getElementById('selected-os-version');
const isoSizeEl = document.getElementById('iso-size');
const isoArchEl = document.getElementById('iso-arch');
const isoLangEl = document.getElementById('iso-lang');
const isoEditionEl = document.getElementById('iso-edition');
const checksumEl = document.getElementById('checksum');
const downloadLinkEl = document.getElementById('download-link');
const copyChecksumBtn = document.getElementById('copy-checksum');
const newSearchBtn = document.getElementById('new-search');

// Init
async function init() {
    NProgress.configure({ showSpinner: false });
    NProgress.start();
    
    try {
        // Parse Inertia data-page
        const pageData = JSON.parse(appEl.dataset.page);
        console.log('OS.click loaded:', pageData.isoCount, 'ISOs');
        
        // Load & parse database
        await loadDatabase();
        
        // Setup event listeners
        setupEventListeners();
        
        // Setup popular links
        setupPopularLinks();
        
        NProgress.done();
    } catch (error) {
        console.error('Init failed:', error);
        NProgress.done(true);
    }
}

// Load and parse SQL database
async function loadDatabase() {
    const response = await fetch('complete-database.sql');
    const sql = await response.text();
    const parsed = parseSQL(sql);
    osDatabase = transformData(parsed.osFamilies, parsed.operatingSystems);
    console.log(`Parsed ${osDatabase.length} OS entries`);
}

// Simplified SQL parser (from original)
function parseSQL(sql) {
    const osFamilies = [];
    const operatingSystems = [];
    
    // Families
    const familyRegex = /INSERT INTO os_families.*?VALUES\s*(.*?);/s;
    const familyMatch = familyRegex.exec(sql);
    if (familyMatch) {
        const rows = familyMatch[1].match(/\([^)]+\)/g) || [];
        rows.forEach(row => {
            const values = row.slice(1, -1).split(',').map(v => v.trim().replace(/^['"](.*)['"]$/, '$1'));
            if (values[1]) osFamilies.push({ id: values[0], name: values[1], icon: values[2] });
        });
    }
    
    // OS entries (first 1000 for perf)
    const osRegex = /INSERT INTO operating_systems.*?VALUES\s*(.*?);/s;
    const osMatch = osRegex.exec(sql);
    if (osMatch) {
        const rows = osMatch[1].match(/\([^)]+\)/g) || [];
        rows.slice(0, 1000).forEach(row => {  // Limit for perf
            const values = row.slice(1, -1).split(',').map(v => {
                v = v.trim();
                if ((v.startsWith("'") && v.endsWith("'")) || (v.startsWith('"') && v.endsWith('"')))
                    v = v.slice(1, -1);
                return v === 'NULL' ? null : v;
            });
            operatingSystems.push({
                family_id: values[0],
                name: values[2],
                version: values[3],
                architecture: values[5],
                size_gb: parseFloat(values[6]) || 0,
                edition: values[13] || 'Standard',
                language: values[12] || 'English',
                download_url: values[14]
            });
        });
    }
    
    return { osFamilies, operatingSystems };
}

// Transform data
function transformData(families, osList) {
    const familyMap = {};
    families.forEach(f => familyMap[f.id] = f);
    
    return osList.map(os => ({
        ...os,
        family: familyMap[os.family_id]?.name || 'Unknown',
        familyIcon: familyMap[os.family_id]?.icon || '❓',
        size: os.size_gb ? `${os.size_gb.toFixed(1)} GB` : 'Unknown',
        fullName: `${os.name} ${os.version}`
    }));
}

// Setup all event listeners
function setupEventListeners() {
    // Family radios
    document.querySelectorAll('input[name="family"]').forEach(radio => {
        radio.addEventListener('change', handleFamilySelect);
    });
    
    // Copy checksum
    copyChecksumBtn.addEventListener('click', copyChecksum);
    
    // New search
    newSearchBtn.addEventListener('click', resetWizard);
    
    // Lang toggle (placeholder)
    document.getElementById('lang-toggle')?.addEventListener('click', () => {
        alert('Language switcher coming soon!');
    });
}

// Family selection handler
function handleFamilySelect(e) {
    const family = e.target.value;
    NProgress.start();
    
    setTimeout(() => {
        currentStage = 'Os';
        updateWizard();
        
        // Populate OS options for family
        populateOsOptions(family);
        
        NProgress.done();
    }, 600);
}

// Populate OS stage with family options
function populateOsOptions(family) {
    const familyOs = osDatabase.filter(os => os.family === family);
    const uniqueOs = [...new Set(familyOs.map(os => os.fullName))].slice(0, 12);
    
    osOptionsEl.innerHTML = uniqueOs.map(osName => `
        <label class="os-radio w-full group cursor-pointer p-6 rounded-2xl border-2 border-transparent hover:border-emerald-500/50 bg-white/5 backdrop-blur-sm transition-all hover:shadow-xl hover:scale-[1.01] block">
            <input type="radio" name="os" value="${osName}" class="sr-only" required data-os-name="${osName}">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 ${family === 'Windows' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : family === 'Linux' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-gray-500 to-gray-600'} rounded-xl flex items-center justify-center shadow-xl flex-shrink-0">
                    <span class="text-2xl">${family === 'Windows' ? '🪟' : family === 'Linux' ? '🐧' : '🍎'}</span>
                </div>
                <div class="min-w-0 flex-1">
                    <div class="text-xl font-bold text-white truncate group-hover:text-emerald-300">${osName}</div>
                    <div class="text-slate-400 text-sm mt-1 flex items-center gap-2">
                        <i class="fas fa-check-circle text-emerald-400"></i>
                        ${Math.min(familyOs.filter(f => f.fullName === osName).length, 99)}+ editions available
                    </div>
                </div>
            </div>
        </label>
    `).join('');
    
    // OS radio handlers
    osOptionsEl.querySelectorAll('input[name="os"]').forEach(radio => {
        radio.addEventListener('change', handleOsSelect);
    });
}

// OS selection handler
function handleOsSelect(e) {
    const osName = e.target.dataset.osName;
    NProgress.start();
    
    setTimeout(() => {
        // Find best matching OS (English Pro 64-bit preferred)
        const matches = osDatabase.filter(os => os.fullName === osName);
        selectedOs = matches.find(os => 
            os.language === 'English' && 
            os.edition === 'Pro' && 
            os.architecture === '64-bit'
        ) || matches.find(os => os.language === 'en-US') || matches[0];
        
        currentStage = 'Download';
        updateWizard();
        populateDownloadPanel();
        
        NProgress.done();
    }, 800);
}

// Update wizard UI state
function updateWizard() {
    const stages = ['OsFamily', 'Os', 'Download'];
    stages.forEach((stage, index) => {
        const el = document.querySelector(`[data-stage="${stage}"]`);
        const isCurrent = stage === currentStage;
        
        el.classList.toggle('hidden', !isCurrent);
        el.classList.toggle('scale-95', !isCurrent);
        el.classList.toggle('opacity-0', !isCurrent);
        el.classList.toggle('invisible', !isCurrent);
        
        if (isCurrent) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            startEl.dataset.current = stage;
        }
    });
}

// Populate download panel
function populateDownloadPanel() {
    if (!selectedOs) return;
    
    selectedIconEl.innerHTML = `<span class="text-2xl">${selectedOs.familyIcon}</span>`;
    selectedIconEl.className = `w-16 h-16 ${selectedOs.family === 'Windows' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-emerald-500 to-teal-600'} rounded-xl flex items-center justify-center shadow-xl`;
    
    selectedNameEl.textContent = selectedOs.name;
    selectedVersionEl.textContent = selectedOs.version;
    isoSizeEl.textContent = selectedOs.size;
    isoArchEl.textContent = selectedOs.architecture;
    isoLangEl.textContent = selectedOs.language;
    isoEditionEl.textContent = selectedOs.edition;
    
    // Mock SHA256 (in production: compute from file or API)
    checksumEl.value = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    
    downloadLinkEl.href = selectedOs.download_url || '#';
    downloadLinkEl.querySelector('span:last-child').textContent = `Download ISO (${selectedOs.size})`;
}

// Copy checksum
function copyChecksum() {
    checksumEl.select();
    checksumEl.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(checksumEl.value).then(() => {
        const original = copyChecksumBtn.innerHTML;
        copyChecksumBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Copied!';
        copyChecksumBtn.classList.add('bg-green-500');
        setTimeout(() => {
            copyChecksumBtn.innerHTML = original;
            copyChecksumBtn.classList.remove('bg-green-500');
        }, 1500);
    });
}

// Reset wizard
function resetWizard() {
    NProgress.start();
    currentStage = 'OsFamily';
    selectedOs = null;
    setTimeout(() => {
        updateWizard();
        NProgress.done();
    }, 300);
}

// Setup popular quick links
function setupPopularLinks() {
    document.querySelectorAll('.popular-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const osName = btn.dataset.os;
            
            // Simulate family selection (Windows/Ubuntu)
            const family = osName.includes('Windows') ? 'Windows' : 
                          osName.includes('Ubuntu') ? 'Linux' : 'Linux';
            
            // Trigger family radio
            const familyRadio = document.querySelector(`input[value="${family}"]`);
            if (familyRadio) {
                familyRadio.checked = true;
                familyRadio.dispatchEvent(new Event('change', { bubbles: true }));
                
                setTimeout(() => {
                    // Then trigger specific OS
                    const osRadio = Array.from(osOptionsEl.querySelectorAll('input[name="os"]'))
                        .find(r => r.dataset.osName === osName);
                    if (osRadio) {
                        osRadio.checked = true;
                        osRadio.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }, 700);
            }
        });
    });
}

// Start app
init();

// Export for debugging
window.OSClick = { osDatabase, currentStage, selectedOs };
