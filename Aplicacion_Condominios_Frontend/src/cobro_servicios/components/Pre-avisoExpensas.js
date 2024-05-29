import React, { useState, useEffect } from 'react';
import { FaEye, FaPen } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const GestionCobro = () => {
    const endpoint = "http://localhost:8000/api";
    const [preavisosConMultas, setPreavisosConMultas] = useState([]);
    const [preavisosSinMultas, setPreavisosSinMultas] = useState([]);
    const [generarExpensaHabilitado, setGenerarExpensaHabilitado] = useState(true); // Estado para controlar la habilitación del botón

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
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        obtenerPreavisosSinMultas(); 
    }, []);

    const handleVerMultas = (idPreaviso) => {
            window.location.href = `/cobros/multas/${idPreaviso}`;
      
    };

    const calcularMontoTotal = (montoOriginal, multas) => {
        const montoMultaTotal = multas.reduce((total, multa) => total + parseFloat(multa.monto), 0);
        return parseFloat(montoOriginal) - montoMultaTotal;
    };

    const handleGenerarExpensa = async (preaviso_id) => {
        try {
            setGenerarExpensaHabilitado(false); // Deshabilitar el botón antes de enviar la solicitud

            const response = await axios.post(`${endpoint}/generar-expensa`, { preaviso_id });
            
            if (response.status === 200) {
                console.log('Expensa generada con éxito');
                console.log(response);
                // Mostrar la alerta de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Expensa generada con éxito',
                    text: 'La expensa ha sido generada exitosamente.',
                }).then(() => {
                    setGenerarExpensaHabilitado(true); // Habilitar el botón después de cerrar la alerta
                });
            } else {
                console.error('Error al generar la expensa:', response.statusText);
                // Mostrar una alerta de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error al generar la expensa',
                    text: response.statusText,
                }).then(() => {
                    setGenerarExpensaHabilitado(true); // Habilitar el botón después de cerrar la alerta
                });
            }
        } catch (error) {
            console.error('Error al generar la expensa:', error);
            // Mostrar una alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Error al generar la expensa',
                text: 'Hubo un error al generar la expensa. Por favor, inténtalo de nuevo más tarde.',
            }).then(() => {
                setGenerarExpensaHabilitado(true); // Habilitar el botón después de cerrar la alerta
            });
        }
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
                            <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                                <FaPen onClick={() => handleGenerarExpensa(preaviso.id)} disabled={!generarExpensaHabilitado} />
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
                            <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                                <FaPen onClick={() => handleGenerarExpensa(preaviso.id)} disabled={!generarExpensaHabilitado} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionCobro;