import React, { useEffect, useState } from "react";

import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ModalBeneficios from "./modal_beneficios";
import {
    MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSelect,
  MDBRadio
  }
  from 'mdb-react-ui-kit';
  
function VerBeneficios() {
  const [beneficios, setBeneficios] = useState([]);
  const [beneficioEditado, setBeneficioEditado] = useState(null);

  useEffect(() => {
    obtenerBeneficios();
  }, []);

  const obtenerBeneficios = async ()  => {
    const respuesta = await axios.get(`http://127.0.0.1:8000/api/get_all_benefits`);
    setBeneficios(respuesta.data.beneficios)
  };

  const manejarBuscador = (e) => {
  };

  const manejarFiltroPorTipo = (e) => {
  };

  const addBeneficios = async (beneficio) => {

    const data = new FormData(); 

    let nombre = beneficio.name
    let costo = beneficio.cost
    let costEmpr = beneficio.costEmpr
    let costEmpl = beneficio.costEmpl

    data.append("nombre", nombre);
    data.append("costo", costo);
    data.append("costo_empresa", costEmpr);
    data.append("costo_empleado", costEmpl);

    if(costo === "Empleado"){
        data.append("costo_empresa", 0);
        data.append("costo_empleado", costEmpl);


    }else if(costo === "Empresa"){
        data.append("costo_empresa", costEmpr);
        data.append("costo_empleado", 0);


    }else {
        data.append("costo_empresa", costEmpr);
        data.append("costo_empleado", costEmpl);
    }

    
    const res = await axios.post(
        `http://127.0.0.1:8000/api/add_benefit`,
        data
    );
    window.location.reload();
    
    /* 

    const beneficioExistente = beneficios.find((b) => b.id === beneficio.id);
    if (beneficioExistente) {
      const beneficiosActualizados = beneficios.map((b) => 
        b.id === beneficio.id ? beneficio : b
      );
      setBeneficios(beneficiosActualizados);
      setBeneficioEditado(null);
    } else {
      const newId = beneficios.length + 1; 
      const newBeneficio = { ...beneficio, id: newId };
      setBeneficios([...beneficios, newBeneficio]);
    }
    */
  };

  const eliminarBeneficio = (id) => {
    const beneficiosFiltrados = beneficios.filter((item) => item.id !== id);
    setBeneficios(beneficiosFiltrados);
  };

  const editarBeneficio = (id) => {
    const beneficio = beneficios.find((b) => b.id === id);

    setBeneficioEditado(beneficio);
  };

  

  return (
    <>
      <Row className="d-flex align-items-center justify-content-center">
        <Col className="d-flex align-items-center justify-content-center">
          <h2>Beneficios laborales</h2>
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
                onChange={manejarBuscador}
              />
            </div>
            <div className="capsulaDesplegable-admin">
              <select
                id="desplegable-tipo_contrato"
                onChange={manejarFiltroPorTipo}
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

      <Container className="mt-5 mb-5 text-light ">
        <Table hover>
          <thead>
            <tr>
              <th>Beneficios</th>
              <th>Costo</th>
              <th>Costo-Empresa</th>
              <th>Costo-Empleado</th>
              <th>Funciones</th>
            </tr>
          </thead>
          <tbody>
            {beneficios.map((beneficio, index) => {
              return (
                <tr className="empleado" key={index}>
                  <td className="empleado_nombre">{beneficio.nombre}</td>
                  <td>{beneficio.costo}</td>
                  <td>{beneficio.costo_empresa}</td>
                  <td className="tipo_contrato">{beneficio.costo_empleado}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => eliminarBeneficio(beneficio.id)}
                    >
                      <DeleteIcon />
                    </Button>{" "}
                    <Button
                      variant="info"
                      onClick={() => editarBeneficio(beneficio.id)}
                      style={{
                        backgroundColor: "#65B8A6",
                        borderColor: "#65B8A6",
                      }}
                    >
                      <ModeEditIcon />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>

      <MDBRow>
        <MDBCol className="d-flex align-items-center justify-content-center">
        <ModalBeneficios 
              onGuardar={(value) => addBeneficios(value)}
              beneficioToEdit={beneficioEditado} 
            />
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default VerBeneficios;