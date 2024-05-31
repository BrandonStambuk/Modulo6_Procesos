import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import '../../css/contract_register_style.css'
import AddIcon from '@mui/icons-material/Add';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const cookies = new Cookies();

function ControlRetrasos() {

  const [empleados, setEmpleados] = useState([]);
  const [errors, setErrors] = useState({});
  const [areas, setAreas] = useState([]);

  useEffect(()=>{
    getEmpleados();
    obtenerAreas();
  }, []);

  const getEmpleados = async () => {

    const respuesta = await axios.get(`http://127.0.0.1:8000/api/obtener_atrasos`); //Aqui obtener los empleados con al menos un retraso
    console.log(respuesta.data.atrasos);

    let empleadosConAtrasos = [];

    for (let i = 0; i < respuesta.data.atrasos.length; i++) {
      let empleado = respuesta.data.atrasos[i];
      for(let j = 0; j < empleado.atrasos.length; j++){
          let nombre = empleado.nombre;
          let apellido = empleado.apellido;
          let ci = empleado.ci;
          let area = empleado.contracts[0].area;
          let cargo = empleado.contracts[0].cargo;
          let fechaInicio = empleado.contracts[0].fecha_inicio;
          let fechaFinal = empleado.contracts[0].fecha_final;

          let fechaRetraso = empleado.atrasos[j].fecha;
          var mydate = new Date(fechaRetraso);
          let dia = mydate.getDate() + 1;
          let mes = mydate.getMonth() + 1;
          let format4 = dia + "-" + mes + "-" + mydate.getFullYear();
          
          let tiempoDemora = empleado.atrasos[j].tiempo_demora
          let idDemora = empleado.atrasos[j].id
          let motivo = empleado.atrasos[j].motivo
          let datos = {nombre: nombre, apellido: apellido, ci: ci, area: area, cargo:cargo, tiempo_demora:tiempoDemora ,fecha_inicio:fechaInicio, fecha_final:fechaFinal, fecha: format4, id_retraso: idDemora, motivo: motivo, fecha_retraso_original:fechaRetraso };
          empleadosConAtrasos.push(datos);
      }
    }

    setEmpleados(empleadosConAtrasos);
    console.log(empleadosConAtrasos);
  }

  const manejarBuscador = (e) => {
    let area_empleado_seleccionado_valor = document.querySelector("#desplegable-empleado_area").value;

    if(area_empleado_seleccionado_valor === "Todos"){
      document.querySelectorAll(".empleado").forEach(empleado =>{
        empleado.querySelector(".empleado_nombre").textContent.toLowerCase().includes(e.target.value.toLowerCase())
          ?empleado.classList.remove("filtro")
          :empleado.classList.add("filtro")
      })
    }else{
      document.querySelectorAll(".empleado").forEach(empleado =>{
        empleado.querySelector(".empleado_nombre").textContent.toLowerCase().includes(e.target.value.toLowerCase())
        && empleado.querySelector(".empleado_area").textContent.toLowerCase().includes(area_empleado_seleccionado_valor.toLowerCase())
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
            .querySelector(".empleado_area")
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
              .querySelector(".empleado_area")
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
  
  const manejarPrimeraFecha = (e)  => {
    let primera_fecha_valor = document.querySelector("#primera_fecha").value;
    let segunda_fecha_valor = document.querySelector("#segunda_fecha").value;
    const validationErrors = {};
    let fecha_date= ""
    let primera_fecha_valor_date = ""
    let segunda_fecha_valor_date = ""

    if(segunda_fecha_valor){
      document.querySelectorAll(".empleado").forEach(empleado =>{

        fecha_date = new Date(empleado.querySelector(".empleado_fecha_retraso").textContent)
        console.log(fecha_date)

        primera_fecha_valor_date = new Date(primera_fecha_valor)
        segunda_fecha_valor_date = new Date(segunda_fecha_valor)

        if(fecha_date >= primera_fecha_valor_date && fecha_date <= segunda_fecha_valor_date){
          empleado.classList.remove("filtro")

        }else{
          empleado.classList.add("filtro")
        }

      })
      
    }else{
      validationErrors.fecha_final = "Debe introducir una fecha";
    }
    setErrors(validationErrors);
  }

  const manejarSegundaFecha = (e)  => {
    let primera_fecha_valor = document.querySelector("#primera_fecha").value;
    let segunda_fecha_valor = document.querySelector("#segunda_fecha").value;
    const validationErrors = {};
    let fecha_date= ""
    let primera_fecha_valor_date = ""
    let segunda_fecha_valor_date = ""

    if(primera_fecha_valor){
      document.querySelectorAll(".empleado").forEach(empleado =>{

        fecha_date = new Date(empleado.querySelector(".empleado_fecha_retraso").textContent)
        console.log(fecha_date)

        primera_fecha_valor_date = new Date(primera_fecha_valor)
        segunda_fecha_valor_date = new Date(segunda_fecha_valor)

        if(fecha_date >= primera_fecha_valor_date && fecha_date <= segunda_fecha_valor_date){
          empleado.classList.remove("filtro")

        }else{
          empleado.classList.add("filtro")
        }

      })
    }else{
      validationErrors.fecha_inicio = "Debe introducir una fecha";
    }
    setErrors(validationErrors);
  }

  const despejarFechas = ()  => {
    document.querySelectorAll(".empleado").forEach(empleado =>{

      empleado.classList.remove("filtro")

    })
    document.querySelector("#primera_fecha").value = '';
    document.querySelector("#segunda_fecha").value = '';
    setErrors({});
  }

  const redirigirInformacionRetraso = (empleado)  => {

    cookies.set("empleado_seleccionado", empleado, { path: "/" });
    window.location.href = "./informacionRetraso";

  }

  const obtenerAreas = async ()  => {
    const respuesta = await axios.get(`http://127.0.0.1:8000/api/get_all_areas`);
    setAreas(respuesta.data.areas)
  };

  return (
    <>
      <Row className="d-flex align-items-center justify-content-center">
        <Col className="d-flex align-items-center justify-content-center">
          <h2>Control de retrasos</h2>
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
            id="desplegable-empleado_area"
            onChange={manejar_Filtro_Por_Tipo}
          >
            <option>Todos</option>
            {areas.map((area) => {
              return (
                <>
                  <option value={area.nombre}>{area.nombre}</option>
                </>
              );
            })}
          </select>
        </div>
      </div>

      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <h5>Fecha de retraso</h5>
        </Col>
      </Row>

      <Row className="my-2 d-flex justify-content-center align-items-center">
        <Col
          xs={4}
          className="d-flex align-items-center justify-content-center"
          style={{ marginLeft: "100px" }}
        >
          <div className="entradaBuscador-admin">
            <input
              type="date"
              id="primera_fecha"
              onChange={manejarPrimeraFecha}
            />
          </div>
        </Col>

        <Col
          xs={4}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="entradaBuscador-admin">
            <input
              type="date"
              id="segunda_fecha"
              onChange={manejarSegundaFecha}
            />
          </div>
        </Col>

        <Col
          xs={1}
          className="d-flex align-items-center justify-content-center"
        >
          <Button variant="danger" onClick={despejarFechas}>
            <CloseIcon />
          </Button>{" "}
        </Col>
      </Row>

      <Row className="d-flex justify-content-center align-items-center">
        <Col
          xs={5}
          className="d-flex justify-content-center align-items-center"
          style={{ paddingLeft: "120px" }}
        >
          {errors.fecha_inicio && (
            <span className="advertencia-creEve">{errors.fecha_inicio}</span>
          )}
        </Col>

        <Col
          xs={5}
          className="d-flex justify-content-center align-items-center"
          style={{ paddingLeft: "120px" }}
        >
          {errors.fecha_final && (
            <span className="advertencia-creEve">{errors.fecha_final}</span>
          )}
        </Col>
      </Row>

      <Container className="mt-5 mb-5 text-light ">
        <Table hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Area</th>
              <th>Fecha de retraso</th>
              <th>Mas informacion</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => {
              return (
                <tr className="empleado">
                  <td className="empleado_nombre">{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td className="empleado_area">{empleado.area}</td>
                  <td>{empleado.fecha}</td>
                  <td
                    className="empleado_fecha_retraso"
                    style={{ display: "none" }}
                  >
                    {empleado.fecha_retraso_original}
                  </td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => redirigirInformacionRetraso(empleado)}
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

export default ControlRetrasos;
