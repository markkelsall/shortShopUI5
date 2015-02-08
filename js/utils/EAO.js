function EAO (domain, bJson, sUsername, sPassword, bIsMobile) {
	
	if(bIsMobile){
		if(sap.m.BusyDialog("busyDialog") == undefined){
			new sap.m.BusyDialog("busyDialog");
		}
	}	
	this.domain = domain;
	this.bJson = bJson;
	this.sUsername = sUsername;
	this.sPassword = sPassword;
	this.sEndPoint = "";
	this.oServiceModel = null;	
	this.sErrorMsg="";
	this.bIsMobile = bIsMobile;
	
	// check for local Domain 
	this.getServiceUrl(domain);
	this.oServiceModel = new sap.ui.model.odata.ODataModel(this.sEndPoint, bJson, sUsername, sPassword);
	
	/*if (this.oServiceModel.getServiceMetatdata() == null ){
		throw new Error("Tell them Why this is broken Here");
	}*/
}

EAO.prototype.openAlert = function() {
	sap.ui.commons.MessageBox.show("WARNING msg Failed to load data", "WARNING","Internal Error ");
};

EAO.prototype.requestSentEvent= function(uri) {
	Logger.info("Request Sent: " + uri);
	if(this.bIsMobile){
		sap.ui.getCore().byId("busyDialog").open();
	}else{
		sap.ui.core.BusyIndicator.show(0);
	}	
};

EAO.prototype.requestCompletedEvent = function (uri) {
	Logger.info("Request Completed: " + uri);
	if(this.bIsMobile){
		sap.ui.getCore().byId("busyDialog").close();
	}else{
		sap.ui.core.BusyIndicator.hide();
	}
};

// comment this section only show this if there is a 404  
EAO.prototype.requestFailedEvent = function (errMsg) {
	Logger.error("Request Failed" + JSON.stringify(errMsg));	
	if(this.bIsMobile){
		sap.ui.getCore().byId("busyDialog").close();
	}else{
		sap.ui.core.BusyIndicator.hide();
	}
};

/**
 * Function to get the URL for service end-point
 *   
 * @class EAO
 * 
 * @param {String} sBaseUrl - Base URL passed of the application
 * @return {String} sEndPoint - End-point to use in application
 * @version {@link EAO}
 */
EAO.prototype.getServiceUrl = function (sBaseUrl) {
	try{
		if (window.location.hostname === "localhost") {
			//var sOrigin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
			this.sEndPoint = "proxy/" + sBaseUrl.replace("://", "/");
//			if (!jQuery.sap.startsWith(sBaseUrl, sOrigin)) {
//				
//			}
			return this.sEndPoint;
		} else {
			this.sEndPoint = sBaseUrl;
			return this.sEndPoint;
		}
	}catch(err){
		this.sErrorMsg = err;
	}
};


/**
 * Function to call sap.ui.model.oData.ODataModel read method, which 
 * will trigger a GET to the oData service specified for oServiceModel.
 * This is an asynchronous call and the response will be returned to 
 * fnCallback method defined in input parameters. 
 *   
 * @class EAO
 * 
 * @param {String} sPath - URI to be read 
 * @param {Function} fnCallback - Callback method to be called  
 * @return none (asynchronous) 
 * @version {@link EAO}
 */
EAO.prototype.read = function(sPath, fnCallback) {
	this.requestSentEvent(sPath);
	var oResponse = {};
	var that = this;
	
	this.oServiceModel.read(sPath,
			{
				context : null, 
				urlParameters : null, 
				async : true,
				success : function (oData, response) {
					that.requestCompletedEvent(sPath);
					oResponse.model = oData;
					oResponse.statusCode = 200;
					oResponse.response = response;
					sap.ui.core.BusyIndicator.hide();
					fnCallback(oResponse);
				},
				error : function (oError) {
					//that.requestCompletedEvent(sPath);
					that.sErrorMsg= oError;
					that.requestFailedEvent(that.sErrorMsg);
					oResponse.statusCode = oError.response.statusCode;
					oResponse.errorModel = that.messageParse(oError.response.body,null,null);					
					fnCallback(oResponse);
				}
			}
		);
};

