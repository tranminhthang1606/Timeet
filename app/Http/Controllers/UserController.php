<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'unique:users,email'
        ]);


        $alert = '';
        $email = $request->input('email');
        $hashPassword = Hash::make($request->input('password'));

        if ($validator->fails()) {
            $alert = 'The email already exists';
            return response()->json(['status' => $alert], 409);
        }
        ;

        $data = [
            'email' => $email,
            'password' => $hashPassword
        ];

        $user = User::create($data);
        $token = JWTAuth::fromUser($user);


        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try {
            $user = User::where('email', $request->input('email'))->first();
            $hashedPassword = $user->password;
            if (Hash::check($request->input('password'), $hashedPassword)) {
                $token = JWTAuth::fromUser($user);
                return response()->json(['user' => $user, 'token' => $token], 201);
            } else {
                return response()->json(['alert' => 'Tài khoản không tồn tại hoặc sai mật khẩu'], 400);
            }
        } catch (\Throwable $th) {
            return response()->json(['alert' => $th], 500);
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userId = $id;
        $user = DB::table('users')->where('user_id', $userId)->first();
        return response()->json($user, 201);
    }

    public function getGender(string $gender)
    {
        $kyw = $gender;
        $users = DB::table('users')->where('gender', $kyw)->get();
        return response()->json($users);

    }

    public function getMatchedList(Request $request)
    {

        $jsonData = $request->get('list_matches_id');
        $userRequest = $request->get('user_id');
        $returnList = [];

        foreach ($jsonData as $key => $userid) {
            $user = DB::table('users')->where('user_id', $userid)->first();
            $userMatches = json_decode($user->matches);
            $listMatches = array_map(function ($user) {
                return $user->user_id;
            }, $userMatches);
            $filtedListMatch = in_array($userRequest, $listMatches);


            if($filtedListMatch)
            array_push($returnList, $user);

        }
        return response()->json($returnList);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $userData = $request->all();
        $userid = $id;
        $updateUser = DB::table('users')
            ->where('user_id', $userid)
            ->update($userData);
        if ($updateUser) {
            return response()->json(['alert' => 'success'], 200);
        }
        return response()->json(['alert' => 'Tạo tài khoản thất bại'], 401);


    }

    public function addMatchList(Request $request, int $id)
    {
        $userid = $id;
        $currentUser = DB::table('users')->where('user_id', $userid)->first();
        $jsonData = json_decode($currentUser->matches, true);

        $updateMatchId = $request->get('userMatchId');

        $newData = ['user_id' => $updateMatchId];
        $jsonData[] = $newData;

        DB::table('users')->where('user_id', $userid)->update(['matches' => json_encode($jsonData)]);

        $responseData = json_decode(DB::table('users')->where('user_id', $userid)->first()->matches, true);

        return response()->json($responseData);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}