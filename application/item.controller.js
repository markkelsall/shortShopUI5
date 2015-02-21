sap.ui.controller("application.item", {
	
	onInit : function () {
		itemController = this;

		itemController.getView().addEventDelegate({
			onBeforeShow: function(evt) {
      			itemController.onBeforeShow(evt.data);
   			}
		});
	},

	onBeforeShow : function (item) {
		var jModel = new sap.ui.model.json.JSONModel(item);
		sap.ui.getCore().setModel(jModel, "item");
	},

	onAddUpdateItemPress : function () {
		var item = sap.ui.getCore().getModel("item").getData();

		if (item.id !== undefined && item.id !== null && item.id !== "") {
			//update
			$.ajax({
				url : "backend/services/shoppingListItem/updateShoppingListItem.php",
				type : "GET",
				async : true,
				data : item,
				success : function (data) {
					if (data !== undefined && data !== null) {
						if (data.result === true) {
							//success
							ssApp.getNavigation().backPage({message : "Item updated"});
						} else {
							sap.m.MessageToast.show(data.message);
						}
					} else {
						sap.m.MessageToast.show("Sorry, we couldn't update the item. Please try again.");
					}
				},
				error : function (error) {
					console.log(error);
				}
			});
		} else {
			//create
			$.ajax({
				url : "backend/services/shoppingListItem/createShoppingListItem.php",
				type : "GET",
				async : true,
				data : item,
				success : function (data) {
					if (data !== undefined && data !== null) {
						if (data.result === true) {
							//success
							ssApp.getNavigation().backPage({message : "Item created"});
						} else {
							sap.m.MessageToast.show(data.message);
						}
					} else {
						sap.m.MessageToast.show("Sorry, we couldn't create the item. Please try again.");
					}
				},
				error : function (error) {
					console.log(error);
				}
			});
		}

		//validate

		//submit to backend
		
	},

	onBackPress : function () {
		ssApp.getNavigation().backPage();
	},

	formatTitle : function (itemName) {
		console.log(itemName);
	}
});