sap.ui.controller("application.add", {
	
	onInit : function () {
		addController = this;

		var itemModel = {
			name : "name",
			quantity : "quantity",
			additionalComments : "additionalComments"
		};

		var jModel = new sap.ui.model.json.JSONModel(itemModel);
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
	}
});