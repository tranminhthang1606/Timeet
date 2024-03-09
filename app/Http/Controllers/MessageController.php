<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function getMessages(Request $request)
    {

        $userId = $request->get('userId');
        $clickedId = $request->get('clickedId');

        $userMessages = DB::table('message')->where('sent_userId', $userId)->where('received_userId', $clickedId)->get() ?? [];

        $clickedUserMessages = DB::table('message')->where('sent_userId', $clickedId)->where('received_userId', $userId)->get() ?? [];


        return response()->json(['userMessages' => $userMessages, 'clickedUserMessages' => $clickedUserMessages]);
    }

    public function addMessages(Request $request)
    {
        $newMessage = $request->get('data');
        event(new MessageSent($newMessage));
        DB::table('message')->insert($newMessage);

        return response()->json(['message' => $newMessage]);
    }

}