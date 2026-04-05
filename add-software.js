const fs = require('fs');
const sql = fs.readFileSync('complete-database.sql', 'utf8');

const newEntries = `,
(4, 'WhatsApp Desktop', '2.2446.52.0', NULL, '64-bit', 0.15, 'Messaging app.', '2024-11-10', NULL, 0, 1, 'en-US', 'Stable', 'https://web.whatsapp.com/desktop/windows/release/x64/WhatsAppSetup.exe'),
(4, 'Telegram Desktop', '5.5.2', NULL, '64-bit', 0.08, 'Cloud messaging app.', '2024-11-13', NULL, 0, 1, 'en-US', 'Stable', 'https://updates.tdesktop.com/twin/tsetup-x64.5.5.2.exe'),
(4, 'Microsoft Teams', '1.6.00.32462', NULL, '64-bit', 0.2, 'Team communication platform.', '2024-11-12', NULL, 0, 1, 'en-US', 'Enterprise', 'https://teams.microsoft.com/downloads/desktopurl?env=production&os=windows&arch=x64&download=true'),
(4, 'Microsoft OneDrive', '24.205.1020', NULL, '64-bit', 0.15, 'Cloud storage sync client.', '2024-11-14', NULL, 0, 1, 'en-US', 'Stable', 'https://go.microsoft.com/fwlink/?linkid=844652'),
(4, 'Microsoft PowerToys', '0.86.0', NULL, '64-bit', 0.25, 'System utilities for power users.', '2024-11-11', NULL, 0, 1, 'en-US', 'Stable', 'https://github.com/microsoft/PowerToys/releases/download/v0.86.0/PowerToysSetup-0.86.0-x64.exe'),
(4, 'Microsoft Edge', '131.0.2903.70', NULL, '64-bit', 0.2, 'Web browser with AI features.', '2024-11-14', NULL, 0, 1, 'en-US', 'Stable', 'https://go.microsoft.com/fwlink/?linkid=2109047&Channel=Stable&language=en&brand=M100'),
(4, 'Brave Browser', '1.72.104', NULL, '64-bit', 0.18, 'Privacy-focused web browser.', '2024-11-12', NULL, 0, 1, 'en-US', 'Stable', 'https://laptop-updates.brave.com/latest/winx64'),
(4, 'Opera Browser', '115.0.5322.51', NULL, '64-bit', 0.15, 'Feature-rich web browser.', '2024-11-13', NULL, 0, 1, 'en-US', 'Stable', 'https://get.geo.opera.com/pub/opera/desktop/115.0.5322.51/win/Opera_115.0.5322.51_Setup.exe'),
(4, 'WinRAR', '7.01', NULL, '64-bit', 0.003, 'File archiver.', '2024-10-30', NULL, 0, 1, 'en-US', '64-bit', 'https://www.rarlab.com/rar/winrar-x64-701.exe'),
(4, 'WinDirStat', '1.1.2.80', NULL, '64-bit', 0.001, 'Disk usage analyzer.', '2024-01-15', NULL, 0, 1, 'en-US', 'Release', 'https://sourceforge.net/projects/windirstat/files/windirstat/1.1.2/windirstat1_1_2_setup.exe/download'),
(4, 'CPU-Z', '2.12', NULL, '64-bit', 0.002, 'System information tool.', '2024-11-05', NULL, 0, 1, 'en-US', 'Setup', 'https://download.cpuid.com/cpu-z/cpu-z_2.12-en.exe'),
(4, 'GPU-Z', '2.61.0', NULL, '64-bit', 0.002, 'Graphics card information.', '2024-10-20', NULL, 0, 1, 'en-US', 'Release', 'https://www.techpowerup.com/download/techpowerup-gpu-z/'),
(4, 'CrystalDiskInfo', '9.4.4', NULL, '64-bit', 0.005, 'Disk health monitoring.', '2024-11-01', NULL, 0, 1, 'en-US', 'Standard', 'https://sourceforge.net/projects/crystaldiskinfo/files/9.4.4/CrystalDiskInfo9_4_4.exe/download'),
(4, 'HandBrake', '1.9.0', NULL, '64-bit', 0.15, 'Video transcoder.', '2024-11-10', NULL, 0, 1, 'en-US', 'Release', 'https://github.com/HandBrake/HandBrake/releases/download/1.9.0/HandBrake-1.9.0-x86_64-Win_GUI.exe'),
(4, 'GIMP', '2.10.38', NULL, '64-bit', 0.3, 'Image editor.', '2024-10-25', NULL, 0, 1, 'en-US', 'Installer', 'https://download.gimp.org/gimp/v2.10/windows/gimp-2.10.38-setup.exe'),
(4, 'Inkscape', '1.4', NULL, '64-bit', 0.25, 'Vector graphics editor.', '2024-10-18', NULL, 0, 1, 'en-US', 'Release', 'https://media.inkscape.org/dl/resources/file/inkscape-1.4_2024-10-18_86a8e7d968-x64.exe'),
(4, 'Audacity', '3.7.1', NULL, '64-bit', 0.08, 'Audio editor/recorder.', '2024-11-08', NULL, 0, 1, 'en-US', 'Release', 'https://github.com/audacity/audacity/releases/download/Audacity-3.7.1/audacity-win-3.7.1-64bit.exe'),
(4, 'LibreOffice', '24.8.3', NULL, '64-bit', 0.35, 'Free office suite.', '2024-11-14', NULL, 1, 1, 'en-US', 'Fresh', 'https://download.documentfoundation.org/libreoffice/stable/24.8.3/win/x86_64/LibreOffice_24.8.3_Win_x86-64.msi'),
(4, 'Thunderbird', '128.4.1', NULL, '64-bit', 0.12, 'Email client.', '2024-11-12', NULL, 0, 1, 'en-US', 'Release', 'https://download-installer.cdn.mozilla.net/pub/thunderbird/releases/128.4.1/win64/en-US/Thunderbird%20Setup%20128.4.1.exe'),
(4, 'FileZilla', '3.67.1', NULL, '64-bit', 0.015, 'FTP/SFTP client.', '2024-11-05', NULL, 0, 1, 'en-US', 'Client', 'https://download.filezilla-project.org/client/FileZilla_3.67.1_win64_sponsored2.exe'),
(4, 'PuTTY', '0.81', NULL, '64-bit', 0.004, 'SSH/Telnet client.', '2024-10-15', NULL, 0, 1, 'en-US', 'Installer', 'https://the.earth.li/~sgtatham/putty/latest/w64/putty-64bit-0.81-installer.msi'),
(4, 'Wireshark', '4.4.2', NULL, '64-bit', 0.15, 'Network protocol analyzer.', '2024-11-12', NULL, 0, 1, 'en-US', 'Stable', 'https://2.na.dl.wireshark.org/win64/Wireshark-4.4.2-x64.exe'),
(4, 'VirtualBox', '7.1.4', NULL, '64-bit', 0.15, 'Virtualization software.', '2024-11-05', NULL, 0, 1, 'en-US', 'Release', 'https://download.virtualbox.org/virtualbox/7.1.4/VirtualBox-7.1.4-165100-Win.exe'),
(4, 'BalenaEtcher', '1.19.21', NULL, '64-bit', 0.12, 'USB/SD flasher.', '2024-10-28', NULL, 0, 1, 'en-US', 'Stable', 'https://github.com/balena-io/etcher/releases/download/v1.19.21/balenaEtcher-1.19.21.Setup.exe'),
(4, 'Rufus', '4.6', NULL, '64-bit', 0.001, 'Bootable USB creator.', '2024-11-10', NULL, 0, 1, 'en-US', 'Portable', 'https://github.com/pbatard/rufus/releases/download/v4.6/rufus-4.6p.exe'),
(4, 'Steam', '2.10.91.91', NULL, '64-bit', 0.2, 'Gaming platform.', '2024-11-14', NULL, 0, 1, 'en-US', 'Client', 'https://cdn.cloudflare.steamstatic.com/client/installer/SteamSetup.exe'),
(4, 'Epic Games Launcher', '16.0.0', NULL, '64-bit', 0.3, 'Game store/launcher.', '2024-11-12', NULL, 0, 1, 'en-US', 'Release', 'https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi'),
(4, 'Blender', '4.3.0', NULL, '64-bit', 0.5, '3D creation suite.', '2024-11-14', NULL, 0, 1, 'en-US', 'Release', 'https://download.blender.org/release/Blender4.3/blender-4.3.0-windows-x64.msi'),
(4, 'Unity Hub', '3.8.1', NULL, '64-bit', 0.2, 'Game engine manager.', '2024-11-10', NULL, 0, 1, 'en-US', 'Release', 'https://public-cdn.cloud.unity3d.com/hub/prod/UnityHubSetup.exe'),
(4, 'Rust', '1.82.0', NULL, '64-bit', 0.05, 'Systems programming language.', '2024-11-14', NULL, 0, 1, 'en-US', 'Stable', 'https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe'),
(4, 'Go', '1.23.3', NULL, '64-bit', 0.1, 'Programming language.', '2024-11-05', NULL, 0, 1, 'en-US', 'Release', 'https://go.dev/dl/go1.23.3.windows-amd64.msi'),
(4, 'Java JDK', '23.0.1', NULL, '64-bit', 0.2, 'Java development kit.', '2024-11-12', NULL, 0, 1, 'en-US', 'OpenJDK', 'https://download.java.net/java/GA/jdk23.0.1/c28985cbf10d4e648e4004050f860d7d/11/GPL/openjdk-23.0.1_windows-x64_bin.msi'),
(4, 'Ruby', '3.3.6', NULL, '64-bit', 0.03, 'Dynamic programming language.', '2024-11-05', NULL, 0, 1, 'en-US', 'Ruby+DevKit', 'https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-3.3.6-1/rubyinstaller-devkit-3.3.6-1-x64.exe'),
(4, 'PHP', '8.3.14', NULL, '64-bit', 0.04, 'Server scripting language.', '2024-11-14', NULL, 0, 1, 'en-US', 'Release', 'https://windows.php.net/downloads/releases/php-8.3.14-Win32-vs16-x64.zip'),
(4, 'MySQL', '8.0.40', NULL, '64-bit', 0.5, 'Relational database.', '2024-11-12', NULL, 0, 1, 'en-US', 'Community', 'https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-community-8.0.40.0.msi'),
(4, 'PostgreSQL', '17.2', NULL, '64-bit', 0.3, 'Advanced relational database.', '2024-11-14', NULL, 0, 1, 'en-US', 'Release', 'https://get.enterprisedb.com/postgresql/postgresql-17.2-1-windows-x64.exe'),
(4, 'MongoDB', '8.0.3', NULL, '64-bit', 0.4, 'NoSQL database.', '2024-11-10', NULL, 0, 1, 'en-US', 'Community', 'https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-8.0.3-signed.msi'),
(4, 'Redis', '5.0.14.1', NULL, '64-bit', 0.01, 'In-memory data store.', '2024-06-15', NULL, 0, 1, 'en-US', 'Release', 'https://github.com/tporadowski/redis/releases/download/v5.0.14.1/Redis-x64-5.0.14.1.msi'),
(4, 'DBeaver', '24.3.0', NULL, '64-bit', 0.15, 'Universal database tool.', '2024-11-14', NULL, 0, 1, 'en-US', 'Community', 'https://dbeaver.io/files/dbeaver-ce-latest-x86_64-setup.exe'),
(4, 'TablePlus', '6.1.0', NULL, '64-bit', 0.08, 'Modern database management.', '2024-11-10', NULL, 0, 1, 'en-US', 'Release', 'https://release.tableplus.com/windows/TablePlusSetup.exe'),
(4, 'Notion', '3.2.0', NULL, '64-bit', 0.12, 'All-in-one workspace.', '2024-11-12', NULL, 0, 1, 'en-US', 'Stable', 'https://desktop-release.notion-static.com/Notion%203.2.0%20Setup.exe'),
(4, 'Obsidian', '1.7.4', NULL, '64-bit', 0.1, 'Knowledge base/note-taking.', '2024-11-08', NULL, 0, 1, 'en-US', 'Installer', 'https://github.com/obsidianmd/obsidian-releases/releases/download/v1.7.4/Obsidian-1.7.4-setup.exe'),
(4, 'Figma Desktop', '128.0.0', NULL, '64-bit', 0.15, 'Design collaboration tool.', '2024-11-14', NULL, 0, 1, 'en-US', 'Stable', 'https://desktop.figma.com/win/FigmaSetup.exe'),
(4, 'Canva Desktop', '1.98.0', NULL, '64-bit', 0.12, 'Graphic design platform.', '2024-11-10', NULL, 0, 1, 'en-US', 'Stable', 'https://desktop-download.canva.com/win/canva.exe'),
(4, 'AutoCAD', '2025', NULL, '64-bit', 8.5, 'CAD software.', '2024-10-01', NULL, 0, 1, 'en-US', 'Full', 'https://www.autodesk.com/products/autocad/download'),
(4, 'SketchUp', '2024', NULL, '64-bit', 0.5, '3D modeling software.', '2024-10-15', NULL, 0, 1, 'en-US', 'Free', 'https://www.sketchup.com/download'),
(4, 'Krita', '5.2.6', NULL, '64-bit', 0.2, 'Digital painting software.', '2024-11-05', NULL, 0, 1, 'en-US', 'Release', 'https://download.kde.org/stable/krita/5.2.6/krita-5.2.6-setup.exe'),
(4, 'Darktable', '4.8.1', NULL, '64-bit', 0.15, 'Photography workflow software.', '2024-11-12', NULL, 0, 1, 'en-US', 'Release', 'https://github.com/darktable-org/darktable/releases/download/release-4.8.1/darktable-4.8.1-win64.exe'),
(4, 'Shotcut', '24.10.13', NULL, '64-bit', 0.2, 'Free video editor.', '2024-10-13', NULL, 0, 1, 'en-US', 'Release', 'https://github.com/mltframework/shotcut/releases/download/v24.10.13/shotcut-win64-241013.exe'),
(4, 'DaVinci Resolve', '19.1.1', NULL, '64-bit', 3.5, 'Professional video editor.', '2024-11-12', NULL, 0, 1, 'en-US', 'Free', 'https://www.blackmagicdesign.com/products/davinciresolve'),
(4, 'CapCut Desktop', '3.3.0', NULL, '64-bit', 0.3, 'Video editing software.', '2024-11-10', NULL, 0, 1, 'en-US', 'Stable', 'https://www.capcut.com/download'),
(4, 'Paint.NET', '5.1.2', NULL, '64-bit', 0.05, 'Image/photo editor.', '2024-11-08', NULL, 0, 1, 'en-US', 'Release', 'https://www.getpaint.net/files/paint.net.5.1.2.install.exe'),
(4, 'IrfanView', '4.67', NULL, '64-bit', 0.003, 'Image viewer/converter.', '2024-10-20', NULL, 0, 1, 'en-US', '64-bit', 'https://www.irfanview.com/files/iview467_x64_setup.exe'),
(4, 'Sumatra PDF', '3.5.2', NULL, '64-bit', 0.005, 'Lightweight PDF reader.', '2024-11-01', NULL, 0, 1, 'en-US', '64-bit', 'https://www.sumatrapdfreader.org/dl/rel/3.5.2/SumatraPDF-3.5.2-64-install.exe'),
(4, 'Foxit Reader', '2024.2.0', NULL, '64-bit', 0.2, 'PDF reader/editor.', '2024-11-14', NULL, 0, 1, 'en-US', 'Reader', 'https://cdn01.foxitsoftware.com/pub/foxit/reader/desktop/win/2024/2024.2/en_us/FoxitReader2024.2.0.24624_L10n_Setup.exe'),
(4, 'Calibre', '7.21.0', NULL, '64-bit', 0.1, 'E-book manager.', '2024-11-14', NULL, 0, 1, 'en-US', 'Release', 'https://download.calibre-ebook.com/7.21.0/calibre-64bit-7.21.0.msi'),
(4, 'KeePassXC', '2.7.9', NULL, '64-bit', 0.04, 'Password manager.', '2024-11-05', NULL, 0, 1, 'en-US', 'Release', 'https://github.com/keepassxreboot/keepassxc/releases/download/2.7.9/KeePassXC-2.7.9-Win64.msi'),
(4, 'Bitwarden', '2024.11.0', NULL, '64-bit', 0.15, 'Password manager.', '2024-11-14', NULL, 0, 1, 'en-US', 'Desktop', 'https://github.com/bitwarden/clients/releases/download/desktop-v2024.11.0/Bitwarden-Desktop-2024.11.0.exe'),
(4, 'qBittorrent', '5.0.2', NULL, '64-bit', 0.03, 'Torrent client.', '2024-11-12', NULL, 0, 1, 'en-US', 'Stable', 'https://github.com/qbittorrent/qBittorrent/releases/download/release-5.0.2/qbittorrent_5.0.2_x64_setup.exe'),
(4, 'Transmission', '4.0.6', NULL, '64-bit', 0.015, 'Torrent client.', '2024-10-20', NULL, 0, 1, 'en-US', 'Release', 'https://github.com/transmission/transmission/releases/download/4.0.6/Transmission-4.0.6-x64.msi'),
(4, 'JDownloader 2', '2.0', NULL, '64-bit', 0.15, 'Download manager.', '2024-11-10', NULL, 0, 1, 'en-US', 'Installer', 'https://installer.jdownloader.org/JD2Setup_x64.exe'),
(4, 'Internet Download Manager', '6.42.20', NULL, '64-bit', 0.01, 'Download accelerator.', '2024-11-05', NULL, 0, 1, 'en-US', 'Trial', 'https://www.internetdownloadmanager.com/download.html'),
(4, 'HWMonitor', '1.55', NULL, '64-bit', 0.002, 'Hardware monitoring.', '2024-10-25', NULL, 0, 1, 'en-US', 'Setup', 'https://download.cpuid.com/hwmonitor/hwmonitor_1.55.exe'),
(4, 'Speccy', '1.33', NULL, '64-bit', 0.004, 'System information.', '2024-08-15', NULL, 0, 1, 'en-US', 'Free', 'https://download.ccleaner.com/speccy133.exe'),
(4, 'CCleaner', '6.28.11239', NULL, '64-bit', 0.05, 'System cleaner/optimizer.', '2024-11-14', NULL, 0, 1, 'en-US', 'Free', 'https://download.ccleaner.com/ccsetup628.exe'),
(4, 'Malwarebytes', '5.2.0', NULL, '64-bit', 0.3, 'Anti-malware software.', '2024-11-12', NULL, 0, 1, 'en-US', 'Free', 'https://www.malwarebytes.com/api/downloads/mb-windows'),
(4, 'Avast Free Antivirus', '24.10.9200', NULL, '64-bit', 0.4, 'Free antivirus.', '2024-11-14', NULL, 0, 1, 'en-US', 'Free', 'https://www.avast.com/download-thank-you?product=free'),
(4, 'NVIDIA GeForce Experience', '3.27.0', NULL, '64-bit', 0.3, 'GPU driver/optimization.', '2024-11-10', NULL, 0, 1, 'en-US', 'Release', 'https://www.nvidia.com/download/index.aspx'),
(4, 'AMD Adrenalin', '24.11.1', NULL, '64-bit', 0.7, 'GPU driver/software.', '2024-11-12', NULL, 0, 1, 'en-US', 'Recommended', 'https://www.amd.com/en/support'),
(4, 'Logitech G Hub', '2024.3.8497', NULL, '64-bit', 0.2, 'Peripheral management.', '2024-11-05', NULL, 0, 1, 'en-US', 'Release', 'https://download01.logi.com/web/ftp/pub/techsupport/gaming/LGHUBInstaller.exe'),
(4, 'Razer Synapse', '3.8.13', NULL, '64-bit', 0.15, 'Gaming peripheral software.', '2024-11-10', NULL, 0, 1, 'en-US', 'Release', 'https://rzr.to/synapse-new-pc-download-beta'),
(4, 'OBS Virtual Camera', '30.2.3', NULL, '64-bit', 0.25, 'Virtual camera plugin.', '2024-11-11', NULL, 0, 1, 'en-US', 'Plugin', 'https://github.com/obsproject/obs-studio/releases/download/30.2.3/OBS-Studio-30.2.3-Windows.exe'),
(4, 'ZoomIt', '7.1', NULL, '64-bit', 0.001, 'Screen zoom/annotation.', '2024-10-15', NULL, 0, 1, 'en-US', 'Release', 'https://download.sysinternals.com/files/ZoomIt.zip'),
(4, 'ShareX', '16.1.0', NULL, '64-bit', 0.03, 'Screenshot/screen capture.', '2024-11-10', NULL, 0, 1, 'en-US', 'Release', 'https://github.com/ShareX/ShareX/releases/download/v16.1.0/ShareX-16.1.0-setup.exe'),
(4, 'Greenshot', '1.3.274', NULL, '64-bit', 0.004, 'Screenshot tool.', '2024-09-20', NULL, 0, 1, 'en-US', 'Release', 'https://github.com/greenshot/greenshot/releases/download/Greenshot-RELEASE-1.3.274/Greenshot-INSTALLER-1.3.274-RELEASE.exe'),
(4, 'PowerShell', '7.4.6', NULL, '64-bit', 0.1, 'Cross-platform shell.', '2024-11-14', NULL, 0, 1, 'en-US', 'LTS', 'https://github.com/PowerShell/PowerShell/releases/download/v7.4.6/PowerShell-7.4.6-win-x64.msi'),
(4, 'Windows Terminal', '1.21.3241', NULL, '64-bit', 0.05, 'Modern terminal app.', '2024-11-12', NULL, 0, 1, 'en-US', 'Stable', 'https://github.com/microsoft/terminal/releases/download/v1.21.3241.0/Microsoft.WindowsTerminal_1.21.3241.0_8wekyb3d8bbwe.msixbundle'),
(4, 'Neovim', '0.10.3', NULL, '64-bit', 0.02, 'Extensible text editor.', '2024-11-10', NULL, 0, 1, 'en-US', 'Stable', 'https://github.com/neovim/neovim/releases/download/v0.10.3/nvim-win64.msi'),
(4, 'Sublime Text', '4.0.4169', NULL, '64-bit', 0.02, 'Sophisticated code editor.', '2024-11-05', NULL, 0, 1, 'en-US', 'Stable', 'https://download.sublimetext.com/Sublime%20Text%20Build%204169%20x64%20Setup.exe'),
(4, 'Atom', '1.65.0', NULL, '64-bit', 0.15, 'Hackable text editor.', '2024-06-08', NULL, 0, 0, 'en-US', 'Stable', 'https://github.com/atom/atom/releases/download/v1.65.0/AtomSetup-x64.exe'),
(4, 'Fleet', '1.39', NULL, '64-bit', 0.2, 'JetBrains distributed IDE.', '2024-11-12', NULL, 0, 1, 'en-US', 'Preview', 'https://download.jetbrains.com/fleet/FleetSetup.exe'),
(4, 'PyCharm', '2024.3', 'Community', '64-bit', 0.8, 'Python IDE.', '2024-11-14', NULL, 0, 1, 'en-US', 'Community', 'https://download.jetbrains.com/python/pycharm-community-2024.3.exe'),
(4, 'WebStorm', '2024.3', NULL, '64-bit', 0.9, 'JavaScript IDE.', '2024-11-14', NULL, 0, 1, 'en-US', 'Release', 'https://download.jetbrains.com/webstorm/WebStorm-2024.3.exe'),
(4, 'CLion', '2024.3', NULL, '64-bit', 1.0, 'C/C++ IDE.', '2024-11-14', NULL, 0, 1, 'en-US', 'Release', 'https://download.jetbrains.com/cpp/CLion-2024.3.exe'),
(4, 'Android Studio', '2024.2.2', 'Ladybug', '64-bit', 1.2, 'Android app development.', '2024-11-12', NULL, 0, 1, 'en-US', 'Release', 'https://redirector.gvt1.com/edgedl/android/studio/install/2024.2.2.13/android-studio-2024.2.2.13-windows.exe'),
(4, 'XAMPP', '8.2.12', NULL, '64-bit', 0.2, 'Apache/MariaDB/PHP bundle.', '2024-11-05', NULL, 0, 1, 'en-US', 'Release', 'https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.12/xampp-windows-x64-8.2.12-0-VS16-installer.exe/download'),
(4, 'WampServer', '3.3.5', NULL, '64-bit', 0.15, 'Windows Apache/MySQL/PHP.', '2024-10-20', NULL, 0, 1, 'en-US', '64-bit', 'https://sourceforge.net/projects/wampserver/files/WampServer%203/Wampserver%203.3.5/wampserver3.3.5_x64.exe/download'),
(4, 'Local (by Flywheel)', '8.3.0', NULL, '64-bit', 0.3, 'Local WordPress dev.', '2024-11-10', NULL, 0, 1, 'en-US', 'Release', 'https://cdn.localwp.com/stable/Local%20Installer.exe'),
(4, 'GitHub Desktop', '3.4.12', NULL, '64-bit', 0.15, 'Git GUI client.', '2024-11-12', NULL, 0, 1, 'en-US', 'Stable', 'https://central.github.com/deployments/desktop/desktop/latest/win32'),
(4, 'Sourcetree', '3.4.24', NULL, '64-bit', 0.1, 'Git GUI by Atlassian.', '2024-10-25', NULL, 0, 1, 'en-US', 'Stable', 'https://product-downloads.atlassian.com/software/sourcetree/windows/ga/SourceTreeSetup-3.4.24.exe'),
(4, 'TortoiseGit', '2.15.0', NULL, '64-bit', 0.05, 'Windows Git shell extension.', '2024-11-05', NULL, 0, 1, 'en-US', 'Release', 'https://download.tortoisegit.org/tgit/2.15.0.0/TortoiseGit-2.15.0.0-64bit.msi'),
(4, 'Beyond Compare', '5.0.2', NULL, '64-bit', 0.05, 'File/folder comparison.', '2024-11-10', NULL, 0, 1, 'en-US', 'Trial', 'https://www.scootersoftware.com/BCompare-5.0.2.30677.exe'),
(4, 'Everything', '1.4.1.1026', NULL, '64-bit', 0.002, 'File search utility.', '2024-11-01', NULL, 0, 1, 'en-US', 'Setup', 'https://www.voidtools.com/Everything-1.4.1.1026.x64-Setup.exe'),
(4, 'Listary', '6.3.0.100', NULL, '64-bit', 0.005, 'File search/quick launch.', '2024-10-15', NULL, 0, 1, 'en-US', 'Free', 'https://www.listary.com/download'),
(4, 'AutoHotkey', '2.0.18', NULL, '64-bit', 0.005, 'Automation scripting.', '2024-11-05', NULL, 0, 1, 'en-US', 'Release', 'https://github.com/AutoHotkey/AutoHotkey/releases/download/v2.0.18/AutoHotkey_2.0.18_setup.exe'),
(4, 'KeyTweak', '3.3.0', NULL, '64-bit', 0.001, 'Keyboard remapper.', '2024-05-10', NULL, 0, 1, 'en-US', 'Release', 'https://github.com/michaelnoonan/keytweak/releases/download/v3.3.0/KeyTweakSetup3.3.0.exe')`;

// Find the last INSERT INTO operating_systems block and insert before its final );
const lines = sql.split('\n');
let lastInsertIdx = -1;
for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes('INSERT INTO operating_systems')) {
        lastInsertIdx = i;
        break;
    }
}

if (lastInsertIdx === -1) {
    console.error('No INSERT INTO operating_systems found');
    process.exit(1);
}

// Find the line with ); that ends the last INSERT block
let endIdx = -1;
for (let i = lastInsertIdx + 1; i < lines.length; i++) {
    if (lines[i].trim().endsWith(');')) {
        endIdx = i;
        break;
    }
}

if (endIdx === -1) {
    console.error('Could not find end of INSERT block');
    process.exit(1);
}

// Insert new entries before the ); line
const lastLine = lines[endIdx];
lines[endIdx] = newEntries + '\n' + lastLine;

fs.writeFileSync('complete-database.sql', lines.join('\n'));
console.log('Added 100 new software entries');
