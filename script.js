// OS.click Wizard Logic

let osDatabase = [];
let osFamilies = [];
let currentStage = 'OsFamily';
let selectedFamily = null;
let selectedOsName = null;
let selectedBuild = null;
let selectedArch = null;
let selectedEdition = null;
let selectedLanguage = null;
let selectedOs = null;
let NProgress = window.NProgress;

const appEl = document.getElementById('app');
const startEl = document.getElementById('start');
const familyListContainer = document.getElementById('family-list-container');
const osListContainer = document.getElementById('os-list-container');
const buildListContainer = document.getElementById('build-list-container');
const archListContainer = document.getElementById('arch-list-container');
const editionListContainer = document.getElementById('edition-list-container');
const langListContainer = document.getElementById('lang-list-container');
const downloadStage = document.querySelector('[data-panel="Download"]');

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

const FAMILY_ICONS = {
    'Windows': 'fab fa-microsoft',
    'Linux': 'fab fa-linux',
    'macOS': 'fab fa-apple',
    'Software': 'fas fa-laptop-code'
};

const SOFTWARE_LOGOS = {
    'Visual Studio Code': { icon: 'fas fa-code', color: '#007ACC' },
    'Visual Studio 2022': { icon: 'fas fa-laptop-code', color: '#5C2D91' },
    'Docker Desktop': { icon: 'fab fa-docker', color: '#2496ED' },
    'VMware Workstation Pro': { icon: 'fas fa-server', color: '#60708C' },
    'Zoom Client': { icon: 'fas fa-video', color: '#2D8CFF' },
    'Adobe Acrobat Reader DC': { icon: 'fas fa-file-pdf', color: '#EC1C24' },
    'Adobe Photoshop': { icon: 'fas fa-image', color: '#31A8FF' },
    'Adobe Premiere Pro': { icon: 'fas fa-film', color: '#9999FF' },
    'Adobe Illustrator': { icon: 'fas fa-pen-nib', color: '#FF9A00' },
    'Microsoft Office': { icon: 'fas fa-file-word', color: '#D83B01' },
    'Microsoft Office LTSC': { icon: 'fas fa-file-word', color: '#D83B01' },
    'Google Chrome': { icon: 'fab fa-chrome', color: '#4285F4' },
    'Mozilla Firefox': { icon: 'fab fa-firefox-browser', color: '#FF7139' },
    'Microsoft Edge': { icon: 'fab fa-edge', color: '#0078D7' },
    'Brave Browser': { icon: 'fas fa-shield-alt', color: '#FB542B' },
    'Opera Browser': { icon: 'fab fa-opera', color: '#FF1B2D' },
    'Node.js': { icon: 'fab fa-node-js', color: '#339933' },
    'Python': { icon: 'fab fa-python', color: '#3776AB' },
    'Git': { icon: 'fab fa-git-alt', color: '#F05032' },
    'GitHub Desktop': { icon: 'fab fa-github', color: '#24292E' },
    'OBS Studio': { icon: 'fas fa-broadcast-tower', color: '#302E31' },
    'VLC media player': { icon: 'fas fa-play-circle', color: '#FF8800' },
    '7-Zip': { icon: 'fas fa-file-archive', color: '#2B7D2B' },
    'WinRAR': { icon: 'fas fa-file-archive', color: '#2257B5' },
    'Notepad++': { icon: 'fas fa-file-code', color: '#90E59A' },
    'Postman': { icon: 'fas fa-paper-plane', color: '#FF6C37' },
    'JetBrains IntelliJ IDEA': { icon: 'fas fa-code', color: '#FE2D52' },
    'PyCharm': { icon: 'fas fa-code', color: '#21D789' },
    'WebStorm': { icon: 'fas fa-code', color: '#07C3F2' },
    'CLion': { icon: 'fas fa-code', color: '#314E96' },
    'Fleet': { icon: 'fas fa-rocket', color: '#FE2D52' },
    'Slack': { icon: 'fab fa-slack', color: '#4A154B' },
    'Discord': { icon: 'fab fa-discord', color: '#5865F2' },
    'Spotify': { icon: 'fab fa-spotify', color: '#1DB954' },
    'WhatsApp Desktop': { icon: 'fab fa-whatsapp', color: '#25D366' },
    'Telegram Desktop': { icon: 'fab fa-telegram-plane', color: '#0088CC' },
    'Microsoft Teams': { icon: 'fas fa-users', color: '#6264A7' },
    'Microsoft OneDrive': { icon: 'fas fa-cloud', color: '#0078D4' },
    'Microsoft PowerToys': { icon: 'fas fa-tools', color: '#0078D4' },
    'WinDirStat': { icon: 'fas fa-hdd', color: '#4CAF50' },
    'CPU-Z': { icon: 'fas fa-microchip', color: '#2196F3' },
    'GPU-Z': { icon: 'fas fa-microchip', color: '#FF9800' },
    'CrystalDiskInfo': { icon: 'fas fa-hdd', color: '#00BCD4' },
    'HandBrake': { icon: 'fas fa-blender', color: '#E67E22' },
    'GIMP': { icon: 'fas fa-paint-brush', color: '#8B6914' },
    'Inkscape': { icon: 'fas fa-vector-square', color: '#000000' },
    'Audacity': { icon: 'fas fa-headphones', color: '#0000CC' },
    'LibreOffice': { icon: 'fas fa-file-alt', color: '#18A303' },
    'Thunderbird': { icon: 'fas fa-envelope', color: '#0A84FF' },
    'FileZilla': { icon: 'fas fa-server', color: '#BF0000' },
    'PuTTY': { icon: 'fas fa-terminal', color: '#000000' },
    'Wireshark': { icon: 'fas fa-network-wired', color: '#1679A7' },
    'VirtualBox': { icon: 'fas fa-cube', color: '#183A61' },
    'BalenaEtcher': { icon: 'fas fa-usb', color: '#00AEF0' },
    'Rufus': { icon: 'fab fa-usb', color: '#0066CC' },
    'Steam': { icon: 'fab fa-steam', color: '#1B2838' },
    'Epic Games Launcher': { icon: 'fas fa-gamepad', color: '#2F2F2F' },
    'Blender': { icon: 'fas fa-cube', color: '#E87D0D' },
    'Unity Hub': { icon: 'fas fa-gamepad', color: '#FFFFFF' },
    'Rust': { icon: 'fas fa-cog', color: '#CE422B' },
    'Go': { icon: 'fab fa-golang', color: '#00ADD8' },
    'Java JDK': { icon: 'fab fa-java', color: '#007396' },
    'Ruby': { icon: 'fas fa-gem', color: '#CC342D' },
    'PHP': { icon: 'fab fa-php', color: '#777BB4' },
    'MySQL': { icon: 'fas fa-database', color: '#4479A1' },
    'PostgreSQL': { icon: 'fas fa-database', color: '#336791' },
    'MongoDB': { icon: 'fas fa-leaf', color: '#47A248' },
    'Redis': { icon: 'fas fa-database', color: '#DC382D' },
    'DBeaver': { icon: 'fas fa-database', color: '#382923' },
    'TablePlus': { icon: 'fas fa-database', color: '#007AFF' },
    'Notion': { icon: 'fas fa-sticky-note', color: '#000000' },
    'Obsidian': { icon: 'fas fa-gem', color: '#7C3AED' },
    'Figma Desktop': { icon: 'fab fa-figma', color: '#F24E1E' },
    'Canva Desktop': { icon: 'fas fa-palette', color: '#7D2CFF' },
    'AutoCAD': { icon: 'fas fa-drafting-compass', color: '#E51075' },
    'SketchUp': { icon: 'fas fa-cubes', color: '#005F9E' },
    'Krita': { icon: 'fas fa-paint-brush', color: '#4E9A06' },
    'Darktable': { icon: 'fas fa-camera', color: '#303030' },
    'Shotcut': { icon: 'fas fa-film', color: '#3399FF' },
    'DaVinci Resolve': { icon: 'fas fa-film', color: '#E01E37' },
    'CapCut Desktop': { icon: 'fas fa-video', color: '#000000' },
    'Paint.NET': { icon: 'fas fa-palette', color: '#4A90D9' },
    'IrfanView': { icon: 'fas fa-image', color: '#0066CC' },
    'Sumatra PDF': { icon: 'fas fa-file-pdf', color: '#F5A623' },
    'Foxit Reader': { icon: 'fas fa-file-pdf', color: '#0066CC' },
    'Calibre': { icon: 'fas fa-book', color: '#1F4E79' },
    'KeePassXC': { icon: 'fas fa-key', color: '#6CAC4D' },
    'Bitwarden': { icon: 'fas fa-shield-alt', color: '#175DDC' },
    'qBittorrent': { icon: 'fas fa-download', color: '#2D9B45' },
    'Transmission': { icon: 'fas fa-download', color: '#000000' },
    'JDownloader 2': { icon: 'fas fa-download', color: '#2E8B57' },
    'Internet Download Manager': { icon: 'fas fa-download', color: '#0078D4' },
    'HWMonitor': { icon: 'fas fa-thermometer-half', color: '#FF6600' },
    'Speccy': { icon: 'fas fa-desktop', color: '#0078D4' },
    'CCleaner': { icon: 'fas fa-broom', color: '#CC513F' },
    'Malwarebytes': { icon: 'fas fa-shield-alt', color: '#0D47A1' },
    'Avast Free Antivirus': { icon: 'fas fa-shield-alt', color: '#FF6600' },
    'NVIDIA GeForce Experience': { icon: 'fas fa-microchip', color: '#76B900' },
    'AMD Adrenalin': { icon: 'fas fa-microchip', color: '#ED1C24' },
    'Logitech G Hub': { icon: 'fas fa-mouse', color: '#00B8FC' },
    'Razer Synapse': { icon: 'fas fa-keyboard', color: '#44D62C' },
    'OBS Virtual Camera': { icon: 'fas fa-video', color: '#302E31' },
    'ZoomIt': { icon: 'fas fa-search-plus', color: '#0078D4' },
    'ShareX': { icon: 'fas fa-camera', color: '#2980B9' },
    'Greenshot': { icon: 'fas fa-camera', color: '#4CAF50' },
    'PowerShell': { icon: 'fas fa-terminal', color: '#5391FE' },
    'Windows Terminal': { icon: 'fas fa-terminal', color: '#4D4D4D' },
    'Neovim': { icon: 'fas fa-terminal', color: '#57A143' },
    'Sublime Text': { icon: 'fas fa-file-code', color: '#FF9800' },
    'Atom': { icon: 'fas fa-atom', color: '#66595C' },
    'Android Studio': { icon: 'fab fa-android', color: '#3DDC84' },
    'XAMPP': { icon: 'fas fa-server', color: '#FB7A24' },
    'WampServer': { icon: 'fas fa-server', color: '#2E8B57' },
    'Local (by Flywheel)': { icon: 'fab fa-wordpress', color: '#21759B' },
    'Sourcetree': { icon: 'fas fa-code-branch', color: '#0052CC' },
    'TortoiseGit': { icon: 'fab fa-git-alt', color: '#4A90D9' },
    'Beyond Compare': { icon: 'fas fa-columns', color: '#2196F3' },
    'Everything': { icon: 'fas fa-search', color: '#2196F3' },
    'Listary': { icon: 'fas fa-search', color: '#FF6600' },
    'AutoHotkey': { icon: 'fas fa-keyboard', color: '#339933' },
    'KeyTweak': { icon: 'fas fa-keyboard', color: '#4CAF50' },
    'PostgreSQL': { icon: 'fas fa-database', color: '#336791' }
};

