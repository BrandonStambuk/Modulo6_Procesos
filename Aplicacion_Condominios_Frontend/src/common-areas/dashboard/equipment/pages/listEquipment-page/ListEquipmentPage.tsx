import React, { useState, useEffect } from "react";
import { Equipment } from "../../interfaces/equipment";
import Swal from "sweetalert2";

export interface ListElementProps {
  showForm: (product?: Equipment) => void;
}

export const ListEquipmentPage: React.FC<ListElementProps> = ({ showForm }) => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  function fetchEquipment() {
    fetch("http://localhost:8000/api/equipments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unexpected server response");
        }
        return response.json();
      })
      .then((data) => {
        setEquipment(data.equipamientos);
      })
      .catch((error) => console.log("Error", error));
  }

  useEffect(() => fetchEquipment(), []);

  function deleteProduct(id: number) {
    fetch(`http://localhost:8000/api/eliminar-equipo/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => fetchEquipment());
  }

  return (
    <>
      <h2 className="text-center mb-3"> Lista de elementos </h2>
      <button
        onClick={() => showForm()}
        type="button"
        className="btn btn-primary me-2 mb-4"
      >
        {" "}
        Crear{" "}
      </button>
      <button
        onClick={fetchEquipment}
        type="button"
        className="btn btn-outline-primary me-2 mb-4"
      >
        {" "}
        Refrescar{" "}
      </button>
      <table className="table">
        <thead>
          <tr style={{ backgroundColor: "#f0f7da" }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Costo</th>
            {/* <th>Id Area</th> */}
            <th>Area común</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((equipments, index) => {
            return (
              <tr key={index}>
                <td>{equipments.id}</td>
                <td>{equipments.nombre}</td>
                <td>{equipments.descripcion}</td>
                <td>{equipments.cantidad}</td>
                <td>{equipments.costo}</td>
                {/* <td>{equipments.area_comun_id}</td> */}
                <td>{equipments.area_comun_nombre}</td>
                <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                  <button
                    onClick={() => showForm(equipments)}
                    type="button"
                    className="btn btn-primary btn-sm me-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "¿Estás seguro?",
                        text: "No podrás revertir esto",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Sí, eliminar",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteProduct(equipments.id);
                        }
                      });
                    }}
                    type="button"
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
