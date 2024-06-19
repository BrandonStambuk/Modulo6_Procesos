import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Input, FormGroup, Label, Col, Row, Button, Container, FormFeedback, CardImg
} from "reactstrap";
import "../customs.css";
import ModalConfirm from "../modal/ModalConfirm";


const endpoint = "http://localhost:8000/api";
class CrearResidente extends Component {
    departamentos = [];
    pisosAr = [];

    async componentDidMount() {

    }

    constructor(props) {
        super(props);
        this.state = {
            nombre_residente: "",
            apellidos_residente: "",
            cedula_residente: "",
            telefono_residente: 0,
            fecha_nacimiento_residente: "",
            tipo_residente: "ninguno",
            nacionalidad_residente: "",
            email_residente: "",
            genero_residente: "",
            estado_residente: false,
            imagen_residente: "",
            contrato_id: "",
            errors: [],
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
        this.storeResident(e);
        this.toggleModal();
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleChange = (e) => {
        this.setState({
            imagen_residente: e.target.files[0],
        });
        console.log('imagen:', this.state.imagen_residente.name);
    };


    storeResident = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!this.state.nombre_residente.trim()) {
            validationErrors.nombre_residente = "Este campo es obligatorio";
        } else if (
            !/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{0,59}[A-Za-zÑñáéíóú]$/.test(
                this.state.nombre_residente
            )
        ) {
            validationErrors.nombre_residente = "Ingrese un nombre válido";
        }

        if (!this.state.apellidos_residente.trim()) {
            validationErrors.apellidos_residente = "Este campo es obligatorio";
        } else if (
            !/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{0,59}[A-Za-zÑñáéíóú]$/.test(
                this.state.apellidos_residente
            )
        ) {
            validationErrors.apellidos_residente = "Ingrese un apellido válido";
        }

        if (!this.state.cedula_residente.trim()) {
            validationErrors.cedula_residente = "Este campo es obligatorio";
        } else if (
            !/^[1-9][A-Za-z0-9.-]{4,14}$/.test(
                this.state.cedula_residente
            )
        ) {
            validationErrors.cedula_residente = "Ingrese una identificacion válida";
        }

        if (!this.state.telefono_residente) {
            validationErrors.telefono_residente = "Este campo es obligatorio";
        } else {
            if (!/^\+?[1-9][0-9]{7,11}$/.test(this.state.telefono_residente)) {
                validationErrors.telefono_residente =
                    "Ingrese un número de teléfono válido";
            }
        }

        if (!this.state.fecha_nacimiento_residente) {
            validationErrors.fecha_nacimiento_residente = "Este campo es obligatorio";
        } else {
            let d2 = new Date(this.state.fecha_nacimiento_residente);
            d2.setDate(d2.getDate() + 1);
            d2.setUTCHours(0, 0, 0, 0);

            let date_Actual1 = new Date();
            date_Actual1.setDate(date_Actual1.getDate() + 1);
            date_Actual1.setUTCHours(0, 0, 0, 0);

            let fecha1 = d2.getTime();
            let fecha2 = date_Actual1.getTime();
            if (fecha1 > fecha2) {
                validationErrors.fecha_nacimiento_residente = "Esta fecha no es válida";
            }
        }

        if (!this.state.email_residente.trim()) {
            validationErrors.email_residente = "Este campo es obligatorio"

        } else if (!/^[A-Za-z0-9-._]+@[A-Za-z0-9]+\.[A-Za-z]{2,5}(\.[A-Za-z]{2,5})?(\.[A-Za-z]{2,5})?$/.test(this.state.email_residente)) {
            validationErrors.email_residente = "Ingrese un email válido";
        }

        if (!this.state.nacionalidad_residente) {
            validationErrors.nacionalidad_residente = "Debe seleccionar un bloque";
        }

        if (!this.state.genero_residente) {
            validationErrors.genero_residente = "Debe seleccionar un género";
        }

        if (this.state.imagen_residente.name) {
            const extensiones = ["png", "PNG", "jpg", "jpeg"];

            var nombreArchivo = this.state.imagen_residente.name;
            const extension = nombreArchivo.substring(
                nombreArchivo.lastIndexOf(".") + 1,
                nombreArchivo.length
            );
            if (!extensiones.includes(extension)) {
                document.getElementsByClassName("imagen_input").value = "";

                this.setState({ imagen_residente: "" });
                validationErrors.imagen_residente =
                    "La imagen debe tener formato JPG, JPEG o PNG";
            }
        }

        this.setState({ errors: validationErrors });

        if (Object.keys(validationErrors).length === 0) {

            const url = `${endpoint}/residente`;
            const data = new FormData();

            data.append("nombre_residente", this.state.nombre_residente);
            data.append("apellidos_residente", this.state.apellidos_residente);
            data.append("cedula_residente", this.state.cedula_residente);
            data.append("telefono_residente", this.state.telefono_residente);
            data.append("fecha_nacimiento_residente", this.state.fecha_nacimiento_residente);
            data.append("tipo_residente", this.state.tipo_residente);
            data.append("nacionalidad_residente", this.state.nacionalidad_residente);
            data.append("email_residente", this.state.email_residente);
            data.append("genero_residente", this.state.genero_residente);
            data.append("estado_residente", this.state.estado_residente ? '1' : '0');
            if (this.state.imagen_residente) {
                data.append("imagen_residente", this.state.imagen_residente);
            }
            data.append("contrato_id", this.state.contrato_id)
            console.log(this.state.nombre_residente);
            console.log(this.state.apellidos_residente);
            console.log(this.state.cedula_residente);
            console.log(this.state.telefono_residente);
            console.log(this.state.fecha_nacimiento_residente);
            console.log(this.state.tipo_residente);
            console.log(this.state.nacionalidad_residente);
            console.log(this.state.email_residente);
            console.log(this.state.genero_residente);
            console.log(this.state.estado_residente);
            console.log(this.state.imagen_residente);

            axios.post(url, data).then((res) => {
                console.log(res);
                window.location.href = "./edificios";
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
                    message="¿Está seguro de que desea registrar al residente?"
                />
                <Container className="custom-form">
                    <Row>
                        <Col md={12}>
                            <h2 className="text-center mb-5 titulosForms">Registrar residente</h2>
                            <form onSubmit={this.storeResident}>
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
                                                name="nombre_residente"
                                                placeholder="Ingrese nombre"
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.nombre_residente ? true : false}
                                            />
                                            <FormFeedback>{this.state.errors.nombre_residente}</FormFeedback>
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
                                                name="apellidos_residente"
                                                placeholder="Ingrese apellidos"
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.apellidos_residente ? true : false}
                                            />
                                            <FormFeedback>{this.state.errors.apellidos_residente}</FormFeedback>
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
                                                name="cedula_residente"
                                                placeholder="Ingrese su número de cédula"
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.cedula_residente ? true : false}
                                            />
                                            <FormFeedback>{this.state.errors.cedula_residente}</FormFeedback>
                                        </Col>
                                        <Col md={6}>
                                            <Label className="label-custom">
                                                Celular
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                className="customInput"
                                                type="text"
                                                name="telefono_residente"
                                                placeholder="Ingrese su número de celular"
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.telefono_residente ? true : false}
                                            />
                                            <FormFeedback>{this.state.errors.telefono_residente}</FormFeedback>
                                        </Col>
                                    </Row>
                                </FormGroup>

