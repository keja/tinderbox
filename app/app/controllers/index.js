var controllers = {
	home: Alloy.createController('home'),
	map: Alloy.createController('map'),
	groups: Alloy.createController('groups'),
	schedule: Alloy.createController('schedule')
};
var views = {
	_setActiveMenu: function(v){
		/*
		var tabs = $.nav.children;
		for (var i = 0 ; i < tabs.length; i++) {
		    var tab = tabs[i].children;
		    for (var i = 0 ; i < tab.length; i++) {
		    	//$.removeClass(tab[i], "active");
		    	console.log(tab[i]);
		    } 
		}
		*/
	}, 
	_show: function(v){
		$.view.removeAllChildren();//remove all content from view
		$.view.add([ controllers[v].getView() ]);//add new content to the view
		//views._setActiveMenu("home");
	},
	map: function(){
		views._show("map");
	},
	home: function(){
		views._show("home");
	},
	groups: function(){
		//views._show("groups");
	},
	schedule: function(){
		//views._show("schedule");
	},
	
	more: function(){
		//laves på en anden måde end de andre views, da det er et overlay.
	}
};

$.index.addEventListener("open", views.home); //make the default view = home
$.index.open();