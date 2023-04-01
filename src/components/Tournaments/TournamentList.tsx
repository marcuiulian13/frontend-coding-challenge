import React from 'react';
import Button from '../Button';
import CenteredText from '../CenteredText';
import DataLoadingState from '../../constants/dataLoadingState';
import useTournaments from '../../hooks/useTournaments';
import Grid from '../Grid';
import Tournament from './Tournament';
import ErrorContainer from './ErrorContainer';

function TournamentList() {
  const tournaments = useTournaments();

  if (tournaments.state === DataLoadingState.LOADING) {
    return <CenteredText>Loading tournaments...</CenteredText>;
  }

  if (tournaments.state === DataLoadingState.ERROR) {
    const { error, search, searchTournaments } = tournaments;

    return (
      <ErrorContainer>
        <CenteredText>Something went wrong: {error}</CenteredText>
        <Button onClick={() => searchTournaments(search)}>Retry</Button>
      </ErrorContainer>
    );
  }

  const { data } = tournaments;

  return data.length === 0 ? (
    <CenteredText>No tournaments found.</CenteredText>
  ) : (
    <Grid>
      {data.map((tournament) => (
        <Tournament key={tournament.id} tournament={tournament} />
      ))}
    </Grid>
  );
}

export default TournamentList;
