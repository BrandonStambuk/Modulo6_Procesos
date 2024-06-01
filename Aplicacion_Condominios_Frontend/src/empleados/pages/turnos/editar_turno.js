import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {
    MDBBtn,
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

import axios from 'axios';
import Cookies from 'universal-cookie';
import '../../css/contract_register_style.css'
const cookies = new Cookies();

function EditarTurno() {

    const empleado = cookies.get('empleado_seleccionado');

    const [errors, setErrors] = useState({});

    const [horarios, setHorarios] = useState({
      Lunes: { hora1: "", hora2: "", checked: false },
      Martes: { hora1: "", hora2: "", checked: false },
      Miercoles: { hora1: "", hora2: "", checked: false },
      Jueves: { hora1: "", hora2: "", checked: false },
      Viernes: { hora1: "", hora2: "", checked: false },
      Sabado: { hora1: "", hora2: "", checked: false },
      Domingo: { hora1: "", hora2: "", checked: false },
    });

    const [horariosAntiguos, setHorariosAntiguos] = useState({});

    useEffect(()=>{
        modificarHorarios()
    }, []);

    const [selectedHorario, setSelectedHorario] = useState("personalizado");

    const modificarHorarios = () => {

      let horarios_alt = {
        Lunes: { hora1: "", hora2: "", checked: false },
        Martes: { hora1: "", hora2: "", checked: false },
        Miercoles: { hora1: "", hora2: "", checked: false },
        Jueves: { hora1: "", hora2: "", checked: false },
        Viernes: { hora1: "", hora2: "", checked: false },
        Sabado: { hora1: "", hora2: "", checked: false },
        Domingo: { hora1: "", hora2: "", checked: false },
      };

      for (let i = 0; i < empleado.working_hours.length; i++) {

        horarios_alt[empleado.working_hours[i].dia] = { hora1: empleado.working_hours[i].hora_entrada, hora2: empleado.working_hours[i].hora_salida, checked: true }
      }

      setHorarios(horarios_alt);
      setHorariosAntiguos(horarios_alt);
    };

    const cambiarHorario = (dia) => {
      const checkBox = document.getElementById(dia);
  
      setHorarios((prevHorarios) => ({
        ...prevHorarios,
        [dia]: {
          ...prevHorarios[dia],
          hora1: "",
          hora2: "",
          checked: checkBox.checked,
        },
      }));
    };

    const cambiarHorarioInferior = (e) => {
      const dia = e.target.name;
      const value = e.target.value;
  
      setHorarios((prevHorarios) => ({
        ...prevHorarios,
        [dia]: {
          ...prevHorarios[dia],
          hora1: value,
          checked: true,
        },
      }));
    };

    const cambiarHorarioSuperior = (e) => {
      const dia = e.target.name;
      const value = e.target.value;
  
      setHorarios((prevHorarios) => ({
        ...prevHorarios,
        [dia]: {
          ...prevHorarios[dia],
          hora2: value,
          checked: true,
        },
      }));
    };

    const handleHorarios = (horario, radioB) => {
      const nuevosHorarios = { ...horarios };
      for (const dia of dias) {
        switch (horario) {
          case 1:
            nuevosHorarios[dia] = {
              hora1: "20:00",
              hora2: "18:00",
              checked: true,
            };
            break;
          case 2:
            nuevosHorarios[dia] = {
              hora1: "18:00",
              hora2: "06:00",
              checked: true,
            };
            break;
          case 3:
            if (dia === "Domingo")
              nuevosHorarios[dia] = {
                hora1: "",
                hora2: "",
                checked: false,
              };
            else
              nuevosHorarios[dia] = {
                hora1: "08:00",
                hora2: "16:00",
                checked: true,
              };
            break;
          case 4:
            if (dia === "Domingo")
              nuevosHorarios[dia] = {
                hora1: "",
                hora2: "",
                checked: false,
              };
            else
              nuevosHorarios[dia] = {
                hora1: "16:00",
                hora2: "23:00",
                checked: true,
              };
            break;
          case 5:
            if (dia === "Domingo")
              nuevosHorarios[dia] = {
                hora1: "",
                hora2: "",
                checked: false,
              };
            else
              nuevosHorarios[dia] = {
                hora1: "23:00",
                hora2: "06:00",
                checked: true,
              };
            break;
          default:
            nuevosHorarios[dia] = {
              hora1: "",
              hora2: "",
              checked: false,
            };
        }
      }
      setHorarios(nuevosHorarios);
      setSelectedHorario(radioB);
    };
  
      const [dias, setDias] = useState([
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo"
      ]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(horarios);

      const validationErrors = {};

      for (let i = 0; i < dias.length; i++) {
        let confirmacionDia = document.getElementById(dias[i]);

        if (confirmacionDia.checked && !horarios[dias[i]].hora1.trim()) {
          validationErrors[dias[i] + "_inferior"] = "Este campo es obligatorio";
        }

        if (confirmacionDia.checked && !horarios[dias[i]].hora2.trim()) {
          validationErrors[dias[i] + "_superior"] = "Este campo es obligatorio";
        }
      }

      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        const url = `http://127.0.0.1:8000/api/borrar_horarios_dado_empleado/${empleado.id}`;
        axios.delete(url).then(async (respuesta) => {
          if (respuesta.data.status === 200) {
            for (let i = 0; i < dias.length; i++) {
              if (horarios[dias[i]].hora1) {
                const data = new FormData();
                data.append("dia", dias[i]);
                data.append("hora_entrada", horarios[dias[i]].hora1);
                data.append("hora_salida", horarios[dias[i]].hora2);
                data.append("empleado", empleado.id);
                const respuesta_horario = await axios.post(
                  `http://127.0.0.1:8000/api/add_working_hour`,
                  data
                );
                if (respuesta_horario.data.status === 200) {
                  console.log(respuesta_horario.data);
                }
              }
            }
            window.location.href = "./assignTurn";
          }
        });
      }
    };

    const cambiarHorario1 = (dia) => {
        let checkBox = document.getElementById(dia);
    
        let hora1 = document.getElementById("hora1"+dia);
        let hora2 = document.getElementById("hora2"+dia);
    
        if (checkBox.checked == true) {
          hora1.disabled = false;
          
          hora2.disabled = false;
    
        } else {
          hora1.disabled = true;
          hora1.value = '';
    
          hora2.disabled = true;
          hora2.value = '';
        }
    };
    
    return (
      <>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol lg="9" className="my-5">
              <MDBRow>
                <MDBCol className="d-flex align-items-center justify-content-center">
                  <h1 className="mb-4">Edicion de turno</h1>
                </MDBCol>
              </MDBRow>

              <MDBCard>
                <MDBCardBody className="px-4">
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
                      <strong className="mb-0">Fecha de inicio de contrato:</strong>
                      <p className="mb-0">
                        {empleado.contracts[0].fecha_inicio}
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
                      <strong className="mb-0">Fecha de fin de contrato:</strong>
                      <p className="mb-0">
                        {empleado.contracts[0].fecha_final === null
                          ? "Indefinido"
                          : empleado.contracts[0].fecha_final}
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
                      <p className="mb-0">{empleado.contracts[0].area}</p>
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
                      <p className="mb-0">{empleado.contracts[0].cargo}</p>
                    </div>
                  </div>
                </div>

                  <hr className="mx-n3" />

                  <MDBRow>
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">HORARIO DE TRABAJO</h6>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBRow className="justify-content-center align-items-center pt-4 pb-4">
                      <MDBCol md="9" className="pe-5">
                        <MDBRadio
                          name="HorariosTrabajo"
                          id="inlineRadio0"
                          value="Personalizado"
                          label="Personalizado"
                          inline
                          checked={selectedHorario === "personalizado"}
                          onChange={() => handleHorarios(0, "personalizado")} //Misma funcion que la anterior.
                        />
                        {/* Horario de Seguridad */}
                        {empleado.contracts[0].area === "Seguridad" && (
                          <>
                            <MDBRadio
                              name="HorariosTrabajo"
                              id="inlineRadio1"
                              value="Diurno"
                              label="Diurno"
                              inline
                              checked={selectedHorario === "diurno"}
                              onChange={() => handleHorarios(1, "diurno")} //Cambiar funcion
                            />
                            <MDBRadio
                              name="HorariosTrabajo"
                              id="inlineRadio2"
                              value="Nocturno"
                              label="Nocturno"
                              inline
                              checked={selectedHorario === "nocturno"}
                              onChange={() => handleHorarios(2, "nocturno")} //Misma funcion que la anterior.
                            />
                          </>
                        )}
                        {/* Horario de Limepieza */}
                        {empleado.contracts[0].area === "Limpieza" && (
                          <>
                            <MDBRadio
                              name="HorariosTrabajo"
                              id="inlineRadio3"
                              value="Mañana"
                              label="Mañana"
                              inline
                              checked={selectedHorario === "maniana"}
                              onChange={() => handleHorarios(3, "maniana")} //Cambiar funcion
                            />
                            <MDBRadio
                              name="HorariosTrabajo"
                              id="inlineRadio4"
                              value="Tarde"
                              label="Tarde"
                              inline
                              checked={selectedHorario === "tarde"}
                              onChange={() => handleHorarios(4, "tarde")} //Misma funcion que la anterior.
                            />
                            <MDBRadio
                              name="HorariosTrabajo"
                              id="inlineRadio5"
                              value="Noche"
                              label="Noche"
                              inline
                              checked={selectedHorario === "noche"}
                              onChange={() => handleHorarios(5, "noche")} //Misma funcion que la anterior.
                            />

                          </>
                        )}
                      </MDBCol>
                    </MDBRow>
                    </MDBRow>

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBRow>
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Turnos</h6>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      {dias.map((dia) => {

                        return (
                          <>
                              <MDBRow className="justify-content-center align-items-center mb-2">
                                <MDBCol md="2">
                                  <h5>{dia}</h5>
                                </MDBCol>

                                <MDBCol md="3" className="mb-2">
                                  <MDBInput
                                    type="time"
                                    id={"hora1" + dia}
                                    name={dia}
                                    onChange={(e) => cambiarHorarioInferior(e)}
                                    disabled={!horarios[dia].checked}
                                    value={horarios[dia].hora1}
                                  />
                                  {errors[dia + "_inferior"] && (
                                    <span className="advertencia-creEve">
                                      {errors[dia + "_inferior"]}
                                    </span>
                                  )}
                                </MDBCol>

                                <MDBCol md="3" className="mb-2">
                                  <MDBInput
                                    type="time"
                                    id={"hora2" + dia}
                                    name={dia}
                                    onChange={(e) => cambiarHorarioSuperior(e)}
                                    disabled={!horarios[dia].checked}
                                    value={horarios[dia].hora2}
                                  />
                                  {errors[dia + "_superior"] && (
                                    <span className="advertencia-creEve">
                                      {errors[dia + "_superior"]}
                                    </span>
                                  )}
                                </MDBCol>

                                <MDBCol md="1">
                                  <input
                                    type="checkbox"
                                    id={dia}
                                    name="vehicle1"
                                    value="Bike"
                                    onClick={() => cambiarHorario(dia)}
                                    checked={horarios[dia].checked}
                                  />
                                </MDBCol>
                              </MDBRow>
                            
                          </>
                        );
                      })}
                    </MDBRow>
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
  
  export default EditarTurno;