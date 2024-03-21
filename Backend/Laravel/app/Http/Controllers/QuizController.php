<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class QuizController extends Controller
{
    //
    public function index()
    {
        $quizzes = Quiz::all();
        return response()->json(['status' => 'success', 'data' => $quizzes]);
    }

    public function show($id)
    {
        $quiz = Quiz::find($id);

        if (!$quiz) {
            return response()->json(['status' => 'error', 'message' => 'Quiz not found'], 404);
        }

        return response()->json(['status' => 'success', 'data' => $quiz]);
    }


    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'question' => 'required|string',
    //         'answer' => [
    //             'required',
    //             'string',
    //             Rule::in($request->options), // Memastikan bahwa jawaban ada di dalam opsi
    //         ],
    //         'options' => 'required|array',
    //     ]);
    //     $quiz = Quiz::create([
    //         'question' => $request->question,
    //         'answer' => $request->answer,
    //         'options' => $request->options,
    //     ]);

    //     return response()->json(['status' => 'success', 'message' => 'Quiz berhasil ditambahkan', 'data' => $quiz]);
    // }

    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'question' => 'required|string',
        'answer' => 'required|string',
        'options' => 'required|array',
    ]);

    $validator->after(function ($validator) use ($request) {
        // Validasi bahwa jawaban ada di dalam opsi
        if (!in_array($request->answer, $request->options)) {
            $validator->errors()->add('answer', 'Jawaban harus ada di dalam opsi.');
        }
    });

    if ($validator->fails()) {
        return response()->json(['status' => 'error', 'message' => $validator->errors()->first()], 422);
    }

    $quiz = Quiz::create([
        'question' => $request->question,
        'answer' => $request->answer,
        'options' => $request->options,
    ]);

    return response()->json(['status' => 'success', 'message' => 'Quiz created successfully', 'data' => $quiz]);
}

    public function destroy($id)
    {
        $quiz = Quiz::find($id);

        if (!$quiz) {
            return response()->json(['status' => 'error', 'message' => 'Quiz not found'], 404);
        }

        $quiz->delete();

        return response()->json(['status' => 'success', 'message' => 'Quiz deleted successfully']);
    }

    public function update(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'question' => 'required|string',
        'answer' => 'required|string',
        'options' => 'required|array',
    ]);

    $validator->after(function ($validator) use ($request) {
        // Validasi bahwa jawaban ada di dalam opsi
        if (!in_array($request->answer, $request->options)) {
            $validator->errors()->add('answer', 'Jawaban harus ada di dalam opsi.');
        }
    });

    if ($validator->fails()) {
        return response()->json(['status' => 'error', 'message' => $validator->errors()->first()], 422);
    }

    $quiz = Quiz::find($id);

    if (!$quiz) {
        return response()->json(['status' => 'error', 'message' => 'Quiz not found'], 404);
    }

    $quiz->update([
        'question' => $request->question,
        'answer' => $request->answer,
        'options' => $request->options,
    ]);

    return response()->json(['status' => 'success', 'message' => 'Quiz updated successfully', 'data' => $quiz]);
}


}