function getSoftwareLogo(name) {
    const logo = SOFTWARE_LOGOS[name];
    if (logo) return logo;
    return null;
}

const DEFAULT_FAMILIES = [
    { id: '1', name: 'Windows', icon: '🪟' },
    { id: '2', name: 'Linux', icon: '🐧' },
    { id: '3', name: 'macOS', icon: '🍎' },
    { id: '4', name: 'Software', icon: '💻' }
];

const STAGE_ORDER = ['OsFamily', 'Os', 'Build', 'Architecture', 'Edition', 'Language', 'Download'];

function np(action, ...args) {
    if (typeof NProgress !== 'undefined' && NProgress && typeof NProgress[action] === 'function') {
        NProgress[action](...args);
    }
}

function getStageContainer(stage) {
    const map = {
        'OsFamily': familyListContainer,
        'Os': osListContainer,
        'Build': buildListContainer,
        'Architecture': archListContainer,
        'Edition': editionListContainer,
        'Language': langListContainer
    };
    return map[stage];
}

function getFilteredEntries() {
    let entries = osDatabase.filter(os => os.family === selectedFamily);
    if (selectedOsName) entries = entries.filter(os => os.name === selectedOsName);
    if (selectedBuild) entries = entries.filter(os => os.version === selectedBuild);
    if (selectedArch) entries = entries.filter(os => os.architecture === selectedArch);
    if (selectedEdition) entries = entries.filter(os => os.edition === selectedEdition);
    if (selectedLanguage) entries = entries.filter(os => os.language === selectedLanguage);
    return entries;
}

