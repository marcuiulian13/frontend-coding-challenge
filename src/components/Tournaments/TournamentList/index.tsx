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

function TournamentsList() {
  const tournaments = useTournaments();

  if (tournaments.state === DataLoadingState.LOADING) {
    return (
      <CenteredText
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={loadingAnimationVariants}
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
    >
      No tournaments found.
    </CenteredText>
  ) : (
    <Grid>
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
