-- OSClick Database Schema
-- Operating Systems Download Database

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

-- Insert OS Families
INSERT INTO os_families (id, name, icon) VALUES
(1, 'Windows', '🪟'),
(2, 'Linux', '🐧'),
(3, 'macOS', '🍎');

-- ============================================================
-- WINDOWS OPERATING SYSTEMS
-- ============================================================

-- Windows 11
INSERT INTO operating_systems (family_id, name, version, codename, architecture, size_gb, description, release_date, eos_date, is_lts, is_supported, download_url) VALUES
(1, 'Windows 11', '24H2', 'Germanium', '64-bit', 5.8, 'Windows 11 version 24H2 (October 2024 Update). Features improved AI capabilities, Recall, enhanced Copilot integration, and performance improvements.', '2024-10-01', '2026-10-13', 0, 1, 'English', 'Pro', 'https://archive.org/download/english_windows_collection/Windows%2011%2024H2%20x64.iso'),
(1, 'Windows 11', '23H2', 'Moment 5', '64-bit', 5.6, 'Windows 11 version 23H2 (November 2023 Update). Includes Windows Copilot, AI-powered features, and improved File Explorer with a modern design.', '2023-10-31', '2025-11-11', 0, 1, 'https://archive.org/download/english_windows_collection/Windows%2011/23H2/Win11_23H2_English_x64.iso'),
(1, 'Windows 11', '22H2', 'Sun Valley 2', '64-bit', 5.4, 'Windows 11 version 22H2 (September 2022 Update). Brings Tabs in File Explorer, improved Snap Layouts, and Task Manager redesign.', '2022-09-20', '2024-10-08', 0, 0, 'https://archive.org/download/english_windows_collection/Windows%2011%2022H2%20x64.iso'),
(1, 'Windows 11', '21H2', 'Sun Valley', '64-bit', 5.1, 'The original release of Windows 11. Features a centered Start Menu, redesigned taskbar, Snap Layouts, and DirectStorage support.', '2021-10-05', '2023-10-10', 0, 0, 'https://archive.org/download/english_windows_collection/Windows%2011%2021H2%20x64.iso'),