function getUniqueValues(entries, field) {
    return [...new Set(entries.map(e => e[field]).filter(Boolean))];
}

function renderRadioList(container, items, namePrefix, iconClass, onSelect, softwareName) {
    const html = items.map(item => {
        const count = typeof item === 'object' ? item.count : '';
        const label = typeof item === 'object' ? item.value : item;
        const countText = count ? ` ${count} item${count > 1 ? 's' : ''}` : '';

        let iconHtml;
        const logo = getSoftwareLogo(label);
        if (logo) {
            iconHtml = `<span class="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg" style="background:${logo.color}"><i class="${logo.icon}" style="color:#fff;font-size:1rem"></i></span>`;
        } else {
            iconHtml = `<span class="inline-flex text-2xl md:text-3xl"><i class="${iconClass}"></i></span>`;
        }

        return `
        <li class="mb-3 last:mb-0">
            <label class="group flex cursor-pointer items-center space-x-2 rounded-2xl border-2 border-amethyst-300 p-4 text-lg font-medium text-amethyst-500 hover:border-amethyst-800 aria-selected:border-amethyst-400 aria-selected:bg-amethyst-50 [&[aria-selected]]:hover:border-amethyst-800" aria-selected="false">
                <input type="radio" name="item-${namePrefix}" value="${label}" class="appearance-none border-2 border-amethyst-200 checked:border-amethyst-300 checked:bg-amethyst-500 group-hover:border-amethyst-800" required>
                ${iconHtml}
                <span class="flex w-full items-center justify-between text-lg md:text-xl">
                    <span class="flex flex-col items-start"><span>${label}</span></span>
                    ${countText ? `<span class="text-sm text-amethyst-400">${countText}</span>` : ''}
                </span>
            </label>
        </li>`;
    }).join('');

    container.innerHTML = html;

    container.querySelectorAll(`input[name="item-${namePrefix}"]`).forEach(radio => {
        radio.addEventListener('change', onSelect);
    });
}

