// src/components/DiskonPalindrom.jsx
import { useState } from 'react';
import './DiskonPalindrom.css';

const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka);

const DiskonPalindrom = () => {
  const [totalHarga, setTotalHarga] = useState('');
  const [nama, setNama] = useState('');
  const [hasil, setHasil] = useState(null);

  const handleCek = (e) => {
    e.preventDefault();

    const harga = parseFloat(totalHarga);
    if (isNaN(harga) || harga <= 0 || !nama.trim()) {
      alert('Masukkan total harga (> 0) dan nama pelanggan dengan benar!');
      return;
    }

    // Abaikan spasi & huruf besar/kecil
    const bersih = nama.replace(/\s+/g, '').toLowerCase();
    const terbalik = bersih.split('').reverse().join('');
    const isPalindrom = bersih.length >= 3 && bersih === terbalik;

    const jumlahUnik = new Set(bersih.split('')).size;

    const persen = isPalindrom ? 25 : jumlahUnik * 1;
    const hargaAkhir = harga - (harga * persen) / 100;

    setHasil({ isPalindrom, jumlahUnik, persen, hargaAkhir });
  };

  return (
    <div className="container">
      <h2>Program Diskon Palindrom Nama</h2>
      <form onSubmit={handleCek} className="form">
        <label className="label">
          Total Harga Pembelian:
          <input
            type="number"
            className="input"
            value={totalHarga}
            onChange={(e) => setTotalHarga(e.target.value)}
            placeholder="Contoh: 100000"
          />
        </label>

        <label className="label">
          Nama Pelanggan:
          <input
            type="text"
            className="input"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Contoh: Madam"
          />
        </label>

        <button type="submit" className="button">Cek &amp; Hitung</button>
      </form>

      {hasil && (
        <div className="result">
          <p><strong>Status Nama:</strong> {hasil.isPalindrom ? 'Palindrom' : 'Bukan Palindrom'}</p>
          <p><strong>Jumlah Karakter Unik:</strong> {hasil.jumlahUnik}</p>
          <p><strong>Persentase Diskon:</strong> {hasil.persen}%</p>
          <p><strong>Harga Setelah Diskon:</strong> {formatRupiah(hasil.hargaAkhir)}</p>
        </div>
      )}
    </div>
  );
};

export default DiskonPalindrom;
