sap.ui.controller("application.user", {
	
	onInit : function () {
		userController = this;
	},

	onBackPress : function () {
		ssApp.getNavigation().backPage();
	}
});