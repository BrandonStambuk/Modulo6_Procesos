import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
  Table,
  Container,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./customs.css";
import ModalCon from "./ModalConfirm";
import ModalPar from "./ModalParqueo";
//import { Form } from "react-router-dom";
import { ClipLoader } from 'react-spinners';

const endpoint = "http://localhost:8000/api";

class RegistrarParqueo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre_parqueo: "",
      direccion_parqueo: "",
      departamentos: [],
      departamentosAll: [],
      departamento_seleccionado: "",
      bloques: [],
      bloqueSeleccionado: "",
      edificioSeleccionado: "",
      edificios: [],
      modal_open: false,
      errors: {},
      validationErrors: {},
      parqueos: [],
      estadoModal: false,
      estadoModalPar: false,
      estadoModalUns: false,
      idParqueo: "",
      isloading: true,
    };
  }

  async componentDidMount() {
    try {
      const bloques = await axios.get(`${endpoint}/bloques`);
      this.setState({ bloques: bloques.data });
      const response = await axios.get(`${endpoint}/departamentos`);
      this.setState({ departamentosAll: response.data });
      const responseParqueos = await axios.get(`${endpoint}/parqueos`);
      let parqueos = responseParqueos.data;
      parqueos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      parqueos = parqueos.map((parqueo) => {
        const departamento = this.state.departamentosAll.find(
          (departamento) => departamento.id === parqueo.departamento_id
        );
        
        return {
          ...parqueo,
          nombreDepa: departamento ? departamento.nombre_departamento : "N/A",
        };
      });
      this.setState({ parqueos: parqueos });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isloading: false });
    }
  }
  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSelect = (event) => {
    this.setState({ departamento_seleccionado: event.target.value });
  };

  handleConfirm = (e) => {
    this.validacion();
    if (Object.keys(this.state.validationErrors).length === 0) {
      this.handleModal();
      this.storeParqueo(e);
    } else {
      console.log("Formulario invalido");
      this.handleModal();
    }
  };

  handleBloqueSeleccionado = (event) => {
    const idBloque = event.target.value;
    this.setState({ bloqueSeleccionado: idBloque });
    this.setState({ edificioSeleccionado: "" });
    this.setState({ departamento_seleccionado: "" });
    this.cargarOpcionesDependientes(idBloque);
  };

  handleEdificioSeleccionado = (e) => {
    const edificio = e.target.value;
    this.setState({ edificioSeleccionado: edificio });
    this.setState({ departamento_seleccionado: "" });
    this.cargarDepartamentos(edificio);
  };

  cargarOpcionesDependientes = async (idBloque) => {
    try {
      const response = await axios.get(
        `${endpoint}/edificios-by-bloques/${idBloque}`
      );

      this.setState({ edificios: response.data });
    } catch (error) {
      console.error("Error al obtener las opciones dependientes:", error);
    }
  };

  cargarDepartamentos = async (idEdificio) => {
    try {
      const response = await axios.get(
        `${endpoint}/departamentos-by-edificios/${idEdificio}`
      );
      this.setState({ departamentos: response.data });
    } catch (error) {
      console.error("Error al obtener los pisos:", error);
    }
  };

  validacion = () => {
    let nombre_parqueo = this.state.nombre_parqueo;
    let direccion_parqueo = this.state.direccion_parqueo;
    let departamento_seleccionado = this.state.departamento_seleccionado;
    let bloque_seleccionado = this.state.bloqueSeleccionado;
    let edificio_seleccionado = this.state.edificioSeleccionado;
    let validationErrors = {};

    if (!nombre_parqueo.trim()) {
      validationErrors.nombre_parqueo = "Este campo es obligatorio";
    } else if (
      !/^[a-zA-ZÑñáéíóú][a-zA-ZÑñáéíóú0-9\s-]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(
        nombre_parqueo
      )
    ) {
      validationErrors.nombre_parqueo =
        "El nombre del parqueo debe contener solo letras y numeros.";
    }
    if (!direccion_parqueo.trim()) {
      validationErrors.direccion_parqueo = "Este campo es obligatorio";
    } else if (
      !/^[a-zA-ZÑñáéíóú][a-zA-ZÑñáéíóú0-9\s-.,]{1,48}[A-Za-zÑñáéíóú0-9]$/.test(
        direccion_parqueo
      )
    ) {
      validationErrors.direccion_parqueo =
        "El nombre del parqueo debe contener solo letras y numeros.";
    }
    this.setState({ errors: validationErrors });
  };

  storeParqueo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${endpoint}/parqueo`, {
        nombre_parqueo: this.state.nombre_parqueo,
        direccion_parqueo: this.state.direccion_parqueo,
        departamento_id: this.state.departamento_seleccionado,
      });
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  handleModal = () => {
    this.setState({ estadoModal: !this.state.estadoModal });
  };
  handleModalPar = () => {
    this.setState({ modal_open: !this.state.modal_open });
  };
  deleteParqueo = async (id) => {
    await axios.delete(`${endpoint}/parqueo/${id}`);
    window.location.reload();
  };
  desasignarParqueo = async (id) => {
    await axios.put(`${endpoint}/parqueo-unassign/${id}`);
    window.location.reload();
  };
  confirmDelete = () => {
    this.deleteParqueo(this.state.idParqueo);
    this.handleModalConfPar();
  };
  confirmUnassign = () => {
    this.desasignarParqueo(this.state.idParqueo);
    this.handleModalConfUns();
  };
  handleModalConfPar = () => {
    this.setState({ estadoModalPar: !this.state.estadoModalPar });
  };
  handleModalConfUns = () => {
    this.setState({ estadoModalUns: !this.state.estadoModalUns });
  };
  setIdParqueo = (id) => {
    this.setState({ idParqueo: id });
  };
  updateParqueo = async (parqueo) => {
    try {
      await axios.put(`${endpoint}/parqueoupd/${parqueo.id}`, {
        nombre_parqueo: parqueo.nombre_parqueo,
        direccion_parqueo: parqueo.direccion_parqueo,
        departamento_id: parqueo.departamento_id,
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  manejoEnvio = (parqueo) => {
    this.updateParqueo(parqueo);
    this.handleModalPar();
  };

  render() {
    return (
      <>
        <ModalCon
          isOpen={this.state.estadoModal}
          toggle={this.handleModal}
          confirm={this.handleConfirm}
          message="¿Está seguro que desea crear un parqueo?"
        />
        <ModalCon
          isOpen={this.state.estadoModalPar}
          toggle={this.handleModalConfPar}
          confirm={this.confirmDelete}
          message="¿Está seguro que desea eliminar el parqueo?"
        />
        <ModalCon
          isOpen={this.state.estadoModalUns}
          toggle={this.handleModalConfUns}
          confirm={this.confirmUnassign}
          message="¿Está seguro que desea desasignar el parqueo?"
        />

        <ModalPar
          isOpen={this.state.modal_open}
          onSubmit={this.manejoEnvio}
          toggle={this.handleModalPar}
          idParqueo={this.state.idParqueo}
          parqueos={this.state.parqueos}
          departamentosA={this.state.departamentosAll}
        />
        <Row>
          <Label className="text-center mb-4 titulosForms">
            Registrar Parqueo
          </Label>
        </Row>
        <Container>
          <Row>
            <Col>
              <FormGroup>
                <Row>
                  <Col md={4}>
                    <Label className="label-custom" for="nombre_parqueo">
                      Nombre
                    </Label>
                    <Input
                      className="customInput"
                      type="text"
                      name="nombre_parqueo"
                      id="nombre_parqueo"
                      placeholder="Ingrese el nombre del parqueo"
                      onChange={this.handleInput}
                      invalid={this.state.errors.nombre_parqueo ? true : false}
                    />
                    <FormFeedback>
                      {this.state.errors.nombre_parqueo}
                    </FormFeedback>
                  </Col>
                  <Col md={8}>
                    <Label className="label-custom" for="nombre_parqueo">
                      Dirección
                    </Label>
                    <Input
                      className="customInput"
                      type="text"
                      name="direccion_parqueo"
                      id="direccion_parqueo"
                      placeholder="Ingrese la direccion del parqueo"
                      onChange={this.handleInput}
                      invalid={
                        this.state.errors.direccion_parqueo ? true : false
                      }
                    />
                    <FormFeedback>
                      {this.state.errors.direccion_parqueo}
                    </FormFeedback>
                  </Col>
                </Row>
              </FormGroup>

              <FormGroup>
                <Row>
                  <Col md={4}>
                    <Label className="label-custom">Bloque</Label>
                    <Input
                      type="select"
                      className="customInput"
                      name="bloque_id"
                      id="bloque_id"
                      onChange={this.handleBloqueSeleccionado}
                      value={this.state.bloqueSeleccionado}
                      invalid={
                        this.state.errors.bloque_seleccionado ? true : false
                      }
                    >
                      <option disabled value="">
                        {" "}
                        Seleccionar bloque
                      </option>
                      {this.state.bloques.map((bloque) => (
                        <option key={bloque.id} value={bloque.id}>
                          {bloque.nombre_bloque}
                        </option>
                      ))}
                    </Input>
                  </Col>
                  <Col md={4}>
                    <Label className="label-custom">Edificio</Label>
                    <Input
                      type="select"
                      className="customInput"
                      name="edificio_id"
                      id="edificio_id"
                      onChange={this.handleEdificioSeleccionado}
                      value={this.state.edificioSeleccionado}
                      invalid={
                        this.state.errors.edificio_seleccionado ? true : false
                      }
                    >
                      <option disabled value="">
                        {" "}
                        Seleccionar edificio
                      </option>
                      {this.state.edificios.map((edificio) => (
                        <option key={edificio.id} value={edificio.id}>
                          {edificio.nombre_edificio}
                        </option>
                      ))}
                    </Input>
                  </Col>
                  <Col md={4}>
                    <Label
                      className="label-custom"
                      for="departamento_seleccionado"
                    >
                      Departamento
                    </Label>
                    <Input
                      className="customInput"
                      type="select"
                      name="departamento_seleccionado"
                      id="departamento_seleccionado"
                      onChange={this.handleSelect}
                      value={this.state.departamento_seleccionado}
                      invalid={
                        this.state.errors.departamento_seleccionado
                          ? true
                          : false
                      }
                    >
                      <option disabled value="">
                        Seleccione un departamento
                      </option>
                      {this.state.departamentos.map((departamento) => (
                        <option key={departamento.id} value={departamento.id}>
                          {departamento.nombre_departamento}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <Row style={{ marginTop: "22px" }}>
                <Col className="d-flex justify-content-end">
                  <Button
                    size="md"
                    type="button"
                    className="custom-button "
                    style={{ fontWeight: "bold" }}
                    onClick={this.handleModal}
                  >
                    Registrar Parqueo
                  </Button>
                </Col>
              </Row>
              {this.state.isloading ? (
                <div className="d-flex justify-content-center ">
                  <ClipLoader color={"#5B9223"} loading={this.state.isloading} size={50} />
                </div>
              ) : (
                <Table striped bordered responsive className="mt-4">
                  <thead className="text-center">
                    <tr>
                      <th>Nombre</th>
                      <th>Departamento</th>
                      <th>Dirección</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody className="visitasTabla">
                    {this.state.parqueos.map((parqueo) => (
                      <tr key={parqueo.id}>
                        <td className="celdaVisita">{parqueo.nombre_parqueo}</td>
                        <td className="celdaVisita">{parqueo.nombreDepa}</td>
                        <td className="celdaVisita">
                          {parqueo.direccion_parqueo}
                        </td>
                        <td>
                          <Row className="w-100">
                            <Col className="d-flex justify-content-end">
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  this.setIdParqueo(parqueo.id);
                                  this.handleModalPar();
                                }}
                              >
                                {" "}
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="iconVisita"
                                />{" "}
                              </div>
                            </Col>
                            <Col>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  this.setIdParqueo(parqueo.id);
                                  this.handleModalConfPar();
                                }}
                              >
                                {" "}
                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className="iconVisita"
                                />{" "}
                              </div>
                            </Col>
                            <Col>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  this.setIdParqueo(parqueo.id);
                                  this.handleModalConfUns();
                                }}
                              >
                                {" "}
                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className="iconVisita"
                                />{" "}
                              </div>
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default RegistrarParqueo;
