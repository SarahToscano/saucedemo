import { CHECKOUT_FORM } from '../elements/checkout.elements';

class checkoutApplication {

    inputName(data) {
        if (data) {
            cy.get(CHECKOUT_FORM.inputName).type(data);
        }
    }
    inputLastName(data) {
        if (data) {
            cy.get(CHECKOUT_FORM.inputLastName).type(data);
        }
    }
    inputPostalCode(data) {
        if (data) {
            cy.get(CHECKOUT_FORM.postalCode).type(data);
        }
    }
    clickContinue() {
        cy.get(CHECKOUT_FORM.btnContinue).click();
    }
    clickFinish() {
        cy.get(CHECKOUT_FORM.btnFinish).click();
    }

    clickCancel() {
        cy.get(CHECKOUT_FORM.btnCancel).click();
    }

    clickCancelOverview() {
        cy.get('#cancel').scrollIntoView().click();
    }

    assertCheckoutSuccess() {
        cy.url().should('include', '/checkout-step-two.html');
    }

    assertFinish() {
        cy.url().should('include', '/checkout-complete.html');
        cy.get(CHECKOUT_FORM.formSuccessMessage)
            .should('be.visible')
            .and('have.text', 'Thank you for your order!');
    }

    assertCheckoutError(errorMessage) {
        cy.get(CHECKOUT_FORM.formErrorMessage)
            .should('be.visible')
            .and('contain', errorMessage);
    }

}
export default new checkoutApplication();