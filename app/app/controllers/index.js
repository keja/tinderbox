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
	map: function(){
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
	group: function(){
        $.view.removeAllChildren();//remove all content from view
        $.view.add([ controllers.group.getView() ]);//add new content to the view
    }
};

//list template
function generateTemplate(item, index){
	var container = Ti.UI.createView({
		layout: "horizontal",
		height: "65dp",
		backgroundColor: "#fff9f4",
		top: index * 65
	});
	
	//if there is only on click event, add it to entire row.
	if(item.actions && item.actions.length === 1){
		var itm = item.actions[0];
		container.addEventListener("click", function(){
			if(itm.args){
				itm.event(itm);
			}else{
				itm.event();
			}
		});
	}
	
	//create icon
	var picture = Ti.UI.createImageView({
		image: item.image,
		height: "45dp",
		width: "45dp",
		left: "20dp",
		top: "10dp"
	});
	
	//create content view
	var textarea = Ti.UI.createView({
		layout: "vertical",
		height: "200",
		width: "200"
	});
	
	//create title element
	var title = Ti.UI.createLabel({
		text: item.title,
		top: "12dp",
		left: "10dp",
		font: {
			fontSize: "18dp",
			fontFamily: "Eveleth_Clean_Regular"
		}
	});
	
	//create description element
	var pref = {
		top: "4dp",
		color: "#8aa4a7",
		left: "10dp",
		font : {
			fontSize: "12dp",
			fontFamily: "brown-regular"
		}
	};
	//if plain text use text or else use attributedString
	if(typeof item.description == "string"){
		pref.text = item.description;
	}else{
		pref.attributedString = item.description;
	}
	var description = Ti.UI.createLabel(pref);
	
	//create actions container
	var actions = Ti.UI.createView({
		height: "65dp",
		width: "50dp",
		layout: "horizontal",
		top: 22,
		left: 0
	});
	//if any actions then add them to the actions container
	if(item.actions && item.actions.length){
		item.actions.forEach(function(action_item){
			//if acction has an image, create a image view for it
			if(action_item.image){
				var a = Ti.UI.createImageView({
					image: action_item.icon,
					height: "20",
					width: "20"
				});
				if(action_item.event){
					a.addEventListener("click", function(){
						if(action_item.args){
							action_item.event(action_item);
						}else{
							action_item.event();
						}
					});
				}
				actions.add(a); 
			}
			
		});
	}
	
	//add elements to template
	container.add(picture);
	textarea.add(title);
	textarea.add(description);
	container.add(textarea);
	container.add(actions);
	
	return container;
}
function addTemplates(items){
	var list = Ti.UI.createScrollView({
		layour: "vertical"
	});
	items.forEach(function(task, index){
		var template = generateTemplate(task, index);
		list.add( template );
	});
	$.main_content.add(list); 
}


$.index.addEventListener("open", views.home); //make the default view = home
$.index.open();
Alloy.CFG.views = views;