sap.ui.controller("application.home", {
	
	onInit : function () {
		homeController = this;
	},

	onUserIconPress : function () {
		ssApp.getNavigation().toPage("application.user");
	},

	onAddPress : function () {
		ssApp.getNavigation().toPage("application.add");
	}
});