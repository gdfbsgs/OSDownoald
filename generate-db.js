// Generate complete OS database with archive.org English links
const fs = require('fs');

const languages = [
  { code: 'en-US' }, { code: 'de-DE' }, { code: 'fr-FR' }, { code: 'es-ES' },
  { code: 'it-IT' }, { code: 'pt-BR' }, { code: 'pt-PT' }, { code: 'zh-CN' },
  { code: 'zh-TW' }, { code: 'ja-JP' }, { code: 'ko-KR' }, { code: 'ru-RU' },
  { code: 'ar-SA' }, { code: 'he-IL' }, { code: 'tr-TR' }, { code: 'pl-PL' },
  { code: 'nl-NL' }, { code: 'sv-SE' }, { code: 'da-DK' }, { code: 'fi-FI' },
  { code: 'no-NO' }, { code: 'cs-CZ' }, { code: 'hu-HU' }, { code: 'bg-BG' },
  { code: 'ro-RO' }, { code: 'sk-SK' }, { code: 'sl-SI' }, { code: 'hr-HR' },
  { code: 'sr-LATN-RS' }, { code: 'et-EE' }, { code: 'lt-LT' }, { code: 'lv-LV' },
  { code: 'uk-UA' }, { code: 'th-TH' }, { code: 'vi-VN' }, { code: 'id-ID' },
  { code: 'ms-MY' }, { code: 'el-GR' }
];

const win11Eds = ['Home', 'Pro', 'Education', 'Enterprise', 'IoT Enterprise'];
const win10Eds = ['Home', 'Pro', 'Education', 'Enterprise', 'LTSC 2021', 'IoT Enterprise LTSC'];
const win7Eds = ['Home Basic', 'Home Premium', 'Professional', 'Ultimate', 'Enterprise', 'Starter'];
const vistaEds = ['Home Basic', 'Home Premium', 'Business', 'Ultimate', 'Enterprise'];
const xpEds = ['Home', 'Professional', 'Media Center', 'Tablet PC', 'Starter', 'Professional x64'];
const serverEds = ['Datacenter', 'Standard', 'Essentials', 'Datacenter LTSC', 'Standard LTSC'];
const win8Eds = ['Core', 'Pro', 'Enterprise'];

const archiveBase = 'https://archive.org/download/english_windows_collection';
function archiveUrl(osName, ver, arch, edition) {
  const safeName = osName.replace(/\s+/g, '.');
  const safeVer = ver.replace(/[^a-zA-Z0-9.]/g, '');
  const safeArch = arch === '64-bit' ? 'x64' : arch === '32-bit' ? 'x86' : arch;
  const safeEd = edition.replace(/\s+/g, '.');
  return `${archiveBase}/${safeName}.${safeVer}.English.${safeArch}.${safeEd}.iso`;
}

function esc(s) {
  if (s === null || s === undefined) return 'NULL';
  return "'" + String(s).replace(/'/g, "''") + "'";
}

let entries = [];
function addEntry(family_id, name, version, codename, arch, size, desc, relDate, eosDate, isLTS, isSup, lang, edition, url) {
  entries.push(`(${family_id}, ${esc(name)}, ${esc(version)}, ${esc(codename)}, ${esc(arch)}, ${size}, ${esc(desc)}, ${esc(relDate)}, ${esc(eosDate)}, ${isLTS ? 1 : 0}, ${isSup ? 1 : 0}, ${esc(lang)}, ${esc(edition)}, ${esc(url)})`);
}

// ---- Windows 11 ----
const win11Builds = [
  { ver: '24H2', build: '26100.3775', codename: 'Hudson Valley', date: '2024-10-01', eos: null, desc: 'Windows 11 24H2 latest with AI features.', supported: 1 },
  { ver: '24H2', build: '26100.2454', codename: 'Hudson Valley', date: '2024-10-01', eos: null, desc: 'Windows 11 24H2 stable release.', supported: 1 },
  { ver: '23H2', build: '22631.5505', codename: 'Niagara', date: '2023-10-31', eos: '2025-11-11', desc: 'Windows 11 23H2 stable latest patch.', supported: 1 },
  { ver: '23H2', build: '22631.4317', codename: 'Niagara', date: '2023-10-31', eos: '2025-11-11', desc: 'Windows 11 23H2 previous cumulative.', supported: 1 },
  { ver: '22H2', build: '22621.4460', codename: 'Sun Valley 2', date: '2022-09-20', eos: '2025-10-14', desc: 'Windows 11 22H2 latest patch.', supported: 1 },
  { ver: '22H2', build: '22621.2428', codename: 'Sun Valley 2', date: '2022-09-20', eos: '2025-10-14', desc: 'Windows 11 22H2 IoT Enterprise LTSC.', supported: 1, isLTS: 1 },
  { ver: '21H2', build: '22000.3130', codename: 'Sun Valley', date: '2021-10-05', eos: '2024-10-08', desc: 'Windows 11 21H2 original release.', supported: 0 }
];
const win11Langs = languages.slice(0, 20);
for (const b of win11Builds) {
  for (const ed of win11Eds) {
    for (const l of win11Langs) {
      const url = l.code === 'en-US' ? archiveUrl('Windows 11', b.ver, '64-bit', ed) : `https://www.microsoft.com/${l.code.toLowerCase().replace('-', '/')}/software-download/windows11`;
      addEntry(1, 'Windows 11', `${b.ver} (${b.build})`, b.codename, '64-bit', 5.8, b.desc, b.date, b.eos, b.isLTS || 0, b.supported, l.code, ed, url);
    }
    if (['24H2', '23H2'].includes(b.ver)) {
      for (const l of ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'ja-JP', 'zh-CN']) {
        const url = l === 'en-US' ? archiveUrl('Windows 11', b.ver, 'ARM64', ed) : `https://www.microsoft.com/software-download/windows11ARM64`;
        addEntry(1, 'Windows 11', `${b.ver} (${b.build})`, b.codename, 'ARM64', 5.9, b.desc + ' ARM64 for Copilot+ PCs.', b.date, b.eos, b.isLTS || 0, b.supported, l, ed, url);
      }
    }
  }
}

