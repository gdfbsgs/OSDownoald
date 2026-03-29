// ============================================================
// OSClick - Operating Systems Database
// Mirrors the data in db.sql
// ============================================================

const osDatabase = [
    // ============================================================
    // WINDOWS
    // ============================================================
    {
        id: 1, family: "Windows", familyIcon: "🪟",
        name: "Windows 11", version: "24H2", codename: "Germanium",
        architecture: "64-bit", size: "5.8 GB",
        description: "Windows 11 version 24H2 (October 2024 Update). Features improved AI capabilities, Recall, enhanced Copilot integration, and performance improvements.",
        releaseDate: "2024-10-01", eosDate: "2026-10-13",
        isLTS: false, isSupported: true,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2011%2024H2%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 2, family: "Windows", familyIcon: "🪟",
        name: "Windows 11", version: "23H2", codename: "Moment 5",
        architecture: "64-bit", size: "5.6 GB",
        description: "Windows 11 version 23H2 (November 2023 Update). Includes Windows Copilot, AI-powered features, and improved File Explorer with a modern design.",
        releaseDate: "2023-10-31", eosDate: "2025-11-11",
        isLTS: false, isSupported: true,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2011/23H2/Win11_23H2_English_x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 3, family: "Windows", familyIcon: "🪟",
        name: "Windows 11", version: "22H2", codename: "Sun Valley 2",
        architecture: "64-bit", size: "5.4 GB",
        description: "Windows 11 version 22H2 (September 2022 Update). Brings Tabs in File Explorer, improved Snap Layouts, and Task Manager redesign.",
        releaseDate: "2022-09-20", eosDate: "2024-10-08",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2011%2022H2%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 4, family: "Windows", familyIcon: "🪟",
        name: "Windows 11", version: "21H2", codename: "Sun Valley",
        architecture: "64-bit", size: "5.1 GB",
        description: "The original release of Windows 11. Features a centered Start Menu, redesigned taskbar, Snap Layouts, and DirectStorage support.",
        releaseDate: "2021-10-05", eosDate: "2023-10-10",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2011%2021H2%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 5, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "22H2", codename: "Sun Valley",
        architecture: "64-bit", size: "5.2 GB",
        description: "Windows 10 version 22H2 — the final feature update for Windows 10. Supported until October 14, 2025. Stable and widely compatible.",
        releaseDate: "2022-10-18", eosDate: "2025-10-14",
        isLTS: false, isSupported: true,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%2022H2%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 6, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "21H2", codename: "Iron",
        architecture: "64-bit", size: "5.0 GB",
        description: "Windows 10 version 21H2 (November 2021 Update). Includes WPA3 H2E support, GPU compute in WSL, and Windows Hello improvements.",
        releaseDate: "2021-11-16", eosDate: "2023-06-13",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%2021H2%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 7, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "21H1", codename: "Iron",
        architecture: "64-bit", size: "4.9 GB",
        description: "Windows 10 version 21H1 (May 2021 Update). Includes Windows Hello multi-camera support and improved Windows Defender Application Guard.",
        releaseDate: "2021-05-18", eosDate: "2022-12-13",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%2021H1%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 8, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "20H2", codename: "Vibranium",
        architecture: "64-bit", size: "4.8 GB",
        description: "Windows 10 version 20H2 (October 2020 Update). Brings a new Start Menu design, Microsoft Edge Chromium, and improved tablet experience.",
        releaseDate: "2020-10-20", eosDate: "2022-05-10",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%2020H2%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 9, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "2004", codename: "Vibranium",
        architecture: "64-bit", size: "4.7 GB",
        description: "Windows 10 version 2004 (May 2020 Update). Introduces WSL 2, Cortana as standalone app, and improved virtual desktops.",
        releaseDate: "2020-05-27", eosDate: "2021-12-14",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%202004%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 10, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "1909", codename: "Vanadium",
        architecture: "64-bit", size: "4.5 GB",
        description: "Windows 10 version 1909 (November 2019 Update). Adds calendar flyout improvements, improved search, and Cortana enhancements.",
        releaseDate: "2019-11-12", eosDate: "2021-05-11",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%201909%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 11, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "1903", codename: "19H1",
        architecture: "64-bit", size: "4.4 GB",
        description: "Windows 10 version 1903 (May 2019 Update). Introduces Windows Sandbox, improved search, and light theme.",
        releaseDate: "2019-05-21", eosDate: "2020-12-08",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%201903%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 12, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "1809", codename: "Redstone 5",
        architecture: "64-bit", size: "4.3 GB",
        description: "Windows 10 version 1809 (October 2018 Update). Adds Your Phone app, Clipboard history, and Dark Mode for File Explorer.",
        releaseDate: "2018-11-13", eosDate: "2020-11-10",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%201809%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 13, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "1803", codename: "Redstone 4",
        architecture: "64-bit", size: "4.2 GB",
        description: "Windows 10 version 1803 (April 2018 Update). Introduces Timeline, Focus Assist, and Near Share.",
        releaseDate: "2018-04-30", eosDate: "2019-11-12",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%201803%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 14, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "1709", codename: "Fall Creators Update",
        architecture: "64-bit", size: "4.1 GB",
        description: "Windows 10 version 1709 (Fall Creators Update). Adds Mixed Reality Portal, Fluent Design, and OneDrive Files On-Demand.",
        releaseDate: "2017-10-17", eosDate: "2019-04-09",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%201709%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 15, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "1703", codename: "Creators Update",
        architecture: "64-bit", size: "4.0 GB",
        description: "Windows 10 version 1703 (Creators Update). Introduces Game Mode, 3D Paint, and improved privacy settings.",
        releaseDate: "2017-04-05", eosDate: "2018-10-09",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%201703%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 16, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "1607", codename: "Anniversary Update",
        architecture: "64-bit", size: "3.9 GB",
        description: "Windows 10 version 1607 (Anniversary Update). Adds Windows Ink, improved Cortana, and Windows Hello improvements.",
        releaseDate: "2016-08-02", eosDate: "2018-04-10",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%201607%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 17, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "1511", codename: "November Update",
        architecture: "64-bit", size: "3.8 GB",
        description: "Windows 10 version 1511 (November Update). First major update to Windows 10 with Edge improvements and Cortana enhancements.",
        releaseDate: "2015-11-10", eosDate: "2017-10-10",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%201511%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 18, family: "Windows", familyIcon: "🪟",
        name: "Windows 10", version: "1507", codename: "Threshold 1",
        architecture: "64-bit", size: "3.7 GB",
        description: "The original release of Windows 10. Brings back the Start Menu, introduces Edge browser, Cortana, and virtual desktops.",
        releaseDate: "2015-07-29", eosDate: "2017-05-09",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%201507%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 19, family: "Windows", familyIcon: "🪟",
        name: "Windows 11 LTSC", version: "2024", codename: "IoT Enterprise",
        architecture: "64-bit", size: "5.5 GB",
        description: "Windows 11 IoT Enterprise LTSC 2024. Long-Term Servicing Channel release with 10 years of support. Ideal for specialized devices.",
        releaseDate: "2024-09-06", eosDate: "2029-10-09",
        isLTS: true, isSupported: true,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2011%20IoT%20Enterprise%20LTSC%202024%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 20, family: "Windows", familyIcon: "🪟",
        name: "Windows 10 LTSC", version: "2021", codename: "Iron",
        architecture: "64-bit", size: "4.8 GB",
        description: "Windows 10 Enterprise LTSC 2021. Long-Term Servicing Channel with 5 years of support. Stable release for enterprise environments.",
        releaseDate: "2021-11-16", eosDate: "2027-01-12",
        isLTS: true, isSupported: true,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%20Enterprise%20LTSC%202021%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 21, family: "Windows", familyIcon: "🪟",
        name: "Windows 10 LTSC", version: "2019", codename: "Redstone 5",
        architecture: "64-bit", size: "4.3 GB",
        description: "Windows 10 Enterprise LTSC 2019. Long-Term Servicing Channel with 10 years of support. Based on version 1809.",
        releaseDate: "2018-11-13", eosDate: "2029-01-09",
        isLTS: true, isSupported: true,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%20Enterprise%20LTSC%202019%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 22, family: "Windows", familyIcon: "🪟",
        name: "Windows 10 LTSC", version: "2016", codename: "Redstone 1",
        architecture: "64-bit", size: "3.9 GB",
        description: "Windows 10 Enterprise LTSB 2016. Long-Term Servicing Branch with 10 years of support. Based on version 1607.",
        releaseDate: "2016-08-02", eosDate: "2026-10-13",
        isLTS: true, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%20Enterprise%20LTSB%202016%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 23, family: "Windows", familyIcon: "🪟",
        name: "Windows 10 LTSC", version: "2015", codename: "Threshold 1",
        architecture: "64-bit", size: "3.7 GB",
        description: "Windows 10 Enterprise LTSB 2015. The first Long-Term Servicing Branch release of Windows 10.",
        releaseDate: "2015-07-29", eosDate: "2025-10-14",
        isLTS: true, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%2010%20Enterprise%20LTSB%202015%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 24, family: "Windows", familyIcon: "🪟",
        name: "Windows 8.1", version: "8.1", codename: "Blue",
        architecture: "64-bit", size: "3.5 GB",
        description: "Windows 8.1 — the final update to Windows 8. Brings back the Start button, improved apps, and better desktop integration. End of support January 2023.",
        releaseDate: "2013-10-17", eosDate: "2023-01-10",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%208.1%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },
    {
        id: 25, family: "Windows", familyIcon: "🪟",
        name: "Windows 7", version: "SP1", codename: "Vienna",
        architecture: "64-bit", size: "3.2 GB",
        description: "Windows 7 Service Pack 1. Classic and beloved OS known for its stability and ease of use. End of support January 2020. For legacy use only.",
        releaseDate: "2009-10-22", eosDate: "2020-01-14",
        isLTS: false, isSupported: false,
        downloadUrl: "https://archive.org/download/english_windows_collection/Windows%207%20SP1%20x64.iso",
        iconBg: "#0078D4", icon: "🪟"
    },

    // ============================================================
    // LINUX
    // ============================================================
    {
        id: 26, family: "Linux", familyIcon: "🐧",
        name: "Ubuntu", version: "24.04 LTS", codename: "Noble Numbat",
        architecture: "64-bit", size: "4.7 GB",
        description: "Ubuntu 24.04 LTS (Noble Numbat). Long-term support release with 5 years of standard support. Features GNOME 46, improved performance, and enhanced security.",
        releaseDate: "2024-04-25", eosDate: "2029-04-25",
        isLTS: true, isSupported: true,
        downloadUrl: "https://ubuntu.com/download/desktop",
        iconBg: "#E95420", icon: "🟠"
    },
    {
        id: 27, family: "Linux", familyIcon: "🐧",
        name: "Ubuntu", version: "23.10", codename: "Mantic Minotaur",
        architecture: "64-bit", size: "4.5 GB",
        description: "Ubuntu 23.10 (Mantic Minotaur). Interim release featuring GNOME 45, improved installer, and new app center.",
        releaseDate: "2023-10-12", eosDate: "2024-07-11",
        isLTS: false, isSupported: false,
        downloadUrl: "https://ubuntu.com/download/desktop",
        iconBg: "#E95420", icon: "🟠"
    },
    {
        id: 28, family: "Linux", familyIcon: "🐧",
        name: "Ubuntu", version: "22.04 LTS", codename: "Jammy Jellyfish",
        architecture: "64-bit", size: "3.8 GB",
        description: "Ubuntu 22.04 LTS (Jammy Jellyfish). Long-term support release with GNOME 42, improved Wayland support, and enhanced security features.",
        releaseDate: "2022-04-21", eosDate: "2027-04-21",
        isLTS: true, isSupported: true,
        downloadUrl: "https://ubuntu.com/download/desktop",
        iconBg: "#E95420", icon: "🟠"
    },
    {
        id: 29, family: "Linux", familyIcon: "🐧",
        name: "Ubuntu", version: "20.04 LTS", codename: "Focal Fossa",
        architecture: "64-bit", size: "2.7 GB",
        description: "Ubuntu 20.04 LTS (Focal Fossa). Stable LTS release with GNOME 3.36, improved performance, and ZFS support.",
        releaseDate: "2020-04-23", eosDate: "2025-04-23",
        isLTS: true, isSupported: true,
        downloadUrl: "https://ubuntu.com/download/desktop",
        iconBg: "#E95420", icon: "🟠"
    },
    {
        id: 30, family: "Linux", familyIcon: "🐧",
        name: "Ubuntu", version: "18.04 LTS", codename: "Bionic Beaver",
        architecture: "64-bit", size: "1.9 GB",
        description: "Ubuntu 18.04 LTS (Bionic Beaver). Classic LTS release with GNOME 3.28. Extended security maintenance available.",
        releaseDate: "2018-04-26", eosDate: "2023-04-26",
        isLTS: true, isSupported: false,
        downloadUrl: "https://ubuntu.com/download/desktop",
        iconBg: "#E95420", icon: "🟠"
    },
    {
        id: 31, family: "Linux", familyIcon: "🐧",
        name: "Debian", version: "12", codename: "Bookworm",
        architecture: "64-bit", size: "3.0 GB",
        description: "Debian 12 (Bookworm). The universal operating system known for its stability. Features Linux kernel 6.1 and GNOME 43.",
        releaseDate: "2023-06-10", eosDate: "2028-06-10",
        isLTS: false, isSupported: true,
        downloadUrl: "https://www.debian.org/distrib/",
        iconBg: "#A80030", icon: "🔵"
    },
    {
        id: 32, family: "Linux", familyIcon: "🐧",
        name: "Debian", version: "11", codename: "Bullseye",
        architecture: "64-bit", size: "2.8 GB",
        description: "Debian 11 (Bullseye). Stable release with Linux kernel 5.10 LTS and GNOME 3.38. Long-term support available.",
        releaseDate: "2021-08-14", eosDate: "2026-08-14",
        isLTS: false, isSupported: true,
        downloadUrl: "https://www.debian.org/distrib/",
        iconBg: "#A80030", icon: "🔵"
    },
    {
        id: 33, family: "Linux", familyIcon: "🐧",
        name: "Debian", version: "10", codename: "Buster",
        architecture: "64-bit", size: "2.5 GB",
        description: "Debian 10 (Buster). Stable release with Linux kernel 4.19 and GNOME 3.30. LTS support until June 2024.",
        releaseDate: "2019-07-06", eosDate: "2024-06-30",
        isLTS: false, isSupported: false,
        downloadUrl: "https://www.debian.org/distrib/",
        iconBg: "#A80030", icon: "🔵"
    },
    {
        id: 34, family: "Linux", familyIcon: "🐧",
        name: "Fedora", version: "41", codename: "Workstation",
        architecture: "64-bit", size: "2.1 GB",
        description: "Fedora 41 Workstation. Cutting-edge Linux distribution with GNOME 47, Linux kernel 6.11, and the latest open-source software.",
        releaseDate: "2024-10-29", eosDate: "2025-11-19",
        isLTS: false, isSupported: true,
        downloadUrl: "https://fedoraproject.org/workstation/download",
        iconBg: "#51A2DA", icon: "🔴"
    },
    {
        id: 35, family: "Linux", familyIcon: "🐧",
        name: "Fedora", version: "40", codename: "Workstation",
        architecture: "64-bit", size: "2.0 GB",
        description: "Fedora 40 Workstation. Features GNOME 46, improved performance, and updated developer tools.",
        releaseDate: "2024-04-23", eosDate: "2025-05-13",
        isLTS: false, isSupported: true,
        downloadUrl: "https://fedoraproject.org/workstation/download",
        iconBg: "#51A2DA", icon: "🔴"
    },
    {
        id: 36, family: "Linux", familyIcon: "🐧",
        name: "Fedora", version: "39", codename: "Workstation",
        architecture: "64-bit", size: "1.9 GB",
        description: "Fedora 39 Workstation. Features GNOME 45, improved Wayland support, and updated packages.",
        releaseDate: "2023-11-07", eosDate: "2024-11-12",
        isLTS: false, isSupported: false,
        downloadUrl: "https://fedoraproject.org/workstation/download",
        iconBg: "#51A2DA", icon: "🔴"
    },
    {
        id: 37, family: "Linux", familyIcon: "🐧",
        name: "Linux Mint", version: "22", codename: "Wilma",
        architecture: "64-bit", size: "2.3 GB",
        description: "Linux Mint 22 (Wilma). Based on Ubuntu 24.04 LTS with Cinnamon 6.2. Elegant and easy-to-use, perfect for Windows users switching to Linux.",
        releaseDate: "2024-07-26", eosDate: "2029-04-25",
        isLTS: true, isSupported: true,
        downloadUrl: "https://linuxmint.com/download.php",
        iconBg: "#87CF3E", icon: "🍃"
    },
    {
        id: 38, family: "Linux", familyIcon: "🐧",
        name: "Linux Mint", version: "21.3", codename: "Virginia",
        architecture: "64-bit", size: "2.2 GB",
        description: "Linux Mint 21.3 (Virginia). Based on Ubuntu 22.04 LTS with Cinnamon 6.0. Stable and user-friendly release.",
        releaseDate: "2024-01-12", eosDate: "2027-04-21",
        isLTS: true, isSupported: true,
        downloadUrl: "https://linuxmint.com/download.php",
        iconBg: "#87CF3E", icon: "🍃"
    },
    {
        id: 39, family: "Linux", familyIcon: "🐧",
        name: "Linux Mint", version: "21", codename: "Vanessa",
        architecture: "64-bit", size: "2.1 GB",
        description: "Linux Mint 21 (Vanessa). Based on Ubuntu 22.04 LTS with Cinnamon 5.4. Improved Bluetooth support and updated apps.",
        releaseDate: "2022-07-31", eosDate: "2027-04-21",
        isLTS: true, isSupported: true,
        downloadUrl: "https://linuxmint.com/download.php",
        iconBg: "#87CF3E", icon: "🍃"
    },
    {
        id: 40, family: "Linux", familyIcon: "🐧",
        name: "Pop!_OS", version: "22.04 LTS", codename: "LTS",
        architecture: "64-bit", size: "3.8 GB",
        description: "Pop!_OS 22.04 LTS by System76. Optimized for creators and developers with excellent NVIDIA/AMD GPU support and COSMIC desktop.",
        releaseDate: "2022-04-25", eosDate: "2027-04-25",
        isLTS: true, isSupported: true,
        downloadUrl: "https://pop.system76.com/",
        iconBg: "#48B9C7", icon: "🎯"
    },
    {
        id: 41, family: "Linux", familyIcon: "🐧",
        name: "Arch Linux", version: "2024.12", codename: "Rolling",
        architecture: "64-bit", size: "0.8 GB",
        description: "Arch Linux December 2024 ISO. Lightweight and flexible rolling-release distribution for advanced users who want full control.",
        releaseDate: "2024-12-01", eosDate: null,
        isLTS: false, isSupported: true,
        downloadUrl: "https://archlinux.org/download/",
        iconBg: "#1793D1", icon: "🏹"
    },
    {
        id: 42, family: "Linux", familyIcon: "🐧",
        name: "Manjaro", version: "24.2", codename: "Yonada",
        architecture: "64-bit", size: "2.8 GB",
        description: "Manjaro 24.2 (Yonada). User-friendly Arch-based distribution with excellent hardware detection and multiple desktop editions.",
        releaseDate: "2024-12-01", eosDate: null,
        isLTS: false, isSupported: true,
        downloadUrl: "https://manjaro.org/download/",
        iconBg: "#07ACBA", icon: "🧩"
    },
    {
        id: 43, family: "Linux", familyIcon: "🐧",
        name: "Zorin OS", version: "17.2", codename: "Core",
        architecture: "64-bit", size: "3.5 GB",
        description: "Zorin OS 17.2. Beautiful Linux distribution designed to make your computer faster and more powerful. Perfect for Windows/macOS switchers.",
        releaseDate: "2024-08-27", eosDate: "2027-04-21",
        isLTS: false, isSupported: true,
        downloadUrl: "https://zorin.com/os/download/",
        iconBg: "#1A52C2", icon: "⚡"
    },
    {
        id: 44, family: "Linux", familyIcon: "🐧",
        name: "elementary OS", version: "8", codename: "Loki",
        architecture: "64-bit", size: "2.7 GB",
        description: "elementary OS 8. Beautiful and lightweight Linux distribution with the unique Pantheon desktop. Designed for elegance and simplicity.",
        releaseDate: "2024-09-17", eosDate: null,
        isLTS: false, isSupported: true,
        downloadUrl: "https://elementary.io/",
        iconBg: "#485a6c", icon: "✴️"
    },
    {
        id: 45, family: "Linux", familyIcon: "🐧",
        name: "openSUSE Leap", version: "15.6", codename: "Leap",
        architecture: "64-bit", size: "4.5 GB",
        description: "openSUSE Leap 15.6. Versatile Linux distribution with YaST configuration tools. Excellent for both desktop and server use.",
        releaseDate: "2024-06-12", eosDate: "2025-12-31",
        isLTS: false, isSupported: true,
        downloadUrl: "https://get.opensuse.org/leap/",
        iconBg: "#73BA25", icon: "🟢"
    },
    {
        id: 46, family: "Linux", familyIcon: "🐧",
        name: "openSUSE Tumbleweed", version: "2024", codename: "Rolling",
        architecture: "64-bit", size: "4.2 GB",
        description: "openSUSE Tumbleweed. Rolling-release distribution with the latest stable packages. Ideal for developers and power users.",
        releaseDate: "2024-01-01", eosDate: null,
        isLTS: false, isSupported: true,
        downloadUrl: "https://get.opensuse.org/tumbleweed/",
        iconBg: "#73BA25", icon: "🟢"
    },
    {
        id: 47, family: "Linux", familyIcon: "🐧",
        name: "Kali Linux", version: "2024.4", codename: "Rolling",
        architecture: "64-bit", size: "4.2 GB",
        description: "Kali Linux 2024.4. Advanced penetration testing and security auditing distribution with 600+ pre-installed security tools.",
        releaseDate: "2024-12-11", eosDate: null,
        isLTS: false, isSupported: true,
        downloadUrl: "https://www.kali.org/get-kali/",
        iconBg: "#557C94", icon: "💀"
    },
    {
        id: 48, family: "Linux", familyIcon: "🐧",
        name: "CentOS Stream", version: "10", codename: "Stream",
        architecture: "64-bit", size: "1.8 GB",
        description: "CentOS Stream 10. Community-driven enterprise Linux serving as the upstream development platform for RHEL 10.",
        releaseDate: "2024-12-01", eosDate: "2030-06-01",
        isLTS: false, isSupported: true,
        downloadUrl: "https://www.centos.org/centos-stream/",
        iconBg: "#262577", icon: "🔶"
    },
    {
        id: 49, family: "Linux", familyIcon: "🐧",
        name: "CentOS Stream", version: "9", codename: "Stream",
        architecture: "64-bit", size: "1.7 GB",
        description: "CentOS Stream 9. Upstream development platform for RHEL 9. Rolling preview of what goes into RHEL.",
        releaseDate: "2021-12-03", eosDate: "2027-05-31",
        isLTS: false, isSupported: true,
        downloadUrl: "https://www.centos.org/centos-stream/",
        iconBg: "#262577", icon: "🔶"
    },
    {
        id: 50, family: "Linux", familyIcon: "🐧",
        name: "Rocky Linux", version: "9.5", codename: "Blue Onyx",
        architecture: "64-bit", size: "2.0 GB",
        description: "Rocky Linux 9.5 (Blue Onyx). Enterprise-grade Linux distribution, binary compatible with RHEL 9. Community-driven successor to CentOS.",
        releaseDate: "2024-11-19", eosDate: "2032-05-31",
        isLTS: false, isSupported: true,
        downloadUrl: "https://rockylinux.org/download",
        iconBg: "#10B981", icon: "🪨"
    },
    {
        id: 51, family: "Linux", familyIcon: "🐧",
        name: "Rocky Linux", version: "8.10", codename: "Green Obsidian",
        architecture: "64-bit", size: "1.9 GB",
        description: "Rocky Linux 8.10 (Green Obsidian). Stable enterprise Linux compatible with RHEL 8. Supported until May 2029.",
        releaseDate: "2024-05-31", eosDate: "2029-05-31",
        isLTS: false, isSupported: true,
        downloadUrl: "https://rockylinux.org/download",
        iconBg: "#10B981", icon: "🪨"
    },
    {
        id: 52, family: "Linux", familyIcon: "🐧",
        name: "AlmaLinux", version: "9.5", codename: "Teal Serval",
        architecture: "64-bit", size: "2.0 GB",
        description: "AlmaLinux 9.5 (Teal Serval). Free, open-source enterprise Linux distribution, 1:1 binary compatible with RHEL 9.",
        releaseDate: "2024-11-18", eosDate: "2032-05-31",
        isLTS: false, isSupported: true,
        downloadUrl: "https://almalinux.org/get-almalinux/",
        iconBg: "#0F4C81", icon: "🦁"
    },
    {
        id: 53, family: "Linux", familyIcon: "🐧",
        name: "AlmaLinux", version: "8.10", codename: "Cerulean Leopard",
        architecture: "64-bit", size: "1.9 GB",
        description: "AlmaLinux 8.10 (Cerulean Leopard). Enterprise Linux compatible with RHEL 8. Free and community-supported.",
        releaseDate: "2024-05-28", eosDate: "2029-03-01",
        isLTS: false, isSupported: true,
        downloadUrl: "https://almalinux.org/get-almalinux/",
        iconBg: "#0F4C81", icon: "🦁"
    },
    {
        id: 54, family: "Linux", familyIcon: "🐧",
        name: "Tails", version: "6.10", codename: "Privacy",
        architecture: "64-bit", size: "1.4 GB",
        description: "Tails 6.10. Privacy-focused live operating system that routes all traffic through Tor. Leaves no trace on the computer.",
        releaseDate: "2024-12-03", eosDate: null,
        isLTS: false, isSupported: true,
        downloadUrl: "https://tails.boum.org/install/",
        iconBg: "#56347C", icon: "🔒"
    },
    {
        id: 55, family: "Linux", familyIcon: "🐧",
        name: "Parrot OS", version: "6.2", codename: "Security",
        architecture: "64-bit", size: "3.5 GB",
        description: "Parrot OS 6.2. Security-oriented Linux distribution for penetration testing, digital forensics, and privacy protection.",
        releaseDate: "2024-09-01", eosDate: null,
        isLTS: false, isSupported: true,
        downloadUrl: "https://www.parrotsec.org/download/",
        iconBg: "#00BFFF", icon: "🦜"
    },

    // ============================================================
    // macOS
    // ============================================================
    {
        id: 56, family: "macOS", familyIcon: "🍎",
        name: "macOS Sequoia", version: "15", codename: "Sequoia",
        architecture: "64-bit", size: "13.0 GB",
        description: "macOS Sequoia 15. Latest Apple desktop OS with iPhone Mirroring, improved window tiling, enhanced gaming, and Apple Intelligence AI features.",
        releaseDate: "2024-09-16", eosDate: null,
        isLTS: false, isSupported: true,
        downloadUrl: "https://www.apple.com/macos/",
        iconBg: "#A3AAAE", icon: "🍎"
    },
    {
        id: 57, family: "macOS", familyIcon: "🍎",
        name: "macOS Sonoma", version: "14", codename: "Sonoma",
        architecture: "64-bit", size: "12.0 GB",
        description: "macOS Sonoma 14. Features desktop widgets, improved gaming with Game Mode, video conferencing enhancements, and Safari improvements.",
        releaseDate: "2023-09-26", eosDate: null,
        isLTS: false, isSupported: true,
        downloadUrl: "https://www.apple.com/macos/",
        iconBg: "#A3AAAE", icon: "🍎"
    },
    {
        id: 58, family: "macOS", familyIcon: "🍎",
        name: "macOS Ventura", version: "13", codename: "Ventura",
        architecture: "64-bit", size: "12.0 GB",
        description: "macOS Ventura 13. Introduces Stage Manager, Continuity Camera, improved Spotlight, and redesigned System Preferences.",
        releaseDate: "2022-10-24", eosDate: null,
        isLTS: false, isSupported: true,
        downloadUrl: "https://www.apple.com/macos/",
        iconBg: "#A3AAAE", icon: "🍎"
    },
    {
        id: 59, family: "macOS", familyIcon: "🍎",
        name: "macOS Monterey", version: "12", codename: "Monterey",
        architecture: "64-bit", size: "12.0 GB",
        description: "macOS Monterey 12. Features Universal Control, AirPlay to Mac, Focus modes, and improved FaceTime with SharePlay.",
        releaseDate: "2021-10-25", eosDate: null,
        isLTS: false, isSupported: false,
        downloadUrl: "https://www.apple.com/macos/",
        iconBg: "#A3AAAE", icon: "🍎"
    }
];

// ============================================================
// State
// ============================================================
let currentFilter = "all";
let currentSearch = "";

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
// Initial render
// ============================================================
renderOS(getFilteredOS());
