var controllers = {
	home: Alloy.createController('home'),
	map: Alloy.createController('map'),
	groups: Alloy.createController('groups'),
	schedule: Alloy.createController('schedule'),
	more: Alloy.createController("more"),
	group: Alloy.createController("group")
};
var views = {
	_resetMenu: function(){
		if($.header_right){
			$.header_right.children.forEach(function(element){
				$.addClass($[element.id], "header_action");
			});
		}
		
	},
	_setActiveMenu: function(v){
		//set all menues to inactive
		$.nav.children.forEach(function(tab){
			tab.children.forEach(function(element){
				$.removeClass($[element.id], "active");
			});
		});
		//set the selected menu to active
		$["tab_"+v].children.forEach(function(element){
			$.addClass($[element.id], "active");
		});
	},
	_show: function(v){
		$.view.removeAllChildren();//remove all content from view
		$.view.add([ controllers[v].getView() ]);//add new content to the view
		views._setActiveMenu(v); //highligth selected menu item at the bottom
	},
	map: function(open){
		views._show("map"); 
		setTimeout(function(){
			views._resetMenu();
		}, 1000);
		
		/*
		var Map = require('ti.map');
		var win = Ti.UI.createWindow();
		
		var mountainView = Map.createAnnotation({
		    latitude:37.390749,
		    longitude:-122.081651,
		    title:"Appcelerator Headquarters",
		    subtitle:'Mountain View, CA',
		    pincolor:Map.ANNOTATION_RED,
		    myid:1 // Custom property to uniquely identify this annotation.
		});
		
		var mapview = Map.createView({
		    mapType: Map.NORMAL_TYPE,
		    region: {latitude:33.74511, longitude:-84.38993,
		            latitudeDelta:0.01, longitudeDelta:0.01},
		    animate:true,
		    regionFit:true,
		    userLocation:true,
		    annotations:[mountainView]
		});
		
		
		var mapview = $.map_view.annotations;
		$.map_view.add(mapview);
		// Handle click events on any annotations on this map.
		mapview.addEventListener('click', function(evt) {
		    Ti.API.info("Clicked " + evt.clicksource + " on " + evt.latitude + "," + evt.longitude);
		});
		win.open();
		*/
	}, 
	home: function(){
		views._show("home");
	},
	groups: function(){
		views._show("groups");
	},
	schedule: function(){
		views._show("schedule");
	},
	more: function(){
		views._show("more");	
	},
	group: function(group_id){
		//make new instance with correct group id
		if(group_id){
			controllers.group = Alloy.createController("group", {group_id: group_id});
		}  
				 
        $.view.removeAllChildren();//remove all content from view
        $.view.add([ controllers.group.getView() ]);//add new content to the view
    }
};


$.index.addEventListener("open", views.home); //make the default view = home
$.index.open();

//notifications 
/*
var test = 'raw',
uri = 'wss://wss.websocketstest.com:443/service';


	var WS = require('net.iamyellow.tiws').createWS();

	WS.addEventListener('open', function () {
		Ti.API.debug('ws opened');
	});

	WS.addEventListener('close', function (e) {
		Ti.API.info("ws closed - code: " + e.code + " reason: " + e.reason);
	});

	WS.addEventListener('error', function (e) {
		Ti.API.error("Got error: " + e.error);
	});

    var proto_version;
    var stream_cnt = 0;

	WS.addEventListener('message', function (e) {
		Ti.API.log("Got message: " + e.data);
        arr = e.data.split(',',2);
        cmd = arr[0];
        response = arr[1];

        if (cmd == 'connected') {
          Ti.API.log("got response: " + response);
          WS.send("version,");
        }
        else if (cmd == 'version') {
          Ti.API.log("got response: " + response);
          proto_version = response;
          WS.send("echo,test message");
        }
        else if (cmd == 'echo' && response == 'test message') {
          Ti.API.log("got response: " + response);
          if (proto_version == 'hybi-draft-07') {
            WS.send("ping,");
          }
          else {
            WS.send("timer,");
          }
        }
        else if (cmd == 'time') {
          stream_cnt = stream_cnt + 1;
          Ti.API.log("got response: " + response);
          if (stream_cnt == 4) {
            WS.reconnect(uri, ["echo-protocol", "other-proto"]);
          }
          else if (stream_cnt > 5) {
            WS.close();
            alert('looks good');
          }
        }
	});

	WS.open(uri, ["echo-protocol", "other-proto"]);
*/

Alloy.CFG.views = views;