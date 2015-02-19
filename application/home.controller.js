sap.ui.controller("application.home", {
	
	onInit : function () {
		homeController = this;
	},

	onUserIconPress : function () {
		ssApp.getNavigation().toPage("application.user");
	},

	onAddPress : function () {
		ssApp.getNavigation().toPage("application.item");
	},

	onListItemPress : function (e) {
		var item = e.getSource().getBindingContext("listItems").getObject();

		ssApp.getNavigation().toPage("application.item", item);	
	}
});