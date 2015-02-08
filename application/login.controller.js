sap.ui.controller("application.login", {
	
	onInit : function () {
		loginController = this;
	},

	onLoginPress : function () {
		console.log("Entering onLoginPress");

		ssApp.getNavigation().toPage("application.home");

		console.log("Exiting onLoginPress");
	},

	onRegisterPress : function () {
		console.log("Entering onRegisterPress");
		
		ssApp.getNavigation().toPage("application.register");

		console.log("Exiting onRegisterPress");
	},

	onForgotPasswordPress : function () {

	}
});