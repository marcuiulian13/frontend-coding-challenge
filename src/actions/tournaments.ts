import { Action, Dispatch } from 'redux';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { ITournament } from '../types/tournament';

export interface ITournamentsLoadingAction extends Action {
  type: 'TOURNAMENTS_LOADING';
}

export interface ITournamentsErrorAction extends Action {
  type: 'TOURNAMENTS_ERROR';
  payload: string;
}

export interface ITournamentsSuccessAction extends Action {
  type: 'TOURNAMENTS_SUCCESS';
  payload: ITournament[];
}

export type TournamentsAction =
  | ITournamentsLoadingAction
  | ITournamentsErrorAction
  | ITournamentsSuccessAction;

function tournamentsLoading(): ITournamentsLoadingAction {
  return {
    type: 'TOURNAMENTS_LOADING',
  };
}

function tournamentsError(error: string): ITournamentsErrorAction {
  return {
    type: 'TOURNAMENTS_ERROR',
    payload: error,
  };
}

function tournamentsSuccess(
  tournaments: ITournament[]
): ITournamentsSuccessAction {
  return {
    type: 'TOURNAMENTS_SUCCESS',
    payload: tournaments,
  };
}

export function fetchTournaments() {
  return async (dispatch: Dispatch) => {
    dispatch(tournamentsLoading());

    const res = await fetch(API_TOURNAMENTS_URL);

    if (res.ok) {
      const tournaments = await res.json();
      dispatch(tournamentsSuccess(tournaments));
    } else {
      dispatch(tournamentsError('Error loading tournaments'));
    }
  };
}
