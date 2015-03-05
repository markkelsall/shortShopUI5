sap.ui.controller("application.login", {
	
	onInit : function () {
		loginController = this;

		loginController.checkAlreadyLoggedIn();

		var loginModel = {
			email : "mark.kelsall@gmail.com",
			password : "pr0file1"
		};

		var jModel = sap.ui.model.json.JSONModel(loginModel);
		sap.ui.getCore().setModel(jModel, "loginModel");
	},

	onLoginPress : function () {
		var data = sap.ui.getCore().getModel("loginModel").getData();
		
		$.ajax({
			url : "backend/services/user/loginUser.php",
			type : "POST",
			async : true,
			data : data,
			success : function (data) {
				if (data.result) {

					var jModel = new sap.ui.model.json.JSONModel(data.user);
					sap.ui.getCore().setModel(jModel, "user");

					var jModel = new sap.ui.model.json.JSONModel({data : data.listItems});
					sap.ui.getCore().setModel(jModel, "listItems");

					var jModel = new sap.ui.model.json.JSONModel(data.listHeader);
					sap.ui.getCore().setModel(jModel, "listHeader");

					var jModel = new sap.ui.model.json.JSONModel({data : sap.ui.Device});
					sap.ui.getCore().setModel(jModel, "device");
					
					ssApp.getNavigation().toPage("application.home");
				} else {
					sap.m.MessageToast.show(data.message);
				}
			},
			error : function (error) {
				console.log(error);
			}
		});
	},

	onRegisterPress : function () {
		ssApp.getNavigation().toPage("application.register");
	},

	onForgotPasswordPress : function () {

	},

	checkAlreadyLoggedIn : function () {
  		$.ajax({
			url : "backend/services/user/checkLoggedIn.php",
			type : "POST",
			async : true,
			success : function (data) {
				if (data !== undefined && data !== null) {
					if (data.result === true) {
						ssApp.getNavigation().toPage("application.home");
					}
				}
			},
			error : function (error) {
				
			}
		});
  	}
});