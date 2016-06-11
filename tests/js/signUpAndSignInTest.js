module.exports = {
  'DemocracyOS Sign in test' : function (browser) {
    var TIMEOUT = 1000;

    var indexPage = browser.page.index();
    var signinPage = browser.page.signin();
    var signinForm = signinPage.section.form();

    var LOGIN_BTN = indexPage.loginBtn//".user-nav .login";
    var LOGIN_FORM = "form.form";
    var LOGIN_FORM_EMAIL = LOGIN_FORM + " input[name=email]";
    var LOGIN_FORM_PASSWORD = LOGIN_FORM + " input[name=password]";
    var USER_BADGE = ".user-badge";
    var USER_BADGE_NAME = USER_BADGE + " .name";
    var SIGNUP_BTN = ".signup a";
    var SIGNUP_FORM = "#signup-form form";
    var SIGNUP_FORM_EMAIL = SIGNUP_FORM + " input[name=email]";
    var SIGNUP_FORM_FIRSTNAME = SIGNUP_FORM + " input#firstName";
    var SIGNUP_FORM_LASTNAME = SIGNUP_FORM + " input#lastName";
    var SIGNUP_FORM_PASSWORD = SIGNUP_FORM + " input[name=password]";
    var SIGNUP_FORM_REPASSWORD = SIGNUP_FORM + " input[name=re_password]";
    var SIGNUP_SUCCESS_MESSAGE_CONTAINER = "#signup-message h1";
    var SIGNUP_SUCCESS_MESSAGE = "Welcome";


    var id = new Date().getTime()
    var USER = {
      email: 'test-' + id + '@test.test',
      password: 'testtest',
      firstName: 'alexandre',
      lastName: 'pichon'
    }

    browser
      .url(browser.launchUrl)
      //.waitForElementVisible(LOGIN_BTN, TIMEOUT)

    indexPage  
      .click("@loginBtn");

    browser  
      .waitForElementVisible(SIGNUP_BTN, TIMEOUT)
      .click(SIGNUP_BTN)
      .waitForElementVisible(SIGNUP_FORM, TIMEOUT)
      .setValue(SIGNUP_FORM_EMAIL, USER.email)
      .setValue(SIGNUP_FORM_FIRSTNAME, USER.firstName)
      .setValue(SIGNUP_FORM_LASTNAME, USER.lastName)
      .setValue(SIGNUP_FORM_PASSWORD, USER.password)
      .setValue(SIGNUP_FORM_REPASSWORD, USER.password)
      .submitForm(SIGNUP_FORM)
      .waitForElementVisible(SIGNUP_SUCCESS_MESSAGE_CONTAINER, TIMEOUT)
      .assert.containsText(SIGNUP_SUCCESS_MESSAGE_CONTAINER, SIGNUP_SUCCESS_MESSAGE)
      .assert.containsText(SIGNUP_SUCCESS_MESSAGE_CONTAINER, USER.firstName)
      .assert.containsText(SIGNUP_SUCCESS_MESSAGE_CONTAINER, USER.lastName)

    browser
      //.url(browser.launchUrl)
      .waitForElementVisible(LOGIN_BTN, TIMEOUT)
    indexPage  
      .click("@loginBtn");

    signinForm
      .setValue(@email, USER.email)
      .setValue(@password, USER.password)

    browser  
      //.waitForElementVisible(LOGIN_FORM, TIMEOUT)
      //  .setValue(LOGIN_FORM_EMAIL, USER.email)
      .setValue(LOGIN_FORM_PASSWORD, USER.password)
      .submitForm(LOGIN_FORM)
      .waitForElementVisible(USER_BADGE_NAME, TIMEOUT)
      .assert.containsText(USER_BADGE_NAME, USER.firstName.toUpperCase())
      .end();
  }
};
