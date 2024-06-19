import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import '../css/contract_register_style.css'
import AddIcon from '@mui/icons-material/Add';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Modal from 'react-bootstrap/Modal';

const cookies = new Cookies();

function AssignContract() {

  const [empleados, setEmpleados] = useState([]);
  const [modalPendiente, setModalPendiente] = useState(false);
  const [contratoAlt, setContratoAlt] = useState(false);
  const [empleado_id, setEmpleadoId] = useState(false);
  const [longitud, setLongitud] = useState(0);
  
  useEffect(()=>{
    getEmpleados();
  }, []);

  const [values, setValues] = useState({
    tipo_contrato: "",
    fecha_inicio : "",
    fecha_final : "",
    asignacion: "",
    area : "",
    cargo : "",
    beneficios : "",
    salario : "",
  });

  const getEmpleados = async () => {

    const respuesta = await axios.get(`http://127.0.0.1:8000/api/get_all_employees`);
    setEmpleados(respuesta.data.empleados)
    console.log(respuesta.data.empleados)
  }

  const firmarContrato = (id)  => {
    cookies.set("id_empleado_seleccionado", id, { path: "/" });
    window.location.href = "./contractRegister";
  }

  const handleSubmit =  async () => {

    console.log(longitud)



    console.log((contratoAlt.length))
    const data = new FormData();

    data.append("tipo_contrato", contratoAlt[(contratoAlt.length -1)].tipo_contrato);
    data.append("fecha_inicio", contratoAlt[(contratoAlt.length -1)].fecha_inicio);

    if(contratoAlt[0].fecha_final === null){
      data.append("fecha_final", "");
    }else{
      data.append("fecha_final", contratoAlt[(contratoAlt.length -1)].fecha_final);
    }
    
    data.append("area", contratoAlt[(contratoAlt.length -1)].area);
    data.append("cargo", contratoAlt[(contratoAlt.length -1)].cargo);
    data.append("beneficios", contratoAlt[(contratoAlt.length -1)].beneficios);
    data.append("salario", contratoAlt[(contratoAlt.length -1)].salario);
    data.append("salario", contratoAlt[(contratoAlt.length -1)].salario);
    data.append("salario", contratoAlt[(contratoAlt.length -1)].salario);
    if(contratoAlt[(contratoAlt.length -1)].area_comun){
      data.append("area_comun",contratoAlt[(contratoAlt.length -1)].area_comun);
      data.append("edificio", '');
    }
    if(contratoAlt[(contratoAlt.length -1)].edificio){
      data.append("area_comun", '');
      data.append("edificio", contratoAlt[(contratoAlt.length -1)].edificio);
    }
    data.append("empleado", empleado_id);

    const res = await axios.post(
      `http://127.0.0.1:8000/api/add_contract`,
      data
    );

    if (res.data.status === 200) {
      const data_contrato = new FormData();
      
      data_contrato.append("estado_contrato", "Contratado");
      
      console.log(res);
      const respuesta_estado = await axios.post(
          `http://127.0.0.1:8000/api/updateContractStatus/${empleado_id}`,
          data_contrato
      );
      if (respuesta_estado.data.status === 200) {
          console.log(respuesta_estado);
      }
      window.location.reload();
    }
      
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

  const manejar_Filtro_Por_Tipo = (e) => {
    let nombre_seleccionado_valor = document.querySelector("#buscador-admin").value;

    if (nombre_seleccionado_valor === "") {
      if (e.target.value === "Todos") {
        document.querySelectorAll(".empleado").forEach((empleado) => {
          empleado.classList.remove("filtro");
        });
      } else {
        document.querySelectorAll(".empleado").forEach((empleado) => {
          empleado
            .querySelector(".tipo_contrato")
            .textContent.toLowerCase()
            .includes(e.target.value.toLowerCase())
            ? empleado.classList.remove("filtro")
            : empleado.classList.add("filtro");
        });
      }
    } else {
      if (e.target.value === "Todos") {
        document.querySelectorAll(".empleado").forEach((empleado) => {
          if (
            empleado
              .querySelector(".empleado_nombre")
              .textContent.toLowerCase()
              .includes(nombre_seleccionado_valor.toLowerCase())
          ) {
            empleado.classList.remove("filtro");
          } else {
            empleado.classList.add("filtro");
          }
        });
      } else {
        document.querySelectorAll(".empleado").forEach((empleado) => {
          if (
            empleado
              .querySelector(".empleado_nombre")
              .textContent.toLowerCase()
              .includes(nombre_seleccionado_valor.toLowerCase()) &&
              empleado
              .querySelector(".tipo_contrato")
              .textContent.toLowerCase()
              .includes(e.target.value.toLowerCase())
          ) {
            empleado.classList.remove("filtro");
          } else {
            empleado.classList.add("filtro");
          }
        });
      }
    }
  }

  const abrirModalPendiente = (empleado)  => {
    setModalPendiente(true);
    setLongitud(empleado.contracts_alt.length)
    setContratoAlt(empleado.contracts_alt);
    setEmpleadoId(empleado.id);
  }

  return (
    <>
    <Modal
        show={modalPendiente}
        onHide={() => setModalPendiente(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <h3>Desea confirmar este contrato?</h3>
          </div>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={handleSubmit} style={{ backgroundColor: '#65B8A6', borderColor: '#65B8A6' }}>
            Si
          </Button>


          <Button variant="secondary" onClick={handleSubmit}>
            No
          </Button>

        </Modal.Footer>
      </Modal>

    <Row className="d-flex align-items-center justify-content-center">
        <Col className="d-flex align-items-center justify-content-center">
          <h2>Asignacion de Contratos</h2>
        </Col>
      </Row>
      <div className="filtrarElementos-admin">
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
            onChange={manejar_Filtro_Por_Tipo}
          >
            <option>Todos</option>
            <option>Sin contrato</option>
            <option>Contratado</option>
          </select>
        </div>
      </div>

      <Container className="mt-5 mb-5 text-light ">
        <Table hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>CI</th>
              <th>Estado de Contrato</th>
              <th>Contrato</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => {
              return (
                <tr className="empleado">
                  <td className="empleado_nombre">{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.ci}</td>
                  <td className="tipo_contrato">{empleado.estado_contrato}</td>
                  <td>

                  {empleado.estado_contrato === "Pendiente" ? (
                          <Button onClick={() => abrirModalPendiente(empleado)} style={{ backgroundColor: '#65B8A6', borderColor: '#65B8A6' }}><QuestionMarkIcon/></Button>
                          
                        ) : (
                          <>
                          {empleado.estado_contrato === "Contratado" ? (
                            <div> Contrato {empleado.contracts[0].tipo_contrato}</div>
                          ) : (
                              <Button variant="danger" onClick={() => firmarContrato(empleado)} style={{ backgroundColor: '#65B8A6', borderColor: '#65B8A6' }}><AddIcon/></Button>
                          )}
                          </>
                  )}

                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default AssignContract;
