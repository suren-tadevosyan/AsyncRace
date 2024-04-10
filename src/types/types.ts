export interface Car {
  id: number;
  name: string;
  color: string;
  image: string;
  engineStatus: string;
  velocity?: number;
  distance?: number;
  raceTime?: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}
