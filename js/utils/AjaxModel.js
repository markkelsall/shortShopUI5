var AjaxModel = (function () {

	var bAsync = true;

	function makeRequest (sMethod, sUrl, oData, fnCallback) {
		$.ajax({
			url: sUrl,
			type : sMethod,
			async : bAsync,
			data : oData,
			success : fnCallback,
			error : fnCallback
		});
	}

	function setBAsync (bAsync) {
		this.bAsync = bAsync;
	}

	function post (sUrl, oData, fnCallback) {
		makeRequest("POST", sUrl, oData, fnCallback); //call make request with parameters passed in and set the type to be post
	}

	function get (sUrl, oData, fnCallback) {
		makeRequest("GET", sUrl, oData, fnCallback); //call make request with parameters passed in and set the type to be get
	}
	
	return {
		post : post,
		get : get,
		setBAsync : setBAsync
	};
})();