import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const endpoint = "http://localhost:8000/api";

class AgregarEquipo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre_equipo: "",
      descripcion_equipo: "",
      costo_equipo: "",
      area_comun_nombre: "",
      tipo_equipo_danado: "",
      //residente_culpable: "",
      culpable: "No",
      areasComunes: [],
      residentes: [],
      bloques: [],
      edificios: [],
      categoriasServicios: [],
      errors: {},
      mostrarResidentes: false,
      mostrarBloques: false,
      mostrarEdificios: false,
      mostrarCategoriasServicios: false,
    };
  }

  componentDidMount() {
    this.obtenerAreasComunes();
  }

  obtenerAreasComunes = async () => {
    try {
      const response = await axios.get(`${endpoint}/obtenerAreasComunes`);
      this.setState({ areasComunes: response.data[0] || [] });
    } catch (error) {
      console.error("Error al obtener las áreas comunes:", error);
    }
  };

  obtenerBloques = async () => {
    try {
      const response = await axios.get(`${endpoint}/bloques`);
      this.setState({ bloques: response.data });
    } catch (error) {
      console.error("Error al obtener los bloques:", error);
    }
  };

  obtenerCategoriasServicios = async () => {
    try {
      const response = await axios.get(`${endpoint}/CategoriaServicio`);
      this.setState({ categoriasServicios: response.data });
    } catch (error) {
      console.error("Error al obtener las categorías de servicios:", error);
    }
  };

  obtenerEdificios = async (idBloque) => {
    try {
      const response = await axios.get(`${endpoint}/edificios-by-bloques/${idBloque}`);
      this.setState({ edificios: response.data, mostrarEdificios: true });
    } catch (error) {
      console.error("Error al obtener los edificios:", error);
    }
  };

  /*obtenerResidentes = async (idResidente) => {
    try {
      const response = await axios.get(`${endpoint}/redidentesDepartamentoPerteneceEdifico/${idResidente}`);
      const residentes = response.data; // Obtener los residentes asociados con el id del edificio
      this.setState({ residentes, mostrarResidentes: true }); // Mostrar los residentes y actualizar el estado
    } catch (error) {
      console.error("Error al obtener los residentes:", error);
    }
  };*/

  /*obtenerResidentes = async (idResidente) => {
    try {
      const response = await axios.get(`${endpoint}/redidentesDepartamentoPerteneceEdifico/${idResidente}`);
      const residentes = response.data; // Obtener los residentes asociados con el id del edificio
      this.setState({ residentes, mostrarResidentes: true, residente_culpable: idResidente }); // Mostrar los residentes y actualizar el estado
    } catch (error) {
      console.error("Error al obtener los residentes:", error);
    }
  };*/

  obtenerResidentes = async (idResidente) => {
    try {
      const response = await axios.get(`${endpoint}/redidentesDepartamentoPerteneceEdifico/${idResidente}`);
      const residentes = response.data; // Obtener los residentes asociados con el id del edificio
      if (residentes && residentes.length > 0) { // Verificar si hay residentes antes de actualizar el estado
        this.setState({ residentes, mostrarResidentes: true, residente_culpable: idResidente });
      }
    } catch (error) {
      console.error("Error al obtener los residentes:", error);
    }
  };

  handleInput = async (e) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target.checked ? value : '') : value.trim();
  
    if (name === 'tipo_equipo_danado') {
      if (val === "Mantenimiento") {
        this.obtenerCategoriasServicios();
        this.setState({ mostrarCategoriasServicios: true });
      } else {
        this.setState({ mostrarCategoriasServicios: false });
      }
    }
  
    if (name === 'edificio' || name === 'residente_culpable') {
      this.obtenerResidentes(val);
      // No actualizar mostrarResidentes aquí
    } else if (name === 'bloque') {
      this.obtenerEdificios(val);
    } else if (name === 'culpable') {
      if (val === 'Sí') {
        this.obtenerBloques();
        this.setState({ mostrarBloques: true });
      } else {
        this.setState({ mostrarBloques: false, mostrarResidentes: false });
      }
    }
  
    this.setState({ [name]: val });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!this.state.nombre_equipo.trim()) validationErrors.nombre_equipo = "Este campo es obligatorio";
    if (!this.state.descripcion_equipo.trim()) validationErrors.descripcion_equipo = "Este campo es obligatorio";
    if (!this.state.costo_equipo.trim()) validationErrors.costo_equipo = "Este campo es obligatorio";
    if (!this.state.area_comun_nombre.trim()) validationErrors.area_comun_nombre = "Por favor seleccione un área común";

    this.setState({ errors: validationErrors });

    if (Object.keys(validationErrors).length === 0) {
      const data = {
        nombre: this.state.nombre_equipo,
        descripcion: this.state.descripcion_equipo,
        costo: this.state.costo_equipo,
        area_comun_nombre: this.state.area_comun_nombre,
        tipo_equipo_danado: this.state.tipo_equipo_danado,
        culpable: this.state.culpable,
        residente_culpable: this.state.residente_culpable,
        edificio: this.state.edificio,
        bloque: this.state.bloque,
      };

      const url = `${endpoint}/agregarEquipo`;
      try {
        const response = await axios.post(url, data);
        console.log("Equipo guardado exitosamente:", response.data);
        window.location.href = "./gestion-equipo";
      } catch (error) {
        console.error("Error al guardar el equipo:", error);
      }
    }
  };

  render() {
    return (
      <Container className="custom-form">
        <Row>
          <Col sm={12}>
            <h2 className="text-center mb-5">Agregar equipo dañado</h2>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup className="mb-4">
                <Label className="label-custom">Nombre del equipo dañado</Label>
                <Input
                  type="text"
                  name="nombre_equipo"
                  placeholder="Ingrese nombre del equipo"
                  onChange={this.handleInput}
                />
                {this.state.errors.nombre_equipo && <span>{this.state.errors.nombre_equipo}</span>}
              </FormGroup>
              <FormGroup className="mb-4">
                <Label className="label-custom">Descripción del daño</Label>
                <Input
                  type="textarea"
                  name="descripcion_equipo"
                  placeholder="Ingrese descripción"
                  onChange={this.handleInput}
                />
                {this.state.errors.descripcion_equipo && <span>{this.state.errors.descripcion_equipo}</span>}
              </FormGroup>
              <FormGroup className="mb-4">
                <Label className="label-custom">Tipo de Equipo Dañado</Label>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="tipo_equipo_danado"
                      value="Reposición"
                      checked={this.state.tipo_equipo_danado === "Reposición"}
                      onChange={this.handleInput}
                    />
                    Reposición
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="tipo_equipo_danado"
                      value="Mantenimiento"
                      checked={this.state.tipo_equipo_danado === "Mantenimiento"}
                      onChange={this.handleInput}
                    />
                    Mantenimiento
                  </Label>
                </FormGroup>
              </FormGroup>
              {this.state.tipo_equipo_danado === "Reposición" && (
                <FormGroup className="mb-4">
                  <Label className="label-custom">Costo de la reposición (Bs)</Label>
                  <Input
                    type="number"
                    name="costo_equipo"
                    placeholder="Ingrese el costo"
                    onChange={this.handleInput}
                  />
                  {this.state.errors.costo_equipo && <span>{this.state.errors.costo_equipo}</span>}
                </FormGroup>
              )}
              {this.state.tipo_equipo_danado === "Mantenimiento" && (
                <>
                  <FormGroup className="mb-4">
                    <Label className="label-custom">Costo del mantenimiento (Bs)</Label>
                    <Input
                      type="number"
                      name="costo_equipo"
                      placeholder="Ingrese el costo"
                      onChange={this.handleInput}
                    />
                    {this.state.errors.costo_equipo && <span>{this.state.errors.costo_equipo}</span>}
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label className="label-custom">Categoría de Servicio</Label>
                    <Input type="select" name="categoria_servicio" onChange={this.handleInput}>
                      <option value="">Seleccione una categoría</option>
                      {this.state.categoriasServicios.map((categoria, index) => (
                        <option key={index} value={categoria.id}>
                          {categoria.catnombre}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </>
              )}
              <FormGroup className="mb-4">
                <Label className="label-custom">¿Hay Responsable?</Label>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="culpable"
                      value="Sí"
                      checked={this.state.culpable === "Sí"}
                      onChange={this.handleInput}
                    />
                    Sí
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="culpable"
                      value="No"
                      checked={this.state.culpable === "No"}
                      onChange={this.handleInput}
                    />
                    No
                  </Label>
                </FormGroup>
              </FormGroup>
              {this.state.mostrarBloques && (
                <FormGroup className="mb-4">
                  <Label className="label-custom">Bloque</Label>
                  <Input type="select" name="bloque" onChange={this.handleInput}>
                    <option value="">Seleccione un bloque</option>
                    {this.state.bloques.map((bloque, index) => (
                      <option key={index} value={bloque.id}>
                        {bloque.nombre_bloque}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              )}
              {this.state.mostrarEdificios && (
                <FormGroup className="mb-4">
                  <Label className="label-custom">Edificio</Label>
                  <Input type="select" name="edificio" onChange={this.handleInput}>
                    <option value="">Seleccione un edificio</option>
                    {this.state.edificios.map((edificio, index) => (
                      <option key={index} value={edificio.id}>
                        {edificio.nombre_edificio}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              )}
              {this.state.mostrarResidentes && (
                <FormGroup className="mb-4">
                  <Label className="label-custom">Residente Culpable</Label>
                  <Input type="select" name="residente_culpable" onChange={this.handleInput}>
                    <option value="">Seleccione un residente culpable</option>
                    {this.state.residentes.map((residente, index) => (
                      <option key={index} value={residente.nombre_residente}>
                        {residente.nombre_residente} {residente.apellidos_residente}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              )}
              <FormGroup className="mb-4">
                <Label className="label-custom">Área Común</Label>
                <Input
                  type="select"
                  name="area_comun_nombre"
                  onChange={this.handleInput}
                >
                  <option value="">Seleccione un área común</option>
                  {this.state.areasComunes.map((areaComun, index) => (
                    <option key={index} value={areaComun}>
                      {areaComun}
                    </option>
                  ))}
                </Input>
                {this.state.errors.area_comun_nombre && <span>{this.state.errors.area_comun_nombre}</span>}
              </FormGroup>
              <Button
                size="lg"
                type="submit"
                className="custom-button mx-auto d-block"
                style={{ fontWeight: "bold" }}
                disabled={!this.state.areasComunes.length}
              >
                Guardar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AgregarEquipo;
