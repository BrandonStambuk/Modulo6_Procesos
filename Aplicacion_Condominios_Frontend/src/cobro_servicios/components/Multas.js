import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 

const Multas = () => {
    const { idPreaviso } = useParams();
    const endpoint = "http://localhost:8000/api";
    const [multas, setMultas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerMultas = async () => {
            try {
                const response = await axios.get(`${endpoint}/obtener-multas-preaviso/${idPreaviso}`);
                setMultas(response.data.multas); 
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las multas', error);
                setLoading(false);
            }
        };
        obtenerMultas();
    }, [idPreaviso]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="container">
            <h2>Multas del Preaviso ID: {idPreaviso}</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción de Servicio</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Preaviso ID</th>
                    </tr>
                </thead>
                <tbody>
                    {multas.map(multa => (
                        <tr key={multa.id}>
                            <td>{multa.id}</td>
                            <td>{multa.descripcion}</td>
                            <td>{multa.monto}</td>
                            <td>{multa.fecha}</td>
                            <td>{multa.preaviso_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Multas;