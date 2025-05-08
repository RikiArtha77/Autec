<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SensorData;

class SensorDataController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_alat' => 'required|string',
            'temp' => 'required|numeric',
            'humidity' => 'required|numeric',
            'soil_moisture' => 'required|numeric',
            'ldr' => 'required|numeric',
        ]);

        $data = SensorData::create($validated);

        return response()->json([
            'message' => 'Data berhasil disimpan',
            'data' => $data
        ], 201);
    }

    public function index()
    {
        $sensorData = SensorData::orderBy('created_at', 'desc')->get();

        return response()->json([ // Pastikan baris ini dieksekusi
            'success' => true,
            'message' => 'Daftar semua data sensor berhasil diambil.',
            'data' => $sensorData
        ], 200);
    }
}