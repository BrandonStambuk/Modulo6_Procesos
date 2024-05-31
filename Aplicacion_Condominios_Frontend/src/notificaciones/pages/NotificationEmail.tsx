import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define una interfaz para el tipo de datos que esperas recibir de la API
interface Resident {
    id: number;
    nombre_residente: string;
    apellidos_residente: string;
    cedula_residente: string;
    telefono_residente: string;
    fecha_nacimiento_residente: string;
    tipo_residente: string;
    nacionalidad_residente: string;
    email_residente: string;
    genero_residente: string;
    estado_residente: number;
    imagen_residente: string;
    contrato_id: number | null;
    created_at: string;
    updated_at: string;
}

function NotificationEmail() {
    const [formData, setFormData] = useState({
        titulo: '',
        anuncio: '',
    });

    // Estado para almacenar la lista de direcciones de correo electrónico seleccionadas
    const [emailList, setEmailList] = useState<string[]>([]);

    // Estado para almacenar los residentes obtenidos del endpoint
    const [residents, setResidents] = useState<Resident[]>([]);

    // Estado para rastrear la selección de los residentes
    const [selectedResidents, setSelectedResidents] = useState<{ [residentId: number]: boolean }>({});

    // Estado para controlar la visibilidad del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Función para extraer a los residentes del endpoint
    const fetchResidents = async () => {
        try {
            const response = await axios.get<Resident[]>('http://127.0.0.1:8000/api/residentes');
            setResidents(response.data);

            // Inicializa selectedResidents con todos los residentes no seleccionados
            const initialSelectedResidents = response.data.reduce<Record<number, boolean>>((acc, resident) => {
                acc[resident.id] = false;
                return acc;
            }, {});
            setSelectedResidents(initialSelectedResidents);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch residents.');
        }
    };

    // Manejar la selección de residentes
    const handleResidentSelectionChange = (residentId: number) => {
        setSelectedResidents((prevSelected) => ({
            ...prevSelected,
            [residentId]: !prevSelected[residentId],
        }));

        // Actualizar emailList con los correos de los residentes seleccionados
        const newEmailList = residents.filter(resident => selectedResidents[residentId]).map(resident => resident.email_residente);
        setEmailList(newEmailList);
    };

    // Función para abrir el modal
    const openModal = async () => {
        // Traer los residentes si no están cargados
        if (residents.length === 0) {
            await fetchResidents();
        }
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);

        // Actualizar emailList con los correos de los residentes seleccionados
        const newEmailList = residents.filter(resident => selectedResidents[resident.id]).map(resident => resident.email_residente);
        setEmailList(newEmailList);
    };

    // Función para seleccionar a todos los residentes
    const selectAllResidents = () => {
        const updatedSelectedResidents = residents.reduce((acc, resident) => {
            acc[resident.id] = true;
            return acc;
        }, {} as { [residentId: number]: boolean });
        setSelectedResidents(updatedSelectedResidents);
    };

    // Función para deseleccionar a todos los residentes
    const deselectAllResidents = () => {
        const updatedSelectedResidents = residents.reduce((acc, resident) => {
            acc[resident.id] = false;
            return acc;
        }, {} as { [residentId: number]: boolean });
        setSelectedResidents(updatedSelectedResidents);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Mapear a cada dirección de correo seleccionada para enviar un correo a cada una
        const promises = emailList.map(correo => {
            const data = {
                titulo: formData.titulo,
                anuncio: formData.anuncio,
                correo: correo,
            };

            // Enviar el correo a través de la API
            return axios.post('http://127.0.0.1:8000/api/email', data);
        });

        try {
            // Esperar a que todas las solicitudes se completen
            const responses = await Promise.all(promises);
            const allSuccessful = responses.every(response => response.status === 200);

            if (allSuccessful) {
                toast.success('Email enviado correctamente');
                setFormData({ titulo: '', anuncio: '' });
                setSelectedResidents({});
                setEmailList([]);
            } else {
                toast.error('Error al enviar algunos de los emails');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error al enviar el email');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Layout en dos columnas utilizando flexbox */}
            <div className='d-flex'>
                {/* Columna izquierda */}
                <div className='flex-column w-50'>
                    {/* Botón para abrir el modal */}
                    <Button className='btn btn-primary mb-3 w-auto' onClick={openModal}>
                        Seleccionar Residente
                    </Button>

                    {/* Lista de residentes seleccionados */}
                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px', marginRight: '10%' }}>
                        <h5>Enviar a:</h5>
                        <ul style={{ padding: '0' }}>
                            {residents
                                .filter(resident => selectedResidents[resident.id])
                                .map(resident => (
                                    <li
                                        key={resident.id}
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}
                                    >
                                        <span>
                                            {resident.nombre_residente} {resident.apellidos_residente}
                                        </span>
                                        {/* Botón para quitar residente de la lista */}
                                        <button
                                            className='btn btn-link text-danger'
                                            onClick={() => handleResidentSelectionChange(resident.id)}
                                            style={{ cursor: 'pointer', fontSize: '16px' }}
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>

                {/* Columna derecha */}
                <div className='flex-column w-50'>
                    <div className='mb-3'>
                        <label className='form-label'>Título:</label>
                        <input
                            className='form-control'
                            type='text'
                            name='titulo'
                            value={formData.titulo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Anuncio:</label>
                        <textarea
                            className='form-control'
                            name='anuncio'
                            value={formData.anuncio}
                            onChange={handleChange}
                            rows={5} 
                            required
                        />
                    </div>

                    <Button className='btn btn-success w-auto' type='submit'>
                        Enviar
                    </Button>
                </div>
            </div>

            {/* Modal para seleccionar residentes */}
            <Modal style={{ marginTop: '15%' }} show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Residentes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Botones para seleccionar o deseleccionar todos */}
                    <div className='mb-2'>
                        <Button  style={{ marginRight: '10%' }} variant='success'onClick={selectAllResidents}>
                            Todos
                        </Button>
                        <Button variant='danger' onClick={deselectAllResidents}>
                            Nadie
                        </Button>
                    </div>
                    {residents.map((resident) => (
                        <div key={resident.id} >
                            <input
                                style={{ marginRight: '3%' }}
                                type='checkbox'
                                id={`resident-${resident.id}`}
                                checked={selectedResidents[resident.id]}
                                onChange={() => handleResidentSelectionChange(resident.id)}
                            />
                            <label htmlFor={`resident-${resident.id}`}>{resident.nombre_residente} {resident.apellidos_residente}</label>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>
                        Cerrar
                    </Button>
                    <Button className='btn btn-primary mb-2 w-auto' variant='primary' onClick={closeModal}>
                        Guardar Selección
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Contenedor de Toast */}
            <ToastContainer />
        </form>
    );
}

export default NotificationEmail;
