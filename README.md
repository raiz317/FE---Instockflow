# 📦 InStockFlow - Sistem Manajemen Inventaris & Supplier (Full-Stack Integrated)

InStockFlow adalah aplikasi web manajemen inventaris (inventory) gudang modern dan responsif yang dibangun menggunakan kombinasi arsitektur **React + Vite** di sisi Front-End dan **Node.js + Express + Passport.js + MySQL** di sisi Back-End. Aplikasi ini dirancang untuk mempermudah pemantauan sisa stok secara *real-time*, mengalkulasi nilai aset otomatis, serta mengamankan data pengguna menggunakan sistem manajemen session berbasis server.

---

## ✨ Fitur Utama & Integrasi Sistem

- **Dashboard Informatif & Otomatis**: 
  - Kartu statistik untuk menghitung *Total Products*, *Total Suppliers*, *Stok Kritis*, dan akumulasi *Total Aset* dinamis (dikalkulasi secara riil dari database).
  - Tabel pemantauan produk dengan sisa stok kritis (≤ 3 Pcs) dilengkapi indikator teks visual merah tegas.
- **Arsitektur Komponen Modular (Modals Form)**:
  - Fitur tambah dan edit data dipisah ke dalam komponen mandiri (`AddProductModal`, `EditProductModal`, `AddSupplierModal`, `EditSupplierModal`) sehingga kode utama halaman bersih dan mudah dirawat.
- **Manajemen Input & Saringan Dropdown Dinamis**:
  - Input **Kategori Produk** dan bidang **Industri Supplier** berbentuk *input teks bebas*.
  - Menggunakan trik objek `Set` di sisi Front-End untuk mengumpulkan data unik, membuat menu pilihan dropdown filter otomatis bertambah secara *real-time* mengikuti ejaan teks input database tanpa duplikasi kapital (didukung standardisasi *Title Case* & proteksi ALL CAPS khusus kata "ATK").
- **Keamanan Ketat & Pagar Proteksi Rute (Authentication Gate)**:
  - Terintegrasi dengan **Passport.js Session Auth** dan middleware `isAuthenticated` di sisi server.
  - **Pagar Rute Ketat**: Pengguna yang belum login otomatis tidak bisa menembus halaman internal (`/dashboard`, `/products`, `/suppliers`) dan langsung dialihkan kembali ke rute `/login` dengan status `401 Unauthorized`.
  - **Anti-Amnesia Session**: Saat halaman di-*refresh*, aplikasi memanfaatkan pemanggilan endpoint `/api/users/me` secara otomatis via `useEffect` di `App.jsx` untuk memverifikasi ulang status session Passport yang aktif di server, menjaga nama profil tidak berubah menjadi "Pengguna/User".
- **Halaman Error Handler (404 Not Found)**:
  - Menyediakan rute khusus untuk menangkap alamat URL acak baik di sisi klien (React Router) maupun fallback JSON terstruktur dari sisi server.
- **Antarmuka 100% Responsif**:
  - Layout CSS Murni tanpa framework eksternal. Diperkuat dengan media query spesifik untuk resolusi tanggung/tablet (`769px - 870px`) agar form menekuk vertikal secara simetris, serta adaptasi *Bottom Navigation Bar* otomatis pada mode HP.

---

## 🛠️ Spesifikasi Endpoint REST API (Back-End)

Aplikasi ini berkomunikasi penuh dengan server Express melalui rute-rute endpoint berikut:

### 🔐 Autentikasi & Pengguna (`Passport.js`)
* `POST /api/register` - Mendaftarkan akun baru (dilengkapi pengecekan duplikasi email/username & enkripsi password via `bcrypt`).
* `POST /api/login` - Masuk log sistem menggunakan strategi otentikasi lokal Passport (`email/username` dan `password`).
* `POST /api/logout` - Keluar dari sistem, menghancurkan session server, dan membersihkan cookie.
* `GET /api/users/me` - Memeriksa session pengguna yang sedang aktif (dipakai saat halaman di-*refresh*).

### 📦 Manajemen Produk
* `GET /api/products` - Mengambil seluruh daftar produk dari database (memerlukan login).
* `POST /api/products` - Menambahkan produk baru (mengembalikan `insertId` otomatis).
* `PUT /api/products/:id` - Memperbarui data produk berdasarkan ID parameternya.
* `DELETE /api/products/:id` - Menghapus produk dari gudang secara permanen.

### 🤝 Manajemen Supplier
* `GET /api/suppliers` - Mengambil seluruh daftar supplier dari database (memerlukan login).
* `POST /api/suppliers` - Menambahkan supplier baru.
* `PUT /api/suppliers/:id` - Memperbarui profil supplier berdasarkan ID parameternya.
* `DELETE /api/suppliers/:id` - Menghapus data supplier secara permanen.

---

## 📁 Struktur Folder Proyek Klien (Front-End)

```text
sistem-inventory/
├── public/
├── src/
│   ├── assets/             # Aset gambar, logo, dan ikon lokal
│   ├── components/         # Komponen modular terpisah (Re-usable)
│   │   ├── Sidebar.jsx
│   │   ├── AddProductModal.jsx
│   │   ├── EditProductModal.jsx
│   │   ├── AddSupplierModal.jsx
│   │   └── EditSupplierModal.jsx
│   ├── pages/              # Halaman Utama Aplikasi
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Suppliers.jsx
│   │   └── NotFound.jsx     # Penangan rute 404 klien
│   ├── styles/             # File Gaya Tampilan (CSS Murni)
│   │   ├── sidebar.css
│   │   ├── dashboard.css
│   │   └── product.css
│   ├── App.jsx             # Otak Pusat Data, Proteksi Rute (User Session Gateway)
│   └── main.jsx
├── package.json
└── README.md
```

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

### 1. Klon Repositori Klien
```bash
git clone https://github.com
cd NAMA_REPOSITORI_ANDA
```

### 2. Instal Semua Dependensi Pustaka Klien
```bash
npm install
```

### 3. Jalankan Server Pengembangan Front-End (Vite)
```bash
npm run dev
```
Aplikasi klien dapat diakses melalui browser di alamat url default `http://localhost:5173/`.

> **Catatan Penting Jalur Server**: Pastikan server Express API Back-End Anda pada port `http://localhost:3000` beserta layanan database MySQL Anda sudah aktif berjalan agar fungsi transfer data (`fetch/JSON body`) tersambung sinkron secara penuh.


## Tampilan Visual
### Halaman Home
<img width="959" height="412" alt="Screenshot 2026-08-19 090238" src="https://github.com/user-attachments/assets/77497fa2-8dd9-494d-bfd5-c43852c1db1f" />

### Halaman Dashboard
<img width="959" height="409" alt="Screenshot 2026-08-19 090133" src="https://github.com/user-attachments/assets/2e737d6a-0e3d-4357-be10-6d3c5482c103" />

### Halaman Products
<img width="959" height="413" alt="Screenshot 2026-08-19 090152" src="https://github.com/user-attachments/assets/059acd69-f40d-4798-9ae6-aad0172582d5" />

### Halaman Suppliers
<img width="959" height="412" alt="Screenshot 2026-08-19 090217" src="https://github.com/user-attachments/assets/251e7616-3f36-4ec6-97a2-bf3fcff063d7" />
