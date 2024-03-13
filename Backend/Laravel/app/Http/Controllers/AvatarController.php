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
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
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
                 ], 401);
             }
     
             $image = $avatar->avatarImage;
            //  $folderPath = 'Trivia-game';
     
             // Hapus gambar dari Cloudinary
             $publicId = substr($image, strpos($image, 'Trivia-game/') + strlen('Trivia-game/'));
             Cloudinary::destroy($publicId);
     
            //  Hapus entri Avatar dari database
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

}
