import {
  TOURNAMENTS_CREATE_BUTTON,
  TOURNAMENT_DELETE_BUTTON,
} from '../../src/testIds';

const tournamentName = 'Cypress Test Tournament Delete';

describe('deleting tournaments', () => {
  it('deletes a tournament', () => {
    // Intercept this request so that we can wait for its result
    cy.intercept({
      method: 'DELETE',
      path: '/tournaments/*',
    }).as('deleteTournament');

    cy.intercept({
      method: 'POST',
      path: '/tournaments*',
    }).as('createTournament');

    cy.visit('http://localhost:3000/');

    // Mock out the `confirm` and `prompth` methods to be able to test
    cy.window().then(function (win) {
      cy.stub(win, 'prompt').returns(tournamentName);
      cy.stub(win, 'confirm').returns(true);
    });

    // Create a tournament
    cy.getByDataCy(TOURNAMENTS_CREATE_BUTTON).click();

    // Wait for the request to complete
    cy.wait('@createTournament');

    cy.contains(tournamentName).should('exist');

    // Delete the tournament
    cy.getByDataCy(TOURNAMENT_DELETE_BUTTON).last().click();

    // The tournament should no longer be in the list
    cy.contains(tournamentName).should('not.exist');

    // Wait for the request to complete
    cy.wait('@deleteTournament');

    // The tournament should no longer be in the list
    cy.contains(tournamentName).should('not.exist');
  });
});
