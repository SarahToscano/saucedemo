import LogoutApplication from '../support/pageObjects/logout.pageObjects';
import LoginApplication from '../support/pageObjects/login.pageObjects';

describe('Logout Tests', () => {
    let loginApp;
    let logoutApp;

    const defaultUsers = require('../fixtures/defaultUsers.json');

    beforeEach(() => {
        loginApp = new LoginApplication();
        logoutApp = new LogoutApplication();
        loginApp.visit();
    });

    defaultUsers.forEach((user) => {
        it(`Logout test after login with ${user.username}`, () => {
            loginApp.inputUserName(user.username);
            loginApp.inputPassword(user.password);
            loginApp.clickLogin();

            if (user.loginExpectedResult === 'successful') {
                loginApp.assertLoginSuccess();
                logoutApp.clickMenu();
                logoutApp.clickLogout();
                logoutApp.validateSuccessfulLogout();
            } else {
                loginApp.assertLoginError(user.logoutErrorMessage);
            }
        });
    });
});
