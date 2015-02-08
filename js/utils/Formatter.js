var Formatter = {
		addRowPageTitle : function (selectedFlexTable) {
			return "New Entry in " + selectedFlexTable;
		},
		
		addRowPageInputTypeVis : function (type) {
			if (type == "0") {
				return true;
			}
			return false;
		},
		
		addRowFieldPageDateTypeVis : function (type) {
			if (type == "1") {
				return true;
			}
			return false;
		},
		
		flexTablePageTitle : function (selectedPool) {
			return selectedPool + " tables";
		},
		
		getHalfDay : function (bFullDayFlag){
			if(bFullDayFlag!=null&&bFullDayFlag!=undefined){
				return !bFullDayFlag;
			}
			
			return true;
		}
};