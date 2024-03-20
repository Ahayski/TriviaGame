<?php

namespace App\Http\Controllers;

use App\Models\Avatar;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AvatarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $avatar = Avatar::all();

        return response()->json([
            'status' => 'succces',
            'message' => 'succes get all avatar',
            'data' => $avatar
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'avatarImage' => 'required',
            'price' => 'required',
            'purchase'=> 'required'
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status'=>'false',
                'message'=>$validator->errors()
            ]);
        }

        $image = $request->file('avatarImage')->getRealPath();
        
        $cloudinaryUpload = Cloudinary::upload($image, [
            'folder' => 'Trivia-game', // Opsional: Folder untuk menyimpan gambar di Cloudinary
            'allowed_formats' => ['png', 'jpg'] // Hanya menerima file dengan format PNG atau JPG
        ]);

        $avatar = new Avatar;

        $avatar->price=$request->price;
        $avatar->purchase=$request->purchase;
        $avatar->avatarImage = $cloudinaryUpload->getSecurePath();

        $avatar->save();

        $data = [
            'status'=> 200,
            'message'=> 'succes create avatar',
            'data'=>$avatar
        ];

        return response()->json($data, 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $avatar = Avatar::find($id);

        if(!$avatar) {
            return response()->json([
                'satatus' => 'failed',
                'message' => 'data not found'
            ], 401);
        }

        return response()->json([
            'satus' => 'succes',
            'messsage' => 'succes get avatar',
            'data' => $avatar
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */

     public function destroy(string $id)
     {
         try {
             $avatar = Avatar::find($id);
     
             if (!$avatar) {
                 return response()->json([
                     'status'=> 'failed',
                     'message'=> 'data not found'
                 ], 404); // Mengubah kode status menjadi 404 untuk data tidak ditemukan
             }
     
             $image = $avatar->avatarImage;
             // Parse publicId dari URL gambar
             $publicId = pathinfo($image)['filename'];
     
             // Hapus gambar dari Cloudinary
             Cloudinary::destroy($publicId);
     
             // Hapus entri Avatar dari database
             $avatar->delete();
     
             return response()->json([
                 'status'=> 'success',
                 'message' => 'success delete Avatar',
                 'data' => $avatar
             ]);
         } catch (\Throwable $th) {
             return response()->json([
                 'message' => 'something when wrong',
                 'error' => $th->getMessage(),
             ], 500);
         }
     }
        
     public function update(Request $request, string $id)
{
    try {
        // Temukan Avatar yang ingin diupdate
        $avatar = Avatar::find($id);

        // Jika Avatar tidak ditemukan, kembalikan respons dengan status 'failed'
        if (!$avatar) {
            return response()->json([
                'status'=> 'failed',
                'message'=> 'Avatar not found'
            ], 404);
        }

        // Validasi input yang diterima dari request
        $validator = Validator::make($request->all(), [
            'price' => 'required',
            'purchase'=> 'required'
        ]);

        // Jika validasi gagal, kembalikan pesan error
        if ($validator->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => $validator->errors()
            ], 400);
        }

        // Update atribut Avatar
        $avatar->price = $request->price;
        $avatar->purchase = $request->purchase;

        // Simpan perubahan ke database
        $avatar->save();

        // Kembalikan respons yang menyatakan bahwa update berhasil
        return response()->json([
            'status'=> 'success',
            'message' => 'Avatar updated successfully',
            'data' => $avatar
        ], 200);
    } catch (\Throwable $th) {
        // Tangani jika terjadi kesalahan
        return response()->json([
            'message' => 'Something went wrong',
            'error' => $th->getMessage(),
        ], 500);
    }
}


}
