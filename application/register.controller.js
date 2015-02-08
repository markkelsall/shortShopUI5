sap.ui.controller("application.register", {
	
	onInit : function () {
		registerController = this;
	},

	onBackPress : function () {
		ssApp.getNavigation().backPage();
	},

	onRegisterPress : function () {
		console.log("Entering onRegisterPress");

		var app = sap.ui.getCore().byId("__xmlview0--shortShopApp");

		var registerView = sap.ui.getCore().byId("");
		if (registerView != null) {
			app.addPage(sap.ui.xmlview("application.register"));
		}
		
		console.log("Exiting onRegisterPress");
	},

	onForgotPasswordPress : function () {

	}
});