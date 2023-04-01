import { RootState } from '../reducers';

export const selectTournaments = (state: RootState) => state.tournaments;

export const selectTournamentsState = (state: RootState) =>
  state.tournaments.state;
