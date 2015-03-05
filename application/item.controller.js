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
				type : "POST",
				async : true,
				data : item,
				success : function (data) {
					if (data !== undefined && data !== null) {
						if (data.result === true) {
							//success
							var listItems = sap.ui.getCore().getModel("listItems").getData();

							for (var i = 0; i < listItems.data.length; i++) {
								if (item.id === listItems.data[i].id) {
									listItems.data[i] = item;
									break;
								}
							}

							var jModel = new sap.ui.model.json.JSONModel({data : listItems.data});
							sap.ui.getCore().setModel(jModel, "listItems");

							ssApp.getNavigation().backPage({message : "Item updated"});
						} else {
							//fail
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
				type : "POST",
				async : true,
				data : item,
				success : function (data) {
					if (data !== undefined && data !== null) {
						if (data.result === true) {
							//success
							//get the list items to add item
							var listItems = sap.ui.getCore().getModel("listItems").getData();

							var item = sap.ui.getCore().getModel("item").getData();
							item.id = data.itemId;
							listItems.data.push(item);

							var jModel = new sap.ui.model.json.JSONModel(listItems);
							sap.ui.getCore().setModel(jModel, "listItems");

							//get the list header to add 1 to it
							var listHeader = sap.ui.getCore().getModel("listHeader").getData();
							listHeader.itemCount = parseInt(listHeader.itemCount) + 1;

							var jModel = new sap.ui.model.json.JSONModel(listHeader);
							sap.ui.getCore().setModel(jModel, "listHeader");

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
	}
});