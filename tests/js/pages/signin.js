module.exports = {
  url: function() { 
    return this.api.launchUrl + "/signin"; 
  },
  elements: {
    form:{
      selector: "form.form"
    }, 
    email: {
      selector: "form.form input[name=email]"
    },
    password: {
      selector: "form.form input[name=password]"
    },
    signupBtn: {
      selector: ".signup a"
    }  
  }
};