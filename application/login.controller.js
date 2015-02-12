sap.ui.controller("application.login", {
	
	onInit : function () {
		loginController = this;

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
			type : "GET",
			async : true,
			data : data,
			success : function (data) {
				console.log(data);
				if (data.result) {

					var jModel = new sap.ui.model.json.JSONModel(data.user);
					sap.ui.getCore().setModel(jModel, "user");

					var jModel = new sap.ui.model.json.JSONModel({data : data.listItems});
					sap.ui.getCore().setModel(jModel, "listItems");

					var jModel = new sap.ui.model.json.JSONModel(data.listHeader);
					sap.ui.getCore().setModel(jModel, "listHeader");

					ssApp.getNavigation().toPage("application.home");
				} else {
					//no user found
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

	}
});