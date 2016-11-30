var args = $.args,
	REST = require("rest");
	
var daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];	
function zeropad(num){
	return num > 9 ? num : "0" + num;
}
//LIST ALL ARTISTS
function listAllArtists(){
	REST.GET( REST.endpoint("/artists"), function(res){ 
		var artists = [];
	
		if(res.status === 200 && res.result == "success"){
			var data = JSON.parse(res.data);
			data.forEach(function(artist){
				console.log(artist);
				var start = new Date(artist.time_start);
				
				
				artists.push({ 
					id: artist._id,
					image: artist.image, 
					title: artist.name,
					description: start.getHours() + ":" + zeropad(start.getMinutes()) + " " + daysInWeek[start.getDay()] + ", " + artist.stage, //artist.description,
					actions: [ 
						{ 
							icon: "icons/Info.png",
							args: true, 
							event: function(group){
								//Alloy.CFG.views.group( group.id );
							}
						}
					]
				});
			});
		}else{
			artists.push({
				title: "Failed to load groups",
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
