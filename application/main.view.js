sap.ui.jsview("application.main", {
	
	getControllerName: function() {
		return "application.main";
	},

	createContent: function(oController) {
		var app = new sap.m.App("ssApp");
		this.getController().app = app;
		return app;
	}
});