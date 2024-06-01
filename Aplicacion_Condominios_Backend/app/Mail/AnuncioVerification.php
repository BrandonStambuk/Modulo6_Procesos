<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AnuncioVerification extends Mailable
{
    use Queueable, SerializesModels;

    public $titulo;
    public $anuncio;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($titulo, $anuncio)
    {
        $this->titulo = $titulo;
        $this->anuncio = $anuncio;
 
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS', 'example@example.com'), env('MAIL_FROM_NAME', 'Example'))
                    ->subject('Anuncio General')
                    ->view('emails.name');
    }
}
