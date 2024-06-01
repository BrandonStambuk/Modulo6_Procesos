import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function VerAreas() {
  
  const [errors, setErrors] = useState({});
  const [areas, setAreas] = useState([]);

  const [nombre, setNombre] = useState([]);

  const [values, setValues] = useState({
    nombre: "",
   });
  
  useEffect(()=>{
    obtenerAreas();
  }, []);

  const handleInput = (e) => {
    const {name, value} = e.target;
    setValues({
        ...values,
        [name]:value,
    });
  }

  const cambiarNombreArea = (event)  => {
    setNombre(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(charges);

    let cargos = [];

    const validationErrors = {};

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
        const data = new FormData();

        data.append("nombre", nombre);
        data.append("descripcion", "");


        const res = await axios.post(
            `http://127.0.0.1:8000/api/add_area`,
        data
        );

        if (res.data.status === 200) {
            for (let i = 0; i < charges.length; i++) {
                const data_cargo = new FormData();

                data_cargo.append("nombre", charges[i].title);
                data_cargo.append("area", res.data.ultima_area);
                

                const respuesta = await axios.post(`http://127.0.0.1:8000/api/add_position`, data_cargo);
            }

            window.location.reload();
        }
    }
    
  };

  const obtenerAreas = async ()  => {
    const respuesta = await axios.get(`http://127.0.0.1:8000/api/get_all_areas`);
    setAreas(respuesta.data.areas)
    console.log(respuesta.data.areas)
  };

  const manejarBuscador = (e) => {
    let tipo_contrato_seleccionado_valor = document.querySelector("#desplegable-tipo_contrato").value;

    if(tipo_contrato_seleccionado_valor === "Todos"){
      document.querySelectorAll(".empleado").forEach(empleado =>{
        empleado.querySelector(".empleado_nombre").textContent.toLowerCase().includes(e.target.value.toLowerCase())
          ?empleado.classList.remove("filtro")
          :empleado.classList.add("filtro")
      })
    }else{
      document.querySelectorAll(".empleado").forEach(empleado =>{
        empleado.querySelector(".empleado_nombre").textContent.toLowerCase().includes(e.target.value.toLowerCase())
        && empleado.querySelector(".tipo_contrato").textContent.toLowerCase().includes(tipo_contrato_seleccionado_valor.toLowerCase())
          ?empleado.classList.remove("filtro")
          :empleado.classList.add("filtro")
      })
    }
  }

  const [show, setShow] = useState(false);


  const [charges, setCharges] = useState([]);
  const [chargeValue, setChargeValue] = useState("");
  const [id, setId] = useState(0);
  const [area, setArea] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addCharge = () => {
    if (chargeValue !== "") {
      setId(id + 1);
      setChargeValue("");
      setCharges([...charges, { id: id, title: chargeValue }]);
    }
  };

  const removeCharge = (id) => {
    const filteredList = charges.filter((item) => item.id !== id);
    setCharges(filteredList);
  };

  const loadArea = (e) => {
    setArea(e.target.value);
  };

  const saveData = () => {
    // Guardar en BD
    handleClose();
    setCharges([]);
    setArea("");
  }


  return (
    <>
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>
                <b>Nombre de Area</b>
              </Form.Label>
              <Form.Control 
                type="text"
                value={nombre}
                onChange={cambiarNombreArea} 
              />
            </Form.Group>
            <hr />
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <b>Cargos</b>
              </Form.Label>
              <Form.Group>
                {/* Cargos ingresados */}
                {charges.map((each) => {
                  return (
                    <div
                      key={each.id}
                      className="bg-light border rounded d-flex justify-content-between mb-1 p-2"
                    >
                      {each.title}
                      <button
                        type="button"
                        onClick={() => removeCharge(each.id)}
                        variant="primary"
                      >
                        x
                      </button>
                    </div>
                  );
                })}
              </Form.Group>
              <Form.Control
                type="text"
                autoFocus
                placeholder="Agregue un cargo."
                value={chargeValue}
                onChange={(e) => {
                  setChargeValue(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") addCharge();
                }}
              />
            </Form.Group>
            <Button variant="primary" onClick={() => addCharge()}>
              Agregar cargo
            </Button>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="d-flex align-items-center justify-content-center">
        <Col className="d-flex align-items-center justify-content-center">
          <h2>Areas de trabajo</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="filtrarElementos-admin ">
            <div className="entradaBuscador-admin">
              <input
                type="text"
                name="buscador"
                id="buscador-admin"
                placeholder="Buscar por nombre..."
              />
            </div>
            <div className="capsulaDesplegable-admin">
              <select
                id="desplegable-tipo_contrato"
              > 
                <option value="Todos">Todos</option>
                <option value="Mixto">Mixto</option>
                <option value="Empresa">Empresa</option>
                <option value="Empleado">Empleado</option>
              </select>
            </div>
          </div>
        </Col>
      </Row>


      <section>
        <MDBContainer className="py-5">
          <MDBRow className="my-4">
            {areas.map((area) => {
              return (
                <>
                  <MDBCol md="4">
                    <MDBCard className="mb-4">
                      <MDBCardHeader>
                        <MDBTypography tag="h4" className="mb-0">
                          <strong>{area.nombre}</strong>
                        </MDBTypography>
                      </MDBCardHeader>
                      <MDBCardBody>
                        <MDBTypography tag="h5" className="mb-0">
                          <strong>Cargos</strong>
                        </MDBTypography>
                        {area.positions.map((cargo) => {
                          return (
                            <>
                              <MDBListGroup>
                                <MDBListGroupItem className="border-0 px-0 pb-0">
                                  {cargo.nombre}
                                </MDBListGroupItem>
                              </MDBListGroup>
                            </>
                          );
                        })}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </>
              );
            })}
          </MDBRow>
        </MDBContainer>
      </section>

      <MDBRow>
        <MDBCol className="d-flex align-items-center justify-content-center">
          <Button
            block
            className="my-4"
            size="lg"
            onClick={handleShow}
            style={{
              backgroundColor: "#65B8A6",
              borderColor: "#65B8A6",
            }}
          >
            Agregar
          </Button>
        </MDBCol>
      </MDBRow>
    </>
  );

};
export default VerAreas;