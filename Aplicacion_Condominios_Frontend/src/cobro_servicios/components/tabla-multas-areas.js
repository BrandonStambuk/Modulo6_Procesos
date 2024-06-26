import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMoneyBillAlt } from "react-icons/fa";

const TablaMultasAreas = () => {
  const { idPreaviso } = useParams();
  const endpoint = "http://localhost:8000/api";
  const [multas, setMultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerMultas = async () => {
      try {
        const response = await axios.get(`${endpoint}/reports`);
        const data = response.data.data || [];
        console.log(data); // Asegurarse de que data es un arreglo
        setMultas(data);
      } catch (error) {
        console.error("Error al obtener los reportes", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerMultas();
  }, [idPreaviso]);

  const handlePagoClick = async (idReport, idResidente, areaComunNombre, idReservation) => {
    console.log("ID Reporte:", idReport);
    console.log("ID Residente:", idResidente);
    console.log("Nombre del Área Común:", areaComunNombre);
    console.log("ID RESERVA:", idReservation);
    try {
      const response = await axios.get(`${endpoint}/area-comun/id/${areaComunNombre}`);
      const idAreaComun = response.data.id; // Obtener el ID del área común desde la respuesta
      console.log("ID del Área Común:", idAreaComun);

      // Navegar a la nueva ruta con el ID del área común y el ID de la reserva
      navigate(`/cobros/pago-multa-area/${idReport}/${idResidente}/${idAreaComun}/${idReservation}`);
    } catch (error) {
      console.error("Error al obtener el ID del área común", error);
      // Manejo de errores según sea necesario
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>TablasAreasComunes {idPreaviso}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID Reporte</th>
      
            <th>Area Común</th>
            <th>Producto</th>
            <th>Costo a Reponer</th>
            <th>Cantidad a Reponer</th>
            <th>Situación</th>
            <th>Información</th>
            <th>Pagar</th>
          </tr>
        </thead>
        <tbody>
          {multas.map((multa) => (
            <tr key={multa.id}>
              <td>{multa.id}</td>
              <td>{multa.commonAreaName}</td>
              <td>{multa.equipmentName}</td>
              <td>{multa.cosToReplace}</td>
              <td>{multa.countToReplace}</td>
              <td>{multa.situation}</td>
              <td>{multa.information}</td>
              <td>
                <FaMoneyBillAlt
                  onClick={() =>
                    handlePagoClick(multa.id, multa.id_residente, multa.commonAreaName, multa.id_reservation)
                  }
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaMultasAreas;
