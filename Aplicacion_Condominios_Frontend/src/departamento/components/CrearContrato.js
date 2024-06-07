import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Input, FormGroup, Label, Col, Row, Button, Container, CardImg, FormFeedback
} from "reactstrap";
import Cookies from 'universal-cookie';
import ModalMostrarResidentes from "./ModalMostrarResidentes";
import ModalConfirm from "./ModalConfirm";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "./customs.css";

const endpoint = "http://localhost:8000/api";
const endpointImg = 'http://localhost:8000';
const cookies = new Cookies();
class CrearContrato extends Component {

    async componentDidMount() {
        const idDep = cookies.get('idDepa');
        this.setState({ departamento_id: idDep });
        console.log("id dep",idDep);

        try {
            //const response = await axios.post(`${endpoint}/residentes/actualizar-estado-contrato`);
            const departamento = await axios.get(`${endpoint}/departamento/${idDep}`);
            const depa = departamento.data
            this.setState({
                departamento_id: idDep,
                ofertado_venta: depa.ofertado_venta === 1 ? true : false,
                ofertado_alquiler: depa.ofertado_alquiler === 1 ? true : false,
                ofertado_anticretico: depa.ofertado_anticretico === 1 ? true : false,
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


    handleInput = (e) => {
        if (e.target.name === 'tipo_contrato') {
            const isVenta = e.target.value === 'Venta';
            this.setState({
                [e.target.name]: e.target.value,
                fecha_fin_contrato_disabled: isVenta,
            });
        } 
        else if (e.target.name === 'fecha_fin_contrato' && e.target.value.trim() === '') {
            this.setState({
                [e.target.name]: null,
            });
        }else {
            this.setState({
                [e.target.name]: e.target.value,
            });
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
            // Manejar el error según sea necesario
        }
        const nuevosResidentes = this.state.residentesSeleccionados.filter(residente => residente.id !== idResidente);

        // Actualiza el estado con el nuevo array de residentes
        this.setState({ residentesSeleccionados: nuevosResidentes });
    }

    storeResident = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!this.state.fecha_inicio_contrato) {
            validationErrors.fecha_inicio_contrato = "Este campo es obligatorio";
        } else {
            let d2 = new Date(this.state.fecha_inicio_contrato);
            d2.setDate(d2.getDate() + 1);
            d2.setUTCHours(0, 0, 0, 0);

            let date_Actual1 = new Date();
            date_Actual1.setDate(date_Actual1.getDate() + 1);
            date_Actual1.setUTCHours(0, 0, 0, 0);

            let fecha1 = d2.getTime();
            let fecha2 = date_Actual1.getTime();
            if (fecha1 < fecha2) {
                validationErrors.fecha_inicio_contrato = "Esta fecha no es válida";
            }
        }

        if (!this.state.fecha_fin_contrato && !this.state.fecha_fin_contrato_disabled) {
            validationErrors.fecha_fin_contrato = "Este campo es obligatorio";
        } else if(!this.state.fecha_fin_contrato_disabled){
            let d2 = new Date(this.state.fecha_fin_contrato);
            d2.setDate(d2.getDate() + 1);
            d2.setUTCHours(0, 0, 0, 0);

            let date_Actual1 = new Date();
            date_Actual1.setDate(date_Actual1.getDate() + 1);
            date_Actual1.setUTCHours(0, 0, 0, 0);

            let fecha1 = d2.getTime();
            let fecha2 = date_Actual1.getTime();
            if (fecha1 < fecha2) {
                validationErrors.fecha_fin_contrato = "Esta fecha no es válida";
            }
        }
        if (!this.state.precio_contrato) {
            validationErrors.precio_contrato = "Este campo es obligatorio";
        } else {
            if (!/^(?!-)(?:[1-9]\d{2,5})$/.test(this.state.precio_contrato)) {
                validationErrors.precio_contrato =
                    "Ingrese un precio válido";
            }
        }
        if (!this.state.tipo_contrato) {
            validationErrors.tipo_contrato = "Debe seleccionar tipo de contrato";
        }

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
            const idDep = cookies.get('idDepa');

            const contratoVentaExis = await axios.get(`${endpoint}/contratoDepS/${idDep}`);
            const cve = contratoVentaExis.data;
            if(cve && cve.contratos.length > 0 && this.state.tipo_contrato === "Venta"){
                const residentesAntiguos = await axios.get(`${endpoint}/residentes-by-contrato/${cve.contratos[0].id}`);
                const ra = residentesAntiguos.data;
                for (const residente of ra) {
                    await axios.put(`${endpoint}/residentes/${residente.id}/actualizarContrato`, {
                        contrato_id: null,
                        tipo_residente: "Ninguno",
                    });
                }
                await axios.put(`${endpoint}/contratoNoVig/${cve.contratos[0].id}/anularContrato`,{
                    vigente_contrato: false,
                });
            }
            

            const url = `${endpoint}/contrato`;
            const data = new FormData();

            data.append("fecha_inicio_contrato", this.state.fecha_inicio_contrato);
            data.append("fecha_fin_contrato", this.state.fecha_fin_contrato);
            data.append("precio_contrato", this.state.precio_contrato);
            data.append("tipo_contrato", this.state.tipo_contrato);
            data.append("vigente_contrato", this.state.vigente_contrato ? '1' : '0');
            data.append("departamento_id", this.state.departamento_id);

            const res = await axios.post(url, data);
            const contratoId = res.data.contrato_id;
        
                await axios.put(`${endpoint}/departamentos/${idDep}/actualizarDisp`, {
                    disponibilidad: 0,
                });
                cookies.remove('idDepa');
        
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
                window.location.href = "./edificios";
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
                        <Col sm={12}>
                            <h2 className="text-center mb-5 titulosForms">Crear contrato</h2>
                            <form onSubmit={this.storeResident}>
                                <FormGroup className="mb-4">
                                    <Row>
                                        <Col sm={6}>
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
                                                placeholder="N° en $ entre 100 y 999999"
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.precio_contrato ? true : false}
                                            />
                                            <FormFeedback>{this.state.errors.precio_contrato}</FormFeedback>
                                        </Col>
                                        <Col sm={6}>

                                            <Label
                                                className="label-custom"
                                            >
                                                Tipo de contrato
                                            </Label>
                                            <Input
                                                type="select"
                                                className="customInput"
                                                name="tipo_contrato"
                                                id="tipo_contrato"
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.tipo_contrato ? true : false}
                                            >
                                                <option disabled selected>{" "} Seleccione un tipo de contrato</option>
                                                {this.state.ofertado_venta && <option value="Venta">Venta</option>}
                                                {this.state.ofertado_alquiler && <option value="Alquiler">Alquiler</option>}
                                                {this.state.ofertado_anticretico && <option value="Anticretico">Anticretico</option>}

                                            </Input>
                                            <FormFeedback>{this.state.errors.tipo_contrato}</FormFeedback>

                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup className="mb-4">
                                    <Row>
                                        <Col sm={6}>
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
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.fecha_inicio_contrato ? true : false}

