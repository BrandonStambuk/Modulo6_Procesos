import React, { useEffect, useState } from "react";
import "./style.css";
import { TextField, MenuItem } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import Box from "@mui/material/Box";
import {
  getAllCategories,
  getCategoryById,
} from "../services/maintenance/categoryService";
import {
  createPersonalExterno,
  deletePersonalExterno,
  getAllPersonal,
  getPersonalById,
  updatePersonal,
} from "../services/maintenance/personalExternoService";
import { Percent } from "@mui/icons-material";

interface Personal {
  idPersonalExterno: number;
  nombre: string;
  telefono: string;
  direccion: string;
  categoria: { id: number; catnombre: string };
}

export default function PersonalPage() {
  const [categories, setCategories] = useState<
    { id: number; catnombre: string; catdescripcion: string }[]
  >([]);

  const [personalData, setPersonalData] = useState<Personal[]>([]);

  const [personal, setPersonal] = useState<Personal>({
    idPersonalExterno: 0,
    nombre: "",
    telefono: "",
    direccion: "",
    categoria: { id: 0, catnombre: "" },
  });

  const [flagUpdate, setFlagUpdate] = useState(false);

  useEffect(() => {
    loadServicios();
    loadPersonal();
  }, [flagUpdate]);

  const loadPersonal = async () => {
    try {
      const response = await getAllPersonal();
      const formated: Personal[] = response.map((personal) => {
        return {
          idPersonalExterno: personal.idPersonalExterno,
          nombre: personal.nombre,
          telefono: personal.telefono,
          direccion: personal.direccion,
          categoria: personal.categoria || { id: 0, catnombre: "" },
        };
      });
      setPersonalData(formated);
      console.log(response);
    } catch (error) {}
  };

  const loadServicios = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response);
    } catch (error) {}
  };

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonal({ ...personal, nombre: e.target.value });
  };

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonal({ ...personal, telefono: e.target.value });
  };

  const handleDireccionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonal({ ...personal, direccion: e.target.value });
  };

  const handleClickRegistrar = async () => {
    try {
      const dataToSend = {
        nombre: personal.nombre,
        telefono: personal.telefono,
        direccion: personal.direccion,
        idCategoria: personal.categoria.id,
      };
      const response = await createPersonalExterno(dataToSend);
      setPersonalData([...personalData, personal]);
      setPersonal({
        idPersonalExterno: 0,
        nombre: "",
        telefono: "",
        direccion: "",
        categoria: { id: 0, catnombre: "" },
      });
    } catch (error) {}
  };

  const handleClickUpdate = async () => {
    try {
      console.log(personal);
      const dataToSend = {
        nombre: personal.nombre,
        telefono: personal.telefono,
        direccion: personal.direccion,
        idCategoria: personal.categoria.id,
      };
      const response = await updatePersonal(
        personal.idPersonalExterno,
        dataToSend
      );

      setPersonal({
        idPersonalExterno: 0,
        nombre: "",
        telefono: "",
        direccion: "",
        categoria: { id: 0, catnombre: "" },
      });
      setFlagUpdate(false);
    } catch (error) {}
  };

  const handleClickDelete = async (idPersonalExterno: number) => {
    try {
      await deletePersonalExterno(idPersonalExterno);
      const nuevaLista = personalData.filter(
        (element) => element.idPersonalExterno !== idPersonalExterno
      );
      setPersonalData(nuevaLista);
    } catch (error) {}
  };

  const handleClickEdit = async (personalId: number) => {
    try {
      const response = await getPersonalById(personalId);
      if (response !== null) {
        console.log("🚀 ~ handleClickEdit ~ personalId:", response);
        const responseCategory = await getCategoryById(response.idCategoria);
        if (responseCategory !== null) {
          const category = {
            id: responseCategory.id,
            catnombre: responseCategory.catnombre,
          };
          const personal: Personal = {
            idPersonalExterno: response.idPersonalExterno,
            nombre: response.nombre,
            telefono: response.telefono,
            direccion: response.direccion,
            categoria: category ? category : { id: 0, catnombre: "" },
          };
          setPersonal(personal);
          setFlagUpdate(true);
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "40ch", display: "flex" },
        }}
        noValidate
      >
        <div id="content">
          <h2>Personal de servicio externo</h2>
          <div className="d-flex a-center d-column">
            <div>
              <TextField
                required
                id="outlined"
                label="Nombre"
                defaultValue=""
                value={personal?.nombre}
                onChange={handleNombreChange}
              />
              <TextField
                required
                id="outlined"
                label="Telefono"
                type="number"
                defaultValue=""
                value={personal?.telefono}
                onChange={handleTelefonoChange}
              />
              <TextField
                required
                id="outlined"
                label="Dirección"
                defaultValue=""
                value={personal?.direccion}
                onChange={handleDireccionChange}
              />
              <TextField
                id="outlined-select-currency"
                select
                label="Tipo de Servicio"
                helperText="Por favor seleccione el tipo de servicio"
                onChange={(event) => {
                  const selectedId = parseInt(event.target.value as string);
                  const selectedOption = categories.find(
                    (option) => option.id === selectedId
                  );
                  const categoriaValue = selectedOption
                    ? {
                        id: selectedOption.id,
                        catnombre: selectedOption.catnombre,
                      }
                    : { id: 0, catnombre: "" };

                  setPersonal({ ...personal, categoria: categoriaValue });
                }}
              >
                {categories.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.catnombre}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            {!flagUpdate ? (
              <button
                className="block"
                type="button"
                onClick={handleClickRegistrar}
              >
                Registrar
              </button>
            ) : (
              <button
                className="block"
                type="button"
                onClick={handleClickUpdate}
              >
                Actualizar
              </button>
            )}
          </div>
          <div className="row">
            <div className="col">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="left">Nombre</th>
                    <th className="left">Telefono</th>
                    <th className="left">Dirección</th>
                    <th className="left">Servicio</th>
                    <th className="righ">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {personalData.map((personal, index) => (
                    <>
                      <tr>
                        <td>{personal?.nombre}</td>
                        <td>{personal?.telefono}</td>
                        <td>{personal?.direccion}</td>
                        <td>{personal?.categoria.catnombre}</td>
                        <td className="actions">
                          <button
                            type="button"
                            onClick={() =>
                              handleClickEdit(personal.idPersonalExterno)
                            }
                          >
                            <CreateOutlinedIcon
                              className="c-dark-blue"
                              fontSize="large"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleClickDelete(personal.idPersonalExterno)
                            }
                          >
                            <DeleteOutlinedIcon
                              className="c-dark-blue "
                              fontSize="large"
                            />
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
