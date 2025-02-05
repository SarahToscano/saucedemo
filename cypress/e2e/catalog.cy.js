import catalogApp from '../support/pageObjects/catalog.pageObjects';
import LoginApplication from '../support/pageObjects/login.pageObjects';

describe('Catalog Tests', () => {
    let loginApp;

    const defaultUsers = require('../fixtures/defaultUsers.json');

    beforeEach(() => {
        loginApp = new LoginApplication();
        loginApp.visit();
    });

    const user = defaultUsers[0]; //standard_user
    it(`Should add all the 6 items, verify it and then proceed to checkout - ${user.username}`, () => {
        loginApp.inputUserName(user.username);
        loginApp.inputPassword(user.password);
        loginApp.clickLogin();

        catalogApp.assertInventoryLoad();
        catalogApp.addItems(['item1', 'item2', 'item3', 'item4', 'item5', 'item6']);

        catalogApp.proceedToCart();
        catalogApp.assertItemsInCart(['item1', 'item2', 'item3', 'item4', 'item5', 'item6']);

        catalogApp.proceedToCheckout();
    });

    it(`Should add 5 items, remove 3 and verify if only 2 remains - ${user.username}`, () => {
        loginApp.inputUserName(user.username);
        loginApp.inputPassword(user.password);
        loginApp.clickLogin();

        catalogApp.assertInventoryLoad();
        catalogApp.addItems(['item1', 'item3', 'item4', 'item5', 'item6']);
        catalogApp.removeItems(['item1', 'item3', 'item4']);

        catalogApp.proceedToCart();
        catalogApp.assertItemsInCart(['item1', 'item6']);
        
    });

    it(`Should filter items from lowest to highest (lohi) price - ${user.username}`, () => {
        loginApp.inputUserName(user.username);
        loginApp.inputPassword(user.password);
        loginApp.clickLogin();
    
        catalogApp.assertInventoryLoad();
        catalogApp.applyFilter('lohi');
        catalogApp.assertPriceOrder('lohi')
    });

    it(`Should filter items from highest to lowest (hilo) price - ${user.username}`, () => {
        loginApp.inputUserName(user.username);
        loginApp.inputPassword(user.password);
        loginApp.clickLogin();
    
        catalogApp.assertInventoryLoad();
        catalogApp.applyFilter('hilo');
        catalogApp.assertPriceOrder('hilo')
    });


});