                                            />
                                            <FormFeedback>{this.state.errors.fecha_inicio_contrato}</FormFeedback>
                                        </Col>
                                        <Col sm={6}>
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
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.fecha_fin_contrato && !this.state.fecha_fin_contrato_disabled ? true : false}
                                                disabled={this.state.fecha_fin_contrato_disabled}
                                            />
                                            <FormFeedback>{this.state.errors.fecha_fin_contrato }</FormFeedback>
                                        </Col>
                                    </Row>

                                </FormGroup >

                                <Label className="label-custom">Residentes</Label>
                                
                                    {residentesSeleccionados.map((residente, index) => (
                                        <Row className="d-flex align-items-center justify-content-between mt-2 customCard" key={index}>
                                            <Col sm={3} >
                                                <CardImg
                                                   className="cardlistaResidente"
                                                    src={`${endpointImg}/${residente.imagen_residente}`}
                                                    alt={residente.nombre_residente}
                                                />
                                            </Col>
                                            <Col sm={3} >
                                                <li style={{ fontWeight: 'bold', fontSize: '0.9rem'}}>{residente.nombre_residente} {residente.apellidos_residente}
                                                </li>
                                            </Col>
                                            <Col sm={3}>
                                                <Input
                                                    type="select"
                                                    className="customInput"
                                                    name="tipo_residente"
                                                    id="tipo_residente"
                                                    onChange={(e) => this.handleInputTipo(e, index)}
                                                >
                                                    <option disabled selected>{" "}Tipo de residente</option>
                                                    {this.state.tipo_contrato === "Venta" && <option value="Propietario">Propietario</option>}
                                                    {(this.state.tipo_contrato === "Alquiler" || this.state.tipo_contrato === "Anticretico") && <option value="Titular">Titular</option>}
                                                    <option value="Residente">Residente</option>
                                                </Input>
                                                {(this.state.residentesSeleccionados[index].tipo_residente === '' || this.state.residentesSeleccionados[index].tipo_residente === "ninguno") && ( 
                                                    <span style={{ color: 'red', fontSize: '0.9rem', marginLeft: "0.7rem"}}>Seleccione un tipo</span>    
                                                )}
                                            </Col>
                                            <Col className="d-flex justify-content-center" sm={3}>
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
                                    Registrar
                                </Button>
                            </form>
                        </Col>
                    </Row>
                </Container>

            </>
        );
    }
}
export default CrearContrato;
