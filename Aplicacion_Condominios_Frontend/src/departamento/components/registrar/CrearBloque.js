import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, CardImg, Container, Row, Col, FormFeedback } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalConfirm from "../modal/ModalConfirm";
import "../customs.css";

const endpoint = "http://localhost:8000/api";
class CrearBloque extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre_bloque: "",
            direccion_bloque: "",
            descripcion_bloque: "",
            imagen_block: null,
            imagen_bloque: null,
            modal_open: false,
            errors: {},
        }
    }
    async componentDidMount() {
    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    toggleModal = () => {
        this.setState(prevState => ({
            modal_open: !prevState.modal_open
        }));
    }
    handleChange = (event) => {
        this.setState({ imagen_block: event.target.files[0] });
        if (event.target.name === "imagen_bloque") {
            this.setState({ imagen_bloque: URL.createObjectURL(event.target.files[0]) });
        }
    }
    handleConfirm = (e) => {
        e.preventDefault();
        if (this.validacion()) {
            this.storeEdificio(e);
            this.toggleModal();
        } else {
            console.log("Formulario invalido");
            this.toggleModal();
        }
    }
    validacion = () => {
        let nombre_bloque = this.state.nombre_bloque;
        let direccion_bloque = this.state.direccion_bloque;
        let descripcion_bloque = this.state.descripcion_bloque;
        let imagen_block = this.state.imagen_block;
        let validationErrors = {};
        let isValid = true;
        
        if (!nombre_bloque.trim()) {
            isValid = false;
            validationErrors.nombre_bloque = "Campo obligatorio.";
        } else if (!/^[a-zA-ZÑñáéíóú][a-zA-ZÑñáéíóú-\s0-9]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(nombre_bloque)) {
            isValid = false;
            validationErrors.nombre_bloque = "El nombre debe contener solo letras y números.";
        }
        if (!direccion_bloque.trim()) {
            isValid = false;
            validationErrors.direccion_bloque = "Campo obligatorio.";
        } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú0-9,"":;.() ]{1,120}$/.test(direccion_bloque)) {
            isValid = false;
            validationErrors.direccion_bloque = "La descripcion debe contener solo letras y numeros.";
        }
        if (!descripcion_bloque.trim()) {
            isValid = false;
            validationErrors.descripcion_bloque = "Campo obligatorio.";
        } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú0-9,"":;.() ]{1,120}$/.test(descripcion_bloque)) {
            isValid = false;
            validationErrors.descripcion_bloque = "La descripcion debe contener solo letras y numeros.";
        }

        if (imagen_block) {
            const extensiones = ["png", "PNG", "jpg", "jpeg"];
            let nombre_imagen = imagen_block.name;
            const extension = nombre_imagen.substring(
                nombre_imagen.lastIndexOf(".") + 1,
                nombre_imagen.length
            );
            if (!extensiones.includes(extension)) {
                //document.getElementsByClassName("imagen_input").value = "";
                isValid = false;
                //this.setState({ imagen_block: null, imagen_bloque: null });
                validationErrors.imagen_block = "La imagen debe tener formato PNG, JPG o JPEG";
            }
        }
        
        this.setState({ errors: validationErrors });
        return isValid;
    }

    storeEdificio = async (event) => {
        event.preventDefault();
        const data = new FormData();

        data.append("nombre_bloque", this.state.nombre_bloque);
        data.append("direccion_bloque", this.state.direccion_bloque);
        data.append("descripcion_bloque", this.state.descripcion_bloque);
        if (this.state.imagen_block) {
            data.append("imagen_bloque", this.state.imagen_block);
        }
        try {
            const response = await axios.post(`${endpoint}/bloque`, data).then((response) => {
                window.location.href = "./visualizarBloques";
            });
            console.log(response);
            this.props.history.push("/visualizarBloques");
        } catch (error) {
            console.error(error);
        }

    }

    render() {
        return (
            <>
                <ModalConfirm
                    isOpen={this.state.modal_open}
                    toggle={this.toggleModal}
                    confirm={this.handleConfirm}
                    message="¿Está seguro de que desea crear el bloque?"
                />
                <Container className="custom-form">
                    <h2 className="text-center mb-5 titulosForms">Crear Bloque</h2>
                    <Form>
                        <FormGroup>
                            <Label className="label-custom" for="nombre_bloque">Nombre del Bloque</Label>
                            <Input
                                className="customInput"
                                type="text"
                                name="nombre_bloque"
                                placeholder="Ingrese el nombre del bloque"
                                id="nombre_bloque"
                                invalid={this.state.errors.nombre_bloque}
                                onChange={this.handleInput}
                            />
                            <FormFeedback>{this.state.errors.nombre_bloque}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label className="label-custom" for="direccion_bloque">Direccion del Bloque</Label>
                            <Input
                                className="autoExpand customInput"
                                type="textarea"
                                name="direccion_bloque"
                                placeholder="Ingrese una direccion del bloque"
                                id="direccion_bloque"
                                invalid={this.state.errors.direccion_bloque}
                                onChange={this.handleInput}
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = (e.target.scrollHeight) + 'px';
                                }}
                            />
                            <FormFeedback>{this.state.errors.descripcion_bloque}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label className="label-custom" for="descripcion_bloque">Descripcion del Bloque</Label>
                            <Input
                                className="autoExpand customInput"
                                type="textarea"
                                name="descripcion_bloque"
                                placeholder="Ingrese una descripción del bloque"
                                id="descripcion_bloque"
                                invalid={this.state.errors.descripcion_bloque}
                                onChange={this.handleInput}
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = (e.target.scrollHeight) + 'px';
                                }}
                            />
                            <FormFeedback>{this.state.errors.descripcion_bloque}</FormFeedback>
                        </FormGroup>
                        
                        <FormGroup className="mb-5">
                            <Label className="label-custom" for="imagen_bloque">Imagen del Bloque</Label>
                            <Input
                                type="file"
                                name="imagen_bloque"
                                placeholder="Ingrese una imagen"
                                id="imagen_bloque"
                                className="customImage"
                                onChange={this.handleChange}
                                invalid={!!this.state.errors.imagen_block}
                            />
                            {this.state.imagen_bloque && (
                                <div className="d-flex justify-content-center">
                                    <CardImg
                                        width="100%"
                                        src={this.state.imagen_bloque}
                                        alt="Vista previa"
                                        style={{ width: '200px', height: '200px', marginTop: '25px', borderRadius: '10px' }}
                                    />
                                </div>
                            )}
                            {this.state.errors.imagen_block && (
                                <div style={{ color: 'red', fontSize: '0.875rem' }}>{this.state.errors.imagen_block}</div>
                            )}
                        </FormGroup>
                        <Button className="custom-button mx-auto d-block" onClick={this.toggleModal}>Crear Bloque</Button>
                    </Form>
                </Container>
            </>
        );
    }

}
export default CrearBloque;