import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { FaMoneyBill, FaCheck, FaTimes } from "react-icons/fa"; // Importa los íconos de billete, check y cross de react-icons
const endpoint = "http://localhost:8000/api";

const Expensas = () => {
    const [expensas, setExpensas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${endpoint}/obtener-expensas`);
                setExpensas(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleGenerarFormularioPago = (id) => {
        console.log(`Generar formulario pago de la expensa ${id}`);
        window.location.href = `/cobros/pagar-expensa/${id}`;
    };

    return (
        <div>
            <h2>Expensas</h2>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Propietario a Pagar</th>
                        <th>Fecha</th>
                        <th>Descripción de Servicios</th>
                        <th>Servicio a Pagar</th>
                        <th>Pagado</th>
                        <th>Monto</th>
                        <th>Pagar</th> {/* Columna para pagar */}
                    </tr>
                </thead>
                <tbody>
                    {expensas.map(expensa => (
                        <tr key={expensa.id}>
                            <td>{expensa.id}</td>
                            <td>{expensa.propietario_pagar}</td>
                            <td>{expensa.fecha}</td>
                            <td>{expensa.descripcion_servicios}</td>
                            <td>{expensa.servicio_pagar}</td>
                            <td>{expensa.pagado ? <FaCheck /> : <FaTimes />}</td>
                            <td>{expensa.monto}</td>
                            <td>
                                {/* Ícono de billete con manejador de eventos */}
                                <FaMoneyBill
                                    onClick={() => handleGenerarFormularioPago(expensa.id)}
                                    style={{
                                        cursor: expensa.pagado ? "not-allowed" : "pointer",
                                        opacity: expensa.pagado ? 0.5 : 1 // Establece la opacidad al 50% si la expensa está pagada
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Expensas;