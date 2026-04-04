// OS.click Wizard Logic

let osDatabase = [];
let osFamilies = [];
let currentStage = 'OsFamily';
let selectedFamily = null;
let selectedOs = null;
let NProgress = window.NProgress;

const appEl = document.getElementById('app');
const startEl = document.getElementById('start');
const familyListContainer = document.getElementById('family-list-container');
const osStage = document.querySelector('[data-stage="Os"]');
const osListContainer = document.getElementById('os-list-container');
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

async function init() {
    NProgress.configure({ showSpinner: false });
    NProgress.start();

    try {
        const pageData = JSON.parse(appEl.dataset.page);
        await loadDatabase();
        populateFamilyOptions();
        setupEventListeners();
        setupPopularLinks(pageData.props.popularOs);
        updateIsoCount(pageData.props.isoCount);
        console.log('OS.click ready:', osDatabase.length, 'entries');
        NProgress.done();
    } catch (error) {
        console.error('Init failed:', error);
        NProgress.done(true);
    }
}

async function loadDatabase() {
    const response = await fetch('complete-database.sql');
    let sql = await response.text();
    sql = sql.replace(/^\uFEFF/, '');

    osFamilies = parseFamilies(sql);
    osDatabase = parseOperatingSystems(sql);

    osDatabase.forEach(os => {
        const family = osFamilies.find(f => f.id === os.family_id);
        os.family = family ? family.name : 'Unknown';
        os.familyIcon = family ? family.icon : '?';
    });

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
            if (vals.length >= 15) {
                entries.push({
                    family_id: vals[0],
                    name: vals[2],
                    version: vals[3],
                    codename: vals[4] || null,
                    architecture: vals[5] || '64-bit',
                    size_gb: parseFloat(vals[6]) || 0,
                    description: vals[7] || '',
                    release_date: vals[8] || null,
                    eos_date: vals[9] || null,
                    is_lts: parseInt(vals[10]) || 0,
                    is_supported: parseInt(vals[11]) !== 0,
                    language: vals[12] || 'English',
                    edition: vals[13] || 'Standard',
                    download_url: vals[14] || ''
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
    const family = osFamilies.find(f => f.name === familyName);
    if (family && family.icon) return family.icon;
    return FAMILY_ICONS[familyName] || 'fas fa-circle-question';
}

function populateFamilyOptions() {
    const html = osFamilies.map(family => `
        <li class="mb-3 last:mb-0">
            <label class="group flex cursor-pointer items-center space-x-2 rounded-2xl border-2 border-amethyst-300 p-4 text-lg font-medium text-amethyst-500 hover:border-amethyst-800 aria-selected:border-amethyst-400 aria-selected:bg-amethyst-50 [&[aria-selected]]:hover:border-amethyst-800" aria-selected="false" for="item-OsFamily-${family.name}">
                <input id="item-OsFamily-${family.name}" class="appearance-none border-2 border-amethyst-200 checked:border-amethyst-300 checked:bg-amethyst-500 group-hover:border-amethyst-800" type="radio" aria-label="${family.name}" name="item-OsFamily" value="${family.name}">
                <span class="inline-flex text-2xl md:text-3xl"><i class="${getFamilyIcon(family.name)}"></i></span>
                <span class="flex w-full items-center justify-between text-lg md:text-xl">
                    <span class="flex flex-col items-start"><span>${family.name}</span></span>
                </span>
            </label>
        </li>
    `).join('');

    familyListContainer.innerHTML = html;

    familyListContainer.querySelectorAll('input[name="item-OsFamily"]').forEach(radio => {
        radio.addEventListener('change', handleFamilySelect);
    });
}

function handleFamilySelect(e) {
    selectedFamily = e.target.value;
    NProgress.start();

    familyListContainer.querySelectorAll('input[name="item-OsFamily"]').forEach(r => {
        r.closest('li').setAttribute('aria-selected', r === e.target ? 'true' : 'false');
    });

    setTimeout(() => {
        currentStage = 'Os';
        updateWizard();
        populateOsOptions(selectedFamily);
        NProgress.done();
    }, 300);
}

function populateOsOptions(family) {
    const familyOs = osDatabase.filter(os => os.family === family);

    const uniqueNames = [...new Map(familyOs.map(os => [os.name, os])).values()];

    const iconClass = getFamilyIcon(family);

    const html = uniqueNames.map(os => {
        const count = familyOs.filter(f => f.name === os.name).length;
        return `
        <li class="mb-3 last:mb-0">
            <label class="group flex cursor-pointer items-center space-x-2 rounded-2xl border-2 border-amethyst-300 p-4 text-lg font-medium text-amethyst-500 hover:border-amethyst-800 aria-selected:border-amethyst-400 aria-selected:bg-amethyst-50 [&[aria-selected]]:hover:border-amethyst-800" aria-selected="false">
                <input type="radio" name="item-Os" value="${os.name}" class="appearance-none border-2 border-amethyst-200 checked:border-amethyst-300 checked:bg-amethyst-500 group-hover:border-amethyst-800" required>
                <span class="inline-flex text-2xl md:text-3xl"><i class="${iconClass}"></i></span>
                <span class="flex w-full items-center justify-between text-lg md:text-xl">
                    <span class="flex flex-col items-start"><span>${os.name}</span></span>
                    <span class="text-sm text-amethyst-400">${count} item${count > 1 ? 's' : ''}</span>
                </span>
            </label>
        </li>`;
    }).join('');

    osListContainer.innerHTML = html;

    osListContainer.querySelectorAll('input[name="item-Os"]').forEach(radio => {
        radio.addEventListener('change', handleOsSelect);
    });
}

function handleOsSelect(e) {
    const osName = e.target.value;
    NProgress.start();

    osListContainer.querySelectorAll('input[name="item-Os"]').forEach(r => {
        r.closest('li').setAttribute('aria-selected', r === e.target ? 'true' : 'false');
    });

    setTimeout(() => {
        const matches = osDatabase.filter(os => os.name === osName && os.family === selectedFamily);

        selectedOs = matches.find(os =>
            os.language === 'English' &&
            os.architecture === '64-bit'
        ) || matches.find(os =>
            os.language === 'en-US' && os.architecture === '64-bit'
        ) || matches.find(os =>
            os.architecture === '64-bit'
        ) || matches[0];

        currentStage = 'Download';
        updateWizard();
        populateDownloadPanel();
        NProgress.done();
    }, 300);
}

function updateWizard() {
    const osFamilyStage = document.querySelector('[data-stage="OsFamily"]');

    if (currentStage === 'OsFamily') {
        osFamilyStage.style.display = '';
        osFamilyStage.dataset.current = 'true';
        osStage.style.display = 'none';
        osStage.dataset.current = 'false';
        downloadStage.style.display = 'none';
        downloadStage.dataset.current = 'false';
    } else if (currentStage === 'Os') {
        osFamilyStage.style.display = 'none';
        osFamilyStage.dataset.current = 'false';
        osStage.style.display = '';
        osStage.dataset.current = 'true';
        downloadStage.style.display = 'none';
        downloadStage.dataset.current = 'false';
        osStage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (currentStage === 'Download') {
        osFamilyStage.style.display = 'none';
        osFamilyStage.dataset.current = 'false';
        osStage.style.display = 'none';
        osStage.dataset.current = 'false';
        downloadStage.style.display = '';
        downloadStage.dataset.current = 'true';
        downloadStage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
    NProgress.start();
    currentStage = 'OsFamily';
    selectedFamily = null;
    selectedOs = null;

    familyListContainer.querySelectorAll('input[name="item-OsFamily"]').forEach(r => {
        r.checked = false;
        r.closest('li').setAttribute('aria-selected', 'false');
    });
    osListContainer.innerHTML = '';

    setTimeout(() => {
        updateWizard();
        startEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        NProgress.done();
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

document.addEventListener('DOMContentLoaded', init);

window.OSClick = { osDatabase, osFamilies, currentStage, selectedOs };
