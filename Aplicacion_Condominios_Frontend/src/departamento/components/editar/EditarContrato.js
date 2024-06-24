import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Input, FormGroup, Label, Col, Row, Button, Container, CardImg, FormFeedback
} from "reactstrap";
import Cookies from 'universal-cookie';
import ModalMostrarResidentes from "../modal/ModalMostrarResidentes";
import ModalConfirm from "../modal/ModalConfirm";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "../customs.css";
import moment from 'moment';

const endpoint = "http://localhost:8000/api";
const endpointImg = 'http://localhost:8000';
const cookies = new Cookies();
class EditarContrato extends Component {

    async componentDidMount() {
        const idContrato = cookies.get('idContrato');
        const response = await axios.post(`${endpoint}/residentes/actualizar-estado-contrato`);
        console.log("id del contrato",idContrato);
        try {
            const contrato = await axios.get(`${endpoint}/contrato/${idContrato}`);
            const contr = contrato.data
            const res = await axios.get(`${endpoint}/residentes-by-contrato/${idContrato}`);
            const residentes = res.data;
            this.setState({
                fecha_inicio_contrato: moment(contr.fecha_inicio_contrato).format('YYYY-MM-DD'),
                fecha_fin_contrato: moment(contr.fecha_fin_contrato).format('YYYY-MM-DD'),
                precio_contrato: contr.precio_contrato,
                tipo_contrato: contr.tipo_contrato,
                vigente_contrato: contr.vigente_contrato,
                departamento_id: contr.departamento_id,
                residentesSeleccionados: residentes,
             })

        } catch (error) {
            console.error('Error al obtener los bloques:', error);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            fecha_inicio_contrato: "",
            fecha_fin_contrato: "",
            precio_contrato: 0,
            tipo_contrato: "",
            vigente_contrato: 1,
            departamento_id: "",
            errors: [],
            residentesSeleccionados: [],
            mostrarModal: false,
            modalOpen: false,
            fecha_fin_contrato_disabled: false,
            ofertado_venta: false,
            ofertado_alquiler: false,
            ofertado_anticretico: false,
        };
    };

