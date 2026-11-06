# Sweet Shop (Mithai Assets, Billing App & Img to Link Integration)

A complete POS billing and sweet asset management system for an Indian Mithai Shop, connected directly to your **`D:\Projects\img to link`** image uploading and conversion pipeline.

---

## 🔗 Integrated Components

### 1. `D:\Projects\img to link` Integration
- A filesystem junction is established at [**`img-to-link/`**](file:///C:/Users/hlxcr/.gemini/antigravity/scratch/sweet_shop/img-to-link), directly pointing to `D:\Projects\img to link`.
- Top-bar shortcut: `☁️ Img to Link` opens the uploader interface in a new browser tab.
- In **"＋ Add item"** modal:
  - **Paste any image link**: Web URLs, `https://img.rsmachinary.in/uploads/...`, or local paths.
  - **Choose from existing uploads**: A dropdown populated with files from `img-to-link/uploads/` ([`img_to_link_uploads.json`](file:///C:/Users/hlxcr/.gemini/antigravity/scratch/sweet_shop/img_to_link_uploads.json)).
  - **Direct Upload**: Quick local file selector with instant thumbnail preview.
  - One-click launcher: `☁️ Upload in Img to Link ↗` button right in the modal.

### 2. POS Billing Counter ([`index.html`](file:///C:/Users/hlxcr/.gemini/antigravity/scratch/sweet_shop/index.html))
- Quick sales, custom quantity by kg / piece, direct-sold transactions, and cart billing.
- Pre-loaded with photographic assets for all 24 major Indian sweets.

### 3. Asset Showcase ([`gallery.html`](file:///C:/Users/hlxcr/.gemini/antigravity/scratch/sweet_shop/gallery.html))
- Full photographic gallery of all downloaded mithai assets with category and descriptions.

---

## 📂 Project Directory Structure

```
sweet_shop/
├── index.html                           # Billing counter (with img to link integration)
├── gallery.html                         # Asset catalog showcase
├── img_to_link_uploads.json             # Manifest of uploads from img to link
├── Mithai Counter — Quick Billing.html  # Original backup
├── README.md                            # Documentation
├── sweets_catalog.json                  # Data for all 24 mithai items
├── assets/                              # 24 High-res mithai photos
├── asset/                               # Direct alias to assets
└── img-to-link/                         # Junction link -> D:\Projects\img to link
    ├── index.html                       # Img to link uploader interface
    ├── upload.php                       # WebP conversion and uploader
    └── uploads/                         # Stored converted WebP images
```
