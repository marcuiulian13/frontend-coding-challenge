import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './store';
import { RootState } from './reducers';
import { useEffect } from 'react';
import { fetchTournaments } from './actions/tournaments';
import Container from './components/Container';
import H4 from './components/H4';
import { LoadingState } from './reducers/tournaments';
import Header from './components/Header';
import Input from './components/Input';
import Button from './components/Button';
import Grid from './components/Grid';
import Tournament from './components/Tournament';

function App() {
  const dispatch = useAppDispatch();
  const tournaments = useSelector((state: RootState) => state.tournaments);

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <Header>
        <Input type="text" placeholder="Search" />
        <Button type="button">Create Tournament</Button>
      </Header>
      {tournaments.state === LoadingState.LOADING && <p>Loading...</p>}
      {tournaments.state === LoadingState.SUCCESS && (
        <Grid>
          {tournaments.data.map((tournament) => (
            <Tournament key={tournament.id} tournament={tournament} />
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default App;
