import { LOGIN_FORM } from '../elements/login.elements';

class LoginApplication {
  visit() {
    cy.visit('/');
  }
  inputUserName(data) {
    if(data){
        cy.get(LOGIN_FORM.inputUserName).type(data, { parseSpecialCharSequences: false });
    }
  }
  inputPassword(data) {
    if(data){
        cy.get(LOGIN_FORM.inputPassword).type(data, { parseSpecialCharSequences: false });
    }
  }
  clickLogin() {
    cy.get(LOGIN_FORM.btnLogin).click();
  }
  assertLoginSuccess() {
    cy.url().should('include', '/inventory.html'); //Access to shopping cart
  }

  assertLoginError(errorMessage) {
    cy.get(LOGIN_FORM.errorMessage)
      .should('be.visible')
      .and('contain', errorMessage); // verify error message
  }
}

export default LoginApplication;