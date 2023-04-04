import {
  TOURNAMENTS_ERROR_CONTAINER,
  TOURNAMENTS_LIST,
  TOURNAMENTS_LOADING,
} from '../../src/testIds';

describe('loading tournaments', () => {
  it('shows loading text whilst loading the tournaments', () => {
    cy.visit('http://localhost:3000/');

    // Initially, the loading text should be shown and the list should not
    cy.getByDataCy(TOURNAMENTS_LIST).should('not.exist');
    cy.getByDataCy(TOURNAMENTS_LOADING).should('exist');
  });

  it('shows the tournaments when loaded', () => {
    // Intercept this request so that we can wait for its result
    cy.intercept({
      method: 'GET',
      path: '/tournaments*',
    }).as('getTournaments');

    cy.visit('http://localhost:3000/');
    cy.wait('@getTournaments');

    // Once the request has succeeded, the loading text should be hidden and the list should be shown
    cy.getByDataCy(TOURNAMENTS_LOADING).should('not.exist');
    cy.getByDataCy(TOURNAMENTS_LIST).should('exist');
  });

  describe('on error', () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: 'GET',
          path: '/tournaments*',
          // Only intercept the request once, so that we can test the retry button
          times: 1,
        },
        {
          statusCode: 500,
          body: 'Internal Server Error',
        }
      ).as('getTournaments');

      cy.visit('http://localhost:3000/');
    });

    it('shows the error when the request fails', () => {
      cy.wait('@getTournaments');

      // Once the request has failed, the loading text should be hidden and the error should be shown
      cy.getByDataCy(TOURNAMENTS_LOADING).should('not.exist');
      cy.getByDataCy(TOURNAMENTS_LIST).should('not.exist');
      cy.getByDataCy(TOURNAMENTS_ERROR_CONTAINER).should('exist');
    });

    it('clicking the retry button retries the request', () => {
      cy.wait('@getTournaments');

      // Validate error is visible
      cy.getByDataCy(TOURNAMENTS_ERROR_CONTAINER).should('exist');

      // Click the retry button
      cy.getByDataCy(TOURNAMENTS_ERROR_CONTAINER).within(() => {
        cy.get('button').click();
      });

      // Eventually the list should be visible
      cy.getByDataCy(TOURNAMENTS_LIST).should('exist');
    });
  });
});
