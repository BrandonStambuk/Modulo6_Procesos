import React, { useEffect, useState } from "react";
import axios from "axios";
import './customs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Container, Label, Table, InputGroup, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import ModalCon from './ModalConfirm';

const endpoint = 'http://localhost:8000/api';
// const endpointImg = 'http://localhost:8000';

const GestionVisitas = () => {
    const [visitas, setVisitas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [modalDeleteConf, setModalDeleteConf] = useState(false);
    const [idVisita, setIdVisita] = useState('');
    const [modalMarcarConf, setModalMarcarConf] = useState(false);
    const [horaSalida,setHoraSalida] = useState('');
    useEffect(() => {
        getVisitas();
    }, []);

    const getVisitas = async () => {
        try {
            const response = await axios.get(`${endpoint}/visitas`);
            let visitas = response.data;
            visitas = visitas.filter(visita => visita.activo_visita !== 0);
            visitas.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            const responseDepartamentos = await axios.get(`${endpoint}/departamentos`);
            const departamentos = responseDepartamentos.data;

            visitas = visitas.map(visita => {
                const departamento = departamentos.find(departamento => departamento.id === visita.departamento_id);
                return { ...visita, nombreDepa: departamento ? departamento.nombre_departamento : 'N/A' };
            });

            setVisitas(visitas);

        } catch (error) {
            console.error("Error al obtener las visitas:", error);
        }
    }
    const toggleModalMarcarConf = () => {
        setModalMarcarConf(!modalMarcarConf);
    }
    const handleMarcar = () => {
        desactivarVisita(idVisita);
        toggleModalMarcarConf();
    }
    const toggleModalDeleteConf = () => {
        setModalDeleteConf(!modalDeleteConf);

    }
    const handleDelete = () => {
        deleteVisita(idVisita);
        toggleModalDeleteConf();
    }
    const deleteVisita = async (id) => {
        await axios.delete(`${endpoint}/visita/${id}`);
        getVisitas();
    }

    const desactivarVisita = async (id) => {
        await axios.put(`${endpoint}/visitaDes/${id}/desactivar`, {
            activo_visita: false,
        });
        getVisitas();
    }

    const registrarVisita = () => {
        window.location.href = '/dashboard/registrarVisita';
    };
    const manejarBusqueda = async (e) => {
        setBusqueda(e.target.value);
    }
    const setMarcarSalida = (id) => {
        setIdVisita(id);
        setHoraSalida(moment().format('DD/MM/YYYY HH:mm'));
    }

    return (

        <>
            <ModalCon
                isOpen={modalDeleteConf}
                toggle={toggleModalDeleteConf}
                confirm={handleDelete}
                message={"¿Está seguro de eliminar la visita?"}
            />
            <ModalCon
                isOpen={modalMarcarConf}
                toggle={toggleModalMarcarConf}
                confirm={handleMarcar}
                message={"¿Está seguro marcar la salida a la fecha y hora: " + horaSalida + " ?" }
            />
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Label className="text-center mb-4 titulosForms">Gestión de visitas</Label>
                        </Row>
                        <Row >
                            <Col md={7}>
                                <InputGroup >
                                    <Input placeholder="Buscar visitante..." className="buscadorDepa" onChange={manejarBusqueda}
                                        style={{
                                            borderRadius: "15px",
                                            border: "1px solid rgba(0, 0, 0, 0.3)",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                                        }}
                                    />
                                </InputGroup>
                            </Col>
                            <Col className="d-flex justify-content-end" md={5}>
                                <Button type="button" className="custom-button" onClick={registrarVisita}>Marcar Ingreso</Button>
                            </Col>
                        </Row>
                        <Table striped responsive bordered className="mt-5">
                            <thead className="text-center" >
                                <tr>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>DNI</th>
                                    <th>Celular</th>
                                    <th>Departamento</th>
                                    <th>Ingreso</th>
                                    <th>Salida</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="visitasTabla">
                                {visitas.filter(visita => {
                                    if (busqueda === "") {
                                        return visita;
                                    } else if (visita.nombre_visita.toLowerCase().includes(busqueda.toLowerCase()) || visita.apellidos_visita.toLowerCase().includes(busqueda.toLowerCase()) || visita.cedula_visita.toLowerCase().includes(busqueda.toLowerCase())) {
                                        return visita;
                                    }
                                    return false;
                                }).map((visita) => (
                                    (visita.activo_visita && visita.activo_visita !== 0) &&
                                    <tr key={visita.id}>
                                        <td className="celdaVisita">{visita.nombre_visita}</td>
                                        <td className="celdaVisita">{visita.apellidos_visita}</td>
                                        <td className="celdaVisita">{visita.cedula_visita}</td>
                                        <td className="celdaVisita">{visita.telefono_visita}</td>
                                        <td className="celdaVisita">{visita.nombreDepa}</td>
                                        <td className="celdaVisita">{moment(visita.created_at).format('DD/MM/YYYY HH:mm')}</td>

                                        <td className="text-center celdaVisita">
                                                <Button type="button" className="custom-buttonVisita" onClick={(e) => { e.stopPropagation(); setMarcarSalida(visita.id); toggleModalMarcarConf(); }}>Marcar Salida</Button>
                                        </td>
                                        <td className="text-center celdaVisita">
                                                <div onClick={(e) => { e.stopPropagation(); setIdVisita(visita.id) ; toggleModalDeleteConf(); }} ><FontAwesomeIcon icon={faTrashAlt} className="iconVisita" /></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default GestionVisitas;
