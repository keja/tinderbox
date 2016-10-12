var controllers = {
	home: Alloy.createController('home'),
	map: Alloy.createController('map'),
	groups: Alloy.createController('groups'),
	schedule: Alloy.createController('schedule')
};


var views = {
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
	map: function(){
		views._show("map");
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
		//laves på en anden måde end de andre views, da det er et overlay.
	}
};

$.index.addEventListener("open", views.home); //make the default view = home
$.index.open();