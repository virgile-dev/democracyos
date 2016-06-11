module.exports = {

  url: function() { 
    return this.api.launchUrl + "/signup"; 
  },
  elements: {
    form:{
      selector: "#signup-form form"
    }, 
    email: {
      selector: " input[name=email]"
    },
    password: {
      selector: " input[name=password]"
    },
    firstName: {
      selector: " input#firstName"
    },
    lastName: {
      selector: " input#lastName"
    },
    rePassword: {
      selector: " input[name=re_password]"
    }
  }
};