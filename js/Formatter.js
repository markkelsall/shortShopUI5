var Formatter = {
	itemViewFormatItemTitle : function (itemId, itemName) {
		if (itemId === undefined || itemId === "") {
			return "Add an item";
		} else {
			return itemName;
		}
	},

	itemViewFormatButtonText : function (itemName) {
		if (itemName === undefined || itemName === "") {
			return "Add item";
		} else {
			return "Update item";
		}
	},

	itemViewFormatButtonIcon : function (itemName) {
		if (itemName === undefined || itemName === "") {
			return "sap-icon://add";
		} else {
			return "sap-icon://edit";
		}
	},

	homeViewTitle : function (itemCount) {
		if (itemCount === undefined || itemCount === null || itemCount === 0) {
			return "My list";
		} else {
			return "My list (" + itemCount + ")";
		}
	},

	listMode : function (device) {
		if (device.system.desktop) {
			return "Delete";
		}
	}
};