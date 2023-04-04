import React from 'react';
import Button from '../../Button';
import CenteredText from '../../CenteredText';
import DataLoadingState from '../../../constants/dataLoadingState';
import useTournaments from '../../../hooks/useTournaments';
import Grid from '../../Grid';
import Tournament from '../Tournament';
import ErrorContainer from '../ErrorContainer';
import { AnimatePresence, motion } from 'framer-motion';
import Card from '../../Card';
import {
  errorAnimationVariants,
  itemAnimationVariants,
  loadingAnimationVariants,
  noResultsAnimationVariants,
} from './animations';
import {
  TOURNAMENTS_EMPTY_TEXT,
  TOURNAMENTS_ERROR_CONTAINER,
  TOURNAMENTS_LIST,
  TOURNAMENTS_LOADING,
} from '../../../testIds';

function TournamentsList() {
  const tournaments = useTournaments();

  if (tournaments.state === DataLoadingState.LOADING) {
    return (
      <CenteredText
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={loadingAnimationVariants}
        data-cy={TOURNAMENTS_LOADING}
      >
        Loading tournaments...
      </CenteredText>
    );
  }

  if (tournaments.state === DataLoadingState.ERROR) {
    const { error, search, searchTournaments } = tournaments;

    return (
      <ErrorContainer
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={errorAnimationVariants}
        data-cy={TOURNAMENTS_ERROR_CONTAINER}
      >
        <CenteredText>Something went wrong: {error}</CenteredText>
        <Button onClick={() => searchTournaments(search)}>Retry</Button>
      </ErrorContainer>
    );
  }

  const { data } = tournaments;

  return data.length === 0 ? (
    <CenteredText
      as={motion.div}
      initial="hidden"
      animate="visible"
      variants={noResultsAnimationVariants}
      data-cy={TOURNAMENTS_EMPTY_TEXT}
    >
      No tournaments found.
    </CenteredText>
  ) : (
    <Grid data-cy={TOURNAMENTS_LIST}>
      <AnimatePresence>
        {data.map((tournament, i, arr) => (
          <Card
            key={tournament.id}
            as={motion.div}
            layout
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={itemAnimationVariants}
            custom={{ i, total: arr.length }}
          >
            <Tournament tournament={tournament} />
          </Card>
        ))}
      </AnimatePresence>
    </Grid>
  );
}

export default TournamentsList;
