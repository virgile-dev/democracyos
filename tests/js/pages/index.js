module.exports = {
  url: function() { 
    return this.api.launchUrl; 
  },
  elements: {
  	loginBtn: {
  		selector: ".user-nav .login"
  	},
    userBadgeName: ".user-badge .name"
  }
};