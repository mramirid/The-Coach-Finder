export type Area = 'frontend' | 'backend' | 'career'

export default interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  areas: Area[];
  description: string;
  hourlyRate: number;
}