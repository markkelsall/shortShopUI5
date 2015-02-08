var AjaxModel = function () {

	var bCrossDomain = false;
	var bAsync = true;
	var nTimeout = 60000;
	var sContentType = "application/x-www-form-urlencoded; charset=UTF-8";

	function ajaxModel (bCrossDomain, bAsync, nTimeout, sContentType) {
		this.bCrossDomain = bCrossDomain;
		this.bAsync = bAsync;
		this.nTimeout = nTimeout;
		this.sContentType = sContentType;
	}

	function setBCrossDomain (bCrossDomain) {
		this.bCrossDomain = bCrossDomain;
	}

	function setBAsync (bAsync) {
		this.bAsync = bAsync;
	}

	function setNTimeout (nTimeout) {
		this.nTimeout = nTimeout;
	}

	function setSContentType (sContentType) {
		this.sContentType = sContentType;
	}

	function post (oOptions) {
		//call make request with parameters passed in and set the type to be post
		this.makeRequest();
	}

	function get (oOptions) {
		//call make request with parameters passed in and set the type to be get
		this.makeRequest();
	}

	function makeRequest (sUrl, oData, fnDone, fnFail, oOptions) {
		//parameters: url, beforeSend, contentType, data, dataType, statusCode, done, fail, always

		oOptions = {
			statusCode : '',
			always : '',
			contentType : '',
		};

		$.ajax({
			url: sUrl,
			data : oData,
			dataType: this.sContentType,
			crossDomain: this.bCrossDomain,
			done : fnDone,
			fail : fnFail
		});
	}
	
	return {
		post : post,
		get : get,
		setBAsync : setBAsync,
		setBCrossDomain : setBCrossDomain,
		setNTimeout : setNTimeout,
		setSContentType : setSContentType
	};
	
	return ajaxModel;
}

var ajaxOne = new AjaxModel('1');