-- Windows 10
(1, 'Windows 10', '22H2', 'Sun Valley', '64-bit', 5.2, 'Windows 10 version 22H2 - the final feature update for Windows 10. Supported until October 14, 2025. Stable and widely compatible.', '2022-10-18', '2025-10-14', 0, 1, 'English', 'Pro', 'https://archive.org/download/english_windows_collection/Windows%2010%2022H2%20x64.iso'),
(1, 'Windows 10', '21H2', 'Iron', '64-bit', 5.0, 'Windows 10 version 21H2 (November 2021 Update). Includes WPA3 H2E support, GPU compute in WSL, and Windows Hello improvements.', '2021-11-16', '2023-06-13', 0, 0, 'English', 'Home', 'https://archive.org/download/english_windows_collection/Windows%2010%2021H2%20x64.iso'),
(1, 'Windows 10', '21H1', 'Iron', '64-bit', 4.9, 'Windows 10 version 21H1 (May 2021 Update). Includes Windows Hello multi-camera support and improved Windows Defender Application Guard.', '2021-05-18', '2022-12-13', 0, 0, 'English', 'Home', 'https://archive.org/download/english_windows_collection/Windows%2010%2021H1%20x64.iso'),
(1, 'Windows 10', '20H2', 'Vibranium', '64-bit', 4.8, 'Windows 10 version 20H2 (October 2020 Update). Brings a new Start Menu design, Microsoft Edge Chromium, and improved tablet experience.', '2020-10-20', '2022-05-10', 0, 0, 'English', 'Home', 'https://archive.org/download/english_windows_collection/Windows%2010%2020H2%20x64.iso'),
(1, 'Windows 10', '2004', 'Vibranium', '64-bit', 4.7, 'Windows 10 version 2004 (May 2020 Update). Introduces WSL 2, Cortana as standalone app, and improved virtual desktops.', '2020-05-27', '2021-12-14', 0, 0, 'English', 'Home', 'https://archive.org/download/english_windows_collection/Windows%2010%202004%20x64.iso'),
(1, 'Windows 10', '1909', 'Vanadium', '64-bit', 4.5, 'Windows 10 version 1909 (November 2019 Update). Adds calendar flyout improvements, improved search, and Cortana enhancements.', '2019-11-12', '2021-05-11', 0, 0, 'English', 'Enterprise', 'https://archive.org/download/english_windows_collection/Windows%2010%201909%20x64.iso'),
(1, 'Windows 10', '1903', '19H1', '64-bit', 4.4, 'Windows 10 version 1903 (May 2019 Update). Introduces Windows Sandbox, improved search, and light theme.', '2019-05-21', '2020-12-08', 0, 0, 'English', 'Education', 'https://archive.org/download/english_windows_collection/Windows%2010%201903%20x64.iso'),
(1, 'Windows 10', '1809', 'Redstone 5', '64-bit', 4.3, 'Windows 10 version 1809 (October 2018 Update). Adds Your Phone app, Clipboard history, and Dark Mode for File Explorer.', '2018-11-13', '2020-11-10', 0, 0, 'English', 'Enterprise', 'https://archive.org/download/english_windows_collection/Windows%2010%201809%20x64.iso'),
(1, 'Windows 10', '1803', 'Redstone 4', '64-bit', 4.2, 'Windows 10 version 1803 (April 2018 Update). Introduces Timeline, Focus Assist, and Near Share.', '2018-04-30', '2019-11-12', 0, 0, 'https://archive.org/download/english_windows_collection/Windows%2010%201803%20x64.iso'),
(1, 'Windows 10', '1709', 'Fall Creators Update', '64-bit', 4.1, 'Windows 10 version 1709 (Fall Creators Update). Adds Mixed Reality Portal, Fluent Design, and OneDrive Files On-Demand.', '2017-10-17', '2019-04-09', 0, 0, 'https://archive.org/download/english_windows_collection/Windows%2010%201709%20x64.iso'),
(1, 'Windows 10', '1703', 'Creators Update', '64-bit', 4.0, 'Windows 10 version 1703 (Creators Update). Introduces Game Mode, 3D Paint, and improved privacy settings.', '2017-04-05', '2018-10-09', 0, 0, 'https://archive.org/download/english_windows_collection/Windows%2010%201703%20x64.iso'),
(1, 'Windows 10', '1607', 'Anniversary Update', '64-bit', 3.9, 'Windows 10 version 1607 (Anniversary Update). Adds Windows Ink, improved Cortana, and Windows Hello improvements.', '2016-08-02', '2018-04-10', 0, 0, 'https://archive.org/download/english_windows_collection/Windows%2010%201607%20x64.iso'),
(1, 'Windows 10', '1511', 'November Update', '64-bit', 3.8, 'Windows 10 version 1511 (November Update). First major update to Windows 10 with Edge improvements and Cortana enhancements.', '2015-11-10', '2017-10-10', 0, 0, 'https://archive.org/download/english_windows_collection/Windows%2010%201511%20x64.iso'),
(1, 'Windows 10', '1507', 'Threshold 1', '64-bit', 3.7, 'The original release of Windows 10. Brings back the Start Menu, introduces Edge browser, Cortana, and virtual desktops.', '2015-07-29', '2017-05-09', 0, 0, 'https://archive.org/download/english_windows_collection/Windows%2010%201507%20x64.iso'),