// ---- Windows 10 ----
const win10Builds = [
  { ver: '22H2', build: '19045.5011', codename: 'Sun Valley 2', date: '2022-10-18', eos: '2025-10-14', desc: 'Windows 10 final feature update.', supported: 1 },
  { ver: '22H2', build: '19045.4894', codename: 'Sun Valley 2', date: '2022-10-18', eos: '2025-10-14', desc: 'Windows 10 22H2 previous patch.', supported: 1 },
  { ver: '21H2', build: '19044.5011', codename: 'Sun Valley', date: '2021-11-16', eos: '2024-06-11', desc: 'Windows 10 21H2 security updates only.', supported: 0 },
  { ver: '21H1', build: '19043.5011', codename: 'Sun Valley', date: '2021-05-18', eos: '2022-12-13', desc: 'Windows 10 21H1 legacy.', supported: 0 },
  { ver: '20H2', build: '19042.5011', codename: 'Iron', date: '2020-10-20', eos: '2023-05-09', desc: 'Windows 10 20H2 cloud-ready.', supported: 0 },
  { ver: '2004', build: '19041.5011', codename: 'Iron', date: '2020-05-27', eos: '2021-12-14', desc: 'Windows 10 May 2020 Update.', supported: 0 },
  { ver: '1909', build: '18363.5011', codename: 'Vanadium', date: '2019-11-12', eos: '2021-05-11', desc: 'Windows 10 November 2019 Update.', supported: 0 },
  { ver: '1903', build: '18362.5011', codename: 'Vanadium', date: '2019-05-21', eos: '2020-12-08', desc: 'Windows 10 May 2019 Update.', supported: 0 },
  { ver: '1809', build: '17763.6526', codename: 'Redstone 5', date: '2018-11-13', eos: '2025-01-09', desc: 'Windows 10 1809 LTSC 2019.', supported: 1, isLTS: 1 },
  { ver: '1803', build: '17134.5011', codename: 'Redstone 4', date: '2018-04-30', eos: '2020-11-10', desc: 'Windows 10 April 2018 Update.', supported: 0 },
  { ver: '1709', build: '16299.5011', codename: 'Redstone 3', date: '2017-10-17', eos: '2020-04-14', desc: 'Windows 10 Fall Creators Update.', supported: 0 },
  { ver: '1703', build: '15063.5011', codename: 'Redstone 2', date: '2017-04-05', eos: '2019-10-08', desc: 'Windows 10 Creators Update.', supported: 0 },
  { ver: '1607', build: '14393.7777', codename: 'Redstone 1', date: '2016-08-02', eos: '2024-10-08', desc: 'Windows 10 Anniversary Update / LTSB 2016.', supported: 0, isLTS: 1 },
  { ver: '1511', build: '10586.5011', codename: 'Threshold 2', date: '2015-11-10', eos: '2018-04-10', desc: 'Windows 10 November Update.', supported: 0 },
  { ver: '1507', build: '10240.20875', codename: 'Threshold 1', date: '2015-07-29', eos: '2017-05-09', desc: 'Windows 10 original release.', supported: 0 }
];
const win10Langs = languages.slice(0, 24);
for (const b of win10Builds) {
  for (const ed of win10Eds) {
    const isLTSC = ed.includes('LTSC');
    for (const l of win10Langs) {
      const url = l.code === 'en-US' ? archiveUrl('Windows 10', b.ver, '64-bit', ed) : `https://www.microsoft.com/${l.code.toLowerCase().replace('-', '/')}/software-download/windows10ISO`;
      addEntry(1, 'Windows 10', `${b.ver} (${b.build})`, b.codename, '64-bit', 5.2, b.desc, b.date, b.eos, b.isLTS || isLTSC ? 1 : 0, b.supported, l, ed, url);
    }
    if (!isLTSC) {
      for (const l of ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'pt-BR', 'ja-JP', 'zh-CN', 'ru-RU']) {
        const url = l === 'en-US' ? archiveUrl('Windows 10', b.ver, '32-bit', ed) : `https://archive.org/details/windows10-${b.ver}-32bit`;
        addEntry(1, 'Windows 10', `${b.ver} (${b.build})`, b.codename, '32-bit', 4.0, b.desc + ' 32-bit legacy.', b.date, b.eos, 0, b.supported, l, ed, url);
      }
    }
  }
}

// ---- Windows 8.1 / 8 ----
const win8Builds = [
  { ver: 'Update 3', build: '9600.21142', codename: 'Blue', date: '2014-04-08', eos: '2023-01-10', desc: 'Windows 8.1 Update final.', supported: 0 },
  { ver: 'Update 1', build: '9600.17031', codename: 'Blue', date: '2014-04-08', eos: '2023-01-10', desc: 'Windows 8.1 Update 1.', supported: 0 },
  { ver: 'RTM', build: '9600.16384', codename: 'Blue', date: '2013-10-17', eos: '2023-01-10', desc: 'Windows 8.1 original.', supported: 0 },
  { ver: 'RTM', build: '9200.16384', codename: 'Blue', date: '2012-10-26', eos: '2016-01-12', desc: 'Windows 8 original.', supported: 0 }
];
const win8Langs = languages.slice(0, 18);
for (const b of win8Builds) {
  const osName = b.build.startsWith('9600') ? 'Windows 8.1' : 'Windows 8';
  for (const ed of win8Eds) {
    for (const l of win8Langs) {
      const url = l.code === 'en-US' ? archiveUrl(osName, b.ver, '64-bit', ed) : `https://archive.org/details/${osName === 'Windows 8.1' ? 'windows81' : 'windows8'}-${ed.toLowerCase().replace(' ', '-')}`;
      addEntry(1, osName, `${b.ver} (${b.build})`, b.codename, '64-bit', 4.2, b.desc, b.date, b.eos, 0, 0, l, ed, url);
    }
    for (const l of ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'pt-BR', 'ja-JP', 'zh-CN', 'ru-RU', 'it-IT', 'ko-KR']) {
      const url = l === 'en-US' ? archiveUrl(osName, b.ver, '32-bit', ed) : `https://archive.org/details/${osName === 'Windows 8.1' ? 'windows81' : 'windows8'}-32bit`;
      addEntry(1, osName, `${b.ver} (${b.build})`, b.codename, '32-bit', 3.8, b.desc + ' 32-bit.', b.date, b.eos, 0, 0, l, ed, url);
    }
  }
}
for (const l of ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'ja-JP']) {
  const url81 = l === 'en-US' ? archiveUrl('Windows 8.1', 'RT', 'ARM', 'RT') : 'https://archive.org/details/windows-rt-8.1';
  const url8 = l === 'en-US' ? archiveUrl('Windows 8', 'RT', 'ARM', 'RT') : 'https://archive.org/details/windows-rt';
  addEntry(1, 'Windows 8.1', 'RT (9600.16384)', 'Blue', 'ARM', 3.0, 'Windows RT 8.1 for ARM tablets.', '2013-10-17', '2023-01-10', 0, 0, l, 'RT', url81);
  addEntry(1, 'Windows 8', 'RT (9200.16384)', 'Blue', 'ARM', 2.8, 'Windows RT for ARM tablets.', '2012-10-26', '2016-01-12', 0, 0, l, 'RT', url8);
}

