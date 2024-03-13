<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

use function Laravel\Prompts\password;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        try {
            $admin = Admin::all();

            $data = [
                'status'=>200,
                'admin'=>$admin
            ];
    
            return response()->json($data,200);
        } catch (\Throwable $th) {
            echo $th;
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request) {

        $rules = [
            'name' => 'required|max:32',   
            'email' => 'required|email',
            'password'=> 'required|max:32|string'
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status'=>'false',
                'message'=>$validator->errors()
            ]);
        }
        
            $admin = new Admin();

            $admin->name=$request->name;
            $admin->email=$request->email;
            $admin->password= Hash::make($request->password);

            $admin->save();

            $data = [
                'status'=> 200,
                'message'=> 'succes create user',
                'data'=>$admin
            ];

            return response()->json($data, 200);
    }

    /**
     * Display the specified resource.
     */

    public function login(Request $request)
    {
      try {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid request',
                'errors' => $validator->errors()
            ], 400);
        }

        $email = $request->email;
        $password = $request->password;

        $admin = Admin::where('email', $email)->first();

        // Periksa apakah admin ditemukan dan kata sandi sesuai
        if (!$admin || !Hash::check($password, $admin->password)) {
            return response()->json([
                'message' => 'Unauthorized. Please login'
            ], 401);
        }

        // Buat token menggunakan Str::uuid()
        $token = Str::uuid()->toString();

        // Kembalikan data admin berserta token
        return response()->json([
            'data' => [ 
                'admin' => $admin,
                'token' => $token,
                'type' => 'bearer',
            ]
        ],200);

      } catch (\Throwable $th) {
        return response()->json(['message' => $th->getMessage()], 500);
      }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) 
    {
        $dataAdmin = Admin::find($id);

        if(empty($dataAdmin)){
            return response()->json([
                'status'=>'failed',
                'message'=>'data not found'
            ], 404);
        }

        $rules = [
            'name' => 'max:32',   
            'email' => 'email',
            'password' => 'string|max:20'
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status'=>'false',
                'message'=>$validator->errors()
            ]);
        }

        if ($request->has('name')) {
            $dataAdmin->name = $request->name;
        }
        if ($request->has('email')) {
            $dataAdmin->email = $request->email;
        }
        if ($request->has('password')) {
            $dataAdmin->password = $request->password;
        }

            $dataAdmin->save();

            $data = [
                'status'=> 200,
                'message'=> 'succes update Admin',
                'data'=>$dataAdmin
            ];

            return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dataAdmin = Admin::find($id);

        if(empty($dataAdmin)){
            return response()->json([
                'status'=>'failed',
                'message'=>'data not found'
            ], 404);
        }

        $userDelete = $dataAdmin->delete();

            $data = [
                'status'=> 200,
                'message'=> 'succes delete Admin',
                'data'=>$userDelete
            ];

            return response()->json($data, 200);
    }
}
