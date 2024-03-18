<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //
    public function register(Request $request)
    {
        // Validasi data yang diterima dari request
        $request->validate([
            'email' => 'required|email|unique:users,email',
        ]);

        // Cek apakah pengguna dengan email yang diberikan sudah ada dalam database
        $user = User::where('email', $request->email)->first();

        // Jika pengguna belum ada, buat pengguna baru
        if (!$user) {
            $user = User::create([
                'email' => $request->email,
            ]);
        }

        // Berikan token otentikasi untuk pengguna
        $token = $user->createToken('authToken')->accessToken;

        // Kirim respons JSON yang berisi token
        return response()->json(['token' => $token], 200);
    }

    public function logout(Request $request)
    {
        // Revoke (mencabut) semua token yang terkait dengan user yang sedang login
        $request->user()->tokens()->delete();

        // Kirim respons JSON yang memberitahu bahwa logout berhasil
        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    public function updateProfile(Request $request)
    {
        // Ambil user yang sedang login
        $user = Auth::user();

        // Pastikan user ada
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Validasi data yang diterima dari request
        $request->validate([
            'name' => 'required|string',
            'avatar_id' => 'required|exists:avatars,id',
        ]);

        // Perbarui informasi pengguna dengan nama dan avatar_id baru
        $user->name = $request->name;
        $user->avatar_id = $request->avatar_id;
        $user->save();

        // Kirim respons JSON yang memberitahu bahwa informasi pengguna berhasil diperbarui
        return response()->json(['message' => 'User profile updated successfully'], 200);
    }
}
