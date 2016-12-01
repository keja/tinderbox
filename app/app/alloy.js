Alloy.Globals.Map = require('ti.map');

//pretent that we are logged in with facebook.
Alloy.CFG.user_id = "5840a0efc855938458000001"; // "583de09154514ff806000001"; // <-- this is kennets id, one in use is mortens

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
Alloy.CFG.color_grey = "#80000000"; //black with 50% opacity

//fonts
Alloy.CFG.font_regular = "EvelethCleanThin";
Alloy.CFG.font_bold = "EvelethCleanRegular";
Alloy.CFG.font_brown = "Brown-Regular";

//list template
function generateTemplate(item, index){
	var container = Ti.UI.createView({
		layout: "horizontal",
		height: "65dp", 
		backgroundColor: Alloy.CFG.color_beige,
		top: index * 65
	});
	
	//if there is only on click event, add it to entire row.
	if(item.actions && item.actions.length === 1){
		container.addEventListener("click", function(){
			if(item.actions[0].args){ 
				item.actions[0].event(item);
			}else{
				item.actions[0].event();
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
			fontSize: "12dp",
			fontFamily: Alloy.CFG.font_bold
		}
	});
	
	//create description element
	var pref = {
		top: "4dp",
		color: Alloy.CFG.color_grey,
		left: "10dp",
		font : {
			fontSize: "12dp",
			fontFamily: Alloy.CFG.font_brown
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
		left: 0,
	});
	//if any actions then add them to the actions container
	if(item.actions && item.actions.length){
		item.actions.forEach(function(action_item){
			//if acction has an image, create a image view for it
			if(action_item.icon){
				var a = Ti.UI.createImageView({
					id: "icon",
					image: action_item.icon,
					height: "20",
					width: "20",
					bubbleParent: false //as we sometimes have an action bound to the entire row, make sure not to pass event on to parrent if icon is clicked. (will result in the event firing twice)
				});
				if(action_item.event){
					a.addEventListener("click", function(){
						if(action_item.args){
							action_item.event(item);
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
	var list = Ti.UI.createScrollView();
	items.forEach(function(task, index){
		var template = generateTemplate(task, index);
		list.add( template );
	});
	target.add(list); 
}

var daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];	
function zeropad(num){
	return num > 9 ? num : "0" + num;
}

//explose the addTemplaes gobally
Alloy.CFG.addTemplates = addTemplates;