// ---- Windows 7 ----
const win7Builds = [
  { ver: 'SP1', build: '7601.29720', codename: 'Windows 7', date: '2011-02-22', eos: '2020-01-14', desc: 'Windows 7 SP1 final.', supported: 0 },
  { ver: 'RTM', build: '7600.16385', codename: 'Windows 7', date: '2009-10-22', eos: '2020-01-14', desc: 'Windows 7 RTM pre-SP1.', supported: 0 }
];
const win7Langs = languages.slice(0, 20);
for (const b of win7Builds) {
  for (const ed of win7Eds) {
    for (const l of win7Langs) {
      const url = l.code === 'en-US' ? archiveUrl('Windows 7', b.ver, '64-bit', ed) : `https://archive.org/details/windows-7-${ed.toLowerCase().replace(' ', '-')}-${b.ver.toLowerCase()}`;
      addEntry(1, 'Windows 7', `${b.ver} (${b.build})`, b.codename, '64-bit', 3.0, b.desc + ` ${ed}.`, b.date, b.eos, 0, 0, l, ed, url);
    }
    for (const l of ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'pt-BR', 'ja-JP', 'zh-CN', 'ru-RU', 'it-IT', 'ko-KR']) {
      const url = l === 'en-US' ? archiveUrl('Windows 7', b.ver, '32-bit', ed) : `https://archive.org/details/windows-7-${ed.toLowerCase().replace(' ', '-')}-32bit`;
      addEntry(1, 'Windows 7', `${b.ver} (${b.build})`, b.codename, '32-bit', 2.5, b.desc + ` ${ed} 32-bit.`, b.date, b.eos, 0, 0, l, ed, url);
    }
  }
}

// ---- Windows Vista ----
const vistaBuilds = [
  { ver: 'SP2', build: '6002.18005', codename: 'Longhorn', date: '2009-04-28', eos: '2017-04-11', desc: 'Windows Vista SP2 final.', supported: 0 },
  { ver: 'SP1', build: '6001.18000', codename: 'Longhorn', date: '2008-02-04', eos: '2017-04-11', desc: 'Windows Vista SP1.', supported: 0 },
  { ver: 'RTM', build: '6000.16386', codename: 'Longhorn', date: '2007-01-30', eos: '2017-04-11', desc: 'Windows Vista original.', supported: 0 }
];
const vistaLangs = languages.slice(0, 16);
for (const b of vistaBuilds) {
  for (const ed of vistaEds) {
    for (const l of vistaLangs) {
      const url = l.code === 'en-US' ? archiveUrl('Windows Vista', b.ver, '64-bit', ed) : `https://archive.org/details/vista-${ed.toLowerCase().replace(' ', '-')}`;
      addEntry(1, 'Windows Vista', `${b.ver} (${b.build})`, b.codename, '64-bit', 3.2, b.desc + ` ${ed}.`, b.date, b.eos, 0, 0, l, ed, url);
    }
    for (const l of ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'ja-JP', 'zh-CN', 'ru-RU', 'it-IT']) {
      const url = l === 'en-US' ? archiveUrl('Windows Vista', b.ver, '32-bit', ed) : `https://archive.org/details/vista-${ed.toLowerCase().replace(' ', '-')}-32bit`;
      addEntry(1, 'Windows Vista', `${b.ver} (${b.build})`, b.codename, '32-bit', 2.8, b.desc + ` ${ed} 32-bit.`, b.date, b.eos, 0, 0, l, ed, url);
    }
  }
}

// ---- Windows XP ----
const xpBuilds = [
  { ver: 'SP3', build: '5.1.2600.5512', codename: 'Whistler', date: '2008-04-21', eos: '2014-04-08', desc: 'Windows XP SP3 final.', supported: 0 },
  { ver: 'SP2', build: '5.1.2600.2180', codename: 'Whistler', date: '2004-08-06', eos: '2014-04-08', desc: 'Windows XP SP2.', supported: 0 },
  { ver: 'SP1', build: '5.1.2600.1106', codename: 'Whistler', date: '2002-09-09', eos: '2014-04-08', desc: 'Windows XP SP1.', supported: 0 },
  { ver: 'RTM', build: '5.1.2600.0', codename: 'Whistler', date: '2001-10-25', eos: '2014-04-08', desc: 'Windows XP original.', supported: 0 }
];
const xpLangs = languages.slice(0, 18);
for (const b of xpBuilds) {
  for (const ed of xpEds) {
    const isX64 = ed.includes('x64');
    for (const l of xpLangs) {
      const arch = isX64 ? '64-bit' : '32-bit';
      const url = l.code === 'en-US' ? archiveUrl('Windows XP', b.ver, arch, ed) : `https://archive.org/details/windows-xp-${ed.toLowerCase().replace(' ', '-')}`;
      addEntry(1, 'Windows XP', `${b.ver} (${b.build})`, b.codename, arch, isX64 ? 0.9 : 0.7, b.desc + ` ${ed}.`, b.date, b.eos, 0, 0, l, ed, url);
    }
  }
}