-- Windows LTSC
(1, 'Windows 11 LTSC', '2024', 'IoT', '64-bit', 5.5, 'Windows 11 IoT Enterprise LTSC 2024. Long-Term Servicing Channel release with 10 years of support. Ideal for specialized devices.', '2024-09-06', '2029-10-09', 1, 1, 'https://archive.org/download/english_windows_collection/Windows%2011%20IoT%20Enterprise%20LTSC%202024%20x64.iso'),
(1, 'Windows 10 LTSC', '2021', 'Iron', '64-bit', 4.8, 'Windows 10 Enterprise LTSC 2021. Long-Term Servicing Channel with 5 years of support. Stable release for enterprise environments.', '2021-11-16', '2027-01-12', 1, 1, 'https://archive.org/download/english_windows_collection/Windows%2010%20Enterprise%20LTSC%202021%20x64.iso'),
(1, 'Windows 10 LTSC', '2019', 'Redstone 5', '64-bit', 4.3, 'Windows 10 Enterprise LTSC 2019. Long-Term Servicing Channel with 10 years of support. Based on version 1809.', '2018-11-13', '2029-01-09', 1, 1, 'https://archive.org/download/english_windows_collection/Windows%2010%20Enterprise%20LTSC%202019%20x64.iso'),
(1, 'Windows 10 LTSC', '2016', 'Redstone 1', '64-bit', 3.9, 'Windows 10 Enterprise LTSB 2016. Long-Term Servicing Branch with 10 years of support. Based on version 1607.', '2016-08-02', '2026-10-13', 1, 0, 'https://archive.org/download/english_windows_collection/Windows%2010%20Enterprise%20LTSB%202016%20x64.iso'),
(1, 'Windows 10 LTSC', '2015', 'Threshold 1', '64-bit', 3.7, 'Windows 10 Enterprise LTSB 2015. The first Long-Term Servicing Branch release of Windows 10.', '2015-07-29', '2025-10-14', 1, 0, 'https://archive.org/download/english_windows_collection/Windows%2010%20Enterprise%20LTSB%202015%20x64.iso'),

-- Windows 8.1
(1, 'Windows 8.1', '8.1', 'Blue', '64-bit', 3.5, 'Windows 8.1 - the final update to Windows 8. Brings back the Start button, improved apps, and better desktop integration. End of support January 2023.', '2013-10-17', '2023-01-10', 0, 0, 'https://archive.org/download/english_windows_collection/Windows%208.1%20x64.iso'),

-- Windows 7
(1, 'Windows 7', 'SP1', 'Vienna', '64-bit', 3.2, 'Windows 7 Service Pack 1. Classic and beloved OS known for its stability and ease of use. End of support January 2020. For legacy use only.', '2009-10-22', '2020-01-14', 0, 0, 'https://archive.org/download/english_windows_collection/Windows%207%20SP1%20x64.iso'),

-- ============================================================
-- LINUX OPERATING SYSTEMS
-- ============================================================

-- Ubuntu
(2, 'Ubuntu', '24.04 LTS', 'Noble Numbat', '64-bit', 4.7, 'Ubuntu 24.04 LTS (Noble Numbat). Long-term support release with 5 years of standard support. Features GNOME 46, improved performance, and enhanced security.', '2024-04-25', '2029-04-25', 1, 1, 'https://ubuntu.com/download/desktop'),
(2, 'Ubuntu', '23.10', 'Mantic Minotaur', '64-bit', 4.5, 'Ubuntu 23.10 (Mantic Minotaur). Interim release featuring GNOME 45, improved installer, and new app center.', '2023-10-12', '2024-07-11', 0, 0, 'https://ubuntu.com/download/desktop'),
(2, 'Ubuntu', '22.04 LTS', 'Jammy Jellyfish', '64-bit', 3.8, 'Ubuntu 22.04 LTS (Jammy Jellyfish). Long-term support release with GNOME 42, improved Wayland support, and enhanced security features.', '2022-04-21', '2027-04-21', 1, 1, 'https://ubuntu.com/download/desktop'),
(2, 'Ubuntu', '20.04 LTS', 'Focal Fossa', '64-bit', 2.7, 'Ubuntu 20.04 LTS (Focal Fossa). Stable LTS release with GNOME 3.36, improved performance, and ZFS support.', '2020-04-23', '2025-04-23', 1, 1, 'https://ubuntu.com/download/desktop'),
(2, 'Ubuntu', '18.04 LTS', 'Bionic Beaver', '64-bit', 1.9, 'Ubuntu 18.04 LTS (Bionic Beaver). Classic LTS release with GNOME 3.28. Extended security maintenance available.', '2018-04-26', '2023-04-26', 1, 0, 'https://ubuntu.com/download/desktop'),

