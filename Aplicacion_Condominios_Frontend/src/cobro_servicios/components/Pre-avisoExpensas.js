import React, { useState, useEffect } from 'react';
import { FaEye, FaPen } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope } from 'react-icons/fa';

const GestionCobro = () => {
    const endpoint = "http://localhost:8000/api";
    const [preavisosConMultas, setPreavisosConMultas] = useState([]);
    const [preavisosSinMultas, setPreavisosSinMultas] = useState([]);
    const [generarExpensaHabilitado, setGenerarExpensaHabilitado] = useState(true); // Estado para controlar la habilitación del botón
    const [residentes, setResidentes] = useState({});
    const [titulo, setTitulo] = useState('');
    const [correo, setCorreo] = useState('');
    const [monto, setMonto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [multa, setmulta] = useState('');
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPreaviso, setSelectedPreaviso] = useState(null);

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

    useEffect(() => {
        const fetchResidentes = async () => {
            try {
                const response = await axios.get(`${endpoint}/residentes`);
                const residentesData = {};
                response.data.forEach(residente => {
                    residentesData[residente.id] = residente;
                });
                setResidentes(residentesData);
            } catch (error) {
                console.error('Error fetching residentes:', error);
            }
        };

        fetchResidentes();
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
          //  axios.delete(`${endpoint}/eliminar-preaviso`,{preaviso_id});
            if (response.status === 200) {
                console.log('Expensa generada con éxito');
                console.log(response);
               // await axios.delete(`${endpoint}/eliminar-preaviso/${preaviso_id}`);

                Swal.fire({
                    icon: 'success',
                    title: 'Expensa generada con éxito',
                    text: 'La expensa ha sido generada exitosamente.',
                }).then(() => {
                    setGenerarExpensaHabilitado(true);
                    window.location.href = `/cobros/expensas`;
                    // Habilitar el botón después de cerrar la alerta
                });
            } else {
                console.error('Error al generar la expensa:', response.statusText);
                // Mostrar una alerta de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error al generar la expensa',
                    text: response.statusText,
                }).then(() => {
                    setGenerarExpensaHabilitado(true); 
                    // Habilitar el botón después de cerrar la alerta
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

    const getEmailFromResidenteId = (residenteId) => {
        const residente = residentes[residenteId];
        return residente ? residente.email_residente : '';
    };

    const handleToggleCobroModal = (preaviso, conMultas) => {
        if (conMultas) {
            const montoSinMulta = calcularMontoTotal(preaviso.monto, preaviso.multas);
            const montoMultaTotal = preaviso.multas.reduce((total, multa) => total + parseFloat(multa.monto), 0);
            const montoTotalConMulta = parseFloat(preaviso.monto);

            setTitulo(`Descripción de Servicios: ${preaviso.descripcion_servicios}`);
            setCorreo(getEmailFromResidenteId(preaviso.id_propietarioPagar));
            setMonto(montoSinMulta);
            setMensaje(`Monto Total: ${montoTotalConMulta} (Incluye multa: ${montoMultaTotal})`);
            setSelectedPreaviso({ ...preaviso, montoMulta: montoMultaTotal });
        } else {
            setTitulo(`Servicio a pagar: ${preaviso.servicio_pagar}`);
            setCorreo(getEmailFromResidenteId(preaviso.id_propietarioPagar));
            setMonto(preaviso.monto);
            setMensaje(`Descripción de Servicios: ${preaviso.descripcion_servicios}`);
            setSelectedPreaviso(preaviso);
        }
        setIsModalOpen(!isModalOpen);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${endpoint}/cobrar-servicio`, {
                titulo,
                correo,
                monto,
                mensaje,
                multa: selectedPreaviso.montoMulta || 'Sin multas', // Añadir el monto de la multa aquí
                selectedPreaviso
            });
            if (response.status === 200) {
                setError(null);
                setMensaje('');
                setIsModalOpen(false);
                toast.success('Email enviado correctamente');
            } else {
                setError('Ocurrió un error al procesar el pago.');
                toast.error('Error al enviar el email');
            }
        } catch (error) {
            setError('Ocurrió un error al procesar el pago.');
            toast.error('Error al enviar el email');
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
                       
                        <th>Departamento</th>
                        <th>Propietario</th>
                        <th>Fecha</th>
                        <th>Servicio</th>
                        <th>Servicio a Pagar</th>
                        <th>Monto Total</th>
                        <th>Monto Multa</th>
                        <th>Monto Original</th>
                        <th>Multas</th>
                        <th>Generar expensa</th>
                        <th>Enviar Correo</th> {/* Añadimos una nueva columna para el botón de enviar correo */}
                    </tr>
                </thead>
                <tbody>
                    {preavisosConMultas.map(preaviso => (
                        <tr key={preaviso.id}>
                            
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
                            <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                                <FaEnvelope onClick={() => handleToggleCobroModal(preaviso, true)} />
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <h2> Pre-aviso de expensas sin multas</h2>
            <table className="table">
                <thead>
                    <tr>
                       
                        <th>Departamento</th>
                        <th>Propietario</th>
                        <th>Fecha</th>
                        <th>Servicios</th>
                        <th>Servicio a Pagar</th>
                        <th>Monto</th>
                        <th>Generar Expensa</th>
                        <th>Enviar Correo</th>
                    </tr>
                </thead>
                
                <tbody>
                    {preavisosSinMultas.map(preaviso => (
                        <tr key={preaviso.id}>
                           
                            <td>{preaviso.departamento_id}</td>
                            <td>{preaviso.propietario_pagar}</td>
                            <td>{preaviso.fecha}</td>
                            <td>{preaviso.descripcion_servicios}</td>
                            <td>{preaviso.servicio_pagar}</td>
                            <td>{preaviso.monto}</td>
                            <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                                <FaPen onClick={() => handleGenerarExpensa(preaviso.id)} disabled={!generarExpensaHabilitado} />
                            </td>
                            <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                                <FaEnvelope onClick={() => handleToggleCobroModal(preaviso, false)} />
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>


           {/* Modal para enviar correo */}
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Enviar correo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="titulo">Título:</label>
                            <input id="titulo" type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="correo">Correo Electrónico:</label>
                            <input id="correo" type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="monto">Monto:</label>
                            <input id="monto" type="text" className="form-control" value={monto} onChange={(e) => setMonto(e.target.value)} />
                        </div>
                        {selectedPreaviso && selectedPreaviso.multas && (
                            <div className="form-group">
                                <label htmlFor="multa">Multa:</label>
                                <input id="multa" type="text" className="form-control" value={selectedPreaviso.montoMulta} readOnly />
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="mensaje">Mensaje:</label>
                            <textarea id="mensaje" className="form-control" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar Correo</button>
                    </form>
                </Modal.Body>
            </Modal>



            <ToastContainer /> {/* Componente para mostrar notificaciones */}

        </div>
    );
}

export default GestionCobro;

