function Navigation (sViewType) {
	this.splitApp = null;
	this.app = null;
	this.sViewType = sViewType;
}

/**
 * Function to load a new view or existing view.
 * Developers need to make sure that the view is already in the DOM.
 * Also, if a particular view needs to be created more than once, then this function 
 * should not be used. Use framework method instead.
 *   
 * @class Navigation
 * 
 * @param {String} sView - Full qualified page name e.g. application.master.mainPage
 * @return oView - new view created having Id as qualified name of the View, with the passed in View Type
 * @version {@link Navigation}
 */
Navigation.prototype.loadNewView = function (sView){
	var sId = Util.replaceAllInString(sView, ".", "_");
	var oView = sap.ui.view({id: sId, viewName:sView, type:this.sViewType});
	return oView;
};

Navigation.prototype.navigate = function (sToDivId, oController, oData, sTransition) {
	
	var oToDivClass = $("#" + sToDivId);
	
	sTransition = sTransition.toUpperCase();
	
	if (sTransition === "VERTICAL") {
		$(".citNavigateContainer").slideUp();
		oToDivClass.slideDown();
	} else if (sTransition === "LEFT") {
	
	} else if (sTransition === "RIGHT") {
		
	}
	
	if (oController !== undefined && oController.onBeforeShow) {
		oController.onBeforeShow(oData);
	}
};

/**
 * Function to navigate to a master view page
 *   
 * @class Navigation
 * 
 * @param {String} sView - Fully qualified view name e.g. application.master.main
 * @param {Object} oData -  data object or null (not mandatory)
 * @return none
 * @version {@link Navigation}
 */
Navigation.prototype.toMasterPage = function (sView, oData, sTransitionName) {
	//check to see if sView already exists in the DOM by replacing . with _
	var sId = Util.replaceAllInString(sView, ".", "_");
	var view = sap.ui.getCore().byId(sId);
	
	if (view === undefined) {
		//load view
		view = this.loadNewView(sView);
		//add view
		this.splitApp.addMasterPage(view);
	}
	
	sTransitionName = this.transitionLookup(sTransitionName);
	
	//In the case where the page is already visible, but we want to re-run the navigation
	if (this.splitApp.getCurrentMasterPage().getId() == sId && this.splitApp.getCurrentMasterPage().getController.onBeforeShow != undefined) {
		var evt = {};
		evt.data = oData;
		this.splitApp.getCurrentMasterPage().getController().onBeforeShow(evt);
	} else {
		this.splitApp.toMaster(sId, sTransitionName, oData, null);
	}
};

/**
 * Function to navigate to a detail view page
 *   
 * @class Navigation
 * 
 * @param {String} sPage - Full qualified page name e.g. application.detail.mainPage
 * @param {Object} oData -  data object or null (not mandatory)
 * @return none
 * @version {@link Navigation}
 */
Navigation.prototype.toDetailPage = function (sView, oData, sTransitionName) {
	//check to see if sView already exists in the DOM by replacing . with _
	var sId = Util.replaceAllInString(sView, ".", "_");
	var view = sap.ui.getCore().byId(sId);
	
	if (view === undefined) {
		//load view
		view = this.loadNewView(sView);
		//add view
		this.getSplitApp().addDetailPage(view);
	}
	
	sTransitionName = this.transitionLookup(sTransitionName);
	
	if (this.getSplitApp().getCurrentDetailPage().getId() == sId && this.splitApp.getCurrentDetailPage().getController.onBeforeShow != undefined) {
		var evt = {};
		evt.data = oData;
		this.splitApp.getCurrentDetailPage().getController().onBeforeShow(evt);
	} else {
		this.splitApp.toDetail(sId, sTransitionName, oData, null);
	}
};

Navigation.prototype.backMasterPage = function (oBackData, sView) {
	if (sView !== undefined) {
		var sId = Util.replaceAllInString(sView, ".", "_");
		this.splitApp.backToPage(sId, oBackData);
	} else {
		this.splitApp.backMaster(oBackData);
	}
};

Navigation.prototype.backDetailPage = function (oBackData, sView) {
	if (sView !== undefined) {
		var sId = Util.replaceAllInString(sView, ".", "_");
		this.splitApp.backToPage(sId, oBackData);
	} else {
		this.splitApp.backDetail(oBackData);
	}
};

Navigation.prototype.toPage = function (sView, oData, sTransitionName) {
	//check to see if sView already exists in the DOM by replacing . with _
	var sId = Util.replaceAllInString(sView, ".", "_");
	var view = sap.ui.getCore().byId(sId);
	
	if (view === undefined) {
		//load view
		view = this.loadNewView(sView);
		//add view
		this.app.addPage(view);
	}
	
	sTransitionName = this.transitionLookup(sTransitionName);
	
	if (this.app.getCurrentPage().getId() == sId && this.app.getCurrentPage().onBeforeShow != undefined) {
		var evt = {};
		evt.data = oData;
		this.app.getCurrentPage().getController().onBeforeShow(evt);
	} else {
		this.app.to(sId, sTransitionName, oData, null);
	}
};

Navigation.prototype.backPage = function (oBackData, sView) {
	if (sView !== undefined) {
		var sId = Util.replaceAllInString(sView, ".", "_");
		this.app.backToPage(sId, oBackData);
	} else {
		this.app.back(oBackData);
	}
};

Navigation.prototype.transitionLookup = function (sTransitionName) {
	if (sTransitionName != undefined) {
		sTransitionName = sTransitionName.toLowerCase();
		if (sTransitionName !== "fade" && sTransitionName !== "flip" && sTransitionName !== "show") {
			sTransitionName = "slide";
		}
	} else {
		sTransitionName = "slide";
	}
	
	return sTransitionName;
};

Navigation.prototype.getApp = function () {
	return this.app;
};

Navigation.prototype.setApp = function (app) {
	this.app = app;
};

Navigation.prototype.getSplitApp = function () {
	return this.splitApp;
};

Navigation.prototype.setSplitApp = function (splitApp) {
	this.splitApp = splitApp;
};