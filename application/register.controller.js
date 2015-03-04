sap.ui.controller("application.register", {
	
	onInit : function () {
		registerController = this;

		var jModel = new sap.ui.model.json.JSONModel({
			firstName : "Mark",
			lastName : "Kelsall",
			email : "mark.kelsall@gmail.com",
			password : "pr0file1",
			passwordAgain : "pr0file1"
		});
		sap.ui.getCore().setModel(jModel, "registerUser");
	},

	onBackPress : function () {
		ssApp.getNavigation().backPage();
	},

	onRegisterPress : function () {
		console.log("Entering onRegisterPress");

		var data = sap.ui.getCore().getModel("registerUser").getData();

		$.ajax({
			url : "backend/services/user/createUser.php",
			type : "GET",
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
					//no user found
				}
			},
			error : function (error) {
				console.log(error);
			}
		});
		
		console.log("Exiting onRegisterPress");
	},

	onForgotPasswordPress : function () {

	}
});