function advanceStage(fromStage) {
    const idx = STAGE_ORDER.indexOf(fromStage);
    if (idx < STAGE_ORDER.length - 2) {
        currentStage = STAGE_ORDER[idx + 1];
    } else {
        currentStage = 'Download';
    }
    updateWizard();
    np('done');
}

async function init() {
    np('configure', { showSpinner: false });
    np('start');

    osFamilies = [...DEFAULT_FAMILIES];
    populateFamilyOptions();

    let pageData = null;
    try {
        pageData = JSON.parse(appEl.dataset.page);
    } catch (e) {
        console.warn('Failed to parse page data:', e.message);
        pageData = { props: { popularOs: [], isoCount: 4441 } };
    }

    try {
        await loadDatabase();
    } catch (dbError) {
        console.warn('DB load failed, using defaults:', dbError.message);
    }

    setupEventListeners();
    setupPopularLinks(pageData.props.popularOs);
    updateIsoCount(pageData.props.isoCount);
    console.log('OS.click ready:', osDatabase.length, 'entries');
    np('done');
}

async function loadDatabase() {
    const response = await fetch('database.sql');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    let sql = await response.text();
    sql = sql.replace(/^\uFEFF/, '');

    const families = parseFamilies(sql);
    if (families.length > 0) osFamilies = families;

    osDatabase = parseOperatingSystems(sql);

    osDatabase.forEach(os => {
        const family = osFamilies.find(f => f.id == os.family_id);
        os.family = family ? family.name : 'Unknown';
        os.familyIcon = family ? family.icon : '?';
    });

    populateFamilyOptions();
    console.log(`Parsed ${osFamilies.length} families, ${osDatabase.length} OS entries`);
}