/**
 * Function to call sap.ui.model.oData.ODataModel update method, which 
 * will trigger a PUT {merge : false} to the oData service specified for 
 * oServiceModel.This is an asynchronous call and the response will be 
 * returned to fnCallback method defined in input parameters. 
 *  
 * @class EAO
 * 
 * @param {String} sPath - URI for the update 
 * @param {Object} oData - Data object to be updated
 * @param {Function} fnCallback - Callback method to be called  
 * @return none (asynchronous) 
 * @version {@link EAO}
 */
EAO.prototype.update = function(sPath, oData, fnCallback) {
	this.requestSentEvent();
	var oResponse = {};
	var that = this;

	this.oServiceModel.update(sPath, oData, 
			{
				context : null,
				success : function (oData, response) {
					that.requestCompletedEvent(sPath);
					oResponse.model = oData;
					oResponse.statusCode = 200;
					oResponse.response = response;
					fnCallback(oResponse);
				},
				error : function (oError) {
					//that.requestCompletedEvent(sPath);
					that.sErrorMsg = oError;
					that.requestFailedEvent(that.sErrorMsg);
					oResponse.statusCode = oError.response.statusCode;
					oResponse.errorModel = that.messageParse(oError.response.body,null,null);			
					fnCallback(oResponse);
				}, 
				merge : false, 
				async : true, 
				urlParameters : null
			}

	);
};

/**
 * Function to call sap.ui.model.oData.ODataModel update method, which 
 * will trigger a MERGE {merge : true} to the oData service specified for 
 * oServiceModel.This is an asynchronous call and the response will be 
 * returned to fnCallback method defined in input parameters. 
 *  
 * @class EAO
 * 
 * @param {String} sPath - URI for the merge
 * @param {Object} oData - Data object to be merged
 * @param {Function} fnCallback - Callback method to be called  
 * @return none (asynchronous) 
 * @version {@link EAO}
 */
EAO.prototype.merge = function(sPath, oData, fnCallback) {
	this.requestSentEvent();
	var oResponse = {};
	var that = this;

	this.oServiceModel.update(sPath, oData, 
			{
				context : null,
				success : function (oData, response) {
					that.requestCompletedEvent(sPath);
					oResponse.model = oData;
					oResponse.statusCode = 200;
					oResponse.response = response;
					fnCallback(oResponse);
				},
				error : function (oError) {
					//that.requestCompletedEvent(sPath);
					that.sErrorMsg = oError;
					that.requestFailedEvent(that.sErrorMsg);
					oResponse.statusCode = oError.response.statusCode;
					oResponse.errorModel = that.messageParse(oError.response.body,null,null);			
					fnCallback(oResponse);
				}, 
				merge : true, 
				async : true, 
				urlParameters : null
			}
	);
};

/**
 * Function to call sap.ui.model.oData.ODataModel remove method, which 
 * will trigger a DELETE {merge : true} to the oData service specified 
 * for oServiceModel.This is an asynchronous call and the response will 
 * be returned to callback method defined in input parameters. 
 *  
 * @class EAO
 * 
 * @param {String} sPath - URI to be deleted 
 * @param {Function} fnCallback - Callback method to be called  
 * @return none (asynchronous) 
 * @version {@link EAO}
 */
EAO.prototype.remove = function(sPath, fnCallback) {
	this.requestSentEvent();
	var oResponse = {};
	var that = this;

	this.oServiceModel.remove(sPath, 
			{				
				context : null,
				success : function (oData, response) {
					that.requestCompletedEvent(sPath);
					oResponse.model = oData;
					oResponse.statusCode = 200;
					oResponse.response = response;
					fnCallback(oResponse);
				},
				error : function (oError) {
					//that.requestCompletedEvent(sPath);
					that.sErrorMsg = oError;
					that.requestFailedEvent(that.sErrorMsg);
					oResponse.statusCode = oError.response.statusCode;
					oResponse.errorModel = that.messageParse(oError.response.body,null,null);			
					fnCallback(oResponse);
				}, 
				async : true, 
				urlParameters : null
			}
	);
};


