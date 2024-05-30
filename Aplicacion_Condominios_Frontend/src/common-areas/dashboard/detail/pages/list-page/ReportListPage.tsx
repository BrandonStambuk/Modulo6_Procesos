import { useEffect, useState } from "react";
import { ReportReadDTO } from "../../interfaces/deatil";
import { getReports } from "../../services/report.service";

export default function ReportListPage() {
  const [reports, setReports] = useState<ReportReadDTO[] | null>(null);

  useEffect(() => {
    getReports().then((data) => {
      setReports(data);
    });
  }, []);

  return (
    <section>
      <h2 className="text-center mb-3"> Reportes </h2>

      <table className="table">
        <thead>
          <tr style={{ backgroundColor: "#f0f7da" }}>
            <th>Residente</th>
            <th>Area Común</th>
            <th>Producto</th>
            <th>Costo a reponer</th>
            <th>Cantidad a reponer</th>
            <th>Situación</th>
            <th>Información</th>
          </tr>
        </thead>
        <tbody>
          {reports === null ? (
            <tr>
              <td colSpan={7}>Loading...</td>
            </tr>
          ) : (
            reports.map((report, index) => {
              return (
                <tr key={index}>
                  <td>{report.residentName}</td>
                  <td>{report.commonAreaName}</td>
                  <td>{report.equipmentName}</td>
                  <td>{report.cosToReplace}</td>
                  <td>{report.countToReplace}</td>
                  <td>{report.situation}</td>
                  <td>{report.information}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </section>
  );
}
