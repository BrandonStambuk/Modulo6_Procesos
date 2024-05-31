<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Notificación de Pre Aviso</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Arial', sans-serif;
        }
        .container {
            background: white;
            padding: 20px;
            margin-top: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        }
        .header {
            background: #343a40;
            color: white;
            padding: 10px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #777;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 0 0 8px 8px;
        }
        ul {
            padding: 0;
            list-style: none;
        }
        ul li {
            background: #e9ecef;
            margin: 5px 0;
            padding: 10px;
            border-radius: 4px;
        }
        ul li strong {
            color: #343a40;
        }
        .bg-pattern {
            background-image: url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png');
            background-size: cover;
        }
    </style>
</head>
<body class="bg-pattern">
    <div class="container">
        <div class="header">
            <h2>Notificación de Pre Aviso</h2>
        </div>
        <p>Estimado/a,</p>
        <p>Se ha generado un pre aviso por un servicio con el siguiente detalle:</p>
        <ul>
            <li><strong>Título:</strong> {{ $titulo }}</li>
            <li><strong>Monto:</strong> ${{ $monto }}</li>
            <li><strong>Multa:</strong> ${{ $multa }}</li>
            <li> {{ $mensajeAdicional }}</li>
        </ul>
        <p>Gracias por su atención.</p>
        <div class="footer">
            <p>Condominio Gerencia - Contacto: gerenciaa65@gmail.com - Tel: (123) 456-7890</p>
        </div>
    </div>
</body>
</html>
