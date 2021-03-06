<?php

namespace Mercury\Http\Controllers;

use Illuminate\Http\Request;
use Mercury\Message;
use Mercury\User;
use Mercury\users_names_for_chat;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getNames()
    {
        $sender = users_names_for_chat::select('sender_name as name', 'sender_image as image')->where(function ($q) {
            $q->where('revicer_id', Auth()->user()->id);
        })->paginate(10);
        $con = true;
        foreach ($sender as $key => $value) {
            $con = false;
        }
        if ($con) {
            return response()->json(
                users_names_for_chat::select('revicer_name as name', 'revicer_image as image')->where(function ($q) {
                    $q->where('sender_id', Auth()->user()->id);
                })->paginate(10)
            );
        } else {
            return response()->json($sender);
        }

    }

    public function getMessages(string $name)
    {
        $user = User::where('name', $name)->first();
        return response()->json(
            Message::where(function ($q) use ($user) {
                $q->where('user_id', $user->id)
                    ->orWhere('from_id', $user->id);
            })->where(function ($q) use ($user) {
                $q->where('user_id', Auth()->user()->id)
                    ->orWhere('from_id', Auth()->user()->id);
            })->orderBy('id', 'desc')->paginate(10)
        );
    }

    public function addMessage(Request $request)
    {
        $validatedData = $request->validate([
            'body' => 'required|max:2500|min:1',
        ]);
        if (isset($request->username)) {
            $user = User::where('name', $request->username)->first();
        } else {
            $user = User::findOrFail($request->userId);
        }
        $newMsg = new Message;
        $newMsg->from_id = Auth()->user()->id;
        $newMsg->user_id = $user->id;
        $newMsg->body = $request->body;
        return Message::saveMessage($newMsg, $user->id) ?
        response()->json($newMsg) :
        response()->json(['message' => 'faild']);
    }
}
