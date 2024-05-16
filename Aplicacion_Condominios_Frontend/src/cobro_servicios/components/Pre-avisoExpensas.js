import React, { useState, useEffect } from 'react';
import { FaEye, FaPen } from 'react-icons/fa';

const GestionCobro = () => {
    const endpoint = "http://localhost:8000/api";
    const [preavisosConMultas, setPreavisosConMultas] = useState([]);
    const [preavisosSinMultas, setPreavisosSinMultas] = useState([]);

    useEffect(() => {
        const obtenerPreavisosConMultas = async () => {
            try {
                const response = await fetch(`${endpoint}/PreAvisoMulta`);
                const data = await response.json();
                setPreavisosConMultas(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        obtenerPreavisosConMultas();
    }, []);

    useEffect(() => {
        const obtenerPreavisosSinMultas = async () => {
            try {
                const response = await fetch(`${endpoint}/PreAvisoSinMulta`);
                const data = await response.json();
                setPreavisosSinMultas(data.data);
                console.log(data); // Imprimir los datos en la consola
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        obtenerPreavisosSinMultas(); // Agregar esta línea para ejecutar la función
    }, []);

    const handleVerMultas = (idPreaviso) => {
        // Obtener el ID de la primera multa de la lista de multas
            window.location.href = `/cobros/multas/${idPreaviso}`;
      
    };

    const calcularMontoTotal = (montoOriginal, multas) => {
        // Calcular el monto total restando el monto de todas las multas del monto original
        const montoMultaTotal = multas.reduce((total, multa) => total + parseFloat(multa.monto), 0);
        return parseFloat(montoOriginal) - montoMultaTotal;
    };

    const handleGenerarExpensa = (idPreaviso) => {
        // Lógica para generar la expensa
        console.log(`Generar expensa para el preaviso con ID ${idPreaviso}`);
    };

    return (
        <div className="container">
            <style>
                {`.monto-rojo {
                    color: red;
                }`}
            </style>
            <h2>Pre-aviso de expensas con multas</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id pre aviso</th>
                        <th>Departamento</th>
                        <th>Propietario a Pagar</th>
                        <th>Fecha</th>
                        <th>Descripción de Servicios</th>
                        <th>Servicio a Pagar</th>
                        <th>Monto Total</th>
                        <th>Monto Multa</th>
                        <th>Monto Original</th>
                        <th>Multas</th>
                        <th>Generar expensa</th>
                    </tr>
                </thead>
                <tbody>
                    {preavisosConMultas.map(preaviso => (
                        <tr key={preaviso.id}>
                            <td>{preaviso.id}</td>
                            <td>{preaviso.departamento_id}</td>
                            <td>{preaviso.propietario_pagar}</td>
                            <td>{preaviso.fecha}</td>
                            <td>{preaviso.descripcion_servicios}</td>
                            <td>{preaviso.servicio_pagar}</td>
                            <td>{preaviso.monto}</td>
                            <td>{preaviso.multas.map(multa => parseFloat(multa.monto)).reduce((total, monto) => total + monto, 0)}</td>
                            <td>{calcularMontoTotal(preaviso.monto, preaviso.multas)}</td>
                            <td style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleVerMultas(preaviso.id)}>
                                <FaEye />
                            </td>
                            <td style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleGenerarExpensa(preaviso.id)}>
                                <FaPen /> {/* Icono de lápiz */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2> Pre-aviso de expensas sin multas</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>id preaviso</th>
                        <th>Departamento</th>
                        <th>Propietario a Pagar</th>
                        <th>Fecha</th>
                        <th>Descripción de Servicios</th>
                        <th>Servicio a Pagar</th>
                        <th>Monto</th>
                        <th>Generar Expensa</th>
                    </tr>
                </thead>
                <tbody>
                    {preavisosSinMultas.map(preaviso => (
                        <tr key={preaviso.id}>
                            <td>{preaviso.id}</td>
                            <td>{preaviso.departamento_id}</td>
                            <td>{preaviso.propietario_pagar}</td>
                            <td>{preaviso.fecha}</td>
                            <td>{preaviso.descripcion_servicios}</td>
                            <td>{preaviso.servicio_pagar}</td>
                            <td>{preaviso.monto}</td>
                            <td style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleGenerarExpensa(preaviso.id)}>
                                <FaPen /> {/* Icono de lápiz */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionCobro;