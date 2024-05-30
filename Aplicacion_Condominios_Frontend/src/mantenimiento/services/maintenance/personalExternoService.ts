import { AxiosResponse } from "axios";
import api from "../api";

interface PersonalExternoResponse {
  idPersonalExterno: number;
  nombre: string;
  telefono: string;
  direccion: string;
  categoria: { id: number; catnombre: string };
}

interface PersonalExternoRequest {
  idPersonalExterno: number;
  nombre: string;
  telefono: string;
  direccion: string;
  idCategoria: number;
}

//* to create a new personal

export const createPersonalExterno = async (
  newPersonal: Partial<PersonalExternoRequest>
): Promise<PersonalExternoRequest | null> => {
  try {
    const response: AxiosResponse<PersonalExternoRequest> = await api.post(
      "/personal-externo/insert",
      newPersonal
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

//* to get all personal
export const getAllPersonal = async (): Promise<PersonalExternoResponse[]> => {
  try {
    const response: AxiosResponse<PersonalExternoResponse[]> = await api.get(
      "/personal-externo"
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

//* to get personal by id
export const getPersonalById = async (
  personalId: number
): Promise<PersonalExternoRequest | null> => {
  try {
    const response: AxiosResponse<PersonalExternoRequest> = await api.get(
      `/personal-externo/${personalId}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getPersonalByCategory = async (categoryId : number): Promise<PersonalExternoResponse []> => {
  try {
    const response:AxiosResponse<PersonalExternoResponse[]> = await api.get(`/personal-externo-by-categoria/${categoryId}`);
    //console.log("🚀 ~ getPersonalByCategory ~ response.data:", response.data)
    return response.data;
  } catch (error) {
    return [];
  }
}


//* to update an existing personal
export const updatePersonal = async (
  personalId: number,
  personalData: Partial<PersonalExternoResponse>
): Promise<PersonalExternoResponse | null> => {
  try {
    const response: AxiosResponse<PersonalExternoResponse> = await api.put(
      `/personal-externo/update/${personalId}`,
      personalData
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

//* to delete a personal by id

export const deletePersonalExterno = async (
  personalId: number
): Promise<void> => {
  try {
    await api.delete(`/personal-externo/delete/${personalId}`);
  } catch (error) {}
};
