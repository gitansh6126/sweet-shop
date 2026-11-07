# 🍬 Mithai Counter — Sweet Shop Billing App & Major Sweet Assets

A modern, touch-friendly POS billing and asset management web application for an Indian Mithai Shop.

🌐 **Live Demo on GitHub Pages**: [https://gitansh6126.github.io/sweet-shop/](https://gitansh6126.github.io/sweet-shop/)

---

## 📸 Attached Sweet & Namkeen Assets (32 Major Varieties)

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

| Samosa | Khasta Kachori | Khaman Dhokla | Bikaneri Bhujia |
| :---: | :---: | :---: | :---: |
| <img src="assets/samosa.jpg" width="160" height="120" alt="Samosa" style="object-fit:cover;border-radius:10px"> | <img src="assets/kachori.jpg" width="160" height="120" alt="Kachori" style="object-fit:cover;border-radius:10px"> | <img src="assets/dhokla.jpg" width="160" height="120" alt="Dhokla" style="object-fit:cover;border-radius:10px"> | <img src="assets/bhujia.jpg" width="160" height="120" alt="Bhujia" style="object-fit:cover;border-radius:10px"> |

| Ratlami Sev | Khasta Mathri | Matka Kulfi | Kesar Badam Thandai |
| :---: | :---: | :---: | :---: |
| <img src="assets/sev.jpg" width="160" height="120" alt="Ratlami Sev" style="object-fit:cover;border-radius:10px"> | <img src="assets/mathri.jpg" width="160" height="120" alt="Mathri" style="object-fit:cover;border-radius:10px"> | <img src="assets/matka_kulfi.jpg" width="160" height="120" alt="Matka Kulfi" style="object-fit:cover;border-radius:10px"> | <img src="assets/thandai.jpg" width="160" height="120" alt="Thandai" style="object-fit:cover;border-radius:10px"> |

---

## ⚡ Features

- **Dedicated POS Counter (`index.html`)**: Lightning-fast sales calculations, single-tap editable quantity box (`5` or `12` kg), 4 quick weight buttons (`+500g`, `−500g`, `+250g`, `−250g`), real-time reverse cash calculation, multi-item cart, and category tabs including **Namkeen** and **Extra Products**.
- **Strict Online Cloud Sales (No Local Storage)**: Sales transactions are recorded, synchronized, and fetched exclusively from the online cloud database via `sales-cloud.js`. No sales data is retained in `localStorage` or `IndexedDB`, guaranteeing multi-counter consistency and zero data loss on browser cache purges.
- **Dedicated Sales History & Cloud Ledger (`sales-history.html`)**:
  - **Live Cloud Analytics**: Today's revenue, filtered total revenue, total orders count, average order value (AOV), and total sold sweet weight.
  - **Smart Date Filtering**: 1-click presets for Today, Yesterday, Last 7 Days, This Month, All Time, or Custom Date Ranges.
  - **Search & Payment Filters**: Search by sweet name or order ID, filter by Cash or UPI payment methods.
  - **Top Sellers Breakdown**: Real-time ranking of top selling sweets by weight and revenue with visual progress bars.
  - **Printable Thermal Receipts**: Formatted counter receipts ready for 58mm/80mm or standard A4 printers.
  - **CSV Export & Daily Reconciliation**: 1-click export of sales records to CSV for accounting and bookkeeping.
  - **Online Void / Deletion**: Void accidental orders directly from the cloud database.
- **Flexible Backend & Node REST Server (`server.js`)**:
  - Run locally or deploy anywhere with zero npm dependencies using `node server.js`.
  - Built-in REST endpoints: `GET /api/sales`, `POST /api/sales`, `DELETE /api/sales/:id`, `GET /api/health`.
  - Also integrates with default cloud REST database, Supabase REST API, or Firebase Realtime Database.
- **Separate Menu Management Page (`manage.html`)**:
  - **1-Tap Hide / Restore**: Hide sweets or namkeen when out of stock or restore them to the counter with a single tap.
  - **📸 Live Camera & Photo Upload**: Capture fresh product photos directly using device camera/webcam or upload from gallery, with live viewfinder framing guide, camera flip, and automatic in-browser WebP compression.
  - **✏️ Change Price / Photo**: Change sweet name, price, unit, category (with Namkeen and Extra Products), or replace photo with instant 1-tap live preview.
  - **＋ Add New Items**: Add custom sweets, namkeen, or extra products to your counter anytime with live camera photos or uploads.
- **Pre-filled High-Res Photography**: 50 major sweets, namkeen, and extra items come pre-filled with real photography out of the box.
- **Asset Showcase Gallery**: Visit [`gallery.html`](gallery.html) for a complete visual catalog of all mithai & namkeen varieties.

---

## 📂 Project Structure

```
sweet_shop/
├── index.html                           # Fast POS billing counter application
├── sales-history.html                   # Dedicated Sales History & Cloud Ledger page
├── sales-cloud.js                       # Online cloud sales service & adapter
├── server.js                            # Zero-dependency Node.js REST server & static host
├── manage.html                          # Dedicated sweet management, prices & photos page
├── Mithai Counter — Quick Billing.html  # Synchronized billing application
├── gallery.html                         # Full-page visual sweets gallery
├── package.json                         # Node start/dev scripts
├── assets/                              # 24 High-resolution sweet images
├── sweets_catalog.json                  # Metadata catalog
└── README.md                            # Documentation & photo preview
```

## 🚀 Running the App

### Option 1: Direct in Browser (Static / GitHub Pages)
Double-click `index.html` or visit [https://gitansh6126.github.io/sweet-shop/](https://gitansh6126.github.io/sweet-shop/). The app automatically connects to the online Cloud REST ledger to record and load sales!

### Option 2: Local Node.js REST Server
```bash
npm start
# or: node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser. All sales will be recorded to your local backend server and synced across devices on your local network.
