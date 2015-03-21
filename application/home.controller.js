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
		var user = sap.ui.getCore().getModel("user").getData();
		user.emailAgain = user.email;
		
		var userCopyJModel = new sap.ui.model.json.JSONModel(user);
		sap.ui.getCore().setModel(userCopyJModel, "userCopy");

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

		if (!this.deleteItemFragment) {
			var deleteItemFragment = new sap.ui.xmlfragment("application.fragments.deleteItem", homeController);
			this.getView().addDependent(deleteItemFragment);
			this.deleteItemFragment = deleteItemFragment;
		}
		this.deleteItemFragment.open();
  	},

  	onDeleteConfirmPress : function (oEvent) {
  		var data = sap.ui.getCore().getModel("deleteItem").getData();
  		
  		AjaxModel.post("backend/services/shoppingListItem/deleteShoppingListItem.php", data, homeController.onDeleteItemCallback);
  	},

  	onDeleteCancelPress : function (oEvent) {
  		this.deleteItemFragment.close();
  	},

  	onLogoutPress : function () {
  		AjaxModel.post("backend/services/user/logoutUser.php", null, homeController.onLogoutPressCallback);
  	},

  	onLogoutPressCallback : function (data) {
  		if (data !== undefined && data !== null) {
			sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel({},"listItems"));
			sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel({},"listHeader"));

			ssApp.getNavigation().toPage("application.login");
			sap.m.MessageToast.show(data.message);
  		} else {
			ssApp.getNavigation().toPage("application.login");
  		}
  	},

  	onMenuIconPress : function (oEvent) {
  		if (!this.menuFragment) {
			var menuFragment = new sap.ui.xmlfragment("application.fragments.homeMenu", homeController);
			this.getView().addDependent(menuFragment);
			this.menuFragment = menuFragment;
		}

		this.menuFragment.openBy(oEvent.getSource());
  	},

  	onDeleteItemCallback : function (data) {
  		var item = sap.ui.getCore().getModel("deleteItem").getData();

  		if (data !== undefined && data !== null) {
			if (data.result === true) {
				//success
				var listItems = sap.ui.getCore().getModel("listItems").getData();

				//remove the item from the local model
				for (var i = 0; i < listItems.data.length; i++) {
					if (item.id === listItems.data[i].id) {
						listItems.data.splice(i, 1);
						break;
					}
				}

				var jModel = new sap.ui.model.json.JSONModel({data : listItems.data});
				sap.ui.getCore().setModel(jModel, "listItems");

				//update item count in the local model, the backend will have done it in the database as well
				var listHeader = sap.ui.getCore().getModel("listHeader").getData();
				listHeader.itemCount -= 1;

				var jModel = new sap.ui.model.json.JSONModel(listHeader);
				sap.ui.getCore().setModel(jModel, "listHeader");

				homeController.deleteItemFragment.close();
			} else {
				//fail
				homeController.deleteItemFragment.close();
				sap.m.MessageToast.show(data.message);
			}
		} else {
			homeController.deleteItemFragment.close();
			sap.m.MessageToast.show("Sorry, we couldn't delete the item. Please try again.");
		}
  	}
});