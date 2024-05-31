import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const endpoint = "http://localhost:8000/api";

const EditarEquipo = () => {
  const { id } = useParams();
  const [equipo, setEquipo] = useState({
    nombre_equipo: "",
    descripcion_equipo: "",
    costo_equipo: "",
    area_comun_nombre: "",
    tipo_equipo_danado: "",
    culpable: "No",
    residente_culpable: "",
    categoria_servicio: "",
    bloque: "",
    edificio: ""
  });
  const [areasComunes, setAreasComunes] = useState([]);
  const [residentes, setResidentes] = useState([]);
  const [bloques, setBloques] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [categoriasServicios, setCategoriasServicios] = useState([]);
  const [errors, setErrors] = useState({});
  const [mostrarResidentes, setMostrarResidentes] = useState(false);
  const [mostrarBloques, setMostrarBloques] = useState(false);
  const [mostrarEdificios, setMostrarEdificios] = useState(false);
  const [mostrarCategoriasServicios, setMostrarCategoriasServicios] = useState(false);

  useEffect(() => {
    obtenerEquipo(id);
    obtenerAreasComunes();
    if (equipo.tipo_equipo_danado === "Mantenimiento") {
      obtenerCategoriasServicios();
    }
  }, [id, equipo.tipo_equipo_danado]);

  const obtenerEquipo = async (equipoId) => {
    try {
      const response = await axios.get(`${endpoint}/obtener-equipamiento-todo/${equipoId}`);
      const equipoData = response.data.equipo;
      console.log("Equipo:", equipoData);
      setEquipo(equipoData);
    } catch (error) {
      console.error("Error al obtener el equipo:", error);
    }
  };

  const obtenerAreasComunes = async () => {
    try {
      const response = await axios.get(`${endpoint}/obtenerAreasComunes`);
      setAreasComunes(response.data[0]);
    } catch (error) {
      console.error("Error al obtener las áreas comunes:", error);
    }
  };

  const obtenerCategoriasServicios = async () => {
    try {
      const response = await axios.get(`${endpoint}/CategoriaServicio`);
      setCategoriasServicios(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías de servicio:", error);
    }
  };

  const obtenerBloques = async () => {
    try {
      const response = await axios.get(`${endpoint}/bloques`);
      setBloques(response.data);
    } catch (error) {
      console.error("Error al obtener los bloques:", error);
    }
  };

  const obtenerEdificios = async (idBloque) => {
    try {
      const response = await axios.get(`${endpoint}/edificios-by-bloques/${idBloque}`);
      setEdificios(response.data);
      setMostrarEdificios(true);
    } catch (error) {
      console.error("Error al obtener los edificios:", error);
    }
  };

  const obtenerResidentes = async (idResidente) => {
    try {
      const response = await axios.get(`${endpoint}/redidentesDepartamentoPerteneceEdifico/${idResidente}`);
      const residentes = response.data;
      setResidentes(residentes);
      setMostrarResidentes(true);
    } catch (error) {
      console.error("Error al obtener los residentes:", error);
    }
  };

  const handleInput = async (e) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target.checked ? value : '') : value.trim();
  
    if (name === 'tipo_equipo_danado') {
      if (val === "Mantenimiento") {
        obtenerCategoriasServicios();
        setMostrarCategoriasServicios(true);
      } else {
        setMostrarCategoriasServicios(false);
      }
    }
  
    if (name === 'edificio' || name === 'residente_culpable') {
      obtenerResidentes(val);
    } else if (name === 'bloque') {
      obtenerEdificios(val);
    } else if (name === 'culpable') {
      if (val === 'Sí') {
        obtenerBloques();
        setMostrarBloques(true);
      } else {
        setMostrarBloques(false);
        setMostrarResidentes(false);
      }
    }
  
    setEquipo((prevState) => ({
      ...prevState,
      [name]: val
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre_equipo, descripcion_equipo, costo_equipo, area_comun_nombre, tipo_equipo_danado, culpable, residente_culpable, categoria_servicio, bloque, edificio } = equipo;
    const validationErrors = {};

    if (!nombre_equipo.trim()) validationErrors.nombre_equipo = "Este campo es obligatorio";
    if (!descripcion_equipo.trim()) validationErrors.descripcion_equipo = "Este campo es obligatorio";
    if (!costo_equipo.trim()) validationErrors.costo_equipo = "Este campo es obligatorio";
    if (!area_comun_nombre.trim()) validationErrors.area_comun_nombre = "Por favor seleccione un área común";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const url = `${endpoint}/editar-equipo/${id}`;
      const data = {
        nombre: nombre_equipo,
        descripcion: descripcion_equipo,
        costo: costo_equipo,
        area_comun_nombre,
        categoriaEquipoDanado: tipo_equipo_danado,
        culpable,
        residente_culpable,
        categoria_servicio,
        bloque,
        edificio
      };

      try {
        const response = await axios.put(url, data);
        console.log("Equipo editado exitosamente:", response.data);
        window.location.href = "/cobros/gestion-equipo";
      } catch (error) {
        console.error("Error al editar el equipo:", error);
      }
    }
  };

  return (
    <Container className="custom-form">
      <Row>
        <Col sm={12}>
          <h2 className="text-center mb-5">Editar equipo</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-4">
              <Label className="label-custom">Nombre del equipo</Label>
              <Input
                type="text"
                name="nombre_equipo"
                value={equipo.nombre}
                onChange={handleInput}
              />
              {errors.nombre && (
                <span>{errors.nombre}</span>
              )}
            </FormGroup>
            <FormGroup className="mb-4">
              <Label className="label-custom">Descripción del equipo</Label>
              <Input
                type="textarea"
                name="descripcion_equipo"
                value={equipo.descripcion}
                onChange={handleInput}
              />
              {errors.descripcion && (
                <span>{errors.descripcion}</span>
              )}
            </FormGroup>
            <FormGroup className="mb-4">
              <Label className="label-custom">Tipo de Equipo Dañado</Label>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="tipo_equipo_danado"
                    value="Reposición"
                    checked={equipo.categoria === "Reposición"}
                    onChange={handleInput}
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
                    checked={equipo.categoria === "Mantenimiento"}
                    onChange={handleInput}
                  />
                  Mantenimiento
                </Label>
              </FormGroup>
            </FormGroup>
            {equipo.categoria === "Reposición" && (
              <FormGroup className="mb-4">
                <Label className="label-custom">Costo de la reposición (Bs)</Label>
                <Input
                  type="number"
                  name="costo_equipo"
                  value={equipo.costo}
                  onChange={handleInput}
                />
                {errors.costo && <span>{errors.costo}</span>}
              </FormGroup>
            )}
            {equipo.categoria === "Mantenimiento" && (
              <>
                <FormGroup className="mb-4">
                  <Label className="label-custom">Costo del mantenimiento (Bs)</Label>
                  <Input
                    type="number"
                    name="costo_equipo"
                    value={equipo.costo}
                    onChange={handleInput}
                  />
                  {errors.costo && <span>{errors.costo}</span>}
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label className="label-custom">Categoría de Servicio</Label>
                  <Input type="select" name="categoria_servicio" value={equipo.categoria_servicio} onChange={handleInput}>
                    <option value="">Seleccione una categoría</option>
                    {categoriasServicios.map((categoria, index) => (
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
                    checked={equipo.culpable === "Sí"}
                    onChange={handleInput}
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
                    checked={equipo.culpable === "No"}
                    onChange={handleInput}
                  />
                  No
                </Label>
              </FormGroup>
            </FormGroup>
            {mostrarBloques && (
              <FormGroup className="mb-4">
                <Label className="label-custom">Bloque</Label>
                <Input type="select" name="bloque" value={equipo.bloque} onChange={handleInput}>
                  <option value="">Seleccione un bloque</option>
                  {bloques.map((bloque, index) => (
                    <option key={index} value={bloque.id}>
                      {bloque.nombre_bloque}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            )}
            {mostrarEdificios && (
              <FormGroup className="mb-4">
                <Label className="label-custom">Edificio</Label>
                <Input type="select" name="edificio" value={equipo.edificio} onChange={handleInput}>
                  <option value="">Seleccione un edificio</option>
                  {edificios.map((edificio, index) => (
                    <option key={index} value={edificio.id}>
                      {edificio.nombre_edificio}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            )}
            {mostrarResidentes && (
              <FormGroup className="mb-4">
                <Label className="label-custom">Residente Culpable</Label>
                <Input type="select" name="residente_culpable" value={equipo.residente_culpable} onChange={handleInput}>
                  <option value="">Seleccione un residente culpable</option>
                  {residentes.map((residente, index) => (
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
                value={equipo.area_comun_nombre}
                onChange={handleInput}
              >
                <option value="">Seleccione un área común</option>
                {areasComunes.map((areaComun, index) => (
                  <option key={index} value={areaComun}>
                    {areaComun}
                  </option>
                ))}
              </Input>
              {errors.area_comun_nombre && (
                <span>{errors.area_comun_nombre}</span>
              )}
            </FormGroup>
            <Button
              size="lg"
              type="submit"
              className="custom-button mx-auto d-block"
              style={{ fontWeight: "bold" }}
              disabled={!areasComunes.length}
            >
              Actualizar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditarEquipo;