// ---- Windows Server ----
const serverBuilds = [
  { ver: '2025', build: '26100.3775', codename: 'NextGen', date: '2024-11-01', eos: null, desc: 'Windows Server 2025 latest.', supported: 1 },
  { ver: '2022', build: '20348.3699', codename: 'Iron', date: '2021-08-18', eos: '2031-10-13', desc: 'Windows Server 2022 LTSC.', supported: 1, isLTS: 1 },
  { ver: '2019', build: '17763.6526', codename: 'Redstone 5', date: '2018-11-13', eos: '2029-01-09', desc: 'Windows Server 2019 LTSC.', supported: 1, isLTS: 1 },
  { ver: '2016', build: '14393.7777', codename: 'Redstone 1', date: '2016-10-12', eos: '2027-01-12', desc: 'Windows Server 2016 LTSC.', supported: 1, isLTS: 1 },
  { ver: '2012 R2', build: '9600.21142', codename: 'Blue', date: '2013-10-18', eos: '2023-10-10', desc: 'Windows Server 2012 R2.', supported: 0 },
  { ver: '2012', build: '9200.16384', codename: 'Blue', date: '2012-09-04', eos: '2023-10-10', desc: 'Windows Server 2012.', supported: 0 },
  { ver: '2008 R2', build: '7601.29720', codename: 'Windows 7', date: '2010-02-16', eos: '2020-01-14', desc: 'Windows Server 2008 R2.', supported: 0 },
  { ver: '2008', build: '6002.18005', codename: 'Longhorn', date: '2008-02-27', eos: '2020-01-14', desc: 'Windows Server 2008.', supported: 0 },
  { ver: '2003 R2', build: '3790.3959', codename: 'Longhorn', date: '2005-12-06', eos: '2015-07-14', desc: 'Windows Server 2003 R2.', supported: 0 },
  { ver: '2003', build: '3790.1830', codename: 'Longhorn', date: '2003-04-24', eos: '2015-07-14', desc: 'Windows Server 2003.', supported: 0 }
];
const serverLangs = languages.slice(0, 12);
for (const b of serverBuilds) {
  for (const ed of serverEds) {
    for (const l of serverLangs) {
      addEntry(1, 'Windows Server', `${b.ver} (${b.build})`, b.codename, '64-bit', 6.0, b.desc + ` ${ed}.`, b.date, b.eos, b.isLTS || 0, b.supported, l, ed, `https://www.microsoft.com/en-us/windows-server`);
    }
  }
}

