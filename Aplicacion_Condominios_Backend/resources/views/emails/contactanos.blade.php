<!DOCTYPE html>
<html>
<head>
    <title>Notificacion de Pre aviso</title>
</head>
<body>
    <h2>Notificacion de Pre aviso</h2>
    <p> {{ $titulo }},</p>
    <p>Se ha generado un pre aviso por un servicio con el siguiente detalle:</p>
    <ul>
        <li><strong>Titulo:</strong> {{ $titulo }}</li>
        <li><strong>Monto:</strong> ${{ $monto }}</li>
        <li><strong>Multa:</strong> ${{ $multa }}</li>
        <p><strong>Mensaje adicional:</strong> {{ $mensajeAdicional }}</p>
    </ul>
    <p>Gracias por su atención.</p>
</body>
</html>
