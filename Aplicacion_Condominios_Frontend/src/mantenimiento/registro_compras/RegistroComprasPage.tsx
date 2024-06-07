import React, { useState, useEffect } from "react";
import { MenuItem, TextField } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./style.css";
import Box from "@mui/material/Box";
import { getAllCategories } from "../services/maintenance/categoryService";
import { getSolicitudByEncargadoId } from "../services/maintenance/solicitudMantenimientoService";
import { getAllPersonal } from "../services/maintenance/personalExternoService";
import { getAllInsumosBySolicitudId } from "../services/maintenance/insumosService";
import ListaCompras from "../lista_compras/ListaComprasPage";
import { newListaCompra } from "../services/maintenance/listaComprasService";

export default function RegistroCompras() {
  const [totalCompra, setTotalCompra] = useState(0);
  const [idSolicitud, setIdSolicitud] = useState(0);

  const [categoryList, setCategoryList] = useState<any>([
    {
      idPersonalExterno: 0,
      nombre: "",
    },
  ]);

  const [solicitudList, setSolicitudList] = useState<any>([
    // {
    //   idRegistroSolicitud: 0,
    //   descripcion: "",
    // },
  ]);

  const [insumosList, setInsumosList] = useState<any>("");

  useEffect(() => {
    allCategories();
  }, []);

  useEffect(() => {
    if (insumosList.insumos?.length > 0) {
      const total = insumosList.insumos.reduce(
        (acumulador: number, elemento: any) => {
          return acumulador + elemento.totalInsumo;
        },
        0
      );
      setTotalCompra(total);
    }
  }, [insumosList]);

  const allCategories = async () => {
    const response = await getAllCategories();
    //console.log("🚀 ~ allEncargados ~ response:", response);
    setCategoryList(response);
  };

  const getSolicitudes = async (encagadoId: number) => {
    const response = await getSolicitudByEncargadoId(encagadoId);
    // console.log("🚀 ~ getSolicitudes ~ response:", response);
    setSolicitudList(response);
  };

  const handleChangeCategoria = (idEncargado: string) => {
    const encargadoId: number = parseInt(idEncargado);
    getSolicitudes(encargadoId);
    setInsumosList("");
    setSolicitudList([]);
    setTotalCompra(0);
  };

  const allInsumos = async (solicitudId: number) => {
    // console.log("🚀 ~ allInsumos ~ solicitudId:", solicitudId);
    const response = await getAllInsumosBySolicitudId(solicitudId);
    //console.log("🚀 ~ allInsumos ~ response:", response);
    setInsumosList(response);
  };

  const precioBlur = (insumoId: number, precio: number) => {
    if (!Number.isNaN(precio)) {
      const nuevosInsumos = insumosList.insumos.map((insumo: any) => {
        if (insumo.idInsumo === insumoId) {
          return {
            ...insumo,
            precioInsumo: precio,
            totalInsumo: precio * insumo.cantidadInsumo,
          };
        }
        return insumo;
      });

      setInsumosList((prevState: any) => ({
        ...prevState,
        insumos: nuevosInsumos,
      }));
    } else {
      const nuevosInsumos = insumosList.insumos.map((insumo: any) => {
        if (insumo.idInsumo === insumoId) {
          return {
            ...insumo,
            precioInsumo: 0,
            totalInsumo: 0,
          };
        }
        return insumo;
      });

      setInsumosList((prevState: any) => ({
        ...prevState,
        insumos: nuevosInsumos,
      }));
    }
  };

  const handleDelete = (insumoId: number) => {
    const lista = insumosList.insumos.filter(
      (element: any) => element.idInsumo !== insumoId
    );
    const newList = { insumos: lista, totalCompra: insumosList.totalCompra };
    setInsumosList(newList);
  };

  const handleRegister = async () => {
    console.log("total ", totalCompra, " list ", solicitudList);

    if (totalCompra > 0 && solicitudList.length > 0) {
      const dataToSend = {
        ...insumosList,
        idSolicitud: idSolicitud,
        totalCompra: totalCompra,
      };
      //const response: any = await newListaCompra(dataToSend);
      // console.log("🚀 ~ handleRegister ~ response:", response);
      // window.location.reload();
    } else {
      alert("Existen campos vacios");
    }
  };

  return (
    <>
      <div className="content__registro">
        <div className="">
          <h2>Registro de Compras</h2>
        </div>
        {/* Desplegable categoria y solicitud */}
        <Box component="form" className="form-container" noValidate>
          <div className="form-row">
            <div className="form-item">
              <label htmlFor="outlined-select-currency1">Categoría</label>
              <TextField
                id="outlined-select-currency1"
                onChange={(event) => handleChangeCategoria(event.target.value)}
                select
              >
                {categoryList.map((element: any) => (
                  <MenuItem key={element.id} value={element.id}>
                    {element.catnombre}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="form-item">
              <label htmlFor="outlined-select-currency2">Solicitud</label>
              <TextField
                id="outlined-select-currency2"
                onChange={(event) => {
                  allInsumos(parseInt(event.target.value));
                  setIdSolicitud(parseInt(event.target.value));
                  setTotalCompra(0);
                }}
                select
              >
                {solicitudList.map((element: any) => (
                  <MenuItem
                    key={element.idRegistroSolicitud}
                    value={element.idRegistroSolicitud}
                  >
                    Solicitud {element.idRegistroSolicitud}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </Box>

        {/* Tabla */}

        <table className="table table-striped">
          <thead>
            <tr>
              <th className="">Cantidad</th>
              <th className="">Nombre del artículo</th>
              <th className="">Precio unitario</th>
              <th className="">Precio total</th>
              <th className="">Acciones</th>
            </tr>
          </thead>
          {insumosList !== "" ? (
            <tbody>
              {insumosList.insumos.map((element: any, index: number) => (
                <tr>
                  <td>
                    <td>{element.cantidadInsumo}</td>
                  </td>
                  <td> {element.nombreInsumo} </td>
                  <td>
                    <TextField
                      id="outlined"
                      type="number"
                      placeholder=" Bs."
                      value={
                        element.precioInsumo === 0 ? null : element.precioInsumo
                      }
                      onChange={(event) =>
                        precioBlur(
                          element.idInsumo,
                          parseInt(event.target.value)
                        )
                      }
                      sx={{
                        width: "60px",
                        height: "40px",
                        "& .MuiInputBase-root": {
                          height: "90%",
                        },
                      }}
                    />
                  </td>
                  <td>{element.totalInsumo}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(element.idInsumo)}
                      className="button_color"
                    >
                      <DeleteOutlinedIcon />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                {" "}
                {/*/////////////////el conejo sangiuento/////////////////////////////////////////////////////////*/}
                <td className="tr__bg-white fw-bold">Total general</td>
                <td className="tr__bg-white"></td>
                <td> </td>
                <td> {totalCompra}</td>
                <td className="tr__bg-white"></td>
              </tr>
            </tbody>
          ) : (
            ""
          )}
        </table>
        <div className="d-flex justify-content-center">
          <button className="block_button w-40" onClick={handleRegister}>
            Registrar
          </button>
        </div>
      </div>
    </>
  );
}
