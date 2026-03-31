-- TEST DATABASE - Verify selectors work
CREATE TABLE IF NOT EXISTS os_families (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    icon TEXT NOT NULL
);

INSERT INTO os_families (id, name, icon) VALUES
(1, 'Windows', '🪟'),
(2, 'Linux', '🐧'),
(3, 'macOS', '🍎'),
(4, 'Software', '💻');

INSERT INTO operating_systems (family_id, name, version, codename, architecture, size_gb, description, release_date, eos_date, is_lts, is_supported, language, edition, download_url) VALUES
(1, 'Windows 11', '24H2 (26100)', 'Hudson Valley', '64-bit', 5.8, 'Test Windows 11', '2024-10-01', NULL, 0, 1, 'en-US', 'Home', 'https://example.com'),
(1, 'Windows 11', '23H2 (22631)', 'Niagara', '64-bit', 5.8, 'Test Windows 11', '2023-10-31', '2025-11-11', 0, 1, 'en-US', 'Pro', 'https://example.com'),
(1, 'Windows 10', '22H2 (19045)', 'Sun Valley 2', '64-bit', 5.2, 'Test Windows 10', '2022-10-18', '2025-10-14', 0, 1, 'pt-BR', 'Home', 'https://example.com'),
(2, 'Ubuntu', '24.04 LTS', 'Noble Numbat', '64-bit', 4.7, 'Test Ubuntu', '2024-04-25', '2029-04-25', 1, 1, 'en-US', 'Desktop', 'https://releases.ubuntu.com'),
(3, 'macOS', '15.1 Sequoia', 'Sequoia', 'ARM64', 14.0, 'Test macOS', '2024-10-28', NULL, 0, 1, 'English', 'Standard', 'https://support.apple.com'),
(4, 'Office', '2024 LTSC', '', '64-bit', 4.5, 'Test Office', '2024-10-01', NULL, 1, 1, 'English', 'Pro Plus', 'https://microsoft.com');

