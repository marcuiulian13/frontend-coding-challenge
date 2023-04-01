import React from 'react';
import Container from './components/Container';
import H4 from './components/H4';
import Tournaments from './components/Tournaments';

function App() {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <Tournaments />
    </Container>
  );
}

export default App;
