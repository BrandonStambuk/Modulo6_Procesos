<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactanosMailable extends Mailable
{
    use Queueable, SerializesModels;


    public $titulo;
    public $monto;
    public $multa;
    public $mensajeAdicional;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($titulo, $monto, $multa , $mensajeAdicional) // Modify the constructor to accept the new parameter
    {
        $this->titulo = $titulo;
        $this->monto = $monto;
        $this->multa = $multa;
        $this->mensajeAdicional = $mensajeAdicional; // Assign the new parameter
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('gerenciaa65@gmail.com')
                    ->subject('Cobro de servicio')
                    ->view('emails.contactanos');
    }
}
