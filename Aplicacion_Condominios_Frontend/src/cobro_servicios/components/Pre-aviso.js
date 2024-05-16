import React, { useState, useEffect } from "react";
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
  FormFeedback
} from "reactstrap";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTimes } from "react-icons/fa";  // Importa el icono de react-icons


const endpoint = "http://localhost:8000/api";

const PreAviso = () => {
  const { departamento_id } = useParams();
  const [fecha, setFecha] = useState("");
  const [descripcion_servicios, setDescripcionServicios] = useState("");
  const [monto, setMonto] = useState("");
  const [errors, setErrors] = useState({});
  const [tipoServicio, setTipoServicio] = useState("");
  const [tiposServicio, setTiposServicio] = useState([]);
  const [propietarios, setPropietarios] = useState([]);
  const [propietarioSeleccionado, setPropietarioSeleccionado] = useState("");
  const [servicioPagar, setServicioPagar] = useState("");
  const [propietarioSeleccionadoID, setPropietarioSeleccionadoID] = useState("");
  const [multas, setMultas] = useState([]);

  useEffect(() => {
    console.log("ID del departamento:", departamento_id);
  }, [departamento_id]);

  useEffect(() => {
    const fetchTiposServicio = async () => {
      try {
        const response = await axios.get(`${endpoint}/CategoriaServicio`);
        const nombresServicio = response.data.map((item) => item.catnombre);
        setTiposServicio(nombresServicio);
      } catch (error) {
        console.error("Error al obtener los tipos de servicio:", error);
      }
    };

    fetchTiposServicio();
  }, []);

  useEffect(() => {
    const fetchPropietarios = async () => {
      try {
        const contratoDepResponse = await axios.get(`${endpoint}/contratoDep/${departamento_id}`);
        const contratoDepId = contratoDepResponse.data.contratos[0].id;
        console.log("id del contrato encontrado " + contratoDepId);
        
        const propietariosByContratoResponse = await axios.get(`${endpoint}/propietario-by-contrato/${contratoDepId}`);
  
        if (propietariosByContratoResponse.data.message !== "No tiene propietario") {
          // Si hay propietario, mostrar solo ese propietario
          const nombrePropietario = propietariosByContratoResponse.data.residente.nombre_residente;
          const idPropietario = propietariosByContratoResponse.data.residente.id;
          console.log(nombrePropietario);
          setPropietarios([nombrePropietario]);
          setPropietarioSeleccionadoID(idPropietario);
        } else {
          // Si no hay propietario, obtener los titulares por la otra ruta
          const titularesByContratoResponse = await axios.get(`${endpoint}/titular-by-contrato/${contratoDepId}`);
          console.log(titularesByContratoResponse);
          
          if (Array.isArray(titularesByContratoResponse.data)) {
            const nombresTitulares = titularesByContratoResponse.data.map(titular => titular.nombre_residente);
            setPropietarios(nombresTitulares);
          } else if (titularesByContratoResponse.data.message === "Titular encontrado") {
            // Si se encuentra un titular pero no es un array, mostrar solo ese titular
            const nombreTitular = titularesByContratoResponse.data.residente.nombre_residente;
            const idTitular = titularesByContratoResponse.data.residente.id;

            console.log(nombreTitular);
            setPropietarios([nombreTitular]);
            setPropietarioSeleccionadoID(idTitular);
          } else {
            console.error("La respuesta de la API no es válida:", titularesByContratoResponse.data);
          }
        }
      } catch (error) {
        console.error("Error al obtener la lista de propietarios:", error);
      }
    };
  
    fetchPropietarios();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "fecha":
        setFecha(value);
        break;
      case "descripcion_servicios":
        setDescripcionServicios(value);
        break;
      case "monto":
        setMonto(value);
        break;
      case "tipo_servicio":
        setServicioPagar(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!fecha.trim()) {
      validationErrors.fecha = "Este campo es obligatorio";
    }
    
    if (!descripcion_servicios.trim()) {
      validationErrors.descripcion_servicios = "Este campo es obligatorio";
    }
    
    if (!monto.trim()) {
      validationErrors.monto = "Este campo es obligatorio";
    }
    
    if (!servicioPagar.trim()) {
      validationErrors.tipo_servicio = "Seleccione un servicio a pagar";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      let totalMonto = parseFloat(monto);
      multas.forEach((multa) => {
        totalMonto += parseFloat(multa.monto);
      });
      const url = `${endpoint}/generar-preaviso`;
      const data = {
        departamento_id,
        fecha,
        propietario_pagar: propietarioSeleccionado,
        descripcion_servicios,
        monto: totalMonto.toString(), // Convertir el total a string antes de enviarlo
        servicio_pagar: servicioPagar,
        id_propietarioPagar: propietarioSeleccionadoID,
      };
      
      let multaData;

      try {
        const response = await axios.post(url, data);
        console.log("Preaviso guardado exitosamente:", response.data);
        console.log("id del preaviso", response.data.id);
        
        await Promise.all(multas.map(async (multa) => {
          multaData = {
            preaviso_id: response.data.id,  
            descripcion: multa.descripcion,
            monto: multa.monto,
            fecha: multa.fecha,
          };
          await axios.post(`${endpoint}/agregar-multita`, multaData);
        }));
        
        window.location.href = "/cobros/pre-aviso";
      } catch (error) {
        console.error("Error al guardar el preaviso:", error);
        console.log("intente enviar esto", multaData);
      }
    }
  };


  const handleAddMulta = () => {
    setMultas([...multas, { descripcion: "", monto: "", fecha: "" }]);
  };

  const handleMultaChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMultas = [...multas];
    updatedMultas[index][name] = value;
    setMultas(updatedMultas);
  };

  const handleRemoveMulta = (index) => {
    const updatedMultas = multas.filter((_, i) => i !== index);
    setMultas(updatedMultas);
  };

  return (
    <Container className="custom-form">
      <Row>
        <Col sm={12}>
          <h2 className="text-center mb-5">Crear Preaviso de expensa</h2>
          <h3 className="text-center mb-5">Departamento: {departamento_id}</h3>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-4">
              <Label className="label-custom">Propietario</Label>
              <Input
                type="select"
                name="propietario"
                onChange={(e) => setPropietarioSeleccionado(e.target.value)}
                value={propietarioSeleccionado}                >
                <option value="">Seleccionar propietario</option>
                {propietarios.map((propietario) => (
                  <option key={propietario} value={propietario}>
                    {propietario}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup className="mb-4">
              <Label className="label-custom">Fecha de envío</Label>
              <Input
                type="date"
                name="fecha"
                onChange={handleInput}
                value={fecha}
              />
              {errors.fecha && <span>{errors.fecha}</span>}
            </FormGroup>

            <FormGroup className="mb-4">
              <Label className="label-custom">
                Descripción de los servicios
              </Label>
              <Input
                type="text"
                name="descripcion_servicios"
                placeholder="Ingrese la descripción de los servicios"
                onChange={handleInput}
                value={descripcion_servicios}
              />
              {errors.descripcion_servicios && (
                <span>{errors.descripcion_servicios}</span>
              )}
            </FormGroup>

            <FormGroup className="mb-4">
              <Label className="label-custom">Servicio a pagar</Label>
              <Input
                type="select"
                name="tipo_servicio"
                onChange={(e) => setServicioPagar(e.target.value)}
                value={servicioPagar}
              >
                <option value="">Seleccionar servicio</option>
                {tiposServicio.map((tipo, index) => (
                  <option key={index} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup className="mb-4">
              <Label className="label-custom">Monto</Label>
              <Input
                type="number"
                name="monto"
                placeholder="Ingrese el monto"
                onChange={handleInput}
                value={monto}
              />
              {errors.monto && <span>{errors.monto}</span>}
            </FormGroup>

            <h4 className="text-center mb-5">Multas</h4>

              {multas.map((multa, index) => (
            <Row key={index} className="align-items-center">
              <Col sm={3}>
                <Label className="label-custom">Descripción</Label>
                <Input
                  type="text"
                  name="descripcion"
                  placeholder="Ingrese la descripción"
                  onChange={(e) => handleMultaChange(index, e)}
                  value={multa.descripcion}
                />
              </Col>
              <Col sm={3}>
                <Label className="label-custom">Monto</Label>
                <Input
                  type="number"
                  name="monto"
                  placeholder="Ingrese el monto"
                  onChange={(e) => handleMultaChange(index, e)}
                  value={multa.monto}
                />
              </Col>
              <Col sm={3}>
                <Label className="label-custom">Fecha</Label>
                <Input
                  type="date"
                  name="fecha"
                  onChange={(e) => handleMultaChange(index, e)}
                  value={multa.fecha}
                />
              </Col>
              <Col sm={3} className="d-flex justify-content-end">
                <Button color="danger" onClick={() => handleRemoveMulta(index)}>
                  <FaTimes />
                </Button>
              </Col>
            </Row>
          ))}

            <Button
              size="lg"
              type="button"
              className="custom-button mx-auto d-block"
              style={{ fontWeight: "bold", marginTop: "20px" }}
              onClick={handleAddMulta}
            >
              Agregar Multa
            </Button>

            <Button
              size="lg"
              type="submit"
              className="custom-button mx-auto d-block"
              style={{ fontWeight: "bold", marginTop: "20px" }}
              onClick={handleSubmit}
            >
              Guardar Preaviso
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PreAviso;

