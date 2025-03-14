import { useState } from "react";

function DeviceTableRow({ name, humidity, location, status }) {
  const [isOn, setIsOn] = useState(status);

  return (
    <tr className="border-b last:border-none">
      <td className="p-4 text-gray-800 font-medium">{name}</td>
      <td className="p-4 text-gray-800">{location}</td>
      <td className="p-4 text-gray-800">{humidity}%</td>
      <td className={`p-4 font-medium ${isOn ? 'text-green-600' : 'text-red-600'}`}>{isOn ? "Aktif" : "Mati"}</td>
      <td className="p-4">
        <button
          onClick={() => setIsOn(!isOn)}
          className={`px-4 py-2 text-white text-sm font-semibold rounded transition-all ${isOn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isOn ? "Matikan" : "Nyalakan"}
        </button>
      </td>
    </tr>
  );
}

export default function DeviceList() {
  const devices = [
    { name: "Sensor 1", humidity: 45, location: "Kebun A", status: true },
    { name: "Sensor 2", humidity: 60, location: "Kebun B", status: false },
    { name: "Sensor 3", humidity: 55, location: "Kebun C", status: true },
    { name: "Sensor 4", humidity: 70, location: "Kebun D", status: false }
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center p-10 backdrop-blur-lg bg-transparent max-w-4xl w-full mx-auto mt-16 rounded-lg">
      <table className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 text-left">Nama Alat</th>
            <th className="p-4 text-left">Lokasi</th>
            <th className="p-4 text-left">Kelembaban</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <DeviceTableRow key={device.name} {...device} />
          ))}
        </tbody>
      </table>
    </div>
  );
}