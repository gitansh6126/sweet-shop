# 🍬 Mithai Counter — Sweet Shop Billing App & Major Sweet Assets

A modern, touch-friendly POS billing and asset management web application for an Indian Mithai Shop.

🌐 **Live Demo on GitHub Pages**: [https://gitansh6126.github.io/sweet-shop/](https://gitansh6126.github.io/sweet-shop/)

---

## 📸 Attached Sweet Assets (24 Major Mithais)

Every sweet in the billing catalog comes pre-attached with high-resolution photography:

| Gulab Jamun | Jalebi | Kaju Katli | Motichoor Laddu |
| :---: | :---: | :---: | :---: |
| <img src="assets/gulab_jamun.jpg" width="160" height="120" alt="Gulab Jamun" style="object-fit:cover;border-radius:10px"> | <img src="assets/jalebi.jpg" width="160" height="120" alt="Jalebi" style="object-fit:cover;border-radius:10px"> | <img src="assets/kaju_katli.jpg" width="160" height="120" alt="Kaju Katli" style="object-fit:cover;border-radius:10px"> | <img src="assets/motichoor_laddu.jpg" width="160" height="120" alt="Motichoor Laddu" style="object-fit:cover;border-radius:10px"> |

| Rasgulla | Rasmalai | Kaju Khoya Barfi | Doodh Peda |
| :---: | :---: | :---: | :---: |
| <img src="assets/rasgulla.jpg" width="160" height="120" alt="Rasgulla" style="object-fit:cover;border-radius:10px"> | <img src="assets/rasmalai.jpg" width="160" height="120" alt="Rasmalai" style="object-fit:cover;border-radius:10px"> | <img src="assets/barfi.jpg" width="160" height="120" alt="Barfi" style="object-fit:cover;border-radius:10px"> | <img src="assets/peda.jpg" width="160" height="120" alt="Peda" style="object-fit:cover;border-radius:10px"> |

| Mysore Pak | Gajar Ka Halwa | Kalakand | Sandesh |
| :---: | :---: | :---: | :---: |
| <img src="assets/mysore_pak.jpg" width="160" height="120" alt="Mysore Pak" style="object-fit:cover;border-radius:10px"> | <img src="assets/gajar_ka_halwa.jpg" width="160" height="120" alt="Gajar Halwa" style="object-fit:cover;border-radius:10px"> | <img src="assets/kalakand.jpg" width="160" height="120" alt="Kalakand" style="object-fit:cover;border-radius:10px"> | <img src="assets/sandesh.jpg" width="160" height="120" alt="Sandesh" style="object-fit:cover;border-radius:10px"> |

| Cham Cham | Gujiya | Malpua | Imarti |
| :---: | :---: | :---: | :---: |
| <img src="assets/cham_cham.jpg" width="160" height="120" alt="Cham Cham" style="object-fit:cover;border-radius:10px"> | <img src="assets/gujiya.jpg" width="160" height="120" alt="Gujiya" style="object-fit:cover;border-radius:10px"> | <img src="assets/malpua.jpg" width="160" height="120" alt="Malpua" style="object-fit:cover;border-radius:10px"> | <img src="assets/imarti.jpg" width="160" height="120" alt="Imarti" style="object-fit:cover;border-radius:10px"> |

| Shrikhand | Ghevar | Rabri | Modak |
| :---: | :---: | :---: | :---: |
| <img src="assets/shrikhand.jpg" width="160" height="120" alt="Shrikhand" style="object-fit:cover;border-radius:10px"> | <img src="assets/ghevar.jpg" width="160" height="120" alt="Ghevar" style="object-fit:cover;border-radius:10px"> | <img src="assets/rabri.jpg" width="160" height="120" alt="Rabri" style="object-fit:cover;border-radius:10px"> | <img src="assets/modak.jpg" width="160" height="120" alt="Modak" style="object-fit:cover;border-radius:10px"> |

| Balushahi | Basundi | Rice Kheer | Soan Papdi |
| :---: | :---: | :---: | :---: |
| <img src="assets/balushahi.jpg" width="160" height="120" alt="Balushahi" style="object-fit:cover;border-radius:10px"> | <img src="assets/basundi.jpg" width="160" height="120" alt="Basundi" style="object-fit:cover;border-radius:10px"> | <img src="assets/kheer.jpg" width="160" height="120" alt="Rice Kheer" style="object-fit:cover;border-radius:10px"> | <img src="assets/soan_papdi.jpg" width="160" height="120" alt="Soan Papdi" style="object-fit:cover;border-radius:10px"> |

---

## ⚡ Features

- **Dedicated POS Counter (`index.html`)**: Lightning-fast sales calculations, single-tap editable quantity box (`5` or `12` kg), 4 quick weight buttons (`+500g`, `−500g`, `+250g`, `−250g`), real-time reverse cash calculation, and multi-item cart.
- **Separate Menu Management Page (`manage.html`)**:
  - **1-Tap Hide / Restore**: Hide sweets when out of stock or restore them to the counter with a single tap.
  - **✏️ Change Price / Photo**: Change sweet name, price, unit, category, or replace photo with real-time in-browser WebP compression.
  - **＋ Add New Sweets**: Add custom sweets to your counter anytime with your own photos.
  - **Dual Storage Persistence**: All edits, prices, and hidden flags sync live between both pages via `localStorage` and `IndexedDB`.
- **Pre-filled High-Res Photography**: All 34 major sweets come pre-filled with real photography out of the box.
- **Daily Sales Ledger**: Track today's revenue, order timestamps, and item breakdown without server overhead.
- **Asset Showcase Gallery**: Visit [`gallery.html`](gallery.html) for a complete visual catalog of all mithai varieties.

---

## 📂 Project Structure

```
sweet_shop/
├── index.html                           # Fast POS billing counter application
├── manage.html                          # Dedicated sweet management, prices & photos page
├── Mithai Counter — Quick Billing.html  # Synchronized billing application
├── gallery.html                         # Full-page visual sweets gallery
├── assets/                              # 24 High-resolution sweet images
├── sweets_catalog.json                  # Metadata catalog
```
└── README.md                            # Documentation & photo preview
```