function parseFamilies(sql) {
    const families = [];
    const regex = /INSERT INTO os_families.*?VALUES\s*(.*?);/gs;
    let match;
    while ((match = regex.exec(sql)) !== null) {
        const rows = extractValues(match[1]);
        rows.forEach(row => {
            const vals = parseRowValues(row);
            if (vals.length >= 3) {
                families.push({ id: vals[0], name: vals[1], icon: vals[2] });
            }
        });
    }
    return families;
}

function parseOperatingSystems(sql) {
    const entries = [];
    const regex = /INSERT INTO operating_systems.*?VALUES\s*(.*?);/gs;
    let match;
    while ((match = regex.exec(sql)) !== null) {
        const rows = extractValues(match[1]);
        rows.forEach(row => {
            const vals = parseRowValues(row);
            if (vals.length >= 14) {
                entries.push({
                    family_id: vals[0],
                    name: vals[1],
                    version: vals[2],
                    codename: vals[3] || null,
                    architecture: vals[4] || '64-bit',
                    size_gb: parseFloat(vals[5]) || 0,
                    description: vals[6] || '',
                    release_date: vals[7] || null,
                    eos_date: vals[8] || null,
                    is_lts: parseInt(vals[9]) || 0,
                    is_supported: parseInt(vals[10]) !== 0,
                    language: vals[11] || 'English',
                    edition: vals[12] || 'Standard',
                    download_url: vals[13] || ''
                });
            }
        });
    }
    return entries;
}

function extractValues(str) {
    const rows = [];
    let depth = 0;
    let current = '';
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (ch === '(') {
            depth++;
            if (depth === 1) { current = ''; continue; }
        }
        if (ch === ')') {
            depth--;
            if (depth === 0) { rows.push(current); current = ''; continue; }
        }
        if (depth >= 1) current += ch;
    }
    return rows;
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

function cleanValue(v) {
    v = v.trim();
    if (v === 'NULL') return null;
    if ((v.startsWith("'") && v.endsWith("'")) || (v.startsWith('"') && v.endsWith('"'))) {
        return v.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"');
    }
    return v;
}

function getFamilyIcon(familyName) {
    return FAMILY_ICONS[familyName] || 'fas fa-circle-question';
}

function populateFamilyOptions() {
    renderRadioList(familyListContainer, osFamilies.map(f => f.name), 'OsFamily', getFamilyIcon(osFamilies[0]?.name || 'Windows'), handleFamilySelect);
}

function handleFamilySelect(e) {
    selectedFamily = e.target.value;
    selectedOsName = null;
    selectedBuild = null;
    selectedArch = null;
    selectedEdition = null;
    selectedLanguage = null;
    selectedOs = null;
    np('start');

    familyListContainer.querySelectorAll('input[name="item-OsFamily"]').forEach(r => {
        r.closest('li').setAttribute('aria-selected', r === e.target ? 'true' : 'false');
    });

    setTimeout(() => {
        currentStage = 'Os';
        updateWizard();
        populateOsOptions();
        np('done');
    }, 300);
}

function populateOsOptions() {
    const filtered = osDatabase.filter(os => os.family === selectedFamily);
    const nameCounts = {};
    filtered.forEach(os => { nameCounts[os.name] = (nameCounts[os.name] || 0) + 1; });
    const uniqueNames = [...new Set(filtered.map(os => os.name))];
    const items = uniqueNames.map(name => ({ value: name, count: nameCounts[name] }));

    renderRadioList(osListContainer, items, 'Os', getFamilyIcon(selectedFamily), handleOsSelect);
}

function handleOsSelect(e) {
    selectedOsName = e.target.value;
    selectedBuild = null;
    selectedArch = null;
    selectedEdition = null;
    selectedLanguage = null;
    selectedOs = null;
    np('start');

    osListContainer.querySelectorAll('input[name="item-Os"]').forEach(r => {
        r.closest('li').setAttribute('aria-selected', r === e.target ? 'true' : 'false');
    });

    setTimeout(() => {
        currentStage = 'Build';
        updateWizard();
        populateBuildOptions();
        np('done');
    }, 300);
}

