sap.ui.controller("application.main", {
	
	onInit : function () {
		mainController = this;
		ssApp.getNavigation().setApp(this.app);
		ssApp.getNavigation().toPage("application.login");
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

	loggedInCheck : function () {
		$.ajax({
			url: "",
			done : function (result){
        		
    		},
    		fail : function (result) {

    		}
    	});
	}
});