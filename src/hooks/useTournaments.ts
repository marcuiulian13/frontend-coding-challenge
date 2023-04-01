import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from '../store';
import {
  searchTournaments as searchTournamentsAction,
  deleteTournament as deleteTournamentAction,
  renameTournament as renameTournamentAction,
  insertTournament as insertTournamentAction,
} from '../actions/tournaments';
import { selectTournaments } from '../selectors/tournaments';
import promptUntilValidOrCancel from '../utils/promptUntilValidOrCancel';

function tournamentNameValidator(value: string) {
  return value.trim().length > 0 && /^[a-zA-Z0-9 ]+$/.test(value);
}

function useTournaments() {
  const dispatch = useAppDispatch();

  const tournamentsState = useSelector(selectTournaments);

  const searchTournaments = useCallback(
    (search: string) => {
      dispatch(searchTournamentsAction(search));
    },
    [dispatch]
  );

  const renameTournament = useCallback(
    (id: string, currentName: string) => {
      const newName = promptUntilValidOrCancel({
        prompt: 'New tournament name:',
        validator: tournamentNameValidator,
        defaultValue: currentName,
      });

      if (newName) {
        dispatch(renameTournamentAction(id, newName));
      }
    },
    [dispatch]
  );

  const deleteTournament = useCallback(
    (id: string) => {
      const shouldDelete = window.confirm(
        'Are you sure you want to delete this tournament?'
      );

      if (shouldDelete) {
        dispatch(deleteTournamentAction(id));
      }
    },
    [dispatch]
  );

  const createTournament = useCallback(() => {
    const name = promptUntilValidOrCancel({
      prompt: 'New tournament name:',
      validator: tournamentNameValidator,
      defaultValue: 'New tournament',
    });

    if (name) {
      dispatch(
        insertTournamentAction({
          id: 'new',
          name,
          game: 'Random',
          organizer: 'Random',
          startDate: new Date().toISOString(),
          participants: {
            current: 0,
            max: 8,
          },
        })
      );
    }
  }, [dispatch]);

  return {
    ...tournamentsState,
    searchTournaments,
    renameTournament,
    deleteTournament,
    createTournament,
  };
}

export default useTournaments;
