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

function tournamentsUpdate(
  id: string,
  update: Partial<ITournament>
): ITournamentsRenameAction {
  return {
    type: 'TOURNAMENTS_RENAME',
    id,
    update,
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

    try {
      const res = await fetch(`${API_TOURNAMENTS_URL}?q=${search}`);

      if (res.ok) {
        const tournaments = await res.json();
        dispatch(tournamentsSuccess(tournaments));
      } else {
        dispatch(tournamentsError('Failed to load tournaments'));
      }
    } catch (e) {
      dispatch(tournamentsError('Failed to load tournaments'));
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

export function updateTournament(id: string, update: Partial<ITournament>) {
  return async (dispatch: AppDispatch) => {
    // Optimistic update
    dispatch(tournamentsUpdate(id, update));

    // Launch request
    fetch(`${API_TOURNAMENTS_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
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
    })
      .then((res) => res.json())
      .then((updated: ITournament) => {
        dispatch(tournamentsUpdate(tournament.id, updated));
      })
      .catch(() => {
        dispatch(tournamentsDelete(tournament.id));
      });
  };
}
