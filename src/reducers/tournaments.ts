import { TournamentsAction } from '../actions/tournaments';
import { ITournament } from '../types/tournament';

export enum LoadingState {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface ITournamentsState {
  state: LoadingState;
  data: ITournament[];
  error: unknown;
}

const initialState: ITournamentsState = {
  state: LoadingState.LOADING,
  data: [],
  error: null,
};

export default function tournaments(
  state: ITournamentsState = initialState,
  action: TournamentsAction
): ITournamentsState {
  switch (action.type) {
    case 'TOURNAMENTS_LOADING':
      return { state: LoadingState.LOADING, error: null, data: [] };
    case 'TOURNAMENTS_ERROR':
      return {
        state: LoadingState.ERROR,
        error: action.payload,
        data: [],
      };
    case 'TOURNAMENTS_SUCCESS':
      return {
        state: LoadingState.SUCCESS,
        data: action.payload,
        error: null,
      };
    default:
      return state;
  }
}
