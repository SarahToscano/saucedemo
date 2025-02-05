import { LOGOUT_ELEMENTS } from '../elements/logout.elements';

class LogoutApplication {
  clickMenu() {
    cy.get(LOGOUT_ELEMENTS.btnMenu).click();
  }

  clickLogout() {
    cy.get(LOGOUT_ELEMENTS.btnLogout).click();
  }

  validateSuccessfulLogout() {
    cy.get(LOGOUT_ELEMENTS.usernameField).should('be.visible'); //Ensure the Login page is visible
    cy.get(LOGOUT_ELEMENTS.passwordField).should('be.visible');
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
  }

  validateFailedLogout() {
    cy.get(LOGOUT_ELEMENTS.btnMenu).should('be.visible'); // The menu icon stills on screen
    cy.url().should('include', '/inventory.html'); // Verify the page of shopping cart
  }
}

export default LogoutApplication;