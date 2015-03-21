sap.ui.controller("application.register", {
	
	onInit : function () {
		registerController = this;

		var jModel = new sap.ui.model.json.JSONModel({});
		sap.ui.getCore().setModel(jModel, "registerUser");
	},

	onBackPress : function () {
		ssApp.getNavigation().backPage();
	},

	onRegisterPress : function () {
		//validate here on client side
		var data = sap.ui.getCore().getModel("registerUser").getData();
		AjaxModel.post("backend/services/user/createUser.php", data, registerController.onRegisterCallback);
	},

	onForgotPasswordPress : function () {

	},

	onRegisterCallback : function (data) {
		if (data !== undefined && data !== null) {
			if (data.result) {
				var jModel = new sap.ui.model.json.JSONModel(data.user);
				sap.ui.getCore().setModel(jModel, "user");

				var jModel = new sap.ui.model.json.JSONModel();
				sap.ui.getCore().setModel(jModel, "listItems");

				var jModel = new sap.ui.model.json.JSONModel(data.listHeader);
				sap.ui.getCore().setModel(jModel, "listHeader");

				var jModel = new sap.ui.model.json.JSONModel({data : sap.ui.Device});
				sap.ui.getCore().setModel(jModel, "device");
				
				ssApp.getNavigation().toPage("application.home");
			} else {
				sap.m.MessageToast.show(data.message);
			}
		}
	}
});