import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

import {

  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  
  }
  from 'mdb-react-ui-kit';

function MarcarHora() {
  
  const [errors, setErrors] = useState({});
  const [hora, setHora] = useState('');
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      
      const ahora = new Date();
      const horas = ahora.getHours();
      const minutos = ahora.getMinutes();
      const segundos = ahora.getSeconds();

     
      const horaFormateada = `${horas}:${minutos}:${segundos}`;

     
      setHora(horaFormateada);
    }, 1000); 

 
    return () => clearInterval(intervalId);
  }, []); 
  useEffect(()=>{

  }, []);

  const [values, setValues] = useState({
    ci : "",
  });

  const handleInput = (e) => {
    console.log("ASASS")
    const {name, value} = e.target;
    setValues({
        ...values,
        [name]:value,
    });
  }

  const handleSubmit =  async (e) => {
    e.preventDefault(); 
    const validationErrors = {};

    if(!values.ci.trim()){
      validationErrors.ci = "Este campo es obligatorio"
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

        const data = new FormData();
        const parametros = {
          ci: values.ci
      };
      
        data.append("correo", values.correo);
        data.append("ci", values.ci);
        const res = await axios.post(`http://127.0.0.1:8000/api/marcar_hora_empleado`, data);
        let mensajeRecibido = res.data.mensaje;
        console.log(mensajeRecibido);
        if(mensajeRecibido === 'Ingreso realizado'){
          var horaActual = new Date().toLocaleTimeString();
          Swal.fire('Se marcó la hora de entrada correctamente', 'Hora actual: ' + horaActual, 'success');
        }
        if(mensajeRecibido === 'Update realizado'){
          var horaActual = new Date().toLocaleTimeString();
          Swal.fire('Se marcó la hora de salida correctamente', 'Hora actual: ' + horaActual, 'success');
        }
        if(mensajeRecibido === 'No existe el usuario'){
          Swal.fire('El carnet es incorrecto vuelva a intentarlo','','error');
        }
        if(mensajeRecibido === 'Ya marco entrada y salida'){
            Swal.fire('Usted ya marco su salida y entrada de hoy','','error');
        }
    }
}


  return (
    <MDBContainer>
      <MDBRow style={{ width: "1100px", maxWidth: "1200px" }}>
        <MDBCard>
          <MDBCardBody className="px-4">
            <div className="text-center"> 
              <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
                Marcar Hora
              </h3>
            </div>

            <MDBRow>
              
                <div className='text-center'>
                    <h2>Hora</h2>
                    <p style={{ fontWeight: "bold", fontSize: "30px" }}>{hora}</p>
                </div>
              
            </MDBRow>

            <MDBRow>
                <label htmlFor="form2" className="form-label fw-bold text-center" >Carnet:</label>
                
                <MDBCol md="6" style={{marginLeft: "275px"}}>
                <MDBInput
                  name="ci"
                  wrapperClass="mb-4"
                  size="lg"
                  id="form2"
                  type="number"
                  onBlur={handleInput}
                />
                 {errors.ci && (
                           <span className="advertencia-creEve">{errors.ci}</span>
                  )}
              </MDBCol>
            </MDBRow>
            <div className="text-center"> 
              <Button block onClick={handleSubmit} style={{ backgroundColor: '#65B8A6', borderColor: '#65B8A6' }}>
                Marcar Hora
              </Button>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );

};
export default MarcarHora;