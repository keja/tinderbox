Alloy.Globals.Map = require('ti.map');

//calculate layout heights
Alloy.CFG.header_height = 30;
Alloy.CFG.nav_height = 30;
Alloy.CFG.view_height = (Ti.Platform.displayCaps.platformHeight) - (Alloy.CFG.nav_height);

//colors
Alloy.CFG.color_beige = "#fff9f4";
Alloy.CFG.color_yellow = "#ffd962";
Alloy.CFG.color_azur = "#8bc7b9";
Alloy.CFG.color_teal = "#043540";
Alloy.CFG.color_rosa = "#f18879";
Alloy.CFG.color_white = "#ffffff";
Alloy.CFG.color_black = "#000000";

//fonts
Alloy.CFG.font_regular = "EvelethCleanThin";
Alloy.CFG.font_bold = "EvelethCleanRegular";
Alloy.CFG.font_brown = "Brown-Regular";

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
function addTemplates(items, target){
	var list = Ti.UI.createScrollView({
		layour: "vertical"
	});
	items.forEach(function(task, index){
		var template = generateTemplate(task, index);
		list.add( template );
	});
	target.add(list); 
}

Alloy.CFG.addTemplates = addTemplates;