/**
 * Function to call sap.ui.model.oData.ODataModel remove method, which 
 * will trigger a POST to the oData service specified for oServiceModel.
 * This is an asynchronous call and the response will be returned 
 * to callback method defined in input parameters. 
 *  
 * @class EAO
 * 
 * @param {String} sPath - URI to be deleted 
 * @param {Object} oData - Data object to be created
 * @param {Function} fnCallback - Callback method to be called  
 * @return none (asynchronous) 
 * @version {@link EAO}
 */
EAO.prototype.create = function(sPath, oData, fnCallback) {
	this.requestSentEvent(sPath);
	var oResponse = {};
	var that = this;

	this.oServiceModel.create(sPath, oData, 
			{
				context : null,
				success : function (oData, response) {
					that.requestCompletedEvent(sPath);
					oResponse.model = oData;
					oResponse.statusCode = 200;
					oResponse.response = response;
					fnCallback(oResponse);
				},
				error : function (oError) {
					//that.requestCompletedEvent(sPath);
					that.sErrorMsg = oError;
					that.requestFailedEvent(that.sErrorMsg);
					oResponse.statusCode = oError.response.statusCode;
					oResponse.errorModel = that.messageParse(oError.response.body,null,null);			
					fnCallback(oResponse);
				}, 
				async : true, 
				urlParameters : null
			}
	);
};

/**
 * Function to call sap.ui.model.oData.ODataModel submitBatch method, which 
 * will trigger a $batch - Read on oServiceModel. We are using createBatchOperation 
 * method to create an array of batch read operations and add it to another array 
 * via addBatchReadOperations method (GET call). This is an asynchronous call and 
 * the response will be returned to callback method defined in input parameters. 
 *  
 * @class EAO
 * 
 * @param {String[]} arrSPath - array of read URI to be read 
 * @param {Function} fnCallback - Callback method to be called  
 * @return none (asynchronous) 
 * @version {@link EAO}
 */
EAO.prototype.batchRead = function(arrSPath,fnCallback) {	
	var uri = "";
	var arrBatchRead = [];
	
	if(arrSPath.length>0){
		uri = arrSPath.join();
	}	
	this.requestSentEvent(uri);
	var oResponse = {};
	var that = this;
	
	for(var i=0; i<arrSPath.length; i++){
		arrBatchRead.push(this.oServiceModel.createBatchOperation(arrSPath[i], "GET"));
	}	
	this.oServiceModel.addBatchReadOperations(arrBatchRead);
	
	this.oServiceModel.submitBatch(
		function (oData, response) {
			that.requestCompletedEvent(uri);
			oResponse.model = oData;
			oResponse.statusCode = 200;
			oResponse.response = response;
			that.oServiceModel.clearBatch();
			fnCallback(oResponse);
		},
		function (oError) {
			//that.requestCompletedEvent(uri);
			that.sErrorMsg= oError;
			that.requestFailedEvent(that.sErrorMsg);
			oResponse.statusCode = oError.response.statusCode;
			oResponse.errorModel = that.messageParse(oError.response.body,null,null);
			that.oServiceModel.clearBatch();
			fnCallback(oResponse);
		});
};

/**
 * Function to call sap.ui.model.oData.ODataModel submitBatch method, which 
 * will trigger a $batch - Create on oServiceModel. We are using createBatchOperation 
 * method to create an array of batch post operations and add it to another array 
 * via addBatchCreateOperations method (POST call). This is an asynchronous call and 
 * the response will be returned to callback method defined in input parameters. 
 *  
 * @class EAO
 * 
 * @param {String[]} arrCreateData - array of post URI and data objects with 1:1 mapping to be posted
 * @param {Function} fnCallback - Callback method to be called  
 * @return none (asynchronous) 
 * @version {@link EAO}
 */
