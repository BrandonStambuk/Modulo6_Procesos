<?php

namespace App\Http\Controllers\Notificaciones;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\TwilioService;
use Twilio\Http\Response;

class MessageController extends Controller
{
    protected $twilio;

    public function __construct(TwilioService $twilio)
    {
        $this->twilio = $twilio;
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'to' => 'required|string',
            'body' => 'required|string',
        ]);

        try {
            $message = $this->twilio->sendWhatsAppMessage($request->to, $request->body);
            return response()->json(['message' => 'Message sent successfully', 'sid' => $message->sid]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
