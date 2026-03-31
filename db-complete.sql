-- Complete OS Database - All Versions + 32/64-bit
INSERT INTO operating_systems (family_id, name, version, codename, architecture, size_gb, description, release_date, eos_date, is_lts, is_supported, language, edition, download_url) VALUES

-- Windows XP (32/64-bit)
(1, 'Windows XP', 'SP3', 'Whistler', '32-bit', 0.7, 'Windows XP SP3 - Legacy OS for old hardware. Final service pack.', '2008-05-06', '2014-04-08', 0, 0, 'English', 'Professional', 'https://archive.org/download/windows-xp-sp3/windows-xp-sp3-pro.iso'),
(1, 'Windows XP', 'SP3', 'Whistler', '64-bit', 0.8, 'Windows XP SP3 x64 Edition. Rare 64-bit version for servers.', '2008-05-06', '2014-04-08', 0, 0, 'English', 'Professional x64', 'https://archive.org/download/windows-xp-x64/windows-xp-x64-sp3.iso'),

-- Windows Vista (32/64-bit all editions)
(1, 'Windows Vista', 'Ultimate', 'Longhorn', '32-bit', 3.0, 'Windows Vista Ultimate 32-bit. Premium edition with all features.', '2007-01-30', '2017-04-11', 0, 0, 'English', 'Ultimate', 'https://archive.org/download/windows-vista-ultimate/windows-vista-ultimate-32bit.iso'),
(1, 'Windows Vista', 'Ultimate', 'Longhorn', '64-bit', 3.2, 'Windows Vista Ultimate 64-bit.', '2007-01-30', '2017-04-11', 0, 0, 'English', 'Ultimate', 'https://archive.org/download/windows-vista-ultimate/windows-vista-ultimate-64bit.iso'),
(1, 'Windows Vista', 'Business', 'Longhorn', '32-bit', 2.8, 'Windows Vista Business 32-bit. For small businesses.', '2007-01-30', '2017-04-11', 0, 0, 'English', 'Business', 'https://archive.org/download/windows-vista-business/vista-business-32bit.iso'),
(1, 'Windows Vista', 'Business', 'Longhorn', '64-bit', 2.9, 'Windows Vista Business 64-bit.', '2007-01-30', '2017-04-11', 0, 0, 'English', 'Business', 'https://archive.org/download/windows-vista-business/vista-business-64bit.iso'),
(1, 'Windows Vista', 'Home Premium', 'Longhorn', '32-bit', 2.7, 'Windows Vista Home Premium 32-bit. Consumer edition.', '2007-01-30', '2017-04-11', 0, 0, 'English', 'Home Premium', 'https://archive.org/download/windows-vista-home-premium/vista-home-premium-32bit.iso'),

-- Windows 8/8.1 (32/64-bit editions)
(1, 'Windows 8', 'Pro', 'Blue', '32-bit', 2.5, 'Windows 8 Pro 32-bit. Build 9200.', '2012-10-26', '2016-01-12', 0, 0, 'English', 'Pro', 'https://archive.org/download/windows-8-pro/windows8-pro-32bit.iso'),
(1, 'Windows 8', 'Pro', 'Blue', '64-bit', 2.7, 'Windows 8 Pro 64-bit. Build 9200.', '2012-10-26', '2016-01-12', 0, 0, 'English', 'Pro', 'https://archive.org/download/windows-8-pro/windows8-pro-64bit.iso'),
(1, 'Windows 8.1', 'Pro', 'Blue', '32-bit', 2.8, 'Windows 8.1 Pro 32-bit.', '2013-10-17', '2023-01-10', 0, 0, 'English', 'Pro', 'https://archive.org/download/windows-8.1-pro/windows81-pro-32bit.iso'),
(1, 'Windows 8.1', 'Pro', 'Blue', '64-bit', 3.0, 'Windows 8.1 Pro 64-bit.', '2013-10-17', '2023-01-10', 0, 0, 'English', 'Pro', 'https://archive.org/download/windows-8.1-pro/windows81-pro-64bit.iso'),

-- Ubuntu - Add 32-bit variants + older LTS
(2, 'Ubuntu', '20.04 LTS', 'Focal Fossa', '32-bit', 2.0, 'Ubuntu 20.04 LTS i386 32-bit for old hardware.', '2020-04-23', '2025-04-23', 1, 1, 'English', 'Desktop 32-bit', 'https://old-releases.ubuntu.com/releases/20.04/ubuntu-20.04-desktop-i386.iso'),
(2, 'Ubuntu', '18.04 LTS', 'Bionic Beaver', '32-bit', 1.6, 'Ubuntu 18.04 LTS 32-bit.', '2018-04-26', '2023-04-26', 1, 0, 'English', 'Desktop 32-bit', 'https://old-releases.ubuntu.com/releases/18.04/ubuntu-18.04-desktop-i386.iso'),
(2, 'Ubuntu', '16.04 LTS', 'Xenial Xerus', '64-bit', 1.5, 'Ubuntu 16.04 LTS. Old LTS with Unity desktop.', '2016-04-21', '2021-04-21', 1, 0, 'English', 'Desktop', 'https://old-releases.ubuntu.com/releases/16.04/ubuntu-16.04-desktop-amd64.iso'),
(2, 'Ubuntu', '14.04 LTS', 'Trusty Tahr', '64-bit', 1.1, 'Ubuntu 14.04 LTS. First with systemd.', '2014-04-17', '2019-04-17', 1, 0, 'English', 'Desktop', 'https://old-releases.ubuntu.com/releases/14.04/ubuntu-14.04-desktop-amd64.iso'),