// ---- Legacy Windows ----
const legacyEntries = [
  ['Windows ME', '4.90.3000', 'Millennium', '32-bit', 0.3, 'Windows Millennium Edition final.', '2000-09-14', '2003-12-31'],
  ['Windows 98 SE', '4.10.2222A', 'Memphis', '32-bit', 0.2, 'Windows 98 Second Edition.', '1999-05-05', '2006-07-11'],
  ['Windows 98', '4.10.1998', 'Memphis', '32-bit', 0.2, 'Windows 98 First Edition.', '1998-05-16', '2006-07-11'],
  ['Windows 95 OSR2.5', '4.03.1214', 'Chicago', '32-bit', 0.1, 'Windows 95 OSR2.5 with USB/FAT32.', '1996-11-01', '2001-12-31'],
  ['Windows 95', '4.00.950', 'Chicago', '32-bit', 0.1, 'Windows 95 original.', '1995-08-24', '2001-12-31'],
  ['Windows 3.11', '3.11', 'Janus', '16-bit', 0.015, 'Windows for Workgroups 3.11.', '1993-11-08', '2001-12-31'],
  ['Windows 3.1', '3.10', 'Janus', '16-bit', 0.012, 'Windows 3.1 original.', '1992-04-06', '2001-12-31'],
  ['Windows 2.11', '2.11', '', '16-bit', 0.005, 'Windows/286 and Windows/386 2.11.', '1988-05-27', '2001-12-31'],
  ['Windows 2.0', '2.03', '', '16-bit', 0.004, 'Windows 2.0 with overlapping windows.', '1987-12-09', '2001-12-31'],
  ['Windows 1.0', '1.04', '', '16-bit', 0.003, 'Windows 1.0 first release.', '1985-11-20', '2001-12-31']
];
for (const [name, ver, code, arch, size, desc, rel, eos] of legacyEntries) {
  for (const l of ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'ja-JP']) {
    const url = l === 'en-US' ? archiveUrl(name, ver, arch, 'Standard') : `https://archive.org/details/${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    addEntry(1, name, ver, code, arch, size, desc, rel, eos, 0, 0, l, 'Standard', url);
  }
}

// ---- Windows 2000 ----
for (const l of ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'ja-JP', 'pt-BR', 'zh-CN', 'ru-RU']) {
  addEntry(1, 'Windows 2000', 'SP4 (5.0.2195.6717)', 'Windows 2000', '32-bit', 0.6, 'Windows 2000 Professional SP4.', '2003-06-26', '2010-07-13', 0, 0, l, 'Professional', 'https://archive.org/details/win2000-pro');
  addEntry(1, 'Windows 2000', 'SP4 (5.0.2195.6717)', 'Windows 2000', '32-bit', 0.7, 'Windows 2000 Server SP4.', '2003-06-26', '2010-07-13', 0, 0, l, 'Server', 'https://archive.org/details/win2000-server');
  addEntry(1, 'Windows 2000', 'SP4 (5.0.2195.6717)', 'Windows 2000', '32-bit', 0.8, 'Windows 2000 Advanced Server SP4.', '2003-06-26', '2010-07-13', 0, 0, l, 'Advanced Server', 'https://archive.org/details/win2000-advserver');
  addEntry(1, 'Windows 2000', 'SP4 (5.0.2195.6717)', 'Windows 2000', '32-bit', 0.9, 'Windows 2000 Datacenter Server SP4.', '2003-06-26', '2010-07-13', 0, 0, l, 'Datacenter Server', 'https://archive.org/details/win2000-datacenter');
}

// ---- Linux ----
const linuxDistros = [
  { family: 'Ubuntu', versions: [
    { ver: '24.04 LTS', codename: 'Noble Numbat', date: '2024-04-25', eos: '2029-04-25', lts: 1, sup: 1, desc: 'Ubuntu 24.04 LTS Desktop GNOME latest.' },
    { ver: '22.04 LTS', codename: 'Jammy Jellyfish', date: '2022-04-21', eos: '2027-04-21', lts: 1, sup: 1, desc: 'Ubuntu 22.04 LTS stable.' },
    { ver: '20.04 LTS', codename: 'Focal Fossa', date: '2020-04-23', eos: '2025-04-23', lts: 1, sup: 1, desc: 'Ubuntu 20.04 LTS extended support.' },
    { ver: '18.04 LTS', codename: 'Bionic Beaver', date: '2018-04-26', eos: '2023-05-31', lts: 1, sup: 0, desc: 'Ubuntu 18.04 LTS ESM.' },
    { ver: '16.04 LTS', codename: 'Xenial Xerus', date: '2016-04-21', eos: '2021-04-21', lts: 1, sup: 0, desc: 'Ubuntu 16.04 LTS legacy.' }
  ], editions: ['Desktop', 'Server', 'Server ARM'], archs: { 'Desktop': '64-bit', 'Server': '64-bit', 'Server ARM': 'arm64' }, urls: { 'Desktop': 'https://releases.ubuntu.com/', 'Server': 'https://releases.ubuntu.com/', 'Server ARM': 'https://releases.ubuntu.com/' }, baseSize: 4.7 },
  { family: 'Debian', versions: [
    { ver: '12 (Bookworm)', codename: 'Bookworm', date: '2023-06-10', eos: null, lts: 1, sup: 1, desc: 'Debian 12 stable.' },
    { ver: '11 (Bullseye)', codename: 'Bullseye', date: '2021-08-14', eos: '2026-06-30', lts: 1, sup: 1, desc: 'Debian 11 LTS.' },
    { ver: '10 (Buster)', codename: 'Buster', date: '2019-07-06', eos: '2024-06-30', lts: 1, sup: 0, desc: 'Debian 10 LTS.' }
  ], editions: ['Desktop', 'Netinst', 'Server'], archs: { 'Desktop': '64-bit', 'Netinst': '64-bit', 'Server': '64-bit' }, urls: { 'Desktop': 'https://cdimage.debian.org/', 'Netinst': 'https://cdimage.debian.org/', 'Server': 'https://cdimage.debian.org/' }, baseSize: 3.8 },
  { family: 'Fedora', versions: [
    { ver: '41', codename: '', date: '2024-11-12', eos: '2025-11-12', lts: 0, sup: 1, desc: 'Fedora 41 Workstation latest.' },
    { ver: '40', codename: '', date: '2024-04-23', eos: '2025-05-13', lts: 0, sup: 1, desc: 'Fedora 40 Workstation.' },
    { ver: '39', codename: '', date: '2023-11-07', eos: '2024-11-07', lts: 0, sup: 0, desc: 'Fedora 39 EOL.' }
  ], editions: ['Workstation', 'Server', 'KDE', 'XFCE'], archs: { 'Workstation': '64-bit', 'Server': '64-bit', 'KDE': '64-bit', 'XFCE': '64-bit' }, urls: { 'Workstation': 'https://fedoraproject.org/', 'Server': 'https://fedoraproject.org/', 'KDE': 'https://fedoraproject.org/', 'XFCE': 'https://fedoraproject.org/' }, baseSize: 4.2 },
  { family: 'Linux Mint', versions: [
    { ver: '22 (Wilma)', codename: 'Wilma', date: '2024-07-25', eos: '2029-04-25', lts: 1, sup: 1, desc: 'Linux Mint 22 Cinnamon.' },
    { ver: '21.3 (Virginia)', codename: 'Virginia', date: '2024-01-12', eos: '2027-04-25', lts: 1, sup: 1, desc: 'Linux Mint 21.3 Cinnamon.' },
    { ver: '21.2 (Victoria)', codename: 'Victoria', date: '2023-07-16', eos: '2027-04-25', lts: 1, sup: 0, desc: 'Linux Mint 21.2 Cinnamon.' }
  ], editions: ['Cinnamon', 'MATE', 'XFCE'], archs: { 'Cinnamon': '64-bit', 'MATE': '64-bit', 'XFCE': '64-bit' }, urls: { 'Cinnamon': 'https://linuxmint.com/', 'MATE': 'https://linuxmint.com/', 'XFCE': 'https://linuxmint.com/' }, baseSize: 4.0 },
  { family: 'Pop!_OS', versions: [
    { ver: '22.04 LTS', codename: 'Jammy', date: '2022-05-10', eos: '2027-04-25', lts: 1, sup: 1, desc: 'Pop!_OS 22.04 LTS COSMIC.' },
    { ver: '22.04 NVIDIA', codename: 'Jammy', date: '2022-05-10', eos: '2027-04-25', lts: 1, sup: 1, desc: 'Pop!_OS 22.04 with NVIDIA drivers.' }
  ], editions: ['Desktop', 'NVIDIA'], archs: { 'Desktop': '64-bit', 'NVIDIA': '64-bit' }, urls: { 'Desktop': 'https://pop.system76.com/', 'NVIDIA': 'https://pop.system76.com/' }, baseSize: 4.5 },
  { family: 'Arch Linux', versions: [
    { ver: '2025.01.01', codename: '', date: '2025-01-01', eos: null, lts: 0, sup: 1, desc: 'Arch Linux rolling release latest.' },
    { ver: '2024.12.01', codename: '', date: '2024-12-01', eos: null, lts: 0, sup: 1, desc: 'Arch Linux rolling release.' }
  ], editions: ['Base'], archs: { 'Base': '64-bit' }, urls: { 'Base': 'https://archlinux.org/' }, baseSize: 1.2 },
  { family: 'Manjaro', versions: [
    { ver: '24.2', codename: '', date: '2024-12-01', eos: null, lts: 0, sup: 1, desc: 'Manjaro KDE Plasma latest.' },
    { ver: '24.1', codename: '', date: '2024-06-01', eos: null, lts: 0, sup: 1, desc: 'Manjaro GNOME latest.' }
  ], editions: ['KDE', 'GNOME', 'XFCE'], archs: { 'KDE': '64-bit', 'GNOME': '64-bit', 'XFCE': '64-bit' }, urls: { 'KDE': 'https://manjaro.org/', 'GNOME': 'https://manjaro.org/', 'XFCE': 'https://manjaro.org/' }, baseSize: 4.1 },
  { family: 'Kali Linux', versions: [
    { ver: '2024.4', codename: 'Kali', date: '2024-11-25', eos: null, lts: 0, sup: 1, desc: 'Kali Linux penetration testing.' },
    { ver: '2024.3', codename: 'Kali', date: '2024-08-26', eos: null, lts: 0, sup: 1, desc: 'Kali Linux security tools.' }
  ], editions: ['Desktop', 'Live', 'NetInstaller'], archs: { 'Desktop': '64-bit', 'Live': '64-bit', 'NetInstaller': '64-bit' }, urls: { 'Desktop': 'https://www.kali.org/', 'Live': 'https://www.kali.org/', 'NetInstaller': 'https://www.kali.org/' }, baseSize: 4.8 },
  { family: 'openSUSE', versions: [
    { ver: 'Leap 15.6', codename: '', date: '2024-06-12', eos: '2025-12-31', lts: 1, sup: 1, desc: 'openSUSE Leap 15.6 stable.' },
    { ver: 'Tumbleweed', codename: '', date: '2025-01-01', eos: null, lts: 0, sup: 1, desc: 'openSUSE Tumbleweed rolling.' }
  ], editions: ['Desktop', 'DVD', 'Net'], archs: { 'Desktop': '64-bit', 'DVD': '64-bit', 'Net': '64-bit' }, urls: { 'Desktop': 'https://www.opensuse.org/', 'DVD': 'https://www.opensuse.org/', 'Net': 'https://www.opensuse.org/' }, baseSize: 4.6 },
  { family: 'Zorin OS', versions: [
    { ver: '17.2', codename: '', date: '2024-10-01', eos: '2027-10-01', lts: 1, sup: 1, desc: 'Zorin OS 17 Pro desktop.' },
    { ver: '17', codename: '', date: '2023-11-01', eos: '2027-10-01', lts: 1, sup: 1, desc: 'Zorin OS 17 Core desktop.' }
  ], editions: ['Core', 'Pro', 'Lite'], archs: { 'Core': '64-bit', 'Pro': '64-bit', 'Lite': '64-bit' }, urls: { 'Core': 'https://zorin.com/', 'Pro': 'https://zorin.com/', 'Lite': 'https://zorin.com/' }, baseSize: 4.3 },
  { family: 'elementary OS', versions: [
    { ver: '8 (Circe)', codename: 'Circe', date: '2024-08-15', eos: '2027-08-15', lts: 1, sup: 1, desc: 'elementary OS 8 Pantheon desktop.' },
    { ver: '7 (Horus)', codename: 'Horus', date: '2023-03-20', eos: '2026-03-20', lts: 1, sup: 1, desc: 'elementary OS 7 Pantheon desktop.' }
  ], editions: ['Desktop'], archs: { 'Desktop': '64-bit' }, urls: { 'Desktop': 'https://elementary.io/' }, baseSize: 3.9 },
  { family: 'Rocky Linux', versions: [
    { ver: '9.5', codename: 'Blue Onyx', date: '2024-11-26', eos: '2032-05-31', lts: 1, sup: 1, desc: 'Rocky Linux 9 RHEL clone.' },
    { ver: '8.10', codename: 'Green Obsidian', date: '2024-05-21', eos: '2029-05-31', lts: 1, sup: 1, desc: 'Rocky Linux 8 RHEL clone.' }
  ], editions: ['Minimal', 'DVD', 'Boot'], archs: { 'Minimal': '64-bit', 'DVD': '64-bit', 'Boot': '64-bit' }, urls: { 'Minimal': 'https://rockylinux.org/', 'DVD': 'https://rockylinux.org/', 'Boot': 'https://rockylinux.org/' }, baseSize: 4.4 },
  { family: 'AlmaLinux', versions: [
    { ver: '9.5', codename: '', date: '2024-11-26', eos: '2032-05-31', lts: 1, sup: 1, desc: 'AlmaLinux 9 RHEL clone.' },
    { ver: '8.10', codename: '', date: '2024-05-21', eos: '2029-05-31', lts: 1, sup: 1, desc: 'AlmaLinux 8 RHEL clone.' }
  ], editions: ['Minimal', 'DVD', 'Boot'], archs: { 'Minimal': '64-bit', 'DVD': '64-bit', 'Boot': '64-bit' }, urls: { 'Minimal': 'https://almalinux.org/', 'DVD': 'https://almalinux.org/', 'Boot': 'https://almalinux.org/' }, baseSize: 4.4 },
  { family: 'CentOS Stream', versions: [
    { ver: '9', codename: '', date: '2023-12-01', eos: '2027-05-31', lts: 1, sup: 1, desc: 'CentOS Stream 9 upstream RHEL.' },
    { ver: '8', codename: '', date: '2019-09-24', eos: '2021-12-31', lts: 1, sup: 0, desc: 'CentOS Stream 8 EOL.' }
  ], editions: ['Minimal', 'DVD'], archs: { 'Minimal': '64-bit', 'DVD': '64-bit' }, urls: { 'Minimal': 'https://www.centos.org/', 'DVD': 'https://www.centos.org/' }, baseSize: 4.2 },
  { family: 'Tails', versions: [
    { ver: '6.12', codename: '', date: '2024-12-10', eos: null, lts: 0, sup: 1, desc: 'Tails amnesic incognito live system.' },
    { ver: '6.10', codename: '', date: '2024-09-17', eos: null, lts: 0, sup: 1, desc: 'Tails privacy-focused live USB.' }
  ], editions: ['USB'], archs: { 'USB': '64-bit' }, urls: { 'USB': 'https://tails.net/' }, baseSize: 1.4 },
  { family: 'Whonix', versions: [
    { ver: '17', codename: '', date: '2024-01-01', eos: null, lts: 0, sup: 1, desc: 'Whonix Tor gateway and workstation.' }
  ], editions: ['Gateway', 'Workstation'], archs: { 'Gateway': '64-bit', 'Workstation': '64-bit' }, urls: { 'Gateway': 'https://www.whonix.org/', 'Workstation': 'https://www.whonix.org/' }, baseSize: 2.0 },
  { family: 'Parrot OS', versions: [
    { ver: '6.2', codename: '', date: '2024-10-01', eos: null, lts: 0, sup: 1, desc: 'Parrot OS Security Edition.' },
    { ver: '6.1', codename: '', date: '2024-06-01', eos: null, lts: 0, sup: 1, desc: 'Parrot OS Home Edition.' }
  ], editions: ['Security', 'Home'], archs: { 'Security': '64-bit', 'Home': '64-bit' }, urls: { 'Security': 'https://www.parrotsec.org/', 'Home': 'https://www.parrotsec.org/' }, baseSize: 4.5 }
];
for (const distro of linuxDistros) {
  for (const v of distro.versions) {
    for (const ed of distro.editions) {
      const arch = distro.archs[ed] || '64-bit';
      const url = distro.urls[ed] || 'https://www.linux.org/';
      addEntry(2, distro.family, v.ver, v.codename, arch, distro.baseSize, v.desc, v.date, v.eos, v.lts, v.sup, 'English', ed, url);
    }
  }
}

// ---- macOS ----
const macosVersions = [
  { ver: '15.3', name: 'macOS Sequoia', codename: 'Sequoia', date: '2025-01-27', eos: null, desc: 'macOS 15.3 with Apple Intelligence.', size: 14.0 },
  { ver: '15.1', name: 'macOS Sequoia', codename: 'Sequoia', date: '2024-10-28', eos: null, desc: 'macOS 15 Sequoia with Apple Intelligence.', size: 14.0 },
  { ver: '14.7', name: 'macOS Sonoma', codename: 'Sonoma', date: '2024-09-16', eos: null, desc: 'macOS Sonoma with desktop widgets.', size: 13.0 },
  { ver: '14.0', name: 'macOS Sonoma', codename: 'Sonoma', date: '2023-09-26', eos: null, desc: 'macOS Sonoma original.', size: 13.0 },
  { ver: '13.7', name: 'macOS Ventura', codename: 'Ventura', date: '2024-09-16', eos: null, desc: 'macOS Ventura latest.', size: 12.0 },
  { ver: '13.0', name: 'macOS Ventura', codename: 'Ventura', date: '2022-10-24', eos: null, desc: 'macOS Ventura original.', size: 12.0 },
  { ver: '12.7', name: 'macOS Monterey', codename: 'Monterey', date: '2024-01-22', eos: null, desc: 'macOS Monterey latest.', size: 12.0 },
  { ver: '12.0', name: 'macOS Monterey', codename: 'Monterey', date: '2021-10-25', eos: null, desc: 'macOS Monterey original.', size: 12.0 },
  { ver: '11.7', name: 'macOS Big Sur', codename: 'Big Sur', date: '2023-09-11', eos: null, desc: 'macOS Big Sur latest.', size: 12.0 },
  { ver: '11.0', name: 'macOS Big Sur', codename: 'Big Sur', date: '2020-11-12', eos: null, desc: 'macOS Big Sur original.', size: 12.0 },
  { ver: '10.15.7', name: 'macOS Catalina', codename: 'Catalina', date: '2020-09-24', eos: null, desc: 'macOS Catalina final.', size: 10.0 },
  { ver: '10.14.6', name: 'macOS Mojave', codename: 'Mojave', date: '2019-07-22', eos: null, desc: 'macOS Mojave final.', size: 9.0 },
  { ver: '10.13.6', name: 'macOS High Sierra', codename: 'High Sierra', date: '2018-07-09', eos: null, desc: 'macOS High Sierra final.', size: 8.0 },
  { ver: '10.12.6', name: 'macOS Sierra', codename: 'Sierra', date: '2017-07-19', eos: null, desc: 'macOS Sierra final.', size: 7.0 },
  { ver: '10.11.6', name: 'OS X El Capitan', codename: 'El Capitan', date: '2016-07-18', eos: null, desc: 'OS X El Capitan final.', size: 6.0 },
  { ver: '10.10.5', name: 'OS X Yosemite', codename: 'Yosemite', date: '2015-08-13', eos: null, desc: 'OS X Yosemite final.', size: 6.0 },
  { ver: '10.9.5', name: 'OS X Mavericks', codename: 'Mavericks', date: '2014-09-17', eos: null, desc: 'OS X Mavericks final.', size: 5.5 },
  { ver: '10.8.5', name: 'OS X Mountain Lion', codename: 'Mountain Lion', date: '2013-09-12', eos: null, desc: 'OS X Mountain Lion final.', size: 5.0 },
  { ver: '10.7.5', name: 'Mac OS X Lion', codename: 'Lion', date: '2012-09-19', eos: null, desc: 'Mac OS X Lion final.', size: 4.5 },
  { ver: '10.6.8', name: 'Mac OS X Snow Leopard', codename: 'Snow Leopard', date: '2011-07-25', eos: null, desc: 'Mac OS X Snow Leopard final.', size: 4.0 }
];
for (const m of macosVersions) {
  for (const l of ['English', 'German', 'French', 'Spanish', 'Italian', 'Portuguese (Brazil)', 'Chinese (Simplified)', 'Japanese', 'Korean', 'Russian']) {
    addEntry(3, m.name, m.ver, m.codename, 'ARM64/x86_64', m.size, m.desc, m.date, m.eos, 0, 1, l, 'Standard', `https://support.apple.com/en-us/HT213707`);
  }
}

