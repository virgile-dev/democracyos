module.exports = {
  'DemocracyOS Signup then signin test' : function (browser) {
    var TIMEOUT = 1000;

    var indexPage = browser.page.index();
    var signinPage = browser.page.signin();
    var signupPage = browser.page.signup();
    var signupConfirmPage = browser.page.signupConfirmation();

    var USER = {
      email: 'test-' + new Date().getTime() + '@test.test',
      password: 'testtest',
      firstName: 'alexandre',
      lastName: 'pichon'
    }

    indexPage  
      .navigate()
      .waitForElementVisible("@loginBtn", TIMEOUT)
      .click("@loginBtn");

    signinPage
      .waitForElementVisible("@signupBtn", TIMEOUT)
      .click("@signupBtn")

    signupPage
      .waitForElementVisible("@form", TIMEOUT)
      .setValue("@email", USER.email)
      .setValue("@firstName", USER.firstName)
      .setValue("@lastName", USER.lastName)
      .setValue("@password", USER.password)
      .setValue("@rePassword", USER.password)
      .submitForm("@form")

    signupConfirmPage
      .waitForElementVisible("@successMessage", TIMEOUT)
      .assert.containsText("@successMessage", "Welcome")
      .assert.containsText("@successMessage", USER.firstName)
      .assert.containsText("@successMessage", USER.lastName)

    indexPage  
      .waitForElementVisible("@loginBtn", TIMEOUT)
      .click("@loginBtn");

    signinPage
      .waitForElementVisible("@form", TIMEOUT)
      .setValue("@email", USER.email)
      .setValue("@password", USER.password)
      .submitForm("@form")

    indexPage   
      .waitForElementVisible("@userBadgeName", TIMEOUT)   
      .assert.containsText("@userBadgeName", USER.firstName.toUpperCase())  

    browser  
      .end();
  }
};
