import React, { useEffect, useRef, useState} from 'react';

import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Cookies from 'universal-cookie';

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
  MDBInput,
} from "mdb-react-ui-kit";
const cookies = new Cookies();

function VerReporte() {
  const id_empleado = cookies.get("id_empleado_seleccionado");

  const [empleado, setEmpleado] = useState([]);
  const [turno, setTurno] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [atrasos, setAtrasos] = useState([]);
  const [faltas, setFaltas] = useState([]);

  useEffect(() => {
    getEmpleado()
  }, []);

  const getEmpleado = async (e) => {
    const respuesta = await axios.get(
      `http://127.0.0.1:8000/api/get_employee/${id_empleado}`
    );
    setEmpleado(respuesta.data.empleado);
    setTurno(respuesta.data.empleado.working_hours);
    setContratos(respuesta.data.empleado.contracts);
    setAtrasos(respuesta.data.empleado.atrasos);
    console.log(respuesta.data.empleado)
    //'contracts', 'working_hours','atrasos'
  };

  return (
    <>
      <Container className="mb-4">
        <Row lg={12} className="border p-3 bg-white border rounded shadow-sm ">
          <Row className="hedding m-0 pl-3 pt-0 pb-3"></Row>

          <Row>
            <Col lg={12} className="pt-2">
              <div className="employee-info">
                <h4 className="mb-3 ">Empleado</h4>
                <div
                  className="employee-details"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    justifyItems: "start",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <strong className="mb-0">Nombre:</strong>
                    <p className="mb-0">
                      {empleado.nombre} {empleado.apellido}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <strong className="mb-0">CI:</strong>
                    <p className="mb-0">{empleado.ci}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <strong className="mb-0">
                      Fecha de inicio de contrato:
                    </strong>
                    <p className="mb-0">{empleado.fecha_inicio}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <strong className="mb-0">Fecha de fin de contrato:</strong>
                    <p className="mb-0">
                      {empleado.fecha_final === null
                        ? "Indefinido"
                        : empleado.fecha_final}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <strong className="mb-0">Area:</strong>
                    <p className="mb-0">{empleado.area}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <strong className="mb-0">Cargo:</strong>
                    <p className="mb-0">{empleado.cargo}</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>

      <Container className="mb-4">
        <Row
          lg={12}
          className="border p-3 bg-white border rounded shadow-sm mb-3"
        >
          <Row>
            <h3>Turno</h3>
          </Row>
          <Row>
            {turno.length === 0 ? (
              <Col className="d-flex align-items-center justify-content-center">
                <h3> Sin turno asignado</h3>{" "}
              </Col>
            ) : (
              <p>SIUU</p>
            )}
          </Row>
        </Row>
      </Container>

      <Container className="mb-4">
        <Row
          lg={12}
          className="border p-3 bg-white border rounded shadow-sm mb-3"
        >
          <Row>
            <h3>Contratos</h3>
          </Row>
          <Row>
            {contratos.length === 0 ? (
              <Col className="d-flex align-items-center justify-content-center">
                <h3> Sin contratos</h3>{" "}
              </Col>
            ) : (
              <p>SIUU</p>
            )}
          </Row>
        </Row>
      </Container>

      <Container className="mb-4">
        <Row
          lg={12}
          className="border p-3 bg-white border rounded shadow-sm mb-3"
        >
          <Row>
            <h3>Atrasos</h3>
          </Row>
          <Row>
            {atrasos.length === 0 ? (
              <Col className="d-flex align-items-center justify-content-center">
                <h3> Sin atrasos</h3>{" "}
              </Col>
            ) : (
              <p>SIUU</p>
            )}
          </Row>
        </Row>
      </Container>

      <Container className="mb-4">
        <Row
          lg={12}
          className="border p-3 bg-white border rounded shadow-sm mb-3"
        >
          <Row>
            <h3>Faltas</h3>
          </Row>
          <Row>
            {faltas.length === 0 ? (
              <Col className="d-flex align-items-center justify-content-center">
                <h3> Sin faltas</h3>{" "}
              </Col>
            ) : (
              <p>SIUU</p>
            )}
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default VerReporte;