// ---- Software ----
const softwareEntries = [
  { name: 'Microsoft Office', ver: '2024 LTSC', desc: 'Office LTSC 2024 perpetual license.', date: '2024-10-01', eos: null, lts: 1, sup: 1, ed: 'Professional Plus', arch: '64-bit', size: 4.5 },
  { name: 'Microsoft Office', ver: '2024 LTSC', desc: 'Office LTSC 2024 perpetual license.', date: '2024-10-01', eos: null, lts: 1, sup: 1, ed: 'Standard', arch: '64-bit', size: 4.2 },
  { name: 'Microsoft Office', ver: '2021', desc: 'Office 2021 Home & Business.', date: '2021-10-05', eos: null, lts: 0, sup: 1, ed: 'Home & Business', arch: '64-bit', size: 3.8 },
  { name: 'Microsoft Office', ver: '2021', desc: 'Office 2021 Professional Plus.', date: '2021-10-05', eos: null, lts: 0, sup: 1, ed: 'Professional Plus', arch: '64-bit', size: 4.0 },
  { name: 'Microsoft Office', ver: '2019 LTSC', desc: 'Office 2019 LTSC perpetual.', date: '2019-09-24', eos: null, lts: 1, sup: 1, ed: 'Professional Plus', arch: '64-bit', size: 3.5 },
  { name: 'Microsoft Office', ver: '2016', desc: 'Office 2016 Home & Business.', date: '2015-09-22', eos: null, lts: 0, sup: 0, ed: 'Home & Business', arch: '32-bit', size: 3.0 },
  { name: 'Microsoft Visio', ver: '2024 LTSC', desc: 'Visio LTSC 2024 diagramming.', date: '2024-10-01', eos: null, lts: 1, sup: 1, ed: 'Professional', arch: '64-bit', size: 2.0 },
  { name: 'Microsoft Visio', ver: '2021', desc: 'Visio 2021 Standard.', date: '2021-10-05', eos: null, lts: 0, sup: 1, ed: 'Standard', arch: '64-bit', size: 1.8 },
  { name: 'Microsoft Project', ver: '2024 LTSC', desc: 'Project LTSC 2024 project management.', date: '2024-10-01', eos: null, lts: 1, sup: 1, ed: 'Professional', arch: '64-bit', size: 2.2 },
  { name: 'Microsoft Project', ver: '2021', desc: 'Project 2021 Standard.', date: '2021-10-05', eos: null, lts: 0, sup: 1, ed: 'Standard', arch: '64-bit', size: 2.0 }
];
for (const s of softwareEntries) {
  for (const l of ['English', 'German', 'French', 'Spanish', 'Italian', 'Portuguese (Brazil)', 'Chinese (Simplified)', 'Japanese']) {
    addEntry(4, s.name, s.ver, '', s.arch, s.size, s.desc, s.date, s.eos, s.lts, s.sup, l, s.ed, `https://www.microsoft.com/en-us/microsoft-365/enterprise/office`);
  }
}

