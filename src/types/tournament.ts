export interface ITournament {
  id: string;
  name: string;
  startDate: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
}
