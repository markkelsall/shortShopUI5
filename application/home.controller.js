sap.ui.controller("application.home", {
	
	onInit : function () {
		homeController = this;

		homeController.getView().addEventDelegate({
			onBeforeShow: function(evt) {
      			homeController.onBeforeShow(evt.backData);
   			}
		});
	},

	onBeforeShow : function (backData) {
		if (backData !== undefined && backData !== null && backData.message !== undefined && backData.message !== "") {
			sap.m.MessageToast.show(backData.message);
		}
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
	},

	handleDeleteGesture: function(oEvent) {
		var item = oEvent.getParameter("listItem").getBindingContext("listItems").getObject();
		
		var jModel = new sap.ui.model.json.JSONModel(item);
		sap.ui.getCore().setModel(jModel, "deleteItem");

		var fragment = new sap.ui.xmlfragment("application.fragments.deleteItem");
		fragment.open();
  	},

  	onDialogCloseButton : function (oEvent) {

  	}
});