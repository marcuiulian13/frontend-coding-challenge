import { Action } from 'redux';
import { ITournament } from '../../types/tournament';

export interface ITournamentsLoadingAction extends Action {
  type: `TOURNAMENTS_LOADING`;
}

export interface ITournamentsErrorAction extends Action {
  type: `TOURNAMENTS_ERROR`;
  payload: string;
}

export interface ITournamentsSuccessAction extends Action {
  type: `TOURNAMENTS_SUCCESS`;
  payload: ITournament[];
}

export interface ITournamentsSearchAction extends Action {
  type: `TOURNAMENTS_SEARCH`;
  search: string;
}

export interface ITournamentsDeleteAction extends Action {
  type: `TOURNAMENTS_DELETE`;
  id: string;
}

export interface ITournamentsRenameAction extends Action {
  type: `TOURNAMENTS_RENAME`;
  id: string;
  update: Partial<ITournament>;
}

export interface ITournamentsInsertAction extends Action {
  type: `TOURNAMENTS_INSERT`;
  tournament: ITournament;
  last?: boolean;
}

export type TournamentsAction =
  | ITournamentsLoadingAction
  | ITournamentsErrorAction
  | ITournamentsSuccessAction
  | ITournamentsSearchAction
  | ITournamentsDeleteAction
  | ITournamentsRenameAction
  | ITournamentsInsertAction;
