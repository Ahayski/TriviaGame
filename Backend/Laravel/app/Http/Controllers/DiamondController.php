<?php

namespace App\Http\Controllers;

use App\Models\Diamond;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DiamondController extends Controller
{

    public function index()
    {
        try{
            $diamonds = Diamond::all();
            return response()->json([
                'data' => $diamonds
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'something when wrong',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
{
    try {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:1',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048', // Max size 2MB
            'price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'=>'false',
                'message'=>$validator->errors()->first()
            ], 422);
        }

        $image = $request->file('image')->getRealPath();
    
        $cloudinaryUpload = Cloudinary::upload($image, [
            'folder' => 'Trivia-game', // Opsional: Folder untuk menyimpan gambar di Cloudinary
            'allowed_formats' => ['png', 'jpg'] // Hanya menerima file dengan format PNG atau JPG
        ]);

        $diamonds = Diamond::create([
            'image' => $cloudinaryUpload->getSecurePath(),
            'amount' => $request->amount,
            'price' => $request->price,
        ]);

        return response()->json([
            'message' => 'Diamond created successfully',
            'diamonds' => $diamonds
        ], 201);
    } catch (\Throwable $th) {
        return response()->json([
            'message' => 'Something went wrong',
            'error' => $th->getMessage(),
        ], 500);
    }
}

    public function destroy($id)
    {
        try {
            $diamond = Diamond::findOrFail($id);

            // Delete image from Cloudinary
            $publicId = basename($diamond->image, '.' . pathinfo($diamond->image, PATHINFO_EXTENSION));
            Cloudinary::destroy($publicId);

            // Delete diamond record from database
            $diamond->delete();

            return response()->json([
                'message' => 'Diamond deleted successfully',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
    
}
