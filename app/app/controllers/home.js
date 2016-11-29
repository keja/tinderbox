// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;


var notifications = [
    { 
    	title: 'Alan Walker', 
    	description: "18:30 Friday, Magic Box", 
    	image: "djs/afrojack.jpeg", 
    	
    	actions: [
    		{ icon: "icons/Star.png", event: test, args: true }
    	]
    	
    }
];

function test(){
	alert("test");
}

Alloy.CFG.addTemplates(notifications, $.main_content);