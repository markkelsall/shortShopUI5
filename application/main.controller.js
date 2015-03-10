sap.ui.controller("application.main", {
	
	onInit : function () {
		mainController = this;

		var jModel = new sap.ui.model.json.JSONModel({data : sap.ui.Device});
		sap.ui.getCore().setModel(jModel, "device");

		mainController.checkAlreadyLoggedIn();

		ssApp.getNavigation().setApp(this.app);
		
		this.getView().setDisplayBlock(true);
	},

	onLoginPress : function () {
		console.log("Entering onLoginPress");

		console.log("Exiting onLoginPress");
	},

	onRegisterPress : function () {
		console.log("Entering onRegisterPress");
		
		console.log("Exiting onRegisterPress");
	},

	checkAlreadyLoggedIn : function () {
		AjaxModel.post("backend/services/user/checkLoggedIn.php", null, mainController.onCheckAlreadyLoggedInCallback);
  	},

  	onCheckAlreadyLoggedInCallback : function(data) {
  		if (data !== undefined && data !== null) {
			if (data.result === true) {

				var jModel = new sap.ui.model.json.JSONModel(data.user);
				sap.ui.getCore().setModel(jModel, "user");

				var jModel = new sap.ui.model.json.JSONModel({data : data.listItems});
				sap.ui.getCore().setModel(jModel, "listItems");

				var jModel = new sap.ui.model.json.JSONModel(data.listHeader);
				sap.ui.getCore().setModel(jModel, "listHeader");

				ssApp.getNavigation().toPage("application.home");
			} else {
				ssApp.getNavigation().toPage("application.login");
				if (data.message !== undefined) {
					sap.m.MessageToast.show(data.message);
				}
			}
		} else {
			ssApp.getNavigation().toPage("application.login");
		}
  	}
});