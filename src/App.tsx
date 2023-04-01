import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './store';
import { RootState } from './reducers';
import { useEffect } from 'react';
import { fetchTournaments } from './actions/tournaments';
import Container from './components/Container';
import H4 from './components/H4';
import { LoadingState } from './reducers/tournaments';

function App() {
  const dispatch = useAppDispatch();
  const tournaments = useSelector((state: RootState) => state.tournaments);

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      {tournaments.state === LoadingState.LOADING && <p>Loading...</p>}
      {tournaments.state === LoadingState.SUCCESS && (
        <ul>
          {tournaments.data.map((tournament) => (
            <li key={tournament.id}>{tournament.name}</li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default App;
