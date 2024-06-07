import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
  Form,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import axios from "axios";
import "./customs.css";

const endpoint = "http://localhost:8000/api";

const ModalParqueo = (props) => {
  const { isOpen, onSubmit, toggle, idParqueo, parqueos, departamentosA } =
    props;
  const [edificios, setEdificios] = useState([]);
  const [bloques, setBloques] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [departamentoSelec, setDepartamentoSelec] = useState("");
  const [edificioSelec, setEdificioSelec] = useState("");
  const [bloqueSelec, setBloqueSelec] = useState("");
  const [direccion, setDireccion] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
        resetForm();
    } else {
      if (idParqueo) {
        const parqueo = parqueos.find((parqueo) => parqueo.id === idParqueo);
        const departamento = departamentosA.find( (departamento) => departamento.id === parqueo.departamento_id);
        // console.log(departamento);
        setNombre(parqueo.nombre_parqueo);
        setDireccion(parqueo.direccion_parqueo);
        setDepartamentoSelec(departamento?.id || '');
        loadData(departamento);
        //setDepartamentos(departamento);
      }
    }
  }, [isOpen, idParqueo, parqueos, departamentosA]);

  const loadData = async (departamento) => {
    if (departamento) {
        try {
            const edificio = await fetchEdificios(departamento.edificio_id);
            if(edificio){
                await fetchBloques(edificio.bloque_id);
                await getDepartamentos(edificio.id);
            }
        } catch (error) {
            console.log(error);
        }
    }
  };
  const resetForm = () => {
      setNombre("");
      setDepartamentoSelec("");
      setEdificioSelec("");
      setBloqueSelec("");
      setErrors({});
  };
  const fetchEdificios = async (id) => {
    try {
      const response = await axios.get(`${endpoint}/edificio-short/${id}`);
      const data = response.data;
      const edificio = data;
      // console.log(edificio);
      setEdificioSelec(edificio?.id || '');
      return edificio;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBloques = async (idBloque) => {
    try {
      const response = await axios.get(`${endpoint}/bloques-short`);
      const data = response.data;
      setBloques(data);
      const bloque = data.find(
        (bloque) => bloque.id === idBloque
      );
      // console.log(bloque);
      setBloqueSelec(bloque?.id || '');
      getEdificios(bloque.id);
      return bloque;
    } catch (error) {
      console.log(error);
    }
  };
  const getEdificios = async (idBloque) => {
      try {
          const response = await axios.get(`${endpoint}/edificios-by-bloques/${idBloque}`);
          setEdificios(response.data);
      } catch (error) {
      console.log(error);
      }
  }; 
  const getDepartamentos = async (idEdificio) => {
      try {
          const response = await axios.get(`${endpoint}/departamentos-by-edificios/${idEdificio}`);
          // console.log(response.data);
          setDepartamentos(response.data);
      } catch (error) {
          console.log(error);
      }
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
    setErrors({ ...errors, nombre: "" });
  };

  const handleDepartamentoChange = (e) => {
    setDepartamentoSelec(e.target.value);
    setErrors({ ...errors, departamentoSelec: "" });
  };
  const handleBloqueSeleccionado = (e) => {
    const idBloque = e.target.value;
    setBloqueSelec(e.target.value);
    setEdificioSelec("");
    setDepartamentoSelec("");
    getEdificios(idBloque);
    setErrors({ ...errors, bloqueSelec: "" });
};
  const handleEdificioSeleccionado = (e) => {
    const idEdificio = e.target.value;
    setEdificioSelec(idEdificio);
    setDepartamentoSelec("");
    getDepartamentos(idEdificio);
    setErrors({ ...errors, edificioSelec: "" });
  };

  const handleDireccionChange = (e) => {
    setDireccion(e.target.value);
    setErrors({ ...errors, direccion: "" });
  };

  const handleSubmit = () => {
    const validationErrors = {};

    if (!nombre.trim()) {
      validationErrors.nombre = "Este campo es obligatorio";
    } else if (
      !/^[a-zA-ZÑñáéíóú][a-zA-ZÑñáéíóú0-9\s-]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(
        nombre
      )
    ) {
      validationErrors.nombre = "Ingrese un nombre válido";
    }

    if (!departamentoSelec) {
      validationErrors.departamento = "Debe seleccionar un departamento";
    }
    if (!edificioSelec) {
      validationErrors.edificio = "Debe seleccionar un edificio";
    }
    if (!bloqueSelec) {
      validationErrors.bloque = "Debe seleccionar un bloque";
    }
    if (!direccion.trim()) {
      validationErrors.direccion = "Este campo es obligatorio";
    } 
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      /* console.log("idParqueo: ", idParqueo);
      console.log("nombre: ", nombre);
      console.log("departamento: ", departamentoSelec); */
      onSubmit({
        id: idParqueo,
        nombre_parqueo: nombre,
        direccion_parqueo: direccion,
        departamento_id: departamentoSelec,
      });
    }
  };



  return (
    <Modal className="modalContainer" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} className="modalTitle">
        Editar
      </ModalHeader>
      <ModalBody id="modalBodyParqueo">
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label className="label-custom">Nombre</Label>
                <Input
                  id="nombre"
                  className="customInput"
                  name="nombre"
                  type="text"
                  value={nombre}
                  onChange={handleNombreChange}
                  invalid={errors.nombre ? true : false}
                />
                <FormFeedback>{errors.nombre}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label className="label-custom">Bloque</Label>
                <Input
                  type="select"
                  className="customInput"
                  name="bloque_id"
                  id="bloque_id"
                  onChange={handleBloqueSeleccionado}
                  value={bloqueSelec}
                  invalid={errors.bloqueSelec ? true : false}
                >
                  <option disabled value="">
                    Seleccionar bloque
                  </option>
                  {bloques.map((bloque) => (
                    <option key={bloque.id} value={bloque.id}>
                      {bloque.nombre_bloque}
                    </option>
                  ))}
                </Input>
                <FormFeedback>{errors.bloqueSelec}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label className="label-custom">Edificio</Label>
                <Input
                  type="select"
                  className="customInput"
                  name="edificio_id"
                  id="edificio_id"
                  onChange={handleEdificioSeleccionado}
                  value={edificioSelec}
                  invalid={errors.edificioSelec ? true : false}
                >
                  <option disabled value="">
                    Seleccionar edificio
                  </option>
                  {edificios.map((edificio) => (
                    <option key={edificio.id} value={edificio.id}>
                      {edificio.nombre_edificio}
                    </option>
                  ))}
                </Input>
                <FormFeedback>{errors.edificioSelec}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label className="label-custom">Departamento</Label>
                <Input
                  type="select"
                  className="customInput"
                  name="departamento_id"
                  id="departamento_id"
                  onChange={handleDepartamentoChange}
                  value={departamentoSelec}
                  invalid={errors.departamentoSelec ? true : false}
                >
                  <option disabled value="">
                    Seleccionar departamento
                  </option>
                  {departamentos.map((departamento) => (
                    <option key={departamento.id} value={departamento.id}>
                      {departamento.nombre_departamento}
                    </option>
                  ))}
                </Input>
                <FormFeedback>{errors.departamentoSelec}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label className="label-custom">Dirección</Label>
                <Input
                  id="direccion"
                  className="customInput"
                  name="direccion"
                  type="text"
                  value={direccion}
                  onChange={handleDireccionChange}
                  invalid={errors.direccion ? true : false}
                />
                <FormFeedback>{errors.direccion}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Guardar
        </Button>
        <Button color="danger" onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalParqueo;
