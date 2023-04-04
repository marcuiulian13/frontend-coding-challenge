import { TOURNAMENTS_LIST, TOURNAMENT_EDIT_BUTTON } from '../../src/testIds';

const tournamentName = 'Cypress Test Tournament Edit';

describe('editing tournaments', () => {
  it('renames a tournament with the provided name', () => {
    // Intercept this request so that we can wait for its result
    cy.intercept({
      method: 'PATCH',
      path: '/tournaments/*',
    }).as('updateTournament');

    cy.visit('http://localhost:3000/');

    // Mock out the `prompt` method so we can enter a tournament name
    cy.window().then(function (win) {
      cy.stub(win, 'prompt').returns(tournamentName);
    });

    cy.getByDataCy(TOURNAMENTS_LIST).within(() => {
      cy.getByDataCy(TOURNAMENT_EDIT_BUTTON).first().click();
    });

    // We should find the new tournament name in the list even before the request has completed
    cy.getByDataCy(TOURNAMENTS_LIST).within(() => {
      cy.contains(tournamentName).should('exist');
    });

    cy.wait('@updateTournament');

    // Once the request has completed, the tournament should still be in the list
    cy.getByDataCy(TOURNAMENTS_LIST).within(() => {
      cy.contains(tournamentName).should('exist');
    });
  });
});
