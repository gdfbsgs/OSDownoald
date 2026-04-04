// OS.click Wizard Logic
// Parses SQL -> Inertia props -> Wizard state machine -> Download panel

let osDatabase = [];
let currentStage = 'OsFamily';
let selectedOs = null;
let NProgress = window.NProgress;

const appEl = document.getElementById('app');
const startEl = document.getElementById('start');
const osStage = document.querySelector('[data-stage="Os"]');
const downloadStage = document.querySelector('[data-stage="Download"]');
const osListContainer = document.getElementById('os-list-container');

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

async function init() {
    NProgress.configure({ showSpinner: false });
    NProgress.start();
    
    try {
        const pageData = JSON.parse(appEl.dataset.page);
        console.log('OS.click loaded:', pageData.props.isoCount, 'ISOs');
        
        await loadDatabase();
        setupEventListeners();
        setupPopularLinks(pageData.props.popularOs);
        updateIsoCount(pageData.props.isoCount);
        
        console.log('OS.click ready!');
        NProgress.done();
    } catch (error) {
        console.error('Init failed:', error);
        NProgress.done(true);
    }
}

async function loadDatabase() {
    const response = await fetch('complete-database.sql');
    const sql = await response.text();
    const parsed = parseSQL(sql);
    osDatabase = transformData(parsed.osFamilies, parsed.operatingSystems);
    console.log(`Parsed ${osDatabase.length} OS entries`);
}

