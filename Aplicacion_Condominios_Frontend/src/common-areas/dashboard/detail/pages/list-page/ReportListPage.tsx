import React, { useEffect, useState } from "react";
import { ReportReadDTO } from "../../interfaces/deatil";
import { getReports } from "../../services/report.service";
import { FaEnvelope, FaMoneyBillAlt } from "react-icons/fa"; // Importa el icono de billete
import ReservationModal from "./ReservationModal";
import { ToastContainer } from "react-toastify";

export default function ReportListPage() {
  const [reports, setReports] = useState<ReportReadDTO[] | null>(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedCommonArea, setSelectedCommonArea] = useState<string | null>(null);

  useEffect(() => {
    getReports().then((data) => {
      setReports(data);
    });
  }, []);

  const handleOpenModal = (commonAreaName: string) => {
    setSelectedCommonArea(commonAreaName);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  return (
    <section>
      <h2 className="text-center mb-3">Reportes</h2>

      <table className="table">
        <thead>
          <tr style={{ backgroundColor: "#f0f7da" }}>
            <th>ID</th>
            <th>Residente</th>
            <th>Area Común</th>
            <th>Producto</th>
            <th>Costo a reponer</th>
            <th>Cantidad a reponer</th>
            <th>Situación</th>
            <th>Información</th>
            <th>Notificar</th>
            <th>Pagos</th> {/* Nueva columna para el icono de billete */}
          </tr>
        </thead>
        <tbody>
          {reports === null ? (
            <tr>
              <td colSpan={9}>Loading...</td> {/* Ajusta el colSpan para la nueva columna */}
            </tr>
          ) : (
            reports.map((report, index) => {
              return (
                <tr key={index}>
                  <td>{report.id}</td>
                  <td>{report.residentName}</td>
                  <td>{report.commonAreaName}</td>
                  <td>{report.equipmentName}</td>
                  <td>{report.cosToReplace}</td>
                  <td>{report.countToReplace}</td>
                  <td>{report.situation}</td>
                  <td>{report.information}</td>
                  <td>
                    <FaEnvelope onClick={() => handleOpenModal(report.commonAreaName)} />
                  </td>
                  <td>
                    <FaMoneyBillAlt /> {/* Icono de billete */}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {modalShow && selectedCommonArea && (
        <ReservationModal show={modalShow} handleClose={handleCloseModal} commonAreaName={selectedCommonArea} />
      )}
      <ToastContainer />
    </section>
  );
}
