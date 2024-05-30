import React, { useEffect, useState } from "react";
import axios from "axios";
import imgPrueba from '../../assets/images/backgroundImage.png';
import './DepartamentosCss.css';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardBody, CardText, Container } from 'reactstrap';

const endpoint = 'http://localhost:8000/api';
const endpointImg = 'http://localhost:8000';
const cookies = new Cookies();
const MostrarEdificios = () => {
    const [edificios, setEdificios] = useState ([]);

    useEffect(() => {
        getAllEdificios();
        cookies.remove('idEdif');
        cookies.remove('idDepa');
    }, []);

    const getAllEdificios = async () => {
        try {
            const response = await axios.get(`${endpoint}/edificios`);
            const edificios = response.data;
            setEdificios(edificios);
        } catch (error) {
            console.error("Error al obtener edificios:", error);
        }
    }

    const handleClickDepartamentos = (idEdif) => {
        cookies.set('idEdif', idEdif);
        window.location.href = '/dashboard/departamentos';
    };

    return(
        <>
        <Container>
            <h1 className="title">Edificios</h1>
            <div className= "row">
                {edificios.map((edificio) => (
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={edificio.id}>
                    <div className="d-flex h-100">
                        <Card className="mt-3 mb-3 flex-fill cardDepa" onClick={() => handleClickDepartamentos(edificio.id)}>
                            <CardImg
                                alt="Card image cap"
                                src={`${endpointImg}/${edificio.imagen_edificio}`}
                                style={{ objectFit: "cover", width: "100%", height: "235px", borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
                            />
                            <CardBody className="d-flex flex-column justify-content-between align-items-stretch">
                                <CardText>
                                    <p id="infoEdifcio">Edificio: {edificio.nombre_edificio}</p>
                                    <p id="infoEdifcio">N° de pisos: {edificio.cantidad_pisos}</p>
                                    <p id="infoEdifcio">Descripción: {edificio.descripcion_edificio}</p>
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                    </div>
                ))}
            </div>
        </Container>
        </>
    )
}

export default MostrarEdificios;
