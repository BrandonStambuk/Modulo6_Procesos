import api from "../api";

export const getContratoPersonal = async (idContrato: number) => {
  try {
    const response: any = await api.get(`/contrato-personal/${idContrato}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener contrato", error);
  }
};