-- Debian - Add 32-bit + older
(2, 'Debian', '11', 'Bullseye', '32-bit i386', 2.5, 'Debian 11 Bullseye i386.', '2021-08-14', '2026-08-14', 0, 1, 'English', 'i386', 'https://cdimage.debian.org/cdimage/archive/11.11.0/i386/iso-cd/debian-11.11.0-i386-netinst.iso'),
(2, 'Debian', '10', 'Buster', '32-bit i386', 2.2, 'Debian 10 Buster i386.', '2019-07-06', '2024-06-30', 0, 0, 'English', 'i386', 'https://cdimage.debian.org/cdimage/archive/10.13.0/i386/iso-cd/debian-10.13.0-i386-netinst.iso'),

-- Fedora - Older versions + spins
(2, 'Fedora', '38', 'Workstation', '32-bit', 1.8, 'Fedora 38 Workstation 32-bit.', '2023-04-19', '2024-05-14', 0, 0, 'English', 'Workstation 32-bit', 'https://archives.fedoraproject.org/pub/archive/fedora/linux/releases/38/Workstation/i386/'),
(2, 'Fedora', '37', 'Workstation', '64-bit', 1.9, 'Fedora 37 Workstation.', '2022-11-15', '2023-11-21', 0, 0, 'English', 'Workstation', 'https://archives.fedoraproject.org/pub/archive/fedora/linux/releases/37/Workstation/x86_64/'),

-- More Linux distros with 32/64
(2, 'Linux Mint', '19.3', 'Tricia', '32-bit', 1.8, 'Linux Mint 19.3 32-bit Cinnamon.', '2019-08-20', '2023-12-31', 1, 0, 'English', 'Cinnamon 32-bit', 'https://old-releases.linuxmint.com/linuxmint.com/edition_production/19.3/release/linuxmint-19.3-cinnamon-32bit.iso'),

-- MS Office under Software family
(4, 'Microsoft Office', '2021', 'Office LTSC', '64-bit', 4.0, 'Microsoft Office 2021 Professional Plus LTSC. Perpetual license version.', '2021-10-05', NULL, 1, 1, 'English', 'Professional Plus', 'https://www.microsoft.com/en-us/microsoft-365/windows/microsoft-365-apps-for-enterprise'),
(4, 'Microsoft Office', '2019', 'Office 2019', '64-bit', 3.8, 'Microsoft Office 2019 Pro Plus. Classic perpetual license suite.', '2018-09-24', NULL, 0, 1, 'English', 'Pro Plus', 'https://www.microsoft.com/en-us/microsoft-365/windows/office-home-business-2019'),
(4, 'Microsoft Office', '2016', 'Office 2016', '32-bit', 3.5, 'Microsoft Office 2016 32-bit. Legacy version for older systems.', '2015-09-22', NULL, 0, 0, 'English', 'Pro Plus 32-bit', 'https://www.microsoft.com/en-us/microsoft-365/windows/office-home-business-2016'),
(4, 'Microsoft Office', '365', 'Subscription', '64-bit', 4.2, 'Microsoft 365 Apps for enterprise. Always up-to-date subscription.', '2011-06-28', NULL, 0, 1, 'English', 'Enterprise', 'https://www.microsoft.com/en-us/microsoft-365'),

-- macOS older (32-bit PowerPC where applicable, but mostly 64-bit)
(3, 'Mac OS X Lion', '10.7.5', 'Lion', '64-bit x86_64', 4.0, 'Mac OS X 10.7 Lion. Launchpad, Mission Control, Auto Save.', '2011-07-20', '2014-02-01', 0, 0, 'English', 'Standard', 'https://archive.org/download/macos-lion/macos-10.7.5.iso'),
(3, 'Mac OS X Snow Leopard', '10.6.8', 'Snow Leopard', '64-bit x86_64', 6.5, 'Mac OS X 10.6. Last PowerPC support, 64-bit apps.', '2009-08-28', '2012-04-01', 0, 0, 'English', 'Standard', 'https://archive.org/download/macos-snowleopard/macos-10.6.8.iso'),

-- Windows Server editions (bonus)
(1, 'Windows Server', '2025', 'NextGen', '64-bit', 5.5, 'Windows Server 2025 Standard/Datacenter.', '2024-11-01', NULL, 0, 1, 'English', 'Standard', 'https://archive.org/download/windows-server/windows-server-2025.iso'),
(1, 'Windows Server', '2022', 'LTSC', '64-bit', 5.2, 'Windows Server 2022 LTSC 10-year support.', '2021-08-18', '2031-10-13', 1, 1, 'English', 'Datacenter', 'https://archive.org/download/windows-server-2022/windows-server-2022.iso');
