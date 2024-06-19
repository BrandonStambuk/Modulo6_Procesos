export interface CommonArea {
  id: number;
  name: string;
  description: string;
  capacity: number;
  urlImage: string;
  schedule: Schedule[];
  policies: string[];
  created_at: Date;
  updated_at: Date;
  available: boolean;
}

export interface Schedule {
  day: number;
  startHour: string;
  endHour: string;
}