-- Debian
(2, 'Debian', '12', 'Bookworm', '64-bit', 3.0, 'Debian 12 (Bookworm). The universal operating system known for its stability. Features Linux kernel 6.1 and GNOME 43.', '2023-06-10', '2028-06-10', 0, 1, 'https://www.debian.org/distrib/'),
(2, 'Debian', '11', 'Bullseye', '64-bit', 2.8, 'Debian 11 (Bullseye). Stable release with Linux kernel 5.10 LTS and GNOME 3.38. Long-term support available.', '2021-08-14', '2026-08-14', 0, 1, 'https://www.debian.org/distrib/'),
(2, 'Debian', '10', 'Buster', '64-bit', 2.5, 'Debian 10 (Buster). Stable release with Linux kernel 4.19 and GNOME 3.30. LTS support until June 2024.', '2019-07-06', '2024-06-30', 0, 0, 'https://www.debian.org/distrib/'),

-- Fedora
(2, 'Fedora', '41', 'Workstation', '64-bit', 2.1, 'Fedora 41 Workstation. Cutting-edge Linux distribution with GNOME 47, Linux kernel 6.11, and the latest open-source software.', '2024-10-29', '2025-11-19', 0, 1, 'https://fedoraproject.org/workstation/download'),
(2, 'Fedora', '40', 'Workstation', '64-bit', 2.0, 'Fedora 40 Workstation. Features GNOME 46, improved performance, and updated developer tools.', '2024-04-23', '2025-05-13', 0, 1, 'https://fedoraproject.org/workstation/download'),
(2, 'Fedora', '39', 'Workstation', '64-bit', 1.9, 'Fedora 39 Workstation. Features GNOME 45, improved Wayland support, and updated packages.', '2023-11-07', '2024-11-12', 0, 0, 'https://fedoraproject.org/workstation/download'),

-- Linux Mint
(2, 'Linux Mint', '22', 'Wilma', '64-bit', 2.3, 'Linux Mint 22 (Wilma). Based on Ubuntu 24.04 LTS with Cinnamon 6.2. Elegant and easy-to-use, perfect for Windows users switching to Linux.', '2024-07-26', '2029-04-25', 1, 1, 'https://linuxmint.com/download.php'),
(2, 'Linux Mint', '21.3', 'Virginia', '64-bit', 2.2, 'Linux Mint 21.3 (Virginia). Based on Ubuntu 22.04 LTS with Cinnamon 6.0. Stable and user-friendly release.', '2024-01-12', '2027-04-21', 1, 1, 'https://linuxmint.com/download.php'),
(2, 'Linux Mint', '21', 'Vanessa', '64-bit', 2.1, 'Linux Mint 21 (Vanessa). Based on Ubuntu 22.04 LTS with Cinnamon 5.4. Improved Bluetooth support and updated apps.', '2022-07-31', '2027-04-21', 1, 1, 'https://linuxmint.com/download.php'),
(2, 'Linux Mint', '20.3', 'Una', '64-bit', 2.0, 'Linux Mint 20.3 (Una). Based on Ubuntu 20.04 LTS with Cinnamon 5.2. Stable and reliable release.', '2022-01-07', '2025-04-23', 1, 0, 'https://linuxmint.com/download.php'),

-- Pop!_OS
(2, 'Pop!_OS', '22.04 LTS', 'LTS', '64-bit', 3.8, 'Pop!_OS 22.04 LTS by System76. Optimized for creators and developers with excellent NVIDIA/AMD GPU support and COSMIC desktop.', '2022-04-25', '2027-04-25', 1, 1, 'https://pop.system76.com/'),
(2, 'Pop!_OS', '21.10', 'Impish', '64-bit', 3.5, 'Pop!_OS 21.10. Features improved auto-tiling, GNOME 41, and enhanced gaming support.', '2021-10-14', '2022-07-14', 0, 0, 'https://pop.system76.com/'),

