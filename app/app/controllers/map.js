var args = $.args,
	REST = require("rest");

var Map = require('ti.map');

var annotations = [];


if(args && args.user){
	console.log('fetch user location');
	REST.GET(REST.endpoint("/user/locate/"+args.user), function(res){
		var data = JSON.parse(res.data);
		console.log(data);
		createAnnotation(data, "");
		
	});
	
}

function updateUserLocation(){

	var data = JSON.stringify({
		lat: 55.383333, lng: 10.339999
	});
	REST.POST(REST.endpoint("/user/locate/"+Alloy.CFG.user_id),data, function(res){
				//Ti.API.info(res);
			});
	
}

function showEvents(){
	//blue stage - hardcoded
	var blue = Map.createAnnotation({		    
		    latitude:55.382836,
		    longitude:10.338902,
		    pincolor:Map.ANNOTATION_PURPLE,
		    //image: "djs/afrojack.jpeg"
		});
		annotations.push(blue);
		
	//red stage - hardcoded	
	var red = Map.createAnnotation({
		    latitude:55.381036,
		    longitude:10.340302,
		    pincolor:Map.ANNOTATION_GREEN,
		    //image: "djs/tiesto.jpeg"
		});
		annotations.push(red); 	
		
		setTimeout(function(){ $.map_view.setAnnotations(annotations); }, 1000);
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
		setTimeout(function(){ $.map_view.setAnnotations(annotations); }, 1000);
}

function createMap(){
		
		var region = {
			latitude: 55.382736,
			longitude: 10.340302,
			latitudeDelta:0.01,  
			longitudeDelta:0.01,
			animate: true 
		};

		$.map_view.setLocation(region); 
		setTimeout(function(){showEvents();}, 1000);
} 
createMap();
setTimeout(function(){showEvents();}, 1000);
