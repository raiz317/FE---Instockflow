# 📦 InStockFlow - Sistem Manajemen Inventaris & Supplier

InStockFlow adalah aplikasi web manajemen inventaris (inventory) gudang modern dan responsif yang dibangun menggunakan **React** dan **Vite**. Aplikasi ini dirancang untuk mempermudah pemilik bisnis dalam memantau sisa stok produk secara *real-time*, mengalkulasi nilai total aset gudang otomatis, serta mengelola data supplier dan barang dalam satu ekosistem antarmuka yang bersih.

---

## ✨ Fitur Utama

- **Dashboard Informatif & Dinamis**: 
  - Kartu statistik riil untuk menghitung *Total Products*, *Total Suppliers*, *Stok Kritis*, dan akumulasi *Total Aset* otomatis.
  - Tabel pemantauan produk dengan sisa stok kritis (≤ 3 Pcs) yang dilengkapi indikator teks visual.
- **Product Management (Form & Modals)**:
  - Fitur tambah dan edit produk memanfaatkan *Modular Modal Components* (`AddProductModal` & `EditProductModal`).
  - Sistem dropdown Supplier yang tersambung secara dinamis ke database supplier.
  - Fitur hapus produk secara instan berdasarkan saringan indeks antrean.
- **Supplier Management**:
  - Kelola data profil supplier (Nama, Bidang Industri, Email, dan Kontak Telepon).
  - Skema penambahan dan pembaruan data yang terisolasi dengan aman menggunakan komponen terpisah.
- **Sistem Filter & Super Search (Real-time)**:
  - Cari data berdasarkan kategori, bidang industri, atau ketikan kata kunci (*search bar*) yang melacak nama produk sekaligus nama supplier secara bersamaan.
- **Desain Arsitektur Data Pusat (*Lifting State Up*)**:
  - Sinkronisasi data mutlak antara halaman Dashboard, Products, dan Suppliers dikelola langsung di root komponen (`App.jsx`).
- **Antarmuka 100% Responsif**:
  - Layout CSS Murni tanpa framework CSS eksternal (Bootstrap/Tailwind). Layout bertransformasi menjadi *Top Navigation Bar* yang ramah jempol pada resolusi gawai/seluler.

---

## 🛠️ Teknologi yang Digunakan

- **Library Utama**: [React (v18+)](https://react.dev)
- **Build Tool**: [Vite](https://vitejs.dev)
- **Routing**: [React Router Dom](https://reactrouter.com)
- **Icons**: [Material UI Icons (@mui/icons-material)](https://mui.com) & [Bootstrap Icons](https://getbootstrap.com)
- **Styling**: Vanilla CSS (CSS Murni dengan skema Flexbox, Grid, dan Media Query ketat).

---

## 📁 Struktur Folder Proyek

```text
sistem-inventory/
├── public/
├── src/
│   ├── assets/             # Aset gambar dan ikon lokal
│   ├── components/         # Komponen modular (Sidebar, Modals, dll)
│   │   ├── Sidebar.jsx
│   │   ├── AddProductModal.jsx
│   │   ├── EditProductModal.jsx
│   │   ├── AddSupplierModal.jsx
│   │   └── EditSupplierModal.jsx
│   ├── pages/              # Halaman Utama Aplikasi
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   └── Suppliers.jsx
│   ├── styles/             # File Gaya Tampilan (CSS Murni)
│   │   ├── sidebar.css
|   |   ├── auth.css
│   │   ├── dashboard.css
│   │   └── product.css
│   │   └── supplier.css
│   ├── App.jsx             # Otak Pusat Data & Router Jalur Halaman
│   └── main.jsx
│   └── App.css
├── package.json
└── README.md
```

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah di bawah ini untuk memasang dan menjalankan aplikasi ini di komputer Anda:

### 1. Klon Repositori Ini
```bash
git clone https://github.com/raiz317/FE---Instockflow.git
cd NAMA_REPOSITORI_ANDA
```

### 2. Instal Semua Dependensi / Pustaka Paket
```bash
npm install
```

### 3. Jalankan Server Pengembangan Lokal (Local Development)
```bash
npm run dev
```
Buka peramban (browser) Anda dan akses alamat url lokal yang tertera pada terminal (biasanya `http://localhost:5173/`).

---

## 📌 Catatan Teknis Pengembangan

- **Aksesibilitas Seluler**: Kustomisasi kotak dropdown `<select>` menggunakan panah kustom SVG terintegrasi untuk menjamin keseragaman tampilan visual lintas sistem operasi (Android, iOS, dan Windows Desktop).
- **Resolusi Layar Lebar (>1450px)**: Properti pencarian teks dikunci menggunakan batas `max-width` cerdas dikombinasikan dengan `margin-left: auto` untuk memastikan tombol aksi selalu mengunci rapi di sudut paling kanan layar monitor beresolusi tinggi tanpa mengalami efek melar horizontal yang berlebihan.


## Tampilan Visual
### Halaman Home
<img width="959" height="412" alt="Screenshot 2026-08-19 090238" src="https://github.com/user-attachments/assets/77497fa2-8dd9-494d-bfd5-c43852c1db1f" />

### Halaman Dashboard
<img width="959" height="409" alt="Screenshot 2026-08-19 090133" src="https://github.com/user-attachments/assets/2e737d6a-0e3d-4357-be10-6d3c5482c103" />

### Halaman Products
<img width="959" height="413" alt="Screenshot 2026-08-19 090152" src="https://github.com/user-attachments/assets/059acd69-f40d-4798-9ae6-aad0172582d5" />

### Halaman Suppliers
<img width="959" height="412" alt="Screenshot 2026-08-19 090217" src="https://github.com/user-attachments/assets/251e7616-3f36-4ec6-97a2-bf3fcff063d7" />