                                <FormGroup className="mb-4">
                                    <Row>
                                        <Col md={6}>
                                            <Label className="label-custom">
                                                Fecha de nacimiento
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                className="customInput"
                                                type="date"
                                                name="fecha_nacimiento_residente"
                                                placeholder=""
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.fecha_nacimiento_residente ? true : false}
                                            />
                                            <FormFeedback>{this.state.errors.fecha_nacimiento_residente}</FormFeedback>
                                        </Col>
                                        <Col md={6}>
                                            <Label className="label-custom">
                                                Nacionalidad
                                            </Label>
                                            <Input
                                                type="select"
                                                name="nacionalidad_residente"
                                                className="customInput"
                                                id="nacionalidad_residente"
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.nacionalidad_residente ? true : false}
                                            >
                                                <option disabled selected>
                                                    {" "}
                                                    Seleccione un pais
                                                </option>
                                                <option value="Afganistán">Afganistán</option>
                                                <option value="Albania">Albania</option>
                                                <option value="Alemania">Alemania</option>
                                                <option value="Andorra">Andorra</option>
                                                <option value="Angola">Angola</option>
                                                <option value="Antigua y Barbuda">
                                                    Antigua y Barbuda
                                                </option>
                                                <option value="Arabia Saudita">Arabia Saudita</option>
                                                <option value="Argelia">Argelia</option>
                                                <option value="Argentina">Argentina</option>
                                                <option value="Armenia">Armenia</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Austria">Austria</option>
                                                <option value="Azerbaiyán">Azerbaiyán</option>
                                                <option value="Bahamas">Bahamas</option>
                                                <option value="Bangladés">Bangladés</option>
                                                <option value="Barbados">Barbados</option>
                                                <option value="Baréin">Baréin</option>
                                                <option value="Bélgica">Bélgica</option>
                                                <option value="Belice">Belice</option>
                                                <option value="Benín">Benín</option>
                                                <option value="Bielorrusia">Bielorrusia</option>
                                                <option value="Birmania/Myanmar">
                                                    Birmania/Myanmar
                                                </option>
                                                <option value="Bolivia">Bolivia</option>
                                                <option value="Bosnia y Herzegovina">
                                                    Bosnia y Herzegovina
                                                </option>
                                                <option value="Botsuana">Botsuana</option>
                                                <option value="Brasil">Brasil</option>
                                                <option value="Brunéi">Brunéi</option>
                                                <option value="Bulgaria">Bulgaria</option>
                                                <option value="Burkina Faso">Burkina Faso</option>
                                                <option value="Burundi">Burundi</option>
                                                <option value="Bután">Bután</option>
                                                <option value="Cabo Verde">Cabo Verde</option>
                                                <option value="Camboya">Camboya</option>
                                                <option value="Camerún">Camerún</option>
                                                <option value="Canadá">Canadá</option>
                                                <option value="Catar">Catar</option>
                                                <option value="Chad">Chad</option>
                                                <option value="Chile">Chile</option>
                                                <option value="China">China</option>
                                                <option value="Chipre">Chipre</option>
                                                <option value="Ciudad del Vaticano">
                                                    Ciudad del Vaticano
                                                </option>
                                                <option value="Colombia">Colombia</option>
                                                <option value="Comoras">Comoras</option>
                                                <option value="Corea del Norte">Corea del Norte</option>
                                                <option value="Corea del Sur">Corea del Sur</option>
                                                <option value="Costa de Marfil">Costa de Marfil</option>
                                                <option value="Costa Rica">Costa Rica</option>
                                                <option value="Croacia">Croacia</option>
                                                <option value="Cuba">Cuba</option>
                                                <option value="Dinamarca">Dinamarca</option>
                                                <option value="Dominica">Dominica</option>
                                                <option value="Ecuador">Ecuador</option>
                                                <option value="Egipto">Egipto</option>
                                                <option value="El Salvador">El Salvador</option>
                                                <option value="Emiratos Árabes Unidos">
                                                    Emiratos Árabes Unidos
                                                </option>
                                                <option value="Eritrea">Eritrea</option>
                                                <option value="Eslovaquia">Eslovaquia</option>
                                                <option value="Eslovenia">Eslovenia</option>
                                                <option value="España">España</option>
                                                <option value="Estados Unidos">Estados Unidos</option>
                                                <option value="Estonia">Estonia</option>
                                                <option value="Etiopía">Etiopía</option>
                                                <option value="Filipinas">Filipinas</option>
                                                <option value="Finlandia">Finlandia</option>
                                                <option value="Fiyi">Fiyi</option>
                                                <option value="Francia">Francia</option>
                                                <option value="Gabón">Gabón</option>
                                                <option value="Gambia">Gambia</option>
                                                <option value="Georgia">Georgia</option>
                                                <option value="Ghana">Ghana</option>
                                                <option value="Granada">Granada</option>
                                                <option value="Grecia">Grecia</option>
                                                <option value="Guatemala">Guatemala</option>
                                                <option value="Guyana">Guyana</option>
                                                <option value="Guinea">Guinea</option>
                                                <option value="Guinea ecuatorial">
                                                    Guinea ecuatorial
                                                </option>
                                                <option value="Guinea-Bisáu">Guinea-Bisáu</option>
                                                <option value="Haití">Haití</option>
                                                <option value="Honduras">Honduras</option>
                                                <option value="Hungría">Hungría</option>
                                                <option value="India">India</option>
                                                <option value="Indonesia">Indonesia</option>
                                                <option value="Irak">Irak</option>
                                                <option value="Irán">Irán</option>
                                                <option value="Irlanda">Irlanda</option>
                                                <option value="Islandia">Islandia</option>
                                                <option value="Islas Marshall">Islas Marshall</option>
                                                <option value="Islas Salomón">Islas Salomón</option>
                                                <option value="Israel">Israel</option>
                                                <option value="Italia">Italia</option>
                                                <option value="Jamaica">Jamaica</option>
                                                <option value="Japón">Japón</option>
                                                <option value="Jordania">Jordania</option>
                                                <option value="Kazajistán">Kazajistán</option>
                                                <option value="Kenia">Kenia</option>
                                                <option value="Kirguistán">Kirguistán</option>
                                                <option value="Kiribati">Kiribati</option>
                                                <option value="Kuwait">Kuwait</option>
                                                <option value="Laos">Laos</option>
                                                <option value="Lesoto">Lesoto</option>
                                                <option value="Letonia">Letonia</option>
                                                <option value="Líbano">Líbano</option>
                                                <option value="Liberia">Liberia</option>
                                                <option value="Libia">Libia</option>
                                                <option value="Liechtenstein">Liechtenstein</option>
                                                <option value="Lituania">Lituania</option>
                                                <option value="Luxemburgo">Luxemburgo</option>
                                                <option value="Macedonia del Norte">
                                                    Macedonia del Norte
                                                </option>
                                                <option value="Madagascar">Madagascar</option>
                                                <option value="Malasia">Malasia</option>
                                                <option value="Malaui">Malaui</option>
                                                <option value="Maldivas">Maldivas</option>
                                                <option value="Malí">Malí</option>
                                                <option value="Malta">Malta</option>
                                                <option value="Marruecos">Marruecos</option>
                                                <option value="Mauricio">Mauricio</option>
                                                <option value="Mauritania">Mauritania</option>
                                                <option value="México">México</option>
                                                <option value="Micronesia">Micronesia</option>
                                                <option value="Moldavia">Moldavia</option>
                                                <option value="Mónaco">Mónaco</option>
                                                <option value="Mongolia">Mongolia</option>
                                                <option value="Montenegro">Montenegro</option>
                                                <option value="Mozambique">Mozambique</option>
                                                <option value="Namibia">Namibia</option>
                                                <option value="Nauru">Nauru</option>
                                                <option value="Nepal">Nepal</option>
                                                <option value="Nicaragua">Nicaragua</option>
                                                <option value="Níger">Níger</option>
                                                <option value="Nigeria">Nigeria</option>
                                                <option value="Noruega">Noruega</option>
                                                <option value="Nueva Zelanda">Nueva Zelanda</option>
                                                <option value="Omán">Omán</option>
                                                <option value="Países Bajos">Países Bajos</option>
                                                <option value="Pakistán">Pakistán</option>
                                                <option value="Palaos">Palaos</option>
                                                <option value="Panamá">Panamá</option>
                                                <option value="Papúa Nueva Guinea">
                                                    Papúa Nueva Guinea
                                                </option>
                                                <option value="Paraguay">Paraguay</option>
                                                <option value="Perú">Perú</option>
                                                <option value="Polonia">Polonia</option>
                                                <option value="Portugal">Portugal</option>
                                                <option value="Reino Unido">Reino Unido</option>
                                                <option value="República Centroafricana">
                                                    República Centroafricana
                                                </option>
                                                <option value="República Checa">República Checa</option>
                                                <option value="República del Congo">
                                                    República del Congo
                                                </option>
                                                <option value="República Democrática del Congo">
                                                    República Democrática del Congo
                                                </option>
                                                <option value="República Dominicana">
                                                    República Dominicana
                                                </option>
                                                <option value="República Sudafricana">
                                                    República Sudafricana
                                                </option>
                                                <option value="Ruanda">Ruanda</option>
                                                <option value="Rumanía">Rumanía</option>
                                                <option value="Rusia">Rusia</option>
                                                <option value="Samoa">Samoa</option>
                                                <option value="San Cristóbal y Nieves">
                                                    San Cristóbal y Nieves
                                                </option>
                                                <option value="San Marino">San Marino</option>
                                                <option value="San Vicente y las Granadinas">
                                                    San Vicente y las Granadinas
                                                </option>
                                                <option value="Santa Lucía">Santa Lucía</option>
                                                <option value="Santo Tomé y Príncipe">
                                                    Santo Tomé y Príncipe
                                                </option>
                                                <option value="Senegal">Senegal</option>
                                                <option value="Serbia">Serbia</option>
                                                <option value="Seychelles">Seychelles</option>
                                                <option value="Sierra Leona">Sierra Leona</option>
                                                <option value="Singapur">Singapur</option>
                                                <option value="Siria">Siria</option>
                                                <option value="Somalia">Somalia</option>
                                                <option value="Sri Lanka">Sri Lanka</option>
                                                <option value="Suazilandia">Suazilandia</option>
                                                <option value="Sudán">Sudán</option>
                                                <option value="Sudán del Sur">Sudán del Sur</option>
                                                <option value="Suecia">Suecia</option>
                                                <option value="Suiza">Suiza</option>
                                                <option value="Surinam">Surinam</option>
                                                <option value="Tailandia">Tailandia</option>
                                                <option value="Tanzania">Tanzania</option>
                                                <option value="Tayikistán">Tayikistán</option>
                                                <option value="Timor Oriental">Timor Oriental</option>
                                                <option value="Togo">Togo</option>
                                                <option value="Tonga">Tonga</option>
                                                <option value="Trinidad y Tobago">
                                                    Trinidad y Tobago
                                                </option>
                                                <option value="Túnez">Túnez</option>
                                                <option value="Turkmenistán">Turkmenistán</option>
                                                <option value="Turquía">Turquía</option>
                                                <option value="Tuvalu">Tuvalu</option>
                                                <option value="Ucrania">Ucrania</option>
                                                <option value="Uganda">Uganda</option>
                                                <option value="Uruguay">Uruguay</option>
                                                <option value="Uzbekistán">Uzbekistán</option>
                                                <option value="Vanuatu">Vanuatu</option>
                                                <option value="Venezuela">Venezuela</option>
                                                <option value="Vietnam">Vietnam</option>
                                                <option value="Yemen">Yemen</option>
                                                <option value="Yibuti">Yibuti</option>
                                                <option value="Zambia">Zambia</option>
                                                <option value="Zimbabue">Zimbabue</option>

                                            </Input>
                                            <FormFeedback>{this.state.errors.nacionalidad_residente}</FormFeedback>
                                        </Col>
                                    </Row>
                                </FormGroup>

                                <FormGroup className="mb-4">
                                    <Row>
                                        <Col md={6}>
                                            <Label
                                                className="label-custom"
                                            >
                                                Email
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                className="customInput"
                                                type="text"
                                                name="email_residente"
                                                placeholder="Ingrese su email"
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.email_residente ? true : false}
                                            />
                                            <FormFeedback>{this.state.errors.email_residente}</FormFeedback>
                                        </Col>
                                        <Col md={6}>
                                            <Label
                                                className="label-custom"
                                            >
                                                Género
                                            </Label>
                                            <Input
                                                type="select"
                                                className="customInput"
                                                name="genero_residente"
                                                id="genero_residente"
                                                onChange={this.handleInput}
                                                invalid={this.state.errors.genero_residente ? true : false}
                                            >
                                                <option disabled selected>{" "} Seleccione un género</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                                <option value="Ninguno">Ninguno</option>

                                            </Input>
                                            <FormFeedback>{this.state.errors.genero_residente}</FormFeedback>
                                        </Col>
                                    </Row>
                                </FormGroup>

                                <FormGroup className="mb-4">
                                    <Label className="label-custom">
                                        Subir una imagen
                                    </Label>
                                    <Input
                                        type="file"
                                        className="customImage"
                                        name="imagen_residente"
                                        id="imagen_residente"
                                        onChange={this.handleChange}
                                        style={this.state.errors.imagen_residente ? { borderColor: 'red' } : {}}
                                    />
                                    {this.state.imagen_residente && (
                                        <Container className="d-flex justify-content-center">
                                            <CardImg
                                                width="100%"
                                                src={URL.createObjectURL(this.state.imagen_residente)}
                                                alt="Vista previa"
                                                style={{ width: '200px', height: '200px', marginTop: '25px', borderRadius: '10px' }}
                                            />
                                        </Container>
                                    )}
                                    {this.state.errors.imagen_residente && (
                                        <div style={{ color: 'red', fontSize: '0.875rem' }}>{this.state.errors.imagen_residente}</div>
                                    )}
                                </FormGroup>

                                <Button size="lg" type="button" className="custom-button mx-auto d-block"
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
export default CrearResidente;