-- Arch Linux
(2, 'Arch Linux', '2024.12', 'Rolling', '64-bit', 0.8, 'Arch Linux December 2024 ISO. Lightweight and flexible rolling-release distribution for advanced users who want full control.', '2024-12-01', NULL, 0, 1, 'https://archlinux.org/download/'),

-- Manjaro
(2, 'Manjaro', '24.2', 'Yonada', '64-bit', 2.8, 'Manjaro 24.2 (Yonada). User-friendly Arch-based distribution with excellent hardware detection and multiple desktop editions.', '2024-12-01', NULL, 0, 1, 'https://manjaro.org/download/'),
(2, 'Manjaro', '24.1', 'Xahea', '64-bit', 2.7, 'Manjaro 24.1 (Xahea). Stable release with updated packages and improved hardware support.', '2024-09-01', NULL, 0, 1, 'https://manjaro.org/download/'),

-- Zorin OS
(2, 'Zorin OS', '17.2', 'Core', '64-bit', 3.5, 'Zorin OS 17.2. Beautiful Linux distribution designed to make your computer faster and more powerful. Perfect for Windows/macOS switchers.', '2024-08-27', '2027-04-21', 0, 1, 'https://zorin.com/os/download/'),
(2, 'Zorin OS', '16.3', 'Core', '64-bit', 3.2, 'Zorin OS 16.3. Based on Ubuntu 20.04 LTS. Elegant design with Windows-like interface for easy transition.', '2023-06-10', '2025-04-23', 0, 1, 'https://zorin.com/os/download/'),

-- elementary OS
(2, 'elementary OS', '8', 'Loki', '64-bit', 2.7, 'elementary OS 8. Beautiful and lightweight Linux distribution with the unique Pantheon desktop. Designed for elegance and simplicity.', '2024-09-17', NULL, 0, 1, 'https://elementary.io/'),
(2, 'elementary OS', '7.1', 'Horus', '64-bit', 2.5, 'elementary OS 7.1 (Horus). Based on Ubuntu 22.04 LTS with improved apps and Pantheon desktop enhancements.', '2023-09-18', NULL, 0, 1, 'https://elementary.io/'),

-- openSUSE
(2, 'openSUSE Leap', '15.6', 'Leap', '64-bit', 4.5, 'openSUSE Leap 15.6. Versatile Linux distribution with YaST configuration tools. Excellent for both desktop and server use.', '2024-06-12', '2025-12-31', 0, 1, 'https://get.opensuse.org/leap/'),
(2, 'openSUSE Tumbleweed', '2024', 'Rolling', '64-bit', 4.2, 'openSUSE Tumbleweed. Rolling-release distribution with the latest stable packages. Ideal for developers and power users.', '2024-01-01', NULL, 0, 1, 'https://get.opensuse.org/tumbleweed/'),

-- Kali Linux
(2, 'Kali Linux', '2024.4', 'Rolling', '64-bit', 4.2, 'Kali Linux 2024.4. Advanced penetration testing and security auditing distribution with 600+ pre-installed security tools.', '2024-12-11', NULL, 0, 1, 'https://www.kali.org/get-kali/'),
(2, 'Kali Linux', '2024.3', 'Rolling', '64-bit', 4.1, 'Kali Linux 2024.3. Updated security tools and improved hardware support for penetration testing professionals.', '2024-09-11', NULL, 0, 1, 'https://www.kali.org/get-kali/'),

-- CentOS Stream
(2, 'CentOS Stream', '10', 'Stream', '64-bit', 1.8, 'CentOS Stream 10. Community-driven enterprise Linux serving as the upstream development platform for RHEL 10.', '2024-12-01', '2030-06-01', 0, 1, 'https://www.centos.org/centos-stream/'),
(2, 'CentOS Stream', '9', 'Stream', '64-bit', 1.7, 'CentOS Stream 9. Upstream development platform for RHEL 9. Rolling preview of what goes into RHEL.', '2021-12-03', '2027-05-31', 0, 1, 'https://www.centos.org/centos-stream/'),

