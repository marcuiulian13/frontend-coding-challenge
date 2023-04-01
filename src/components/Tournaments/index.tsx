import React from 'react';
import Header from '../Header';
import Input from '../Input';
import Button from '../Button';
import useTournaments from '../../hooks/useTournaments';
import useEffectOnce from '../../hooks/useEffectOnce';
import TournamentList from './TournamentList';

function Tournaments() {
  const { search, searchTournaments, createTournament } = useTournaments();

  useEffectOnce(() => {
    searchTournaments(search);
  });

  return (
    <>
      <Header>
        <Input
          type="text"
          placeholder="Search tournament..."
          value={search}
          onChange={(e) => searchTournaments(e.target.value)}
        />
        <Button type="button" onClick={createTournament}>
          Create Tournament
        </Button>
      </Header>
      <TournamentList />
    </>
  );
}

export default Tournaments;