function parseSQL(sql) {
    const osFamilies = [];
    const operatingSystems = [];
    
    const familyRegex = /INSERT INTO os_families.*?VALUES\s*(.*?);/s;
    const familyMatch = familyRegex.exec(sql);
    if (familyMatch) {
        const rows = familyMatch[1].match(/\([^)]+\)/g) || [];
        rows.forEach(row => {
            const values = row.slice(1, -1).split(',').map(v => v.trim().replace(/^['"](.*)['"]$/, '$1'));
            if (values[1]) osFamilies.push({ id: values[0], name: values[1], icon: values[2] });
        });
    }
    
    const osRegex = /INSERT INTO operating_systems.*?VALUES\s*(.*?);/s;
    const osMatch = osRegex.exec(sql);
    if (osMatch) {
        const rows = osMatch[1].match(/\([^)]+\)/g) || [];
        rows.slice(0, 1000).forEach(row => {
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

function transformData(families, osList) {
    const familyMap = {};
    families.forEach(f => familyMap[f.id] = f);
    
    return osList.map(os => ({
        ...os,
        family: familyMap[os.family_id]?.name || 'Unknown',
        familyIcon: familyMap[os.family_id]?.icon || '?',
        size: os.size_gb ? `${os.size_gb.toFixed(1)} GB` : 'Unknown',
        fullName: `${os.name} ${os.version}`
    }));
}

function setupEventListeners() {
    document.querySelectorAll('input[name="item-OsFamily"]').forEach(radio => {
        radio.addEventListener('change', handleFamilySelect);
    });
    
    if (copyChecksumBtn) copyChecksumBtn.addEventListener('click', copyChecksum);
    if (newSearchBtn) newSearchBtn.addEventListener('click', resetWizard);
    
    const heroBtn = document.getElementById('hero-get-iso-btn');
    if (heroBtn) heroBtn.addEventListener('click', scrollToWizard);
    
    const footerBtn = document.getElementById('footer-get-iso-btn');
    if (footerBtn) footerBtn.addEventListener('click', scrollToWizard);
}

function scrollToWizard() {
    startEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleFamilySelect(e) {
    const family = e.target.value;
    NProgress.start();
    
    document.querySelectorAll('input[name="item-OsFamily"]').forEach(r => {
        r.closest('li').setAttribute('aria-selected', r === e.target ? 'true' : 'false');
    });
    
    setTimeout(() => {
        currentStage = 'Os';
        updateWizard();
        populateOsOptions(family);
        NProgress.done();
    }, 400);
}

function populateOsOptions(family) {
    const familyOs = osDatabase.filter(os => os.family === family);
    const uniqueOs = [...new Set(familyOs.map(os => os.fullName))].slice(0, 15);
    
    const iconClass = family === 'Windows' ? 'fa-microsoft' : 'fa-linux';
    
    osListContainer.innerHTML = uniqueOs.map(osName => `
        <li class="mb-3 last:mb-0">
            <label class="group flex cursor-pointer items-center space-x-2 rounded-2xl border-2 border-amethyst-300 p-4 text-lg font-medium text-amethyst-500 hover:border-amethyst-800 aria-selected:border-amethyst-400 aria-selected:bg-amethyst-50 [&[aria-selected]]:hover:border-amethyst-800" aria-selected="false">
                <input type="radio" name="item-Os" value="${osName}" class="appearance-none border-2 border-amethyst-200 checked:border-amethyst-300 checked:bg-amethyst-500 group-hover:border-amethyst-800" required>
                <span class="inline-flex text-2xl md:text-3xl"><i class="fab ${iconClass}"></i></span>
                <span class="flex w-full items-center justify-between text-lg md:text-xl">
                    <span class="flex flex-col items-start"><span>${osName}</span></span>
                </span>
            </label>
        </li>
    `).join('');
    
    osListContainer.querySelectorAll('input[name="item-Os"]').forEach(radio => {
        radio.addEventListener('change', handleOsSelect);
    });
}

function handleOsSelect(e) {
    const osName = e.target.value;
    NProgress.start();
    
    setTimeout(() => {
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
    }, 600);
}

function updateWizard() {
    const osFamilyStage = document.querySelector('[data-stage="OsFamily"]');
    
    [osFamilyStage, osStage, downloadStage].forEach(el => {
        if (!el) return;
        const stage = el.dataset.stage;
        const isCurrent = stage === currentStage;
        
        if (isCurrent) {
            el.style.display = '';
            el.dataset.current = 'true';
        } else {
            el.style.display = 'none';
            el.dataset.current = 'false';
        }
    });
    
    if (currentStage === 'Os' || currentStage === 'Download') {
        osStage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    NProgress.done();
}

function populateDownloadPanel() {
    if (!selectedOs) return;
    
    selectedNameEl.textContent = selectedOs.name;
    selectedVersionEl.textContent = selectedOs.version;
    isoSizeEl.textContent = selectedOs.size;
    isoArchEl.textContent = selectedOs.architecture;
    isoLangEl.textContent = selectedOs.language;
    isoEditionEl.textContent = selectedOs.edition;
    
    checksumEl.textContent = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    
    downloadLinkEl.href = selectedOs.download_url || '#';
    
    downloadStage.style.display = '';
    downloadStage.dataset.current = 'true';
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
    selectedOs = null;
    
    document.querySelectorAll('input[name="item-OsFamily"]').forEach(r => r.checked = false);
    
    setTimeout(() => {
        updateWizard();
        startEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        NProgress.done();
    }, 300);
}

function setupPopularLinks(popularOs) {
    const headerList = document.getElementById('popular-os-links');
    const footerList = document.getElementById('footer-popular-os-links');
    
    if (!headerList || !footerList) return;
    
    const html = popularOs.map(os => {
        const url = `/en/${os.family}:${os.name.replace(/\s+/g, '_')}`;
        return `<li class="inline-block"><a class="mb-2 mr-2 block rounded-full bg-amethyst-800 px-5 py-2 text-white hover:bg-white hover:text-amethyst-500 focus:outline-none focus:ring-2 focus:ring-amethyst-300" href="#" data-family="${os.family}" data-os="${os.name}">${os.name}</a></li>`;
    }).join('');
    
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
                }, 500);
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

window.OSClick = { osDatabase, currentStage, selectedOs };
