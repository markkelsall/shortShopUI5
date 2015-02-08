/**
 * Constructor for message manager.
 * Includes private functions for build of Mobile and Desktop versions
 * @version 1.0
 * @author Shambles
 * 
 * @param {String} sPosition
 * @param {boolean} bIsMobile
 */ 
function MessageManager(sPosition,bIsMobile){
	var messageContainer = $("#CITMessageContainer");
	
	var that = this;		
	jQuery.sap.require("sap.ui.core.IconPool");
	var data = {Messages:[]};
	var messageModel = new sap.ui.model.json.JSONModel();
	messageModel.setData(data);
	var statusData = {Status:{color:'#6599FF',status:'Info',statusLevel:4}};
	var statusModel = new sap.ui.model.json.JSONModel();
	statusModel.setData(statusData);

	if (messageContainer != null) {
		return;
	}
	
	/**
	 * Private function to create the desktop control
	 * 
	 * @author Shambles
	 * 
	 * @param {Object} oMessageModel
	 */
	var createDesktopControl = function(oMessageModel){
		//html injection goes here
		$("body").append("<div id = 'CITMessageContainer'></div>");
		$("#CITMessageContainer").append( "<div id ='CITMessageDiv'></div>");
		$("#CITMessageContainer").hide();
		jQuery.sap.require("sap.ui.ux3.Notifier");
		jQuery.sap.require("sap.ui.ux3.NotificationBar");
		jQuery.sap.require("sap.ui.core.Message");
		var notifier = new sap.ui.ux3.Notifier('messageList',{title:"Messages Received"});
		var notificationBar = new sap.ui.ux3.NotificationBar();
		
		function clickListener(oEvent) {
			var oMessage = oEvent.getParameter("message");
			that.deleteMessage(oMessage,oMessageModel,bIsMobile);
		};
		notifier.setModel(oMessageModel);
		notifier.bindAggregation("messages", "/Messages", new sap.ui.core.Message({icon:"{icon}" ,level:"{notBarLevel}",timestamp:"{timestamp}",text:"{text}"}));
		notifier.attachMessageSelected(clickListener);
		notificationBar.addNotifier(notifier);
		notificationBar.placeAt("CITMessageDiv");
	};
	/**
	 *Private function to create a mobile message manager
	 * 
	 * @author Shambles
	 * 
	 * @param {Object} oMessageModel
	 */
	var createMobileControl = function(oMessageModel) {
		//html injection goes here
		$("body").append("<div id = 'CITMessageContainer'></div>");
		$("#CITMessageContainer").append( "<div id ='CITMessageDiv'></div>");
		$("#CITMessageContainer").append( "<div id ='CITMessageCount'></div>");
		$("#CITMessageContainer").hide();
	//	$('#CITMessageDiv').hide();
		
		var oList = new sap.m.List('messageList');

		var messagePop = new sap.m.Dialog("messagePop",{
			content:oList,
			showCloseButton:false,
			title:"Message",
			modal:true,
			beginButton:new sap.m.Button({text:"Dismiss All",press:function(){messagePop.close();that.deleteAllMessages();}}),
			endButton:new sap.m.Button({text:"Close",press:function(){messagePop.close();}})
		}).addStyleClass('messagePopup');

		var mIcon = new sap.ui.core.Icon("mIcon",{
			src:sap.ui.core.IconPool.getIconURI('discussion'),
			color:"{/Status/color}",
			press:function(){
				if(oList.getModel().getData().Messages.length !== 0){
					messagePop.open();
				}
			}
		}).addStyleClass("mobileMessageIcon");
		mIcon.placeAt("CITMessageDiv");
		mIcon.setModel(statusModel);

		var listItemTemplate = new sap.m.CustomListItem({
								content:[ new sap.m.HBox({items:[
			                                 new sap.ui.core.Icon({
			                                	 src:"{icon}",
			                                	 width:'25px',
			                                	 color:"{color}"
			                                 }).addStyleClass('icon'),
			                                 new sap.m.VBox({items:[
			                                                        new sap.m.Text({text:"{title}"}).addStyleClass('messageTitle'),
			                                                        new sap.m.Text({text:"{text}"}).addStyleClass('messageBody'),
			                                                        new sap.m.Text({text:"{timestamp}"}).addStyleClass('messageTimestamp')
			                                                        ]}).addStyleClass("mainContent"),
			                                                        new sap.ui.core.Icon({
			                                                        	src:sap.ui.core.IconPool.getIconURI('delete'),
			                                                        	width:'25px',
			                                                        	press:function(oEvt){
			                                                        		var oMessage = this.getParent();
			                                                        		that.deleteMessage(oMessage,oMessageModel,bIsMobile);
			                                                        		that.updateCounter();
			                                                        	}
			                                                        }).addStyleClass('delIcon')
			                                                        ]}).addStyleClass("messageTemplateBox")
			                                                        ]
		});

		oList.setModel(oMessageModel);
		oList.bindItems("/Messages",listItemTemplate);
	};

	if(bIsMobile){
		createMobileControl(messageModel);
		//sPosition can be topright , topleft , middleleft, middleright , bottomleft , bottomright.
		MessageManager.prototype.iconPosition = function(sPosition) {
			switch (sPosition){
			case "topright": 
				$("#CITMessageContainer").css({"top":"55px","right":"2%","left":"95%"});
				break; 	
			case "topleft":
				$("#CITMessageContainer").css({"top":"55px","left":"2%","right":"95%"});
				break;
			case "middleright":
				$("#CITMessageContainer").css({"top":"48%","right":"2%","left":"95%"});
				break;
			case "middleleft":
				$("#CITMessageContainer").css({"top":"48%","left":"2%","right":"95%"});
				break;
			case "bottomleft":
				$("#CITMessageContainer").css({"top":"90%","left":"2%","right":"95%"});
				break;
			case "bottomright":	
				$("#CITMessageContainer").css({"top":"90%","right":"2%","left":"95%"});
				break;
			default:
				$("#CITMessageContainer").css({"top":"55px","right":"2%","left":"95%"});			
			break; 
			}
		};
		MessageManager.prototype.setIcon = function(iconURI) {
			sap.ui.getCore().byId("messageIcon").setSrc(iconURI);
		};
		this.iconPosition();

	}else{	
		createDesktopControl(messageModel);
	}

}

