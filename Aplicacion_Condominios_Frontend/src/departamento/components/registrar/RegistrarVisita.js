import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Input, FormGroup, Label, Col, Row, Button, Container, FormFeedback
} from "reactstrap";
import ModalConfirm from "../modal/ModalConfirm";
import "../customs.css";

const endpoint = "http://localhost:8000/api";
class RegistrarVisita extends Component {

    async componentDidMount() {
        try {
            const bloques = await axios.get(`${endpoint}/bloques`);
            this.setState({ bloques: bloques.data });
            //const url = `${endpoint}/departamentos`;
            //const response = await axios.get(url);
            //this.setState({ departamentos: response.data });
        } catch (error) {
            console.error('Error al obtener los bloques:', error);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            nombre_visita: "",
            apellidos_visita: "",
            cedula_visita: "",
            telefono_visita: "",
            activo_visita: true,
            departamentos: [],
            departamentoSeleccionado: '',
            bloques: [],
            bloqueSeleccionado: '',
            edificioSeleccionado: '',
            edificios: [],
            errors: {},
            modalOpen: false,
        };
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }));
    }

    handleConfirm = (e) => {
        console.log('Usuario confirmó la acción');
        this.storeVisita(e);
        this.toggleModal();
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleBloqueSeleccionado = (event) => {
        const idBloque = event.target.value;
        this.setState({ bloqueSeleccionado: idBloque, edificioSeleccionado: "", departamentoSeleccionado: "" });
        this.cargarOpcionesDependientes(idBloque);
    };

    handleEdificioSeleccionado = (e) => {
        const edificio = e.target.value;
        this.setState({ edificioSeleccionado: edificio, departamentoSeleccionado: "" });
        this.cargarDepartamentos(edificio);
    };

    cargarOpcionesDependientes = async (idBloque) => {
        try {
            const response = await axios.get(`${endpoint}/edificios-by-bloques/${idBloque}`);

            this.setState({ edificios: response.data });
        } catch (error) {
            console.error('Error al obtener las opciones dependientes:', error);
        }
    };

    cargarDepartamentos = async (idEdificio) => {
        try {
            const response = await axios.get(`${endpoint}/departamentos-by-edificios/${idEdificio}`);
            this.setState({ departamentos: response.data });
        } catch (error) {
            console.error('Error al obtener los pisos:', error);
        }
    }

    handleDepartamentoSeleccionado = (event) => {
        const idDepartamento = event.target.value;
        this.setState({ departamentoSeleccionado: idDepartamento });
    };

    storeVisita = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!this.state.nombre_visita.trim()) {
            validationErrors.nombre_visita = "Este campo es obligatorio";
        } else if (
            !/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{0,59}[A-Za-zÑñáéíóú]$/.test(
                this.state.nombre_visita
            )
        ) {
            validationErrors.nombre_visita = "Ingrese un nombre válido";
        }

        if (!this.state.apellidos_visita.trim()) {
            validationErrors.apellidos_visita = "Este campo es obligatorio";
        } else if (
            !/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{0,59}[A-Za-zÑñáéíóú]$/.test(
                this.state.apellidos_visita
            )
        ) {
            validationErrors.apellidos_visita = "Ingrese un apellido válido";
        }

        if (!this.state.cedula_visita.trim()) {
            validationErrors.cedula_visita = "Este campo es obligatorio";
        } else if (
            !/^[1-9][A-Za-z0-9.-]{4,14}$/.test(
                this.state.cedula_visita
            )
        ) {
            validationErrors.cedula_visita = "Ingrese una identificacion válida";
        }

        if (!this.state.telefono_visita) {
            validationErrors.telefono_visita = "Este campo es obligatorio";
        } else {
            if (!/^\+?[1-9][0-9]{7,11}$/.test(this.state.telefono_visita)) {
                validationErrors.telefono_visita =
                    "Ingrese un número de teléfono válido";
            }
        }

        if (!this.state.bloqueSeleccionado) {
            validationErrors.bloqueSeleccionado = "Debe seleccionar un bloque";
        }
        if (!this.state.edificioSeleccionado) {
            validationErrors.edificioSeleccionado = "Debe seleccionar un edificio";
        }
        if (!this.state.departamentoSeleccionado) {
            validationErrors.departamentoSeleccionado = "Debe seleccionar un departamento";
        }

        this.setState({ errors: validationErrors });

        if (Object.keys(validationErrors).length === 0) {

            const url = `${endpoint}/visita`;
            const data = new FormData();

            data.append("nombre_visita", this.state.nombre_visita);
            data.append("apellidos_visita", this.state.apellidos_visita);
            data.append("cedula_visita", this.state.cedula_visita);
            data.append("telefono_visita", this.state.telefono_visita);
            data.append("activo_visita", this.state.activo_visita ? '1' : '0');
            data.append("departamento_id", this.state.departamentoSeleccionado);
            console.log(this.state.nombre_visita);
            console.log(this.state.apellidos_visita);
            console.log(this.state.cedula_visita);
            console.log(this.state.telefono_visita);
            console.log(this.state.activo_visita);
            console.log(this.state.departamentoSeleccionado);

            axios.post(url, data).then((res) => {
                console.log(res);
                window.location.href = "./visitas";
            });

        }
    };

    render() {
        return (
            <>
                <ModalConfirm
                    isOpen={this.state.modalOpen}
                    toggle={this.toggleModal}
                    confirm={this.handleConfirm}
                    message="¿Está seguro de que agregar la visita?"
                />
                
                <Container className="custom-form">
                    <Row>
                        <Col md={12}>
                            <h2 className="text-center mb-5 titulosForms">Registrar visita</h2>
                            <form onSubmit={this.storeVisita}>
                                <FormGroup className="mb-4">
                                    <Row>
                                        <Col md={6}>
                                            <Label
                                                className="label-custom"
                                            >
                                                Nombres
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                className="customInput"
                                                type="text"
                                                name="nombre_visita"
                                                placeholder="Ingrese nombres"
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.nombre_visita ? true : false}
                                            />
                                            <FormFeedback>{this.state.errors.nombre_visita}</FormFeedback>
                                        </Col>
                                        <Col md={6}>
                                            <Label
                                                className="label-custom"
                                            >
                                                Apellidos
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                className="customInput"
                                                type="text"
                                                name="apellidos_visita"
                                                placeholder="Ingrese apellidos"
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.apellidos_visita ? true : false}
                                            />
                                            <FormFeedback>{this.state.errors.apellidos_visita}</FormFeedback>
                                        </Col>
                                    </Row>
                                </FormGroup >

                                <FormGroup className="mb-4">
                                    <Row>
                                        <Col md={6}>
                                            <Label className="label-custom">
                                                Cédula de identidad
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                className="customInput"
                                                type="text"
                                                name="cedula_visita"
                                                placeholder="Ingrese su número de cédula"
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.cedula_visita ? true : false}
                                            />
                                            <FormFeedback>{this.state.errors.cedula_visita}</FormFeedback>
                                        </Col>
                                        <Col md={6}>
                                            <Label className="label-custom">
                                                Celular
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                className="customInput"
                                                type="text"
                                                name="telefono_visita"
                                                placeholder="Ingrese su número de celular"
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.telefono_visita ? true : false}
                                            />
                                            <FormFeedback>{this.state.errors.telefono_visita}</FormFeedback>
                                        </Col>
                                    </Row>
                                </FormGroup>

                                <FormGroup className="mb-4">
                                    <Row>
                                        <Col md={6}>
                                            <Label
                                                className="label-custom"
                                            >
                                                Bloque
                                            </Label>
                                            <Input
                                                type="select"
                                                className="customInput"
                                                name="bloque_id"
                                                id="bloque_id"
                                                onChange={this.handleBloqueSeleccionado}
                                                value={this.state.bloqueSeleccionado}
                                                invalid={this.state.errors.bloqueSeleccionado ? true : false}
                                            >
                                                <option disabled value="" >
                                                    {" "}Seleccionar bloque</option>
                                                {this.state.bloques.map(bloque => (
                                                    <option key={bloque.id} value={bloque.id}>{bloque.nombre_bloque}</option>
                                                ))}
                                            </Input>
                                            <FormFeedback>{this.state.errors.bloqueSeleccionado}</FormFeedback>
                                        </Col>
                                        <Col md={6}>
                                            <Label
                                                className="label-custom"
                                            >
                                                Edificio
                                            </Label>
                                            <Input
                                                type="select"
                                                className="customInput"
                                                name="edificio_id"
                                                id="edificio_id"
                                                onChange={this.handleEdificioSeleccionado}
                                                value={this.state.edificioSeleccionado}
                                                invalid={this.state.errors.edificioSeleccionado ? true : false}
                                            >
                                                <option disabled value="">
                                                    {" "}Seleccionar edificio</option>
                                                {this.state.edificios.map(edificio => (
                                                    <option key={edificio.id} value={edificio.id}>{edificio.nombre_edificio}</option>
                                                ))}
                                            </Input>
                                            <FormFeedback>{this.state.errors.edificioSeleccionado}</FormFeedback>
                                        </Col>      
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        
                                            <Col md={6}>
                                                <Label
                                                    className="label-custom"
                                                >
                                                    Departamento
                                                </Label>
                                                <Input
                                                    type="select"
                                                    className="customInput"
                                                    name="departamento_id"
                                                    id="departamento_id"
                                                    onChange={this.handleDepartamentoSeleccionado}
                                                    value = {this.state.departamentoSeleccionado}
                                                    invalid={this.state.errors.departamentoSeleccionado ? true : false}
                                                >
                                                    <option disabled value="" >Seleccionar departamento</option>
                                                    {this.state.departamentos.map(departamento => (
                                                        <option key={departamento.id} value={departamento.id}>{departamento.nombre_departamento}</option>
                                                    ))}
                                                </Input>
                                                <FormFeedback>{this.state.errors.departamentoSeleccionado}</FormFeedback>
                                            </Col>
                                    
                                    </Row>
                                </FormGroup>
                                <Button size="lg" type="button" className="mt-5 custom-button mx-auto d-block"
                                    style={{ fontWeight: 'bold' }}
                                    onClick={this.toggleModal}
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
export default RegistrarVisita;
