module.exports = {
  'DemocracyOS Sign in test' : function (browser) {
    var LOGIN_BTN = "a.login";
    var LOGIN_FORM = "form.form";
    var LOGIN_FORM_EMAIL = LOGIN_FORM + " input[name=email]";
    var LOGIN_FORM_PASSWORD = LOGIN_FORM + " input[name=password]";
    var USER_BADGE = ".user-badge";
    var USER_BADGE_NAME = USER_BADGE + " .name";

    var USER = {
      email: 'test@test.test',
      password: 'testtest',
      name: 'test'
    }

    browser
      .url(browser.launchUrl)
      .waitForElementVisible(LOGIN_BTN, 1000)
      .click(LOGIN_BTN)
      .waitForElementVisible(LOGIN_FORM, 1000)
      .setValue(LOGIN_FORM_EMAIL, USER.email)
      .setValue(LOGIN_FORM_PASSWORD, USER.password)
      .submitForm(LOGIN_FORM)
      .waitForElementVisible(USER_BADGE_NAME, 1000)
      .assert.containsText(USER_BADGE_NAME, USER.name.toUpperCase())
      .end();
  }
};
