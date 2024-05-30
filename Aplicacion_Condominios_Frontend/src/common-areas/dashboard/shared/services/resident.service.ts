import { Resident } from "../../reservation/interfaces/residents";

const API_URL = "http://localhost:8000/api/";

export async function getResidents(): Promise<Resident[]> {
  const response = await fetch(`${API_URL}residentes`);
  const data: Resident[] = await response.json();

  return data;
}