EAO.prototype.batchCreate = function(arrCreateData,fnCallback) {	
	var uri = arrCreateData.uri;
	var arrBatchCreate = [];

	this.requestSentEvent(uri);
	var oResponse = {};
	var that = this;
	
	for(var i=0; i<arrCreateData.data.length; i++){
		arrBatchCreate.push(this.oServiceModel.createBatchOperation(uri, "POST", arrCreateData.data[i]));
	}
	
	this.oServiceModel.addBatchChangeOperations(arrBatchCreate);
	
	this.oServiceModel.submitBatch(
		function (oData, response) {
			that.requestCompletedEvent(uri);
			oResponse.model = oData;
			oResponse.statusCode = 200;
			oResponse.response = response;
			that.oServiceModel.clearBatch();
			fnCallback(oResponse);
		},
		function (oError) {
			//that.requestCompletedEvent(uri);
			that.sErrorMsg= oError;
			that.requestFailedEvent(that.sErrorMsg);
			oResponse.statusCode = oError.response.statusCode;
			oResponse.errorModel = that.messageParse(oError.response.body,null,null);
			that.oServiceModel.clearBatch();
			fnCallback(oResponse);
		});
};

/**
 * Function to call sap.ui.model.oData.ODataModel submitBatch method, which 
 * will trigger a $batch - Delete on oServiceModel. We are using createBatchOperation 
 * method to create an array of batch delete operations and add it to another array 
 * via addBatchCreateOperations method (DELETE call). This is an asynchronous call and 
 * the response will be returned to callback method defined in input parameters. 
 *   
 * @class EAO
 * 
 * @param {String[]} arrDeleteURI - array of delete URI to be deleted 
 * @param {Function} fnCallback - Callback method to be called  
 * @return none (asynchronous) 
 * @version {@link EAO}
 */
EAO.prototype.batchDelete = function(arrDeleteURI,fnCallback) {	
	var uri = "";
	var arrBatchDelete = [];
	
	if(arrDeleteURI.length>0){
		uri = arrDeleteURI.join();
	}	
	this.requestSentEvent(uri);
	var oResponse = {};
	var that = this;
	
	for(var i=0; i<arrDeleteURI.length; i++){
		arrBatchDelete.push(this.oServiceModel.createBatchOperation(arrDeleteURI[i], "DELETE"));
	}
		
	this.oServiceModel.addBatchChangeOperations(arrBatchDelete);	
	this.oServiceModel.submitBatch(
		function (oData, response) {
			that.requestCompletedEvent(uri);
			oResponse.model = oData;
			oResponse.statusCode = 200;
			oResponse.response = response;
			that.oServiceModel.clearBatch();
			fnCallback(oResponse);
		},
		function (oError) {
			//that.requestCompletedEvent(uri);
			that.sErrorMsg= oError;
			that.requestFailedEvent(that.sErrorMsg);
			oResponse.statusCode = oError.response.statusCode;
			oResponse.errorModel = that.messageParse(oError.response.body,null,null);
			that.oServiceModel.clearBatch();
			fnCallback(oResponse);
		});
};



/**
 * Function to create an error model that is added to the fnResponseModel 
 * param1 / @param2 can be any additional information we need for the application
 * e.g. dates or user information if an error is specific.
 * 
 * @class EAO
 * 
 * @param {String} input - response message string
 * @param {String} param1 - any additional string as described above
 * @param {String} param2 - any additional string as described above
 * @return {Object} messageModel 
 * @version {@link EAO}
 */
/* Function to create an error model that is added to the fnResponseModel
*
*@input is of type string this is just the response message String contains various params
*@param1 / @param2 can be any additional information we need for the application for example
*dates or user information if an error is specific
*
*/
EAO.prototype.messageParse = function(input,param1,param2) {
	
	var messageModel = {};
	
	try {
		
		var parsedString = JSON.parse(input);
		
		if (parsedString.error.message !== undefined) {
			messageModel.message = parsedString.error.message.value;
		}
		
		if (parsedString.error.innererror.errordetails[0] !== undefined) {
			var errorDetail = parsedString.error.innererror.errordetails[0];
		
			messageModel.message = errorDetail.message;
			messageModel.messageLevel = errorDetail.level;
			messageModel.messageCode = errorDetail.code;
			messageModel.param1 = param1;
			messageModel.param2 = param2;	
		} else {
			//generic error message... blah blah contact manager
			messageModel.message = "errorDetail.message";
			messageModel.messageLevel = "errorDetail.level";
			messageModel.messageCode = "errorDetail.code";
			messageModel.param1 = null;
			messageModel.param2 = null;
		}
	
	} catch (e) {
		messageModel.message = "Error when making call to retrieve data.";
	}
	
	return messageModel;
};