// Build SQL
const BATCH_SIZE = 500;
let sql = `-- COMPLETE OS DATABASE: All Windows Versions/Builds/Editions/Languages + Full OS Collection
-- AUTO-GENERATED: ${new Date().toISOString().split('T')[0]}
-- Total entries: ${entries.length}
-- Compatible with script.js parser.

CREATE TABLE IF NOT EXISTS os_families (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    icon TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS operating_systems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    family_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    codename TEXT,
    architecture TEXT NOT NULL DEFAULT '64-bit',
    size_gb REAL,
    description TEXT,
    release_date TEXT,
    eos_date TEXT,
    is_lts INTEGER DEFAULT 0,
    is_supported INTEGER DEFAULT 1,
    language TEXT DEFAULT 'English',
    edition TEXT DEFAULT 'Standard',
    download_url TEXT NOT NULL,
    FOREIGN KEY (family_id) REFERENCES os_families(id)
);

INSERT INTO os_families (id, name, icon) VALUES
(1, 'Windows', '🪟'),
(2, 'Linux', '🐧'),
(3, 'macOS', '🍎'),
(4, 'Software', '💻');

`;

for (let i = 0; i < entries.length; i += BATCH_SIZE) {
  const batch = entries.slice(i, i + BATCH_SIZE);
  sql += `INSERT INTO operating_systems (family_id, name, version, codename, architecture, size_gb, description, release_date, eos_date, is_lts, is_supported, language, edition, download_url) VALUES\n`;
  sql += batch.join(',\n') + ';\n\n';
}

sql += `-- COMPLETE: ${entries.length} total entries
-- Windows: ${entries.filter(e => e.startsWith('(1,')).length}
-- Linux: ${entries.filter(e => e.startsWith('(2,')).length}
-- macOS: ${entries.filter(e => e.startsWith('(3,')).length}
-- Software: ${entries.filter(e => e.startsWith('(4,')).length}
`;

fs.writeFileSync('db.sql', sql);
console.log(`Generated db.sql with ${entries.length} entries`);
console.log(`Windows: ${entries.filter(e => e.startsWith('(1,')).length}`);
console.log(`Linux: ${entries.filter(e => e.startsWith('(2,')).length}`);
console.log(`macOS: ${entries.filter(e => e.startsWith('(3,')).length}`);
console.log(`Software: ${entries.filter(e => e.startsWith('(4,')).length}`);
