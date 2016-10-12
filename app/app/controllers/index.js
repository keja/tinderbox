var controllers = {
	home: Alloy.createController('home'),
	map: Alloy.createController('map'),
	groups: Alloy.createController('groups')
};
var views = {
	_show: function(v){
		console.log("show " + v);
		$.view.removeAllChildren();
		$.view.add([ controllers[v].getView() ]);
	},
	map: function(){
		views._show("map");
	},
	home: function(){
		views._show("home");
	},
	groups: function(){
		views._show("groups");
	}
};

$.index.addEventListener("open", views.home);
$.index.open();