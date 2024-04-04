export interface Car {
  id: number;
  name: string;
  color: string;
  image: string;
  engineStatus: string;
  velocity?: number; // Optional property for velocity
  distance?: number;
}