function populateBuildOptions() {
    const filtered = getFilteredEntries();
    const builds = getUniqueValues(filtered, 'version');
    const buildCounts = {};
    filtered.forEach(os => { buildCounts[os.version] = (buildCounts[os.version] || 0) + 1; });
    const items = builds.map(v => ({ value: v, count: buildCounts[v] }));

    renderRadioList(buildListContainer, items, 'Build', getFamilyIcon(selectedFamily), handleBuildSelect);
}

function handleBuildSelect(e) {
    selectedBuild = e.target.value;
    selectedArch = null;
    selectedEdition = null;
    selectedLanguage = null;
    selectedOs = null;
    np('start');

    buildListContainer.querySelectorAll('input[name="item-Build"]').forEach(r => {
        r.closest('li').setAttribute('aria-selected', r === e.target ? 'true' : 'false');
    });

    setTimeout(() => {
        currentStage = 'Architecture';
        updateWizard();
        populateArchOptions();
        np('done');
    }, 300);
}

function populateArchOptions() {
    const filtered = getFilteredEntries();
    const archs = getUniqueValues(filtered, 'architecture');
    const archCounts = {};
    filtered.forEach(os => { archCounts[os.architecture] = (archCounts[os.architecture] || 0) + 1; });
    const items = archs.map(v => ({ value: v, count: archCounts[v] }));

    renderRadioList(archListContainer, items, 'Architecture', getFamilyIcon(selectedFamily), handleArchSelect);
}

function handleArchSelect(e) {
    selectedArch = e.target.value;
    selectedEdition = null;
    selectedLanguage = null;
    selectedOs = null;
    np('start');

    archListContainer.querySelectorAll('input[name="item-Architecture"]').forEach(r => {
        r.closest('li').setAttribute('aria-selected', r === e.target ? 'true' : 'false');
    });

    setTimeout(() => {
        currentStage = 'Edition';
        updateWizard();
        populateEditionOptions();
        np('done');
    }, 300);
}

function populateEditionOptions() {
    const filtered = getFilteredEntries();
    const editions = getUniqueValues(filtered, 'edition');
    const editionCounts = {};
    filtered.forEach(os => { editionCounts[os.edition] = (editionCounts[os.edition] || 0) + 1; });
    const items = editions.map(v => ({ value: v, count: editionCounts[v] }));

    renderRadioList(editionListContainer, items, 'Edition', getFamilyIcon(selectedFamily), handleEditionSelect);
}

function handleEditionSelect(e) {
    selectedEdition = e.target.value;
    selectedLanguage = null;
    selectedOs = null;
    np('start');

    editionListContainer.querySelectorAll('input[name="item-Edition"]').forEach(r => {
        r.closest('li').setAttribute('aria-selected', r === e.target ? 'true' : 'false');
    });

    setTimeout(() => {
        currentStage = 'Language';
        updateWizard();
        populateLangOptions();
        np('done');
    }, 300);
}

function populateLangOptions() {
    const filtered = getFilteredEntries();
    const langs = getUniqueValues(filtered, 'language');
    const langCounts = {};
    filtered.forEach(os => { langCounts[os.language] = (langCounts[os.language] || 0) + 1; });
    const items = langs.map(v => ({ value: v, count: langCounts[v] }));

    renderRadioList(langListContainer, items, 'Language', getFamilyIcon(selectedFamily), handleLangSelect);
}

function handleLangSelect(e) {
    selectedLanguage = e.target.value;
    np('start');

    langListContainer.querySelectorAll('input[name="item-Language"]').forEach(r => {
        r.closest('li').setAttribute('aria-selected', r === e.target ? 'true' : 'false');
    });

    setTimeout(() => {
        const matches = getFilteredEntries();
        selectedOs = matches[0] || null;

        currentStage = 'Download';
        updateWizard();
        populateDownloadPanel();
        np('done');
    }, 300);
}

