import React from 'react';
import Container from './components/Container';
import H4 from './components/H4';
import Tournaments from './components/Tournaments';
import { motion } from 'framer-motion';
import { headerAnimationVariants } from './animations';

function App() {
  return (
    <Container>
      <H4
        as={motion.h4}
        initial="hidden"
        animate="visible"
        variants={headerAnimationVariants}
      >
        FACEIT Tournaments
      </H4>
      <Tournaments />
    </Container>
  );
}

export default App;
