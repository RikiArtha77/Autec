import { useState, useEffect } from "react";

// Komponen DeviceTableRow tetap sama seperti yang Anda buat,
// hanya saja kita perlu menyesuaikan prop yang diterima berdasarkan data dari API.
// Misalnya, API Anda mengirim 'id_alat', 'temp', 'humidity', dll.
// 'location' dan 'status' mungkin perlu disesuaikan atau ditambahkan logikanya.
function DeviceTableRow({ id_alat, temp, humidity, soil_moisture, ldr, created_at }) {
  // Untuk 'status', kita bisa buat logika sementara atau Anda bisa tambahkan field status di API.
  // Di sini, saya akan buat status berdasarkan suhu misalnya (hanya contoh).
  const [isOn, setIsOn] = useState(temp > 25); // Contoh: Anggap aktif jika suhu > 25

  // Anda mungkin ingin 'location' juga dari API atau menentukannya secara berbeda.
  // Di sini saya akan gunakan 'id_alat' sebagai pengganti 'name' dan 'location' sementara.

  return (
    <tr className="border-b last:border-none">
      <td className="p-4 text-gray-800 font-medium">{id_alat}</td> {/* Menggunakan id_alat sebagai nama */}
      <td className="p-4 text-gray-800">{new Date(created_at).toLocaleString()}</td> {/* Menampilkan waktu data dibuat */}
      <td className="p-4 text-gray-800">{humidity}%</td>
      <td className="p-4 text-gray-800">{temp}°C</td>
      <td className="p-4 text-gray-800">{soil_moisture}</td>
      <td className="p-4 text-gray-800">{ldr}</td>
      <td className={`p-4 font-medium ${isOn ? 'text-green-600' : 'text-red-600'}`}>{isOn ? "Normal" : "Perhatian"}</td> {/* Contoh status */}
      <td className="p-4">
        <button
          onClick={() => setIsOn(!isOn)} // Fungsi ini mungkin perlu interaksi ke API nanti
          className={`px-4 py-2 text-white text-sm font-semibold rounded transition-all ${isOn ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {/* Tombol ini hanya contoh, aksi sebenarnya mungkin berbeda */}
          Detail
        </button>
      </td>
    </tr>
  );
}

export default function DeviceList() {
  const [devices, setDevices] = useState([]); // State untuk menyimpan data dari API
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk menyimpan pesan error

  useEffect(() => {
    // URL API Laravel Anda
    // Pastikan URL ini benar dan dapat diakses dari aplikasi React Anda.
    // Jika React dan Laravel berjalan di domain/port yang berbeda, Anda perlu mengatur CORS di Laravel.
    const apiUrl = "http://127.0.0.1:8000/api/sensor";

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          // Jika respons tidak ok (misalnya 404, 500), lempar error
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success && result.data) {
          setDevices(result.data); // Simpan array data sensor ke state
        } else {
          throw new Error(result.message || "Gagal mengambil data dari API.");
        }
      } catch (err) {
        setError(err.message);
        setDevices([]); // Kosongkan data jika terjadi error
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Jika Anda ingin data diperbarui secara berkala (polling)
    const intervalId = setInterval(fetchData, 10000); // Ambil data setiap 10 detik

    // Cleanup interval saat komponen di-unmount
    return () => clearInterval(intervalId);

  }, []); // Array dependency kosong berarti useEffect ini hanya berjalan sekali saat komponen dimuat (dan saat interval)

  if (loading && devices.length === 0) { // Tampilkan loading hanya jika belum ada data sama sekali
    return <div className="text-center p-10">Memuat data sensor...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center p-10 backdrop-blur-lg bg-transparent max-w-6xl w-full mx-auto mt-16 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Daftar Data Sensor</h1>
      {loading && <p className="text-sm text-gray-600 mb-4">Memperbarui data...</p>}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">ID Alat</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Waktu Terdata</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Kelembaban Udara (%)</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Suhu (°C)</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Kelembaban Tanah</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Intensitas Cahaya (LDR)</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Status Contoh</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {devices.length > 0 ? (
              devices.map((device) => (
                // Menggunakan 'id' dari data API sebagai key jika unik, atau kombinasi unik lainnya
                <DeviceTableRow key={device.id || device.id_alat + device.created_at} {...device} />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  Tidak ada data sensor yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}