-- Rocky Linux
(2, 'Rocky Linux', '9.5', 'Blue Onyx', '64-bit', 2.0, 'Rocky Linux 9.5 (Blue Onyx). Enterprise-grade Linux distribution, binary compatible with RHEL 9. Community-driven successor to CentOS.', '2024-11-19', '2032-05-31', 0, 1, 'https://rockylinux.org/download'),
(2, 'Rocky Linux', '8.10', 'Green Obsidian', '64-bit', 1.9, 'Rocky Linux 8.10 (Green Obsidian). Stable enterprise Linux compatible with RHEL 8. Supported until May 2029.', '2024-05-31', '2029-05-31', 0, 1, 'https://rockylinux.org/download'),

-- AlmaLinux
(2, 'AlmaLinux', '9.5', 'Teal Serval', '64-bit', 2.0, 'AlmaLinux 9.5 (Teal Serval). Free, open-source enterprise Linux distribution, 1:1 binary compatible with RHEL 9.', '2024-11-18', '2032-05-31', 0, 1, 'https://almalinux.org/get-almalinux/'),
(2, 'AlmaLinux', '8.10', 'Cerulean Leopard', '64-bit', 1.9, 'AlmaLinux 8.10 (Cerulean Leopard). Enterprise Linux compatible with RHEL 8. Free and community-supported.', '2024-05-28', '2029-03-01', 0, 1, 'https://almalinux.org/get-almalinux/'),

-- Tails
(2, 'Tails', '6.10', 'Privacy', '64-bit', 1.4, 'Tails 6.10. Privacy-focused live operating system that routes all traffic through Tor. Leaves no trace on the computer.', '2024-12-03', NULL, 0, 1, 'https://tails.boum.org/install/'),

-- Whonix
(2, 'Whonix', '17', 'Security', '64-bit', 1.8, 'Whonix 17. Security-focused Linux distribution designed for advanced privacy and anonymity using Tor and virtual machines.', '2024-01-01', NULL, 0, 1, 'https://www.whonix.org/wiki/Download'),

-- Parrot OS
(2, 'Parrot OS', '6.2', 'Security', '64-bit', 3.5, 'Parrot OS 6.2. Security-oriented Linux distribution for penetration testing, digital forensics, and privacy protection.', '2024-09-01', NULL, 0, 1, 'https://www.parrotsec.org/download/'),

-- ============================================================
-- macOS
-- ============================================================
(3, 'macOS Sequoia', '15', 'Sequoia', '64-bit', 13.0, 'macOS Sequoia 15. Latest Apple desktop OS with iPhone Mirroring, improved window tiling, enhanced gaming, and Apple Intelligence AI features.', '2024-09-16', NULL, 0, 1, 'https://www.apple.com/macos/'),
(3, 'macOS Sonoma', '14', 'Sonoma', '64-bit', 12.0, 'macOS Sonoma 14. Features desktop widgets, improved gaming with Game Mode, video conferencing enhancements, and Safari improvements.', '2023-09-26', NULL, 0, 1, 'https://www.apple.com/macos/'),
(3, 'macOS Ventura', '13', 'Ventura', '64-bit', 12.0, 'macOS Ventura 13. Introduces Stage Manager, Continuity Camera, improved Spotlight, and redesigned System Preferences.', '2022-10-24', NULL, 0, 1, 'https://www.apple.com/macos/'),
(3, 'macOS Monterey', '12', 'Monterey', '64-bit', 12.0, 'macOS Monterey 12. Features Universal Control, AirPlay to Mac, Focus modes, and improved FaceTime with SharePlay.', '2021-10-25', NULL, 0, 0, 'https://www.apple.com/macos/');
