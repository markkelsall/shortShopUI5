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

	handleSwipeDelete: function(oEvent) {
    	var oList = oEvent.getSource();
    	var oItem = oEvent.getParameter("listItem");
		var sPath = oItem.getBindingContext().getPath();
    	
    	// after deletion put the focus back to the list
    	oList.attachEventOnce("updateFinished", oList.focus, oList);
    	
    	// send a delete request to the odata service
    	this.oProductModel.remove(sPath);
  	}
});