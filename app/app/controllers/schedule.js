var args = $.args,
	REST = require("rest");
	

//LIST ALL ARTISTS
function listAllArtists(){
	REST.GET( REST.endpoint("/artists"), function(res){ 
		var artists = [];
	
		if(res.status === 200 && res.result == "success"){
			var data = JSON.parse(res.data);
			data.forEach(function(artist){
				//console.log(artist);
				var start = new Date(artist.time_start);
				
				
				artists.push({ 
					id: artist._id,
					image: artist.image, 
					title: artist.name,
					description: start.getHours() + ":" + zeropad(start.getMinutes()) + " " + daysInWeek[start.getDay()] + ", " + artist.stage,
					actions: [ 
						{ 
							icon: "icons/Star_yellow.png",
							args: true, 
							event: function(_artist){
								
								
								//Alloy.CFG.views.group( group.id );
							}
						},
						{ 
							icon: "icons/Pin_green.png",
							args: true,  
							event: function(_artist){
								var data = JSON.stringify({
									artist_id: _artist.id,
									user_id: Alloy.CFG.user_id
								});
								REST.POST( REST.endpoint("/user/pin-artist"), data, function(res){
									alert(res);
								});
							}
						}

					]
				});
			});
		}else{
			artists.push({ 
				title: "Failed to load schedule",
				description: "try again later",
				image: "icons/Error.png"
			});
		} 
		
		Alloy.CFG.addTemplates(artists, $.main_content);
		
	//IF REST CALL Failed (unable to connect to server etc.)
	}, function(err){
		Alloy.CFG.addTemplates([{
				title: "Failed to connect to the tinderbox server",
				image: "icons/Error.png"
		}], $.main_content);
	});
}
//invoke right away.
listAllArtists(); 
