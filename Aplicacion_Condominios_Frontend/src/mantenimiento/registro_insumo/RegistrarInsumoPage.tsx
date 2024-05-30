import { MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import "./style.css";
import { useEffect, useState } from "react";
import { getAllCategories } from "../services/maintenance/categoryService";
import { getPersonalByCategory } from "../services/maintenance/personalExternoService";
import { getSolicitudByEncargadoId } from "../services/maintenance/solicitudMantenimientoService";
import { createInsumo } from "../services/maintenance/insumosService";

interface Category {
  id: number;
  catnombre: string;
  catdescripcion: string;
  disabled: boolean;
}

interface PersonalExternoResponse {
  idPersonalExterno: number;
  nombre: string;
  telefono: string;
  direccion: string;
  categoria: { id: number; catnombre: string };
}

interface SolicitudServicioResponse {
  idRegistroSolicitud: number;
  idCategoria: number;
  idEstado: number;
  descripcion: string;
  nombrePropietario: string;
  ubicacion: string;
  numerReferencia: string;
  encargado: string;
  fechaSolicitud: string;
  fechaFinalizado: string;
  categoria: { id: number; catnombre: string };
  estado: {
    idEstado: number;
    nombreEstado: string;
  };
}

interface Insumo{
  id:number;
  idSolicitud: number;
  nombreInsumo: string;
  precioInsumo: number;
}

interface InsumoRequest{
  idSolicitud: number;
  nombreInsumo: string;
  precioInsumo: number;
}


export default function RegistroInsumo() {

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [personalList, setPersonalList] = useState<PersonalExternoResponse[]>([]);
  const [solicitudList, setSolicitudList] = useState<SolicitudServicioResponse[]>([]);

  const [solicitudActual, setSolicitudActual] = useState<number>(0);

  const [nombreInsumo, setNombreInsumo] = useState<string>("");
  const [insumosList, setInsumosList] = useState<Insumo[]>([]);

  useEffect(() => {
    allCategories();
  }, [])

  const allCategories = async () => {
    const response = await getAllCategories();
    setCategoryList(response);
  }

  const allPersonalList = async (categoryId: string) => {
    setSolicitudActual(0);
    const categoryIdNumber: number = parseInt(categoryId);
    const response = await getPersonalByCategory(categoryIdNumber);
    setPersonalList(response);
  }

  const allSolicitudList = async (encargadoId: string)=>{
    const encargadoIdInt:number = parseInt(encargadoId);
    const response = await getSolicitudByEncargadoId(encargadoIdInt);
    console.log("🚀 ~ allSolicitudList ~ response:", response)
    setSolicitudList(response);
    setSolicitudActual(0);
  }


  const agregarInsumo = () =>{
    if(nombreInsumo.slice()!==""){
      const newInsumo = {id: insumosList.length+1,idSolicitud:0, nombreInsumo:nombreInsumo, precioInsumo: 0 }
      const newInsumosList = [...insumosList, newInsumo];
      setInsumosList(newInsumosList);
      setNombreInsumo("");
    }
  }

  const handleDeleteItemInsumo = (idInsumo: number) => {
    const newInsumosList = insumosList.filter(element => {
      if (element.id !== idInsumo) {
        return element
      }
    })

    setInsumosList(newInsumosList);
  }

  const registerInsumo = async (insumoData:InsumoRequest) =>{
    const response = await createInsumo(insumoData);
    if(response === null){
      alert("Error al guardar")
    }
  }

  const handleRegisterInsumos = ()=>{
    if(insumosList.length !== 0 && solicitudActual != 0){
      insumosList.map(element => {
        const {nombreInsumo, precioInsumo} = element;
        const insumoData = {idSolicitud: solicitudActual, nombreInsumo:nombreInsumo, precioInsumo:precioInsumo};
        registerInsumo(insumoData)
        console.log("Insumo", insumoData);
        
      })
      alert("Se ha registrado los insumos");
      window.location.reload();
    }else{
     if(solicitudActual === 0){
      alert("Seleccione una solicitud")
     }else{
      alert("Deben existir insumos")
     }
    }
  }

  const handleChangeSolicitud = (solicitudId: string) => {
    const  solicitudIdInt:number = parseInt(solicitudId);
    console.log("🚀 ~ handleChangeSolicitud ~ solicitudIdInt:", solicitudIdInt)
    setSolicitudActual(solicitudIdInt);
  }

  return (
    <>
    <div className="content__insu">
      <div className="content__regisInsu">
        <h2 className="">Registrar Insumo</h2>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 0.8, width: "42ch", display: "flex" },
          }}
          noValidate
        >
          <div className="row">
            <div className="col-4 align-right-inputss">
              <label htmlFor="outlined-select-currency">Categoría</label>
            </div>
            <div className="col-8">
              <TextField
                id="outlined-select-currency"
                onChange={(event) => allPersonalList(event.target.value)}
                select
              >
                {categoryList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.catnombre}
                  </MenuItem>
                ))}

              </TextField>
            </div>
          </div>
          <div className="row">
            <div className="col-4 align-right-inputss">
              <label htmlFor="outlined-select-currency">Encargado</label>
            </div>
            <div className="col-8">
              <TextField
                id="outlined-select-currency"
                onChange={(event)=>allSolicitudList(event.target.value)}
                select                    
              >
                {personalList.map((option)=>(
                  <MenuItem key={option.idPersonalExterno} value={option.idPersonalExterno}>
                   {option.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="row">
            <div className="col-4 align-right-inputss">
              <label htmlFor="outlined-select-currency">Solicitud</label>
            </div>
            <div className="col-8">
              <TextField
                id="outlined-select-currency"
                value={solicitudActual}
                onChange={(event)=>handleChangeSolicitud(event.target.value)}
                select                    
              >
                {solicitudList.map((option)=>(
                  <MenuItem key={option.idRegistroSolicitud} value={option.idRegistroSolicitud}>
                   {option.descripcion}
                  </MenuItem>
                ))}
                </TextField> 
            </div> 
          </div>

          <div className="example">
            <div></div>
            <div className="subtitule">Agregar Insumo</div>
            <div></div>
          </div>

          <div className="row__group2">



            <div className="row__group">

              <div className="row__input">
                <TextField
                  required
                  id="outlined"
                  value={nombreInsumo}
                  onChange={(event) => setNombreInsumo(event.target.value)}
                  placeholder="Ingrese Nombre del Insumo"
                />
              </div>


              <button
                className="col-2 btn btn-success m_personalizado"
                type="button"
                onClick={agregarInsumo}
              >
                <span className="aumentar__fontsize">Agregar</span>
              </button>
            </div>

            <div className="table__container">
              <table className="table table__space">
                <thead>
                  <tr >
                    <th className="der">Insumo</th>
                    <th className="izq">Borrar</th>

                  </tr>
                </thead>
                {insumosList.map(element => (
                  <tbody className="tbody__space">
                    <tr className="tr__color">
                      <td className="der">{element.nombreInsumo}</td>
                      <td className="izq">
                        <ClearOutlinedIcon
                          className="c-dark-blue"
                          fontSize="large"
                          onClick={() => handleDeleteItemInsumo(element.id)}
                        />
                      </td>

                    </tr>
                  </tbody>
                ))}
              </table>
              <button
                className="block margin-x-auto"
                type="button"
                onClick={handleRegisterInsumos}
              >
                Guardar
              </button>
            </div>
          </div>
          
        </Box>
      </div>
      </div>
    </>
  )
}