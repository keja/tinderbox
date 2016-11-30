// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args,
	REST = require("rest"); 




var notifications = [];
REST.GET( REST.endpoint("/user/personal-page/"+Alloy.CFG.user_id), function(res){
	console.log(res);
	var data = JSON.parse(res.data);
	if(data){ 
		data.artists.forEach(function(artist){
			var start = new Date(artist.time_start);
			
			notifications.push({ 
			title: artist.name, 
			description: start.getHours() + ":" + zeropad(start.getMinutes()) + " " + daysInWeek[start.getDay()] + ", " + artist.stage,
			image: artist.image, 	
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
		    	
		   });
		}); 
	}else{
		
	}
	
	Alloy.CFG.addTemplates(notifications, $.main_content);
	
});


 
//add generate from the notifications and add the template-items into main_content

