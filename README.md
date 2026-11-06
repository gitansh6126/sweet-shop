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

- **Touch-Friendly POS Billing**: Instant item search, per-kg and per-piece rates, rapid fraction weight calculators (`0.25`, `0.5`, `0.75` kg), direct-sale mode, and multi-item cart.
- **Integrated High-Res Photos**: All sweets show actual photography instead of placeholder shapes.
- **Image Uploader Integration**:
  - Connected to `img to link` ([`https://img.rsmachinary.in`](https://img.rsmachinary.in)) for WebP conversion and link hosting.
  - Dropdown selector preloaded with existing uploaded assets.
  - Live thumbnail preview for newly added sweets.
- **Daily Sales Ledger**: Track today's revenue, order timestamps, and item breakdown without database overhead (saved in browser `localStorage`).
- **Asset Showcase Gallery**: Visit [`gallery.html`](gallery.html) for a complete visual catalog of all mithai varieties.

---

## 📂 Project Structure

```
sweet_shop/
├── index.html                           # Main POS billing system
├── gallery.html                         # Full-page visual sweets gallery
├── Mithai Counter — Quick Billing.html  # Synchronized billing application
├── assets/                              # 24 High-resolution sweet images
├── sweets_catalog.json                  # Metadata catalog
├── img_to_link_uploads.json             # Registry of uploaded images
└── README.md                            # Documentation & photo preview
```
