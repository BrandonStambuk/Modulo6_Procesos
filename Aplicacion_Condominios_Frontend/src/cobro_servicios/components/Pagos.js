import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import jsPDF from "jspdf";
import { FaFileDownload } from 'react-icons/fa';

const Pagos = () => {
    const { id } = useParams();
    const endpoint = "http://localhost:8000/api";
    const [pagos, setPagos] = useState([]);
    const [expensa, setExpensa] = useState(null);
    const [propietarioPagar, setPropietarioPagar] = useState("");
    const [servicioPagar, setServicioPagar] = useState("");
    const [descripcionServicios, setDescServicios] = useState("");
    const [fechaPago, setFechaPago] = useState("")
    const [idPropietario, setIdPropietario] = useState("");
    const [idExpensa, setIDExpensa] = useState("");
    const [monto, setMonto] = useState("");

    useEffect(() => {
        const obtenerPagos = async () => {
            try {
                const response = await axios.get(`${endpoint}/obtener-pagos-residente/${id}`);
                setPagos(response.data.data);
                console.log("Pagos:", response.data.data);
            } catch (error) {
                console.error('Error al obtener los pagos', error);
            }
        };

        obtenerPagos();
    }, [id]);

    const generatePDF = async (expensaId) => {
        // Función para generar el PDF
        try {
            const response = await axios.get(`${endpoint}/obtener-expensas/${expensaId}`);
            const expensaData = response.data.data;
            setPropietarioPagar(expensaData.propietario_pagar);
            const doc = new jsPDF();
            doc.text("Administracion: ProcesosA. Condominios", 20, 10);
            doc.text("          --------------------------------------------------------------------------------", 20, 20);
            doc.text("                        (COPIA)   Recibo de Pago de expensa", 20, 30);
            doc.text("          --------------------------------------------------------------------------------", 20, 40);
            doc.text(`Propietario/Titular: ${expensaData.propietario_pagar}`, 20, 50);
            doc.text(`Servicio a pagar: ${expensaData.servicio_pagar}`, 20, 60);
            doc.text(`Descripcion del servicio: ${expensaData.descripcion_servicios}`, 20, 70);
            doc.text(`Fecha del pago: ${expensaData.fecha}`, 20, 80 )
            // Insertar datos en el PDF
            if (expensaData.monto) {
                doc.text(`Monto cancelado: ${expensaData.monto}`, 20, 90);
            }
         
            // Guardar el PDF
            doc.save("recibo_pago_expensa.pdf");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h2>Pagos realizados por el propietario/titular: {propietarioPagar}</h2>
            <table className="table">
                <thead>
                    <tr>
                        
                        <th>Monto cancelado</th>
                        <th>Descargar Recibo</th> {/* Nueva columna para descargar recibo */}
                    </tr>
                </thead>
                <tbody>
                    {pagos.map(pago => (
                        <tr key={pago.id}>
                            
                            <td>{pago.montoPagar}</td>
                            <td>
            <FaFileDownload onClick={() => generatePDF(pago.expensa_id)} style={{ cursor: "pointer" }} />
        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Pagos;