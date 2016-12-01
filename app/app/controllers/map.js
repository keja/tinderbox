var args = $.args,
	REST = require("rest");

var Map = require('ti.map');

var annotations = [];
function showUsersOnMap(){
	// Ti.API.info("showdiugsdo");
	REST.GET( REST.endpoint("/user"), function(res){ 
		var users = [];
		
		if(res.status === 200 && res.result == "success"){
			var data = JSON.parse(res.data);
			data.forEach(function(user){
				
				users.push({
				id: user._id,
				image: user.image	
				});
				//add members to map.
				user.location = [{latitude: 55.383333}, {longitude: 10.339999}];
				createAnnotation(user.location, "");
			});
		}
		else{
			
		}
		
		if(args && args.user){
			REST.GET(REST.endpoint("/user/locate/"+args.user), function(res){
				var data = JSON.parse(res.data);
				//Ti.API.info(data);
				createAnnotation(data, "");
				
			});
			
		}
		}, function(err){
		Alloy.CFG.addTemplates([{
				title: "Failed to connect to the tinderbox server",
				image: "icons/Error.png"
		}], $.main_content);
	});			
}
//d
function updateUserLocation(){

	var data = JSON.stringify({
		lat: 55.383333, lng: 10.339999
	});
	REST.POST(REST.endpoint("/user/locate/"+Alloy.CFG.user_id),data, function(res){
				//Ti.API.info(res);
			});
	
}

function showEvents(){
	// //blue stage - hardcoded
	// var blue = Map.createAnnotation({		    
		    // latitude:55.382836,
		    // longitude:10.338902,
		    // pincolor:Map.ANNOTATION_PURPLE,
		    // image: "icons/Error.png"
		// });
		// annotations.push(blue);
// 		
	// //red stage - hardcoded	
	// var red = Map.createAnnotation({
		    // latitude:55.381036,
		    // longitude:10.340302,
		    // pincolor:Map.ANNOTATION_RED,
		    // image: "icons/Info.png"
		// });
		// annotations.push(red); 	
}

function showUserOnMap(){
	createAnnotation([{latitude: 55.382736}, {longitude: 10.340302}], "");
}

function createAnnotation(location, image){
	//current location - hardcoded values that should come from phone gps
	//Ti.API.info(location);
	var pin = Map.createAnnotation({
		    title:"username",
		    subtitle:'you are here',
		    latitude:location[0].latitude, //55.382736,
		    longitude:location[0].longitude,//10.340302,
		    pincolor:Map.ANNOTATION_RED,
		    animate: true,
		    image: ""
		});
		
		annotations.push(pin);
}

function createMap(){
		
		var region = {
			latitude: 55.382736,
			longitude: 10.340302,
			latitudeDelta:0.01, longitudeDelta:0.01,
			animate: true
		};

		$.map_view.setLocation(region);
		
}
createMap();
showUserOnMap();
showEvents();
showUsersOnMap();
$.map_view.addEventListener('click', function(e){
			$.map_view.setAnnotations(annotations);
		});

