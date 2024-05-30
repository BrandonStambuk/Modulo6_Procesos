import { AxiosResponse } from "axios";
import api from "../api";


  export interface Insumo {
    idInsumo: number
    idSolicitud: number
    nombreInsumo: string
    precioInsumo: number
    created_at: any
    updated_at: any
    solicitud: Solicitud
    catnombre: string
    encargado: string
  }

  interface InsumoResponse {
    idSolicitud: number;
    nombreInsumo: string;
    precioInsumo: number;
    idInsumo: number;
  }  
  export interface Solicitud {
    idRegistroSolicitud: number
    idCategoria: number
    idEstado: number
    idPersonalExterno: any
    descripcion: string
    nombrePropietario: string
    ubicacion: any
    numerReferencia: string
    encargado: string
    fechaSolicitud: string
    fechaFinalizado: any
    created_at: any
    updated_at: any
    categoria: Categoria
  }

  interface InsumoRequest{
    idSolicitud: number;
    nombreInsumo: string;
    precioInsumo: number;
  }
  
  export interface Categoria {
    id: number
    catnombre: string
    catdescripcion: string
    created_at: any
    updated_at: any
  }
  
  //* to create insumo

  export const createInsumo = async(insumoData: InsumoRequest): Promise<InsumoResponse | null>=>{
    try {
      const response:AxiosResponse<InsumoResponse> = await api.post('/insumo/insert', insumoData);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  
//* to get all insumos
export const getAllInsumos = async (): Promise<Insumo[]>=>{
    try{
        const response = await api.get(
                "/insumo/solicitud"
        );
        return response.data;
    }catch(error){
        console.error("Error fetching categories:", error);
        return [];
    }

};

//* to delete insumo

export const deleteInsumo = async(insumoId: number): Promise<boolean>=>{
  try {
    await api.delete(`/insumo/delete/solicitud/${insumoId}`);
    return true;
  } catch (error) {
    return false;
  }
}
