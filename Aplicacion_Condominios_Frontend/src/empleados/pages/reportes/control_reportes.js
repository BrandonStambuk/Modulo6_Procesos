import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import '../../css/homePageEmpleados_style.css'

const cookies = new Cookies();

function ControlReportes() {

  const [empleados, setEmpleados] = useState([]);
  
  useEffect(()=>{
    getEmpleados();
  }, []);

  let time  = new Date().toLocaleTimeString()

  const [ctime,setTime] = useState(time)
  const UpdateTime=()=>{
    time =  new Date().toLocaleTimeString()
    setTime(time)
  }
  setInterval(UpdateTime)

  const getEmpleados = async () => {

    const respuesta = await axios.get(`http://127.0.0.1:8000/api/get_all_employees`);
    setEmpleados(respuesta.data.empleados)
    console.log(respuesta.data.empleados)
  }

  const eliminarEmpleado = (id) => {
    console.log(id);

    const url = `http://127.0.0.1:8000/api/delete_employee/${id}`;
    axios.delete(url).then((respuesta) => {
      if (respuesta.data.status === 200) {
        window.location.reload();
      }
    });
  }

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
  
  const editarInformacionEmpleado = (id)  => {
    cookies.set("id_empleado_seleccionado", id, { path: "/" });
    window.location.href = "./employeeEdit";
  }

  return (
    <>
      <Row className="d-flex align-items-center justify-content-center">
        <Col className="d-flex align-items-center justify-content-center">
          <h2>Reportes</h2>
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
              <th>Funciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado, index) => {
              return (
                <tr className="empleado" key={index}>
                  <td className="empleado_nombre">{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.ci}</td>
                  <td className="tipo_contrato">{empleado.estado_contrato}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => editarInformacionEmpleado(empleado.id)}
                      style={{
                        backgroundColor: "#65B8A6",
                        borderColor: "#65B8A6",
                      }}
                    >
                      <RemoveRedEyeIcon />
                    </Button>
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

export default ControlReportes;
