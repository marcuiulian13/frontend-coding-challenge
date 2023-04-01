import React from 'react';
import { format } from 'date-fns';
import { ITournament } from '../../../types/tournament';
import Card from '../../Card';
import H6 from '../../H6';
import Button from '../../Button';
import ButtonsContainer from './ButtonsContainer';
import InfoLine from './InfoLine';
import useTournaments from '../../../hooks/useTournaments';

interface ITournamentProps {
  tournament: ITournament;
}

function Tournament({ tournament }: ITournamentProps) {
  const { id, name } = tournament;

  const { deleteTournament, renameTournament } = useTournaments();

  return (
    <Card>
      <H6>{tournament.name}</H6>
      <InfoLine>Organizer: {tournament.organizer}</InfoLine>
      <InfoLine>Game: {tournament.game}</InfoLine>
      <InfoLine>
        Participants: {tournament.participants.current}/
        {tournament.participants.max}
      </InfoLine>
      <InfoLine>
        Start: {format(new Date(tournament.startDate), 'dd/MM/yyyy HH:mm:ss')}
      </InfoLine>
      <ButtonsContainer>
        <Button onClick={() => renameTournament(id, name)}>Edit</Button>
        <Button onClick={() => deleteTournament(id)}>Delete</Button>
      </ButtonsContainer>
    </Card>
  );
}

export default Tournament;
