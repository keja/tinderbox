// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
	//REST = require("rest"); 

var notifications = [
    { 
    	title: 'Alan Walker', 
    	description: "18:30 Friday, Magic Box", 
    	image: "http://goodkarmadjs.com/wp-content/uploads/2013/04/DJ-ez0.jpg", 	
    	actions: [
    		{ 
    			icon:"icons/Star_yellow.png", 
    			args: true,
    			event: function(ele, notification){
    				//Alloy.CFG.views.map();
    				//$.icon = "icons/Unpin.png";
    				console.log(ele, notification);
    			} 
    		}
    	]
    	
    }
];

//add generate from the notifications and add the template-items into main_content
Alloy.CFG.addTemplates(notifications, $.main_content);