/**
 * Add message adds a message model to the array of messages created on init.
 *
 *@version 1.0
 *@author Shambles
 *
 *@param {String} level : error , warning , success , info  : to be used for things like ui validation messages.  
 *@param {String} title : only used in mobile content, in desktop control will be added to the text field.
 *@param {String} text  : text is to be used as the complete message this will be bound to the description in mobile and contitute the 
 *               full message when on a desktop.
 *@param {String} timestamp : if this is null or not passed in then the addMessage function will use current system time to add one.
 */
MessageManager.prototype.addMessage = function(level,title,text,timestamp) {
	var messageModel = sap.ui.getCore().byId("messageList").getModel();
	var messageArray = messageModel.getData().Messages;
	//internal function to get the current date and time.
	var getNowDate = function() {
		var now = new Date();
		var AddZero = function(num) {
			return (num >= 0 && num < 10) ? "0" + num : num + "";
		};
		var strDateTime = [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("/"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");

		return strDateTime;
	};

	if(timestamp === undefined || timestamp === null){
		timestamp = getNowDate();
	}	

	var icon = "";
	var notBarLevel = "";
	var color = ""	;
	jQuery.sap.require("sap.ui.core.IconPool");

	switch(level){
	case "Error": 
		notBarLevel = sap.ui.core.MessageType.Error;
		icon = sap.ui.core.IconPool.getIconURI('error');
		color ="#FF0000";
		this.setWorseStatus("Error", 1,"#FF0000")	;
		break;
	case "Warning": 
		notBarLevel = "Warning"; 
		icon = sap.ui.core.IconPool.getIconURI('warning');
		color = "#FF9900";
		this.setWorseStatus("Warning", 2,"#FF9900");	
		break;
	case "Success":
		notBarLevel = sap.ui.core.MessageType.Success;
		icon = sap.ui.core.IconPool.getIconURI('accept');
		color="#92CD00";
		this.setWorseStatus("Success", 3,"#92CD00");	
		break;
	case "Info": 
		notBarLevel = sap.ui.core.MessageType.Information;
		icon = sap.ui.core.IconPool.getIconURI('post');
		color="#6599FF";
		this.setWorseStatus("Info", 4,"#6599FF");	
		break;
	}
	var message = {icon: icon,color:color,level: level,notBarLevel:notBarLevel,title: title,text: text,timestamp: timestamp};
	messageArray.push(message);
	messageObject = {Messages:messageArray};
	messageModel.setData(messageObject);
	sap.ui.getCore().setModel(messageModel,'MessageModel');
	this.updateCounter();
};
/**
 * Function to delete a single message from the model bound to the managers, covers both mobile and desktop applications
 * 
 * @version 1.0
 * @author Shambles
 * 
 * @param {Object} message
 * @param {Object} oMessageModel
 * @param {Bool} bMobile
 */
MessageManager.prototype.deleteMessage = function(message,oMessageModel,bMobile) {
	var object = oMessageModel.getData();
	if(!bMobile){
		//this popup to confirm delete is to trick the list to refresh as per SAP example.
		var delConfirm = new sap.m.Dialog({
			content:new sap.m.Text({text:"This will delete the selected message are you sure ?"}),
			showCloseButton:false,
			title:"Delete Confirmation",
			modal:true,
			beginButton:new sap.m.Button({text:"Confirm",press:function(){
				delConfirm.close();
				message.destroy();
				object.Messages.splice(message.getBindingContext().getPath(),1);
				if(object.Messages.length === 0){
					that.updateCounter();
					that.hideControl();}
				}
			}),
			endButton:new sap.m.Button({text:"Close",press:function(){delConfirm.close()}})
		}).open();
	}else{
		object.Messages.splice(message.getBindingContext().getPath(),1);
		if(object.Messages.length === 0){
			sap.ui.getCore().byId('messagePop').close();
			that.hideControl();
		}
	}
	oMessageModel.setData(object);
	return;	
};
/**
 * Function to delete all messages and clear the model
 * @version 1.0
 * @author Shambles
 */
MessageManager.prototype.deleteAllMessages = function() {
	var messageModel = sap.ui.getCore().getModel("MessageModel");
	messageObject = {Messages:[]};
	messageModel.setData(messageObject);
	sap.ui.getCore().setModel(messageModel,'MessageModel');
	this.updateCounter();
};
/**
 * Function to show the controller 
 * @author Shambles
 * @version 1.0
 */
MessageManager.prototype.showControl = function() {
	$("#CITMessageContainer").show();
};
/**
 * Function to hide controller
 * @author Shambles
 * @version 1.0
 * 
 */
MessageManager.prototype.hideControl = function() {
	$("#CITMessageContainer").hide();
};
/**
 * Function to find worst status used to set the color of the message image
 * 
 *@version 1.0
 *@author Shambles
 * 
 * @returns {String} worstStatus
 */
MessageManager.prototype.getWorseStatus = function(){
	var statusModel = sap.ui.getCore().byId("mIcon").getModel();
	return statusModel.getData().Status;
};
/**
 * Function to set Color and worst status for the mobile icon
 * 
 * @author Shambles
 * @version 1.0
 * 
 * @param {String} status
 * @param {int} statusLevel
 * @param {String} color
 */
MessageManager.prototype.setWorseStatus = function(status,statusLevel,color){
	var statusModel = sap.ui.getCore().byId("mIcon").getModel();
	var currentStatusLevel = statusModel.getData().Status.statusLevel;	
	if(statusLevel < currentStatusLevel){
		var model = {Status:{status : status,statusLevel : statusLevel,color : color}};
		statusModel.setData(model);
	}		
};
/**
 * Function to update the counter in mobile application, shows number of messages.
 * Out of the box covered in desktop applications.
 * 
 * @author Shambles
 * @version 1.0
 */
MessageManager.prototype.updateCounter = function(){
	var messageArrayLength = sap.ui.getCore().byId('messageList').getModel().getData().Messages.length;
	$("#CITMessageCount").html(messageArrayLength.toString());
};
/**
 * hides just the counter
 * 
 * @author Shambles
 * @version 1.0
 * 
 */
MessageManager.prototype.hideCounter = function(){
	$("#CITMessageCount").hide();
};
/**
 * reshows counter
 */
MessageManager.prototype.showCounter = function(){
	$("#CITMessageCount").show();
};