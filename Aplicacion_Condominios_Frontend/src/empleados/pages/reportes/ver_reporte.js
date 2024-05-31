import React, { useEffect, useRef, useState} from 'react';

import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';
import {
  MDBCol,
  MDBRow,
  MDBInput,
} from "mdb-react-ui-kit";

const cookies = new Cookies();

function VerReporte() {
  const id_empleado = cookies.get("id_empleado_seleccionado");
  const empleado_seleccionado = cookies.get("empleado_seleccionado");

  const [empleado, setEmpleado] = useState([]);
  const [turnos, setTurnos] = useState([]);
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
    setTurnos(respuesta.data.empleado.working_hours);
    setContratos(respuesta.data.empleado.contracts);
    setAtrasos(respuesta.data.empleado.atrasos);
    setFaltas(respuesta.data.empleado.ausencias)
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
                <h2 className="mb-3 ">Empleado</h2>
                <div
                  className="employee-details"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    justifyItems: "start",
                    alignItems: "center",
                    fontSize: "30px",
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
            <h3>Turnos</h3>
          </Row>
          <Row>
            {turnos.length === 0 ? (
              <Col className="d-flex align-items-center justify-content-center">
                <h3> Sin turno asignado</h3>{" "}
              </Col>
            ) : (
              <>
                {turnos.map((turno, index) => {
                  return (
                    <>
                      <MDBRow
                        className="justify-content-center align-items-center mb-2"
                        key={index}
                      >
                        <MDBCol md="2">
                          <h5>{turno.dia}</h5>
                        </MDBCol>

                        <MDBCol md="3" className="mb-2">
                          <MDBInput
                            type="time"
                            id={turno.dia}
                            name={turno.dia}
                            value={turno.hora_entrada}
                          />
                        </MDBCol>

                        <MDBCol md="3" className="mb-2">
                          <MDBInput
                            type="time"
                            id={turno.dia}
                            name={turno.dia}
                            value={turno.hora_salida}
                          />
                        </MDBCol>
                      </MDBRow>
                    </>
                  );
                })}
              </>
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
              <div
                className="
                        border 
                        rounded 
                        d-flex 
                        justify-content-between 
                      "
              >
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Tipo de Contrato</th>
                      <th>Area</th>
                      <th>Cargo</th>
                      <th>Fecha Inicio</th>
                      <th>Salario</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {contratos.map((contrato) => {
                      return (
                        <>
                          <tr>
                            <td>{contrato.tipo_contrato}</td>
                            <td>{contrato.area}</td>
                            <td>{contrato.cargo}</td>
                            <td>{contrato.fecha_inicio}</td>
                            <td>{contrato.salario}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
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
              <div
                className="
                        border 
                        rounded 
                        d-flex 
                        justify-content-between 
                      "
              >
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Hora marcada</th>
                      <th>Tiempo de demora</th>
                      <th>Motivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atrasos.map((atraso) => {
                      return (
                        <>
                          <tr>
                            <td>{atraso.fecha}</td>
                            <td>{atraso.hora_entrada}</td>
                            <td>{atraso.tiempo_demora}</td>
                            <td>{atraso.motivo}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
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
              <div
                className="
                        border 
                        rounded 
                        d-flex 
                        justify-content-between 
                      "
              >
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Motivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faltas.map((falta) => {
                      return (
                        <>
                          <tr>
                            <td>{falta.fecha}</td>
                            <td>{falta.motivo}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )}
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default VerReporte;