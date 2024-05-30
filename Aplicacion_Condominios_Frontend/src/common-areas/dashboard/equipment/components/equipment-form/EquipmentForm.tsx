import React, { useState, useEffect } from "react";
import { Equipment } from "../../interfaces/equipment";
import Swal from "sweetalert2";

export interface FormElementProps {
  showList: () => void;
  product?: Equipment;
}

export const EquipmentForm: React.FC<FormElementProps> = ({
  showList,
  product,
}) => {
  // const [idCounter, setIdCounter] = useState<number>(0);

  const [commonAreas, setCommonAreas] = useState<string[]>([]);
  useEffect(() => {
    const getCommonAreas = async () => {
      const response = await fetch("http://localhost:8000/api/common-areas");
      const data = await response.json();
      return data;
    };
    getCommonAreas().then((response) => {
      const { data } = response;
      const { commonAreas } = data;
      const commonAreasFormatted = commonAreas.map((area: any) => area.name);
      setCommonAreas(commonAreasFormatted);
    });
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:3004/equipment")
  //     .then((response) => response.json())
  //     .then((data: { id: string }[]) => {
  //       const maxId = data.reduce(
  //         (max: number, item: { id: string }) =>
  //           Math.max(max, parseInt(item.id)),
  //         0
  //       );
  //       setIdCounter(maxId + 1);
  //     });
  // }, []);

  // const generateSequentialId = () => {
  //   const sequentialId = idCounter.toString();
  //   setIdCounter(idCounter + 1);
  //   return sequentialId;
  // };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const element = Object.fromEntries(formData.entries());
    // if (!element.id) {
    //   element.id = generateSequentialId();
    // }

    if (
      !(
        // element.id ||
        (
          element.nombre ||
          element.descripcion ||
          element.costo ||
          element.area_comun_id ||
          element.cantidad
        )
        // || element.area_comun_nombre
      )
    ) {
      // console.log("Todos los datos son requeridos");
      Swal.fire({
        icon: "error",
        title: "Todos los datos son requeridos",
      });
      return;
    }

    if (product?.id) {
      fetch(`http://localhost:8000/api/editar-equipo/${product?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(element),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error");
          }
          return response.json();
        })
        .then((data) => {
          showList();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } else {
      fetch("http://localhost:8000/api/equipments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(element),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error");
          }
          return response.json();
        })
        .then((data) => {
          showList();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }
  return (
    <>
      <h2 className="text-center mb-3">
        {product?.id ? "Editar producto" : "Crear nuevo producto"}
      </h2>
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <form onSubmit={(event) => handleSubmit(event)}>
            {/* {product?.id && (
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label"> ID </label>
                <div className="col-sm-8">
                  <input
                    readOnly
                    className="form-control-plaintext"
                    name="id"
                    defaultValue={product ? product.id : ""}
                  />
                </div>
              </div>
            )} */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label"> Nombre </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="nombre"
                  defaultValue={product ? product.nombre : ""}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label"> Descripción </label>
              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  name="descripcion"
                  defaultValue={product ? product.nombre : ""}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label"> Costo </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="costo"
                  defaultValue={product ? product.costo : ""}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label"> Cantidad </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="cantidad"
                  type="number"
                  defaultValue={product ? product.costo : ""}
                />
              </div>
            </div>
            {/* <div className="row mb-3">
              <label className="col-sm-4 col-form-label"> area_comun_id </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="area_comun_id"
                  defaultValue={product ? product.area_comun_id : ""}
                />
              </div>
            </div> */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label"> Área común </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  name="area_comun_nombre"
                  value={product?.area_comun_nombre}
                >
                  <option value="">Seleccione una opción</option>

                  {commonAreas.map((area, index) => {
                    return (
                      <option key={index} value={area}>
                        {area}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary btn-sm me-3">
                  Guardar
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <button
                  onClick={showList}
                  type="button"
                  className="btn btn-secondary me-2"
                >
                  {" "}
                  Cancelar{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