    toggleModal = () => {
        this.setState((prevState) => ({
            mostrarModal: !prevState.mostrarModal,
        }));
    };
    toggleModalConfirm = () => {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }));
    }
    handleConfirm = (e) => {
        this.storeResident(e);
        this.toggleModalConfirm();
    }

    agregarResidente = async (residente) => {
        residente.tipo_residente = '';
        this.setState((prevState) => ({
            residentesSeleccionados: [...prevState.residentesSeleccionados, residente],
        }));
        try {
            const idRes = residente.id;
            const response = await axios.put(`${endpoint}/residentes/${idRes}/actualizarEst`, {
                estado_residente: 1,
            });
        } catch (error) {
            console.error('Error al actualizar el atributo:', error);
            // Manejar el error según sea necesario
        }

    };

    handleInputTipo = (e, index) => {
        const { name, value } = e.target;
        const updatedResidentes = [...this.state.residentesSeleccionados];
        updatedResidentes[index].tipo_residente = value;
        console.log("tipo residente", updatedResidentes[index].tipo_residente);
    
        this.setState({
            residentesSeleccionados: updatedResidentes,
        });
        console.log("residentes supuestamente actualizados", this.state.residentesSeleccionados);

    };

    eliminarListaResidente = async (idResidente) => {
        try {
            const response = await axios.put(`${endpoint}/residentes/${idResidente}/actualizarEst`, {
                estado_residente: 0,
            });
        } catch (error) {
            console.error('Error al actualizar el atributo:', error);
        }
        const nuevosResidentes = this.state.residentesSeleccionados.filter(residente => residente.id !== idResidente);
        this.setState({ residentesSeleccionados: nuevosResidentes });
    }

    storeResident = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (this.state.residentesSeleccionados.length === 0) {
            validationErrors.residentesSeleccionados = "Debe seleccionar al menos un residente";
        } else {
            for (const residente of this.state.residentesSeleccionados) {
                if (residente.tipo_residente === "" || residente.tipo_residente === " Seleccione un tipo de residente" || residente.tipo_residente === "ninguno") {
                    validationErrors.residentesSeleccionados = "Debe seleccionar un tipo de residente";
                }
            }
        }

        //console.log(validationErrors);

        this.setState({ errors: validationErrors });

        if (Object.keys(validationErrors).length === 0) {
            const contratoId = cookies.get('idContrato');
       
                const residentes = this.state.residentesSeleccionados;
                
                console.log("lista de residentes",residentes);
                for (const residente of residentes) {
                    const idResidente = residente.id;
                    const tipoResidente = residente.tipo_residente;
                    console.log("id del residente",idResidente);
                    console.log("tipo de residente",tipoResidente);
                    await axios.put(`${endpoint}/residentes/${idResidente}/actualizarContrato`, {
                        contrato_id: contratoId,
                        tipo_residente: tipoResidente,
                    });
                }
                window.location.href = "./departamentos";
        }
    };

    render() {
        const { residentesSeleccionados } = this.state;
        const { fecha_fin_contrato_disabled } = this.state;
        return (
            <>
                <ModalConfirm
                    isOpen={this.state.modalOpen}
                    toggle={this.toggleModalConfirm}
                    confirm={this.handleConfirm}
                    message="¿Está seguro de que deseas registrar el contrato?"
                />
                <Container className="custom-form">
                    <Row>
                        <Col md={12}>
                            <h2 className="text-center mb-5 titulosForms">Editar contrato</h2>
                            <form onSubmit={this.storeResident}>
                                <FormGroup className="mb-4">
                                    <Row>
                                        <Col md={6}>
                                            <Label
                                                className="label-custom"
                                            >
                                                Precio
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                className="customInput"
                                                type="text"
                                                name="precio_contrato"
                                                value={this.state.precio_contrato}
                                                readOnly
                                                disabled
                                            />
                                        </Col>
                                        <Col md={6}>

                                            <Label
                                                className="label-custom"
                                            >
                                                Tipo de contrato
                                            </Label>
                                            <Input
                                                type="text"
                                                className="customInput"
                                                name="tipo_contrato"
                                                id="tipo_contrato"
                                                value={this.state.tipo_contrato}
                                                readOnly
                                                disabled
                                            >
                                            </Input>

                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup className="mb-4">
                                    <Row>
                                        <Col md={6}>
                                            <Label
                                                className="label-custom"
                                            >
                                                Inicio del contrato
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                className="customInput"
                                                type="date"
                                                name="fecha_inicio_contrato"
                                                value={this.state.fecha_inicio_contrato}
                                                readOnly
                                                disabled
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Label
                                                className={`label-custom ${fecha_fin_contrato_disabled ? 'active' : ''}`}
                                            >
                                                Fin del contrato
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                className="customInput"
                                                type="date"
                                                name="fecha_fin_contrato"
                                                value={this.state.fecha_fin_contrato}
                                                readOnly
                                                disabled
                                            />
                                        </Col>
                                    </Row>

                                </FormGroup >

                                <Label className="label-custom">Residentes</Label>
                                
                                    {residentesSeleccionados.map((residente, index) => (
                                        <Row className="d-flex align-items-center justify-content-between mt-2 customCard" key={index}>
                                            <Col md={3} >
                                                <CardImg
                                                   className="cardlistaResidente"
                                                    src={`${endpointImg}/${residente.imagen_residente}`}
                                                    alt={residente.nombre_residente}
                                                />
                                            </Col>
                                            <Col md={3} >
                                                <li style={{ fontWeight: 'bold', fontSize: '0.9rem'}}>{residente.nombre_residente} {residente.apellidos_residente}
                                                </li>
                                            </Col>
                                            <Col md={3}>
                                                {console.log("residente",residente)}
                                                {console.log("residente",residente.tipo_residente)}
                                                <Input
                                                    type="select"
                                                    className="customInput"
                                                    name="tipo_residente"
                                                    id="tipo_residente"
                                                    value={residente.tipo_residente}
                                                    onChange={(e) => this.handleInputTipo(e, index)}
                                                >
                                                    <option value="">Tipo de residente</option>
                                                    {this.state.tipo_contrato === "Venta" && <option value="Propietario">Propietario</option>}
                                                    {(this.state.tipo_contrato === "Alquiler" || this.state.tipo_contrato === "Anticretico") && <option value="Titular">Titular</option>}
                                                    <option value="Residente">Residente</option>
                                                </Input>
                                                {(this.state.residentesSeleccionados[index].tipo_residente === '' || this.state.residentesSeleccionados[index].tipo_residente === "ninguno") && ( 
                                                    <span style={{ color: 'red', fontSize: '0.9rem', marginLeft: "0.7rem"}}>Seleccione un tipo</span>    
                                                )}
                                            </Col>
                                            <Col className="d-flex justify-content-center" md={3}>
                                                <Button className="botoncardContr" type="button" onClick={() => this.eliminarListaResidente(residente.id)} >
                                                    <FontAwesomeIcon icon={faTrashAlt} className="iconContr" />
                                                </Button>
                                            </Col>
                                        </Row>


                                    ))}
                                
                                {this.state.errors.residentesSeleccionados && (
                                    <span style={{ color: 'red', fontSize: '0.9rem' }}>{this.state.errors.residentesSeleccionados}</span> 
                                )}


                                <Button size="lg" type="button" className="custom-button mx-auto d-block mb-4 mt-4"
                                    style={{ fontWeight: 'bold' }} onClick={this.toggleModal}
                                >
                                    +
                                </Button>

                                {this.state.mostrarModal && (

                                    <ModalMostrarResidentes
                                        isOpen={this.state.mostrarModal}
                                        toggle={this.toggleModal}
                                        agregarResidente={this.agregarResidente}
                                    />
                                )}

                                <Button size="lg" type="button" className="custom-button mx-auto d-block mb-4 mt-4 bottom-button"
                                    style={{ fontWeight: 'bold' }}
                                    onClick={this.toggleModalConfirm}
                                >
                                    Guardar
                                </Button>
                            </form>
                        </Col>
                    </Row>
                </Container>

            </>
        );
    }
}
export default EditarContrato;
