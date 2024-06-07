import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRadio,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
function ContractRegister() {

    const empleado = cookies.get('id_empleado_seleccionado');

    const [errors, setErrors] = useState({});
    const [areas, setAreas] = useState([]);
    const [beneficios, setBeneficios] = useState([]);
    const [areas_comunes, setAreasComunes] = useState([]);
    const [edificios, setEdificios] = useState([]);

    const [beneficiosSelect, setBeneficiosSelect] = useState([]);
    const [beneficiosList, setBeneficiosList] = useState([]);
    const [costoEmpresa, setCostoEmpresa] = useState(0);
    const [costoEmpleado, setCostoEmpleado] = useState(0);
    const selectedBeneficioEstatico = "Seleccione beneficios";

    useEffect(()=>{
      obtenerAreas()
      obtenerBeneficios()
      obtenerAreasComunes()
      obtenerEdificios()
      marcarBotonesRadio()
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
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });

        if (e.target.name === "tipo_contrato") {
          if (e.target.value === "Fijo") {
            document.getElementById("fecha_final").disabled = true;
          } else {
            document.getElementById("fecha_final").disabled = false;
          }
        }
    };
    
    const handleSubmit =  async (e) => {
        e.preventDefault(); 

        console.log(values)
        const validationErrors = {};

        if(!values.fecha_inicio.trim()){
            validationErrors.fecha_inicio = "Este campo es obligatorio"
        }

        if(!values.fecha_final.trim() && values.tipo_contrato === "Temporal"){
            validationErrors.fecha_final = "Este campo es obligatorio"
        }

        
        if(!values.asignacion.trim()){
          validationErrors.asignacion = "Seleccione una asignacion"
        }

        if(!values.area.trim()){
            validationErrors.area = "Seleccione una area"
        }

        if(!values.cargo.trim()){
            validationErrors.cargo = "Seleccione un cargo"
        }

        if(!values.salario.trim()){
            validationErrors.salario = "Este campo es obligatorio"
        }else if (!(Number(values.salario) > 2123)) {
            validationErrors.salario = "El salario debe ser un numero entero igual o mayor a 2124 (Minimo Nacional)";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
          const data = new FormData();

          data.append("tipo_contrato", values.tipo_contrato);
          data.append("fecha_inicio", values.fecha_inicio);
          data.append("fecha_final", values.fecha_final);
          data.append("area", values.area);
          data.append("cargo", values.cargo);
          data.append("beneficios", values.beneficios);
          data.append("salario", values.salario);
          data.append("empleado", empleado.id);

          const res = await axios.post(
            `http://127.0.0.1:8000/api/add_contract`,
            data
          );

          if (res.data.status === 200) {
            const data_contrato = new FormData();
            data_contrato.append("estado_contrato", "Contratado");
            console.log(res);
            const respuesta_estado = await axios.post(
                `http://127.0.0.1:8000/api/updateContractStatus/${empleado.id}`,
                data_contrato
            );
            if (respuesta_estado.data.status === 200) {
                console.log(respuesta_estado);
            }
            window.location.href = "./assignContract";
          }
        }
    };

    const manejarSelectArea = ()  => {
        setValues({
            ...values,
            area:document.getElementById("select_area").value,
        });
    };

    const manejarSelectCargo = ()  => {
        setValues({
            ...values,
            cargo:document.getElementById("select_cargo").value,
        });
    };

    const obtenerAreas = async ()  => {
      const respuesta = await axios.get(`http://127.0.0.1:8000/api/get_all_areas`);
      setAreas(respuesta.data.areas)
    };

    const obtenerBeneficios = async ()  => {
      const respuesta = await axios.get(`http://127.0.0.1:8000/api/get_all_benefits`);
      setBeneficiosSelect(respuesta.data.beneficios);
      //setBeneficios(respuesta.data.beneficios);
    };

    const obtenerAreasComunes = async ()  => {
      const response = await fetch("http://localhost:8000/api/common-areas/");
      const {
        data: { commonAreas },
      } = await response.json();
      setAreasComunes(commonAreas)
      console.log(commonAreas)
    };

    const obtenerEdificios = async ()  => {
      const respuesta = await axios.get("http://localhost:8000/api/edificios");
      setEdificios(respuesta.data)
    };

    const cambiarAsignacion = (e)  => {
      
      //document.querySelector("#desplegable-tipo_contrato").value;
      if (e.target.value === "Areas Comunes") {
        document.getElementById("areas_comunes").style.display = "block";
        document.getElementById("edificios").style.display = "none";
      }

      if (e.target.value === "Edificios") {
        document.getElementById("areas_comunes").style.display = "none";
        document.getElementById("edificios").style.display = "block";
      } 

    };

    const manejarSelectAsignacion = (e)  => {
      setValues({
          ...values,
          asignacion: e.target.value,
      });
      
    };

    const eliminarBeneficioLista = (beneficio) => {
      const nuevaLista = beneficiosList.filter(b => b.nombre !== beneficio.nombre);
      setBeneficiosList(nuevaLista);
      setBeneficiosSelect([...beneficiosSelect, beneficio]);
      calcularCosto(nuevaLista);
    };
  
    const manejarBeneficioSelect = (e) => {
      const selectedBeneficio = e.target.value;
      const beneficio = beneficiosSelect.find(b => b.nombre === selectedBeneficio);
      if(beneficio){
        const nuevaLista = [...beneficiosList, beneficio];
        setBeneficiosList(nuevaLista);
        setBeneficiosSelect(beneficiosSelect.filter(b => b.nombre !== selectedBeneficio));
        calcularCosto(nuevaLista);
      }
    };
  
    const calcularCosto = (nuevaLista) => {
      const totalEmpresa = calcularCostoEmpresa(nuevaLista);
      const totalEmpleado = calcularCostoEmpleado(nuevaLista);
      setCostoEmpresa(totalEmpresa);
      setCostoEmpleado(totalEmpleado)
    }

    const calcularCostoEmpresa = (beneficiosList) => {
      return beneficiosList.reduce((acc, beneficio) => acc + beneficio.costo_empresa, 0);
    };

    const calcularCostoEmpleado = (beneficiosList) => {
      return beneficiosList.reduce((acc, beneficio) => acc + beneficio.costo_empleado, 0);
    };

    const marcarBotonesRadio = () => {
      document.getElementById("inlineRadio1").checked = true;
      document.getElementById("areas_comunes_boton").checked = true;
    }

    return (
      <>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol lg="9" className="my-5">
              <MDBRow>
                <MDBCol className="d-flex align-items-center justify-content-center">
                  <h1 className="mb-4">Registro de contrato</h1>
                </MDBCol>
              </MDBRow>

              <MDBCard>
                <MDBCardBody className="px-4">
                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Tipo de Contrato</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBRadio
                        name="tipo_contrato"
                        id="inlineRadio1"
                        value="Fijo"
                        label="Fijo"
                        inline
                        onChange={handleInput}
                      />
                      <MDBRadio
                        name="tipo_contrato"
                        id="inlineRadio2"
                        value="Temporal"
                        label="Temporal"
                        inline
                        onChange={handleInput}
                      />
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Empleado</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        id="form2"
                        type="email"
                        value={empleado.nombre + " " + empleado.apellido}
                      />
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Fecha de Inicio</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        id="form2"
                        type="date"
                        name="fecha_inicio"
                        onBlur={handleInput}
                      />
                      {errors.fecha_inicio && (
                        <span className="advertencia-creEve">
                          {errors.fecha_inicio}
                        </span>
                      )}
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Fecha de Finalización</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        id="fecha_final"
                        type="date"
                        name="fecha_final"
                        onBlur={handleInput}
                        disabled
                      />
                      {errors.fecha_final && (
                        <span className="advertencia-creEve">
                          {errors.fecha_final}
                        </span>
                      )}
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />
                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Asignacion</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBRadio
                        name="asignacion"
                        value="Areas Comunes"
                        label="Areas Comunes"
                        id="areas_comunes_boton"
                        inline
                        onChange={cambiarAsignacion}
                      />
                      <MDBRadio
                        name="asignacion"
                        value="Edificios"
                        label="Edificios"
                        inline
                        onChange={cambiarAsignacion}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow
                    className="align-items-center pt-4 pb-3"
                    id="areas_comunes"
                  >
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Asignacion</h6>
                    </MDBCol>
                    <MDBCol md="9" className="pe-5">
                      <Form.Select
                        aria-label="Default select example"
                        id="select_area"
                        onChange={manejarSelectAsignacion}
                      >
                        <option disabled selected>
                          {" "}
                          Seleccione el area comun
                        </option>
                        {areas_comunes.map((area_comun, index) => {
                          return (
                            <>
                              <option value={area_comun.id} key={index}>
                                {area_comun.name}
                              </option>
                            </>
                          );
                        })}
                      </Form.Select>
                      {errors.asignacion && (
                        <span className="advertencia-creEve">
                          {errors.asignacion}
                        </span>
                      )}
                    </MDBCol>
                  </MDBRow>

                  <MDBRow
                    className="align-items-center pt-4 pb-3"
                    style={{ display: "none" }}
                    id="edificios"
                  >
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Asignacion</h6>
                    </MDBCol>
                    <MDBCol md="9" className="justify-content-md-center pe-5">
                      <Form.Select
                        aria-label="Default select example"
                        id="select_area"
                        onChange={manejarSelectAsignacion}
                      >
                        <option disabled selected>
                          {" "}
                          Seleccione el edificio
                        </option>
                        {edificios.map((edificio, index) => {
                          return (
                            <>
                              <option value={edificio.id} key={index}>
                                {edificio.nombre_edificio}
                              </option>
                            </>
                          );
                        })}
                      </Form.Select>
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Area</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <Form.Select
                        aria-label="Default select example"
                        id="select_area"
                        onChange={manejarSelectArea}
                      >
                        <option disabled selected>
                          {" "}
                          Seleccione una area
                        </option>
                        {areas.map((area) => {
                          return (
                            <>
                              <option value={area.nombre}>{area.nombre}</option>
                            </>
                          );
                        })}
                      </Form.Select>
                      {errors.area && (
                        <span className="advertencia-creEve">
                          {errors.area}
                        </span>
                      )}
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Cargo</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <Form.Select
                        aria-label="Default select example"
                        id="select_cargo"
                        onChange={manejarSelectCargo}
                      >
                        <option disabled selected>
                          {" "}
                          Seleccione un cargo
                        </option>
                        <option value="Encargado">Encargado</option>
                        <option value="Subordinado">Subordinado</option>
                      </Form.Select>
                      {errors.cargo && (
                        <span className="advertencia-creEve">
                          {errors.cargo}
                        </span>
                      )}
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Beneficios</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <Form.Select
                        className="mb-3"
                        aria-label="Default select example"
                        id="select_beneficio"
                        value={selectedBeneficioEstatico}
                        onChange={manejarBeneficioSelect}
                      >
                        <option disabled selected>
                          {" "}
                          Seleccione beneficios
                        </option>
                        {beneficiosSelect.map((beneficio) => {
                          return (
                            <>
                              <option
                                key={beneficio.nombre}
                                value={beneficio.nombre}
                              >
                                {beneficio.nombre}
                              </option>
                            </>
                          );
                        })}
                      </Form.Select>
                      {beneficiosList.length > 0 && (
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
                                <th>Beneficio</th>
                                <th>Costo empresa</th>
                                <th>Costo empleado</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {beneficiosList.map((beneficioL) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{beneficioL.nombre}</td>
                                      <td>
                                        {beneficioL.costo_empresa === 0
                                          ? "S/C"
                                          : beneficioL.costo_empresa}
                                      </td>
                                      <td>
                                        {beneficioL.costo_empleado === 0
                                          ? "S/C"
                                          : beneficioL.costo_empleado}
                                      </td>
                                      <td>
                                        <Button
                                          variant="outline-danger"
                                          onClick={() =>
                                            eliminarBeneficioLista(beneficioL)
                                          }
                                        >
                                          x
                                        </Button>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                              <tr>
                                <th>Costo total</th>
                                <td>{costoEmpresa}</td>
                                <td>{costoEmpleado}</td>
                                <td>{costoEmpresa + costoEmpleado}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      )}
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Salario</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        id="form2"
                        type="number"
                        name="salario"
                        onBlur={handleInput}
                      />
                      {errors.salario && (
                        <span className="advertencia-creEve">
                          {errors.salario}
                        </span>
                      )}
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow>
                    <MDBCol className="d-flex align-items-center justify-content-center">
                      <Button
                        block
                        className="my-4"
                        size="lg"
                        onClick={handleSubmit}
                        style={{
                          backgroundColor: "#65B8A6",
                          borderColor: "#65B8A6",
                        }}
                      >
                        Contratar
                      </Button>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
  
  export default ContractRegister;