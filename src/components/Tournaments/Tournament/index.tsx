import React from 'react';
import { format } from 'date-fns';
import { ITournament } from '../../../types/tournament';
import H6 from '../../H6';
import Button from '../../Button';
import ButtonsContainer from './ButtonsContainer';
import InfoLine from './InfoLine';
import useTournaments from '../../../hooks/useTournaments';

interface ITournamentProps {
  tournament: ITournament;
}

function Tournament({ tournament }: ITournamentProps) {
  const { id, name, organizer, game, participants, startDate } = tournament;

  const { deleteTournament, renameTournament } = useTournaments();

  return (
    <>
      <H6>{name}</H6>
      <InfoLine>Organizer: {organizer}</InfoLine>
      <InfoLine>Game: {game}</InfoLine>
      <InfoLine>
        Participants: {participants.current}/{participants.max}
      </InfoLine>
      <InfoLine>
        Start: {format(new Date(startDate), 'dd/MM/yyyy HH:mm:ss')}
      </InfoLine>
      <ButtonsContainer>
        <Button onClick={() => renameTournament(id, name)}>Edit</Button>
        <Button onClick={() => deleteTournament(id)}>Delete</Button>
      </ButtonsContainer>
    </>
  );
}

export default Tournament;
