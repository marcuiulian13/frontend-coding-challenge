import { TournamentsAction } from '../actions/tournaments/types';
import DataLoadingState from '../constants/dataLoadingState';
import { ITournament } from '../types/tournament';

export interface ITournamentsStateBase {
  search: string;
  state: DataLoadingState;
}

export interface ITournamentsLoadingState extends ITournamentsStateBase {
  state: DataLoadingState.LOADING;
}

export interface ITournamentsErrorState extends ITournamentsStateBase {
  state: DataLoadingState.ERROR;
  error: string;
}

export interface ITournamentsSuccessState extends ITournamentsStateBase {
  state: DataLoadingState.SUCCESS;
  data: ITournament[];
}

export type ITournamentsState =
  | ITournamentsLoadingState
  | ITournamentsErrorState
  | ITournamentsSuccessState;

const initialState: ITournamentsState = {
  state: DataLoadingState.LOADING,
  search: '',
};

export default function tournaments(
  state: ITournamentsState = initialState,
  action: TournamentsAction
): ITournamentsState {
  switch (action.type) {
    case 'TOURNAMENTS_LOADING':
      return {
        ...state,
        state: DataLoadingState.LOADING,
        search: state.search,
      };
    case 'TOURNAMENTS_ERROR':
      return {
        state: DataLoadingState.ERROR,
        error: action.payload,
        search: state.search,
      };
    case 'TOURNAMENTS_SUCCESS':
      return {
        state: DataLoadingState.SUCCESS,
        data: action.payload,
        search: state.search,
      };
    case 'TOURNAMENTS_SEARCH':
      return {
        ...state,
        search: action.search,
      };
    case 'TOURNAMENTS_DELETE':
      if (state.state === DataLoadingState.SUCCESS) {
        return {
          ...state,
          data: state.data.filter((tournament) => tournament.id !== action.id),
        };
      }
      return state;
    case 'TOURNAMENTS_RENAME':
      if (state.state === DataLoadingState.SUCCESS) {
        return {
          ...state,
          data: state.data.map((tournament) =>
            tournament.id === action.id
              ? {
                  ...tournament,
                  ...action.update,
                }
              : tournament
          ),
        };
      }
      return state;
    case 'TOURNAMENTS_INSERT':
      if (state.state === DataLoadingState.SUCCESS) {
        return {
          ...state,
          data: action.last
            ? [...state.data, action.tournament]
            : [action.tournament, ...state.data],
        };
      }
      return state;
    default:
      return state;
  }
}
