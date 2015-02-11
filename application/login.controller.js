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
			type : "POST",
			async : true,
			data : data,
			success : function (data) {
				console.log(data);
				if (data.result) {

					var jModel = new sap.ui.model.json.JSONModel(data.user);
					sap.ui.getCore().setModel(jModel, "user");

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