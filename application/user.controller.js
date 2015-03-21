sap.ui.controller("application.user", {
	
	onInit : function () {
		userController = this;
	},

	onBackPress : function () {
		ssApp.getNavigation().backPage();
	},

	onUpdateUser : function () {
		var userDetails = sap.ui.getCore().getModel("userCopy").getData();

		if (userDetails !== undefined) {
			AjaxModel.post("backend/services/user/updateUser.php", userDetails, userController.onUpdateUserCallback);
		}
	},

	onUpdateUserCallback : function (oResponse) {
		if (oResponse !== undefined && oResponse !== null) {
			if (oResponse.result) {
				ssApp.getNavigation().backPage();
				sap.m.MessageToast.show(oResponse.message);
				
				var user = sap.ui.getCore().getModel("userCopy").getData();
				var jModel = new sap.ui.model.json.JSONModel(user);
				sap.ui.getCore().setModel(jModel, "user");
			} else {
				sap.m.MessageToast.show(oResponse.message);
			}
		} else {
			sap.m.MessageToast.show("Sorry, we couldn't update your details.");
		}
	}
});