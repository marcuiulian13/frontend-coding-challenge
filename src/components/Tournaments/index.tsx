import React, { useEffect } from 'react';
import Header from '../Header';
import Input from '../Input';
import Button from '../Button';
import useTournaments from '../../hooks/useTournaments';
import TournamentsList from './TournamentList';
import { motion } from 'framer-motion';
import {
  createAnimationVariants,
  listAnimationVariants,
  searchAnimationVariants,
} from './animations';
import { TOURNAMENTS_CREATE_BUTTON } from '../../testIds';

function Tournaments() {
  const { search, searchTournaments, createTournament } = useTournaments();

  useEffect(() => {
    searchTournaments(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={searchAnimationVariants}
        >
          <Input
            type="text"
            placeholder="Search tournament..."
            value={search}
            onChange={(e) => searchTournaments(e.target.value)}
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={createAnimationVariants}
        >
          <Button
            type="button"
            onClick={createTournament}
            data-cy={TOURNAMENTS_CREATE_BUTTON}
          >
            Create Tournament
          </Button>
        </motion.div>
      </Header>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={listAnimationVariants}
      >
        <TournamentsList />
      </motion.div>
    </>
  );
}

export default Tournaments;
