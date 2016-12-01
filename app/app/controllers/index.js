var controllers = {
	home: Alloy.createController('home'),
	map: Alloy.createController('map'),
	groups: Alloy.createController('groups'),
	schedule: Alloy.createController('schedule'),
	more: Alloy.createController("more"),
	group: Alloy.createController("group")
};
var lastActive = null;
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
		lastActive = v;
	},
	_reload: function(v){
		controllers[v ? v : lastActive] = Alloy.createController(v ? v : lastActive);
		if(!v){ //only show the view if refresh of current view
			views._show(lastActive);
		}
		
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
			//lastActive = "group";
		}  
				 
        $.view.removeAllChildren();//remove all content from view
        $.view.add([ controllers.group.getView() ]);//add new content to the view
        
    }
};


$.index.addEventListener("open", views.home); //make the default view = home
$.index.open();

$.index.addEventListener('refreshstart',function(e){
    Ti.API.info('refreshstart');
    views._reload();
});

Alloy.CFG.views = views;