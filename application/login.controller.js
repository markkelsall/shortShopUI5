sap.ui.controller("application.login", {
	
	onInit : function () {
		loginController = this;
		
		var jModel = new sap.ui.model.json.JSONModel({data : sap.ui.Device});
		sap.ui.getCore().setModel(jModel, "device");

		var jModel = new sap.ui.model.json.JSONModel({});
		sap.ui.getCore().setModel(jModel, "loginModel");
	},

	onLoginPress : function () {
		var data = sap.ui.getCore().getModel("loginModel").getData();
		
		AjaxModel.post("backend/services/user/loginUser.php", data, loginController.onLoginCallback);
	},

	onRegisterPress : function () {
		ssApp.getNavigation().toPage("application.register");
	},

	onForgotPasswordPress : function () {

	},

	onLoginCallback : function (data) {
		if (data.result) {
			var jModel = new sap.ui.model.json.JSONModel(data.user);
			sap.ui.getCore().setModel(jModel, "user");

			var jModel = new sap.ui.model.json.JSONModel({data : data.listItems});
			sap.ui.getCore().setModel(jModel, "listItems");

			var jModel = new sap.ui.model.json.JSONModel(data.listHeader);
			sap.ui.getCore().setModel(jModel, "listHeader");
			
			ssApp.getNavigation().toPage("application.home");
		} else {
			sap.m.MessageToast.show(data.message);
		}
	}
});