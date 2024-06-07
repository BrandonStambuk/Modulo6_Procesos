import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./report-Page.css";
import { getResidents } from "../../../shared/services/resident.service";
import { getEquipmentsByCommonAreaId } from "../../../equipment/services/equipment.service";
import { Equipment } from "../../../equipment/interfaces/equipment";
import Swal from "sweetalert2";
import { CommonArea } from "../../../common-area/interfaces/common-areas";
import { ReportCreateDTO, ReportFormData } from "../../interfaces/deatil";
import { createReport } from "../../services/report.service";
import { useParams } from "react-router-dom";
import { Reservation } from "../../../reservation/interfaces/reservations";
import { getReservationById } from "../../../reservation/services/reservation.service";
import { getCommonAreaById } from "../../../common-area/services/common-area.service";

function ReportPage() {
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<ReportFormData>({
    idUsuario: 0,
    idProducto: 0,
    costo: 0,
    costoReponer: 0,
    cantidadActual: 0,
    cantidadReponer: 0,
    situacion: "",
    informacionAdicional: "",
  });

  const [residents, setResidents] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );
  const [reservation, setReservation] = useState<Reservation>();
  const [commonArea, setCommonArea] = useState<CommonArea>();

  useEffect(() => {
    if (id) {
      getReservationById(parseInt(id, 10)).then((data) => {
        setReservation(data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (reservation) {
      const get = async () => {
        const data = await getEquipmentsByCommonAreaId(
          reservation.idCommonArea
        );

        setEquipments(data);
      };

      get();
    }
  }, [reservation]);

  useEffect(() => {
    if (reservation) {
      const get = async () => {
        const data = await getCommonAreaById(
          reservation.idCommonArea as number
        );

        setCommonArea(data);
      };

      get();
    }
  }, [reservation]);

  useEffect(() => {
    getResidents().then((data) => {
      const res = data.map((resident) => ({
        id: resident.id,
        name: `${resident.nombre_residente} ${resident.apellidos_residente}`,
      }));
      setResidents(res);
    });
  }, []);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "idProducto") {
      const equipment = equipments.find(
        (item) => item.id === parseInt(value, 10)
      );

      if (equipment) {
        setSelectedEquipment(equipment);
        setFormData((prevState) => ({
          ...prevState,
          costo: equipment.costo,
          cantidadActual: equipment.cantidad,
        }));
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const element = Object.fromEntries(formData.entries());

    if (
      !element.idUsuario ||
      !element.idProducto ||
      element.costoReponer === "0" ||
      element.cantidadReponer === "0" ||
      element.situacion === "" ||
      element.informacionAdicional === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Todos los datos son requeridos",
      });
      return;
    }

    const report: ReportCreateDTO = {
      Id_reservation: parseInt(id || "0", 10),
      Id_residente: parseInt(element.idUsuario.valueOf() as string, 10),
      Id_areaComun: reservation?.idCommonArea as number,
      Id_equipment: parseInt(element.idProducto.valueOf() as string, 10),
      Costo_reponer: parseInt(element.costoReponer.valueOf() as string, 10),
      Cantidad_reponer: parseInt(
        element.cantidadReponer.valueOf() as string,
        10
      ),
      Situacion: element.situacion as string,
      Info: element.informacionAdicional as string,
    };

    try {
      const response = await createReport(report);
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Reporte creado",
      });
      resetForm();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        text: error.message,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      idUsuario: 0,
      idProducto: 0,
      costo: 0,
      costoReponer: 0,
      cantidadActual: 0,
      cantidadReponer: 0,
      situacion: "",
      informacionAdicional: "",
    });
  };

  return (
    <>
      <h2>Crear Reporte</h2>
      <form onSubmit={handleSubmit} className="form-container-detail">
        <div className="form-group">
          <label>Nombre Residente:</label>
          <select
            name="idUsuario"
            value={formData.idUsuario}
            onChange={handleChange}
          >
            <option value={0} disabled>
              Seleccione un residente
            </option>
            {residents.map((resident) => {
              return (
                <option key={resident.id} value={resident.id}>
                  {resident.name}
                </option>
              );
            })}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div className="form-group">
            <label>Nombre Área Común:</label>
            <p>{commonArea ? commonArea.name : ""}</p>
          </div>
          <div className="form-group">
            <label>Nombre Producto:</label>
            <select
              name="idProducto"
              value={formData.idProducto}
              onChange={handleChange}
            >
              <option value={0} disabled>
                Seleccione un producto
              </option>
              {equipments.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group-in-line">
          <label
            style={{
              fontWeight: "bold",
            }}
          >
            Costo:
          </label>
          <span>{selectedEquipment ? selectedEquipment.costo : ""}</span>
        </div>
        <div className="form-group-in-line">
          <label
            style={{
              fontWeight: "bold",
            }}
          >
            Cantidad Actual:
          </label>
          <p>{selectedEquipment ? selectedEquipment.cantidad : ""}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div className="form-group">
            <label>Costo a Reponer:</label>
            <input
              type="number"
              name="costoReponer"
              value={formData.costoReponer}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Cantidad a Reponer:</label>
            <input
              type="number"
              name="cantidadReponer"
              value={formData.cantidadReponer}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Situación:</label>
          <select
            name="situacion"
            value={formData.situacion}
            onChange={handleChange}
          >
            <option value="roto">Roto</option>
            <option value="perdido">Perdido</option>
          </select>
        </div>

        <div className="form-group">
          <label>Información Adicional:</label>
          <textarea
            name="informacionAdicional"
            value={formData.informacionAdicional}
            onChange={handleChange}
          />
        </div>
        <button className="btn-submit__report-page" type="submit">
          Reportar
        </button>
      </form>
    </>
  );
}

export default ReportPage;
