// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args,
	REST = require("rest"); 



function myPage(){
	var notifications = [];
	REST.GET( REST.endpoint("/user/personal-page/"+Alloy.CFG.user_id), function(res){
		console.log(res);
		var data = JSON.parse(res.data);
		if(data){ 
			data.artists.forEach(function(artist){
				var start = new Date(artist.time_start);
				
				notifications.push({ 
				id: artist._id,	
				title: artist.name, 
				description: start.getHours() + ":" + zeropad(start.getMinutes()) + " " + daysInWeek[start.getDay()] + ", " + artist.stage,
				image: artist.image, 	
				actions: [
					{ 
						icon:"icons/Cancel_red.png", 
						args: true,
						event: function(ele){
							var data = JSON.stringify({
								user_id: Alloy.CFG.user_id,
								artist_id: ele.id
							}); 
							console.log(data);
							REST.POST( REST.endpoint("/user/unpin-artist"), data, function(res){
								Alloy.CFG.views._reload(); 
							});
		    			} 
		    		}
		    	] 
			    	
			   });
			}); 
		}else{
			
		}
		
		Alloy.CFG.addTemplates(notifications, $.main_content);
		
	});
}
myPage();


 
//add generate from the notifications and add the template-items into main_content

