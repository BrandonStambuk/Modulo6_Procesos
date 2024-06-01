import { Equipment } from "../interfaces/equipment";

const API_URL = "http://localhost:8000/api/";

export async function getEquipments(): Promise<Equipment[]> {
  const response = await fetch(`${API_URL}equipments`);
  const { equipamientos } = await response.json();

  return equipamientos;
}

export async function getEquipmentsByCommonAreaId(
  commonAreaId: number
): Promise<Equipment[]> {
  const response = await fetch(
    `${API_URL}common-areas/${commonAreaId}/equipments`
  );

  const data = await response.json();

  return data.data;
}