function updateWizard() {
    STAGE_ORDER.forEach((stage, idx) => {
        const el = document.querySelector(`[data-stage="${stage}"]`);
        if (!el) return;

        const stageIdx = STAGE_ORDER.indexOf(currentStage);

        if (stage === currentStage) {
            el.style.display = '';
            el.dataset.current = 'true';
        } else {
            el.style.display = 'none';
            el.dataset.current = 'false';
        }
    });

    if (currentStage === 'Download') {
        downloadStage.style.display = '';
        downloadStage.dataset.current = 'true';
        downloadStage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        downloadStage.style.display = 'none';
        downloadStage.dataset.current = 'false';
        const activeStage = document.querySelector(`[data-stage="${currentStage}"]`);
        if (activeStage) activeStage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const lastStage = currentStage === 'Download';
    startEl.dataset.lastStage = lastStage;
}

function populateDownloadPanel() {
    if (!selectedOs) return;

    selectedNameEl.textContent = selectedOs.name;
    selectedVersionEl.textContent = selectedOs.version || '';
    isoSizeEl.textContent = selectedOs.size_gb ? `${selectedOs.size_gb.toFixed(1)} GB` : 'Unknown';
    isoArchEl.textContent = selectedOs.architecture || '64-bit';
    isoLangEl.textContent = selectedOs.language || 'English';
    isoEditionEl.textContent = selectedOs.edition || 'Standard';

    checksumEl.textContent = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

    downloadLinkEl.href = selectedOs.download_url || '#';
}

function copyChecksum() {
    const text = checksumEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const original = copyChecksumBtn.innerHTML;
        copyChecksumBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyChecksumBtn.innerHTML = original;
        }, 1500);
    });
}

function resetWizard() {
    np('start');
    currentStage = 'OsFamily';
    selectedFamily = null;
    selectedOsName = null;
    selectedBuild = null;
    selectedArch = null;
    selectedEdition = null;
    selectedLanguage = null;
    selectedOs = null;

    familyListContainer.querySelectorAll('input[name="item-OsFamily"]').forEach(r => {
        r.checked = false;
        r.closest('li').setAttribute('aria-selected', 'false');
    });
    osListContainer.innerHTML = '';
    buildListContainer.innerHTML = '';
    archListContainer.innerHTML = '';
    editionListContainer.innerHTML = '';
    langListContainer.innerHTML = '';

    setTimeout(() => {
        updateWizard();
        startEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        np('done');
    }, 300);
}

function scrollToWizard() {
    startEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setupEventListeners() {
    if (copyChecksumBtn) copyChecksumBtn.addEventListener('click', copyChecksum);
    if (newSearchBtn) newSearchBtn.addEventListener('click', resetWizard);

    const heroBtn = document.getElementById('hero-get-iso-btn');
    if (heroBtn) heroBtn.addEventListener('click', scrollToWizard);

    const footerBtn = document.getElementById('footer-get-iso-btn');
    if (footerBtn) footerBtn.addEventListener('click', scrollToWizard);
}

function setupPopularLinks(popularOs) {
    const headerList = document.getElementById('popular-os-links');
    const footerList = document.getElementById('footer-popular-os-links');

    if (!headerList || !footerList) return;

    const html = popularOs.map(os =>
        `<li class="inline-block"><a class="mb-2 mr-2 block rounded-full bg-amethyst-800 px-5 py-2 text-white hover:bg-white hover:text-amethyst-500 focus:outline-none focus:ring-2 focus:ring-amethyst-300" href="#" data-family="${os.family}" data-os="${os.name}">${os.name}</a></li>`
    ).join('');

    headerList.innerHTML = html;
    footerList.innerHTML = html;

    document.querySelectorAll('#popular-os-links a, #footer-popular-os-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const family = link.dataset.family;
            const osName = link.dataset.os;

            const familyRadio = document.querySelector(`input[name="item-OsFamily"][value="${family}"]`);
            if (familyRadio) {
                familyRadio.checked = true;
                familyRadio.dispatchEvent(new Event('change', { bubbles: true }));

                setTimeout(() => {
                    const osRadio = Array.from(osListContainer.querySelectorAll('input[name="item-Os"]'))
                        .find(r => r.value === osName);
                    if (osRadio) {
                        osRadio.checked = true;
                        osRadio.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }, 400);
            }
        });
    });
}

function updateIsoCount(count) {
    const heroCount = document.getElementById('iso-count-hero');
    const footerCount = document.getElementById('iso-count-footer');
    if (heroCount) heroCount.textContent = count;
    if (footerCount) footerCount.textContent = count;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.OSClick = { osDatabase, osFamilies, currentStage, selectedOs };
