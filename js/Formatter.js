var Formatter = {
	formatItemTitle : function (itemName) {
		if (itemName === undefined || itemName === "") {
			return "Add an item";
		} else {
			return itemName;
		}
	}	
};