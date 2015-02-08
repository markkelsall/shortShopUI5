sap.ui.controller("application.home", {
	
	onInit : function () {
		homeController = this;

		var userModel = {
			firstName : "Mark",
			lastName : "Kelsall",
			email : "mark.kelsall@gmail.com"
		}

		var jModel = new sap.ui.model.json.JSONModel(userModel);
		sap.ui.getCore().setModel(jModel, "user");
	},

	onUserIconPress : function () {
		ssApp.getNavigation().toPage("application.user");
	},

	onAddPress : function () {
		
	}
});