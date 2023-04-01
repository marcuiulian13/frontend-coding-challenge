import { Dispatch } from 'redux';
import { API_TOURNAMENTS_URL } from '../../constants/api';
import { ITournament } from '../../types/tournament';
import { RootState } from '../../reducers';
import debounce from '../../utils/debounce';
import { AppDispatch } from '../../store';
import {
  ITournamentsErrorAction,
  ITournamentsInsertAction,
  ITournamentsLoadingAction,
  ITournamentsSearchAction,
  ITournamentsSuccessAction,
} from './types';
import { ITournamentsDeleteAction } from './types';
import { ITournamentsRenameAction } from './types';

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

function tournamentsSearch(search: string): ITournamentsSearchAction {
  return {
    type: 'TOURNAMENTS_SEARCH',
    search,
  };
}

function tournamentsDelete(id: string): ITournamentsDeleteAction {
  return {
    type: 'TOURNAMENTS_DELETE',
    id,
  };
}

function tournamentsRename(id: string, name: string): ITournamentsRenameAction {
  return {
    type: 'TOURNAMENTS_RENAME',
    id,
    name,
  };
}

function tournamentInsert(
  tournament: ITournament,
  last?: boolean
): ITournamentsInsertAction {
  return {
    type: 'TOURNAMENTS_INSERT',
    tournament,
    last,
  };
}

export function fetchTournaments() {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const {
      tournaments: { search },
    } = getState();

    dispatch(tournamentsLoading());

    const res = await fetch(`${API_TOURNAMENTS_URL}?q=${search}`);

    if (res.ok) {
      const tournaments = await res.json();
      dispatch(tournamentsSuccess(tournaments));
    } else {
      dispatch(tournamentsError('Error loading tournaments'));
    }
  };
}

const debouncedFetchTournaments = debounce(
  (dispatch: AppDispatch) => dispatch(fetchTournaments()),
  300
);

export function searchTournaments(search: string) {
  return (dispatch: AppDispatch) => {
    dispatch(tournamentsSearch(search));
    debouncedFetchTournaments(dispatch);
  };
}

export function deleteTournament(id: string) {
  return async (dispatch: AppDispatch) => {
    // Optimistic update
    dispatch(tournamentsDelete(id));

    // Launch request
    fetch(`${API_TOURNAMENTS_URL}/${id}`, {
      method: 'DELETE',
    });
  };
}

export function renameTournament(id: string, name: string) {
  return async (dispatch: AppDispatch) => {
    // Optimistic update
    dispatch(tournamentsRename(id, name));

    // Launch request
    fetch(`${API_TOURNAMENTS_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
}

export function insertTournament(tournament: ITournament, last?: boolean) {
  return (dispatch: AppDispatch) => {
    // Optimistic update
    dispatch(tournamentInsert(tournament, last));

    // Send request
    fetch(`${API_TOURNAMENTS_URL}`, {
      method: 'POST',
      body: JSON.stringify(tournament),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
}
