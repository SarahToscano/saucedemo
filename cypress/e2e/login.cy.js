import LoginApplication from "../support/pageObjects/login.pageObjects";

describe('Login Tests', () => {
  let loginApp;

  beforeEach(() => {
    loginApp = new LoginApplication(); //Create a new instance of login class
    loginApp.visit();
  });

  const defaultUsers = require('../fixtures/defaultUsers.json');
  const usersVariations = require('../fixtures/extraUsersVariation.json');

  const performLogin = (username, password) => {
    loginApp.inputUserName(username);
    loginApp.inputPassword(password);
    loginApp.clickLogin();
  };

  // Test to validate the sucessful logins of default users, without modifications on credentials.
  // Following the same user and password informed at site
  defaultUsers.forEach((user) => {
    it(`Login ${user.loginExpectedResult}: default credentials to user ${user.username}`, () => {
      performLogin(user.username, user.password);
      if (user.loginExpectedResult === 'successful') {
        loginApp.assertLoginSuccess();
      } else if (user.loginExpectedResult === 'failure') {
        loginApp.assertLoginError(user.errorMessage);
      }
    });
  });

  // Test to validate the login failures. Adding modifications on username and passwords
  Object.keys(usersVariations)
    .slice(0, 4)
    .forEach((key) => {
      const user = usersVariations[key];
      it(`Login ${user.loginExpectedResult}: ${key.replace(/_/g, ' ')}`, () => {
        performLogin(user.username, user.password);
        if (user.loginExpectedResult === 'failure') {
          loginApp.assertLoginError(user.errorMessage);
        }
      });
    });

  // Performing variations for each case
  it(`Login ${usersVariations.valid_user_and_missing_password.loginExpectedResult}: valid username and missing password`, () => {
    performLogin(usersVariations.valid_user_and_missing_password.username, "");
    loginApp.assertLoginError(usersVariations.valid_user_and_missing_password.errorMessage);
  });

  it(`Login ${usersVariations.missing_user_and_valid_password.loginExpectedResult}: missing username and valid password`, () => {
    performLogin("", usersVariations.missing_user_and_valid_password.password);
    loginApp.assertLoginError(usersVariations.missing_user_and_valid_password.errorMessage);
  });

  it(`Login ${usersVariations.missing_user_and_password.loginExpectedResult}: missing username and password`, () => {
    performLogin("", "");
    loginApp.assertLoginError(usersVariations.missing_user_and_password.errorMessage);
  });

  it(`Login ${usersVariations.username_with_special_characters.loginExpectedResult}: invalid username with special characters`, () => {
    performLogin(usersVariations.username_with_special_characters.username, usersVariations.username_with_special_characters.password);
    loginApp.assertLoginError(usersVariations.username_with_special_characters.errorMessage);
  });


});