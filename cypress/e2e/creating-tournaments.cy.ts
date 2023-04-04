import { TOURNAMENTS_CREATE_BUTTON, TOURNAMENTS_LIST } from '../../src/testIds';

const tournamentName = 'Cypress Test Tournament';

describe('creating tournaments', () => {
  it('creates a tournament with the provided name', () => {
    // Intercept this request so that we can wait for its result
    cy.intercept({
      method: 'POST',
      path: '/tournaments',
    }).as('createTournament');

    cy.visit('http://localhost:3000/');

    // Mock out the `prompt` method so we can enter a tournament name
    cy.window().then(function (win) {
      cy.stub(win, 'prompt').returns(tournamentName);
    });

    cy.getByDataCy(TOURNAMENTS_CREATE_BUTTON).click();

    // We should find the new tournament in the list even before the request has completed
    cy.getByDataCy(TOURNAMENTS_LIST).within(() => {
      cy.contains(tournamentName).should('exist');
    });

    cy.wait('@createTournament');

    // Once the request has completed, the tournament should still be in the list
    cy.getByDataCy(TOURNAMENTS_LIST).within(() => {
      cy.contains(tournamentName).should('exist');
    });
  });
});
