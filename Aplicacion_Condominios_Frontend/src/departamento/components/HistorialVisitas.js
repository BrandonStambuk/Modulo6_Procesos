import React, { useEffect, useState } from "react";
import axios from "axios";
import './customs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Container, Label, Table, InputGroup, Input } from 'reactstrap';
import moment from 'moment';

const endpoint = 'http://localhost:8000/api';

const HistorialVisitas = () => {
    const [visitas, setVisitas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtroDesde, setFiltroDesde] = useState('');
    const [filtroHasta, setFiltroHasta] = useState('');
    const [filtrar, setFiltrar] = useState(false);

    useEffect(() => {
        getVisitas();
    }, []);

    const getVisitas = async () => {
        try {
            const response = await axios.get(`${endpoint}/visitas`);
            let visitas = response.data;
            const responseDepartamentos = await axios.get(`${endpoint}/departamentos`);
            const departamentos = responseDepartamentos.data;
            visitas.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
            visitas = visitas.map(visita => {
                const departamento = departamentos.find(departamento => departamento.id === visita.departamento_id);
                return { ...visita, nombreDepa: departamento ? departamento.nombre_departamento : 'N/A' };
            });

            setVisitas(visitas);

        } catch (error) {
            console.error("Error al obtener las visitas:", error);
        }
    }

    const handleInput = (e) => {
        
        const { name, value } = e.target;
        if (name === 'filtroDesde') {
            console.log("valor del desde",value);
            setFiltroDesde(value);
        } else if (name === 'filtroHasta') {
            console.log("valor del hasta",value);
            setFiltroHasta(value);
        }
    };

    const filtrarFechas = () => {
        setFiltrar(true);
    };

    const olvidarFechas = () => {
        setFiltroDesde('');
        setFiltroHasta('');
        setFiltrar(false);
    };

    const manejarBusqueda = async (e) => {
        setBusqueda(e.target.value);
    }

    const filteredVisitas = visitas
        .filter(visita => {
            if (busqueda === "") {
                return true;
            }
            return visita.nombre_visita.toLowerCase().includes(busqueda.toLowerCase()) ||
                   visita.apellidos_visita.toLowerCase().includes(busqueda.toLowerCase()) ||
                   visita.cedula_visita.toLowerCase().includes(busqueda.toLowerCase());
        })
        .filter(visita => {
            if (!filtrar) {
                return true;
            }
            
            const createdAt = new Date(visita.created_at);
            console.log("ingreso",createdAt);
            const updatedAt = new Date(visita.updated_at);
            console.log("salida",updatedAt);
            console.log("filtroPrimero",new Date(filtroDesde));
            console.log("filtroSegundo",new Date(filtroHasta));
            console.log("1cond",createdAt >= new Date(filtroDesde));
            console.log("2cond",updatedAt <= new Date(filtroHasta));
            return createdAt >= new Date(filtroDesde) && updatedAt <= new Date(filtroHasta);
        });

    return (

        <>
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Label className="text-center mb-4 titulosForms">Historial de visitas</Label>
                        </Row>
                        <Row >
                        <Col md={8} className="mx-auto">
                        <InputGroup className="mb-5">
                                    <Input placeholder="Buscar visitante..." className="buscadorDepa" onChange={manejarBusqueda}
                                        style={{
                                            borderRadius: "15px",
                                            border: "1px solid rgba(0, 0, 0, 0.3)",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                                        }}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="justify-content-center align-items-end">
                            <Col md={2}>
                                <Label className="label-custom" for="filtroDesde">
                                    Desde
                                </Label>
                                    <Input
                                    className="customInput"
                                    onChange={handleInput}
                                    type="date"
                                    name="filtroDesde"
                                    id="filtroDesde"
                                    value={filtroDesde}
                                    />
                            </Col>
                            <Col md={2}>
                                <Label className="label-custom" for="filtroHasta">
                                    Hasta
                                </Label>
                                    <Input
                                    className="buscadorDepa"
                                    onChange={handleInput}
                                    type="date"
                                    name="filtroHasta"
                                    id="filtroHasta"
                                    value={filtroHasta}
                                    />
                            </Col>
                            <Col md={3} className="d-flex justify-content-end">
                                <Button size="md" type="button" className="custom-button me-4"
                                    style={{ fontWeight: 'bold' }}
                                    onClick={filtrarFechas}>
                                    Aplicar Filtro
                                </Button>
                                <Button size="md" type="button" className="custom-button "
                                    style={{ fontWeight: 'bold' }}
                                    onClick={olvidarFechas}>
                                    Quitar Filtro
                                </Button>
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
                                </tr>
                            </thead>
                            <tbody className="visitasTabla">
                            {filteredVisitas.map((visita) => (
                                <tr key={visita.id}>
                                    <td className="celdaVisita">{visita.nombre_visita}</td>
                                    <td className="celdaVisita">{visita.apellidos_visita}</td>
                                    <td className="celdaVisita">{visita.cedula_visita}</td>
                                    <td className="celdaVisita">{visita.telefono_visita}</td>
                                    <td className="celdaVisita">{visita.nombreDepa}</td>
                                    <td className="celdaVisita">{moment(visita.created_at).format('DD/MM/YYYY HH:mm')}</td>
                                    <td className="celdaVisita">{moment(visita.updated_at).format('DD/MM/YYYY HH:mm')}</td>
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
export default HistorialVisitas;
