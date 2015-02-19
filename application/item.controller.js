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

		var itemMessageModel = {
			result : false,
			friendlyMessage : ""
		};

		var jModel = new sap.ui.model.json.JSONModel(itemMessageModel);
		sap.ui.getCore().setModel(jModel, "itemMessage");
	},

	onAddItemPress : function () {
		var item = sap.ui.getCore().getModel("item").getData();

		//validate

		//submit to backend
		$.ajax({
			url : "backend/services/shoppingListItem/createShoppingListItem.php",
			type : "GET",
			async : true,
			data : item,
			success : function (data) {
				console.log(data);
			},
			error : function (error) {
				console.log(error);
			}
		});
	},

	onBackPress : function () {
		ssApp.getNavigation().backPage();
	},

	formatTitle : function (itemName) {
		console.log(itemName);
	}
});