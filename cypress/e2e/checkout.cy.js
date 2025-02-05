import catalogApp from '../support/pageObjects/catalog.pageObjects';
import LoginApplication from '../support/pageObjects/login.pageObjects';
import checkoutApplication from '../support/pageObjects/checkout.pageObjects';
import LogoutApplication from '../support/pageObjects/logout.pageObjects';

describe('Catalog Tests', () => {
    let loginApp;
    let logoutApp;

    const defaultUsers = require('../fixtures/defaultUsers.json');

    beforeEach(() => {
        loginApp = new LoginApplication();
        loginApp.visit();
        logoutApp = new LogoutApplication();
    });
    const user = defaultUsers[0]; //standard_user
    const errorMessagesCheckout = require('../fixtures/errorMessagesCheckout.json');

    it(`Should execute a complete fulfielment succesfuly - ${user.username}`, () => {
        loginApp.inputUserName(user.username);
        loginApp.inputPassword(user.password);
        loginApp.clickLogin();

        catalogApp.assertInventoryLoad();
        catalogApp.applyFilter('hilo');
        catalogApp.assertPriceOrder('hilo')
        catalogApp.addItems(['item1', 'item2', 'item3']);
        catalogApp.removeItems(['item1']);
        catalogApp.proceedToCart();
        catalogApp.assertItemsInCart(['item2', 'item3']);
        catalogApp.proceedToCheckout();

        checkoutApplication.inputName('Sarah');
        checkoutApplication.inputLastName('Carvalho');
        checkoutApplication.inputPostalCode('5555/55555');
        checkoutApplication.clickContinue(); // /checkout-step-two.html
        checkoutApplication.assertCheckoutSuccess();
        checkoutApplication.clickFinish();
        checkoutApplication.assertFinish(); //checkout-complete.html'

        logoutApp.clickMenu();
        logoutApp.clickLogout();
        logoutApp.validateSuccessfulLogout();
    });


    it(`Should return from checkout-step-two to cart, change the checkout form data and then procced again to finish the checkout succesfuly - ${user.username}`, () => {
        loginApp.inputUserName(user.username);
        loginApp.inputPassword(user.password);
        loginApp.clickLogin();

        catalogApp.assertInventoryLoad();
        catalogApp.addItems(['item5', 'item6']);
        catalogApp.proceedToCart();
        catalogApp.assertItemsInCart(['item2', 'item3']);
        catalogApp.proceedToCheckout();

        checkoutApplication.inputName('Sarah');
        checkoutApplication.inputLastName('Carvalho');
        checkoutApplication.inputPostalCode('5555/55555');
        checkoutApplication.clickContinue(); // /checkout-step-two.html
        checkoutApplication.assertCheckoutSuccess();
        checkoutApplication.clickCancelOverview(); //return to /cart.html

        catalogApp.proceedToCart();        
        catalogApp.proceedToCheckout();

        checkoutApplication.inputName('Ana');
        checkoutApplication.inputLastName('Andrade');
        checkoutApplication.inputPostalCode('888888/0000');
        checkoutApplication.clickContinue(); // /checkout-step-two.html       
        checkoutApplication.clickFinish(); ///checkout-complete.html'
        checkoutApplication.assertFinish();

        logoutApp.clickMenu();
        logoutApp.clickLogout();
        logoutApp.validateSuccessfulLogout();
    });


    it(`Should failure when try to submit the checkout form without name - ${user.username}`, () => {
        loginApp.inputUserName(user.username);
        loginApp.inputPassword(user.password);
        loginApp.clickLogin();

        catalogApp.assertInventoryLoad();
        catalogApp.addItems(['item5']);
        catalogApp.proceedToCart();
        catalogApp.proceedToCheckout();

        checkoutApplication.inputName('');
        checkoutApplication.inputLastName('Carvalho');
        checkoutApplication.inputPostalCode('5555/55555');
        checkoutApplication.clickContinue(); // /checkout-step-two.html
        checkoutApplication.assertCheckoutError(errorMessagesCheckout.FirstNameRequired);
    });

    it(`Should failure when try to submit the checkout form without last name - ${user.username}`, () => {
        loginApp.inputUserName(user.username);
        loginApp.inputPassword(user.password);
        loginApp.clickLogin();

        catalogApp.assertInventoryLoad();
        catalogApp.addItems(['item5']);
        catalogApp.proceedToCart();
        catalogApp.proceedToCheckout();

        checkoutApplication.inputName('Sarah');
        checkoutApplication.inputLastName('');
        checkoutApplication.inputPostalCode('5555/55555');
        checkoutApplication.clickContinue(); // /checkout-step-two.html
        checkoutApplication.assertCheckoutError(errorMessagesCheckout.lastNameRequired);
    });


    it(`Should failure when try to submit the checkout form without postal code - ${user.username}`, () => {
        loginApp.inputUserName(user.username);
        loginApp.inputPassword(user.password);
        loginApp.clickLogin();

        catalogApp.assertInventoryLoad();
        catalogApp.addItems(['item5']);
        catalogApp.proceedToCart();
        catalogApp.proceedToCheckout();

        checkoutApplication.inputName('Sarah');
        checkoutApplication.inputLastName('Carvalho');
        checkoutApplication.inputPostalCode('');
        checkoutApplication.clickContinue(); // /checkout-step-two.html
        checkoutApplication.assertCheckoutError(errorMessagesCheckout.PostalCodeRequired);
    });

});
