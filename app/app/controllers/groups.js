var args = $.args,
	REST = require("rest");

//LIST ALL GROUPS
function listAllGroups(){
	$.main_content.text = "Loading";
	REST.GET( REST.endpoint("/groups"), function(res){ 
		var groups = [];
	
		if(res.status === 200 && res.result == "success"){
			var data = JSON.parse(res.data);
			data.forEach(function(group){
				//console.log(group);
				groups.push({
					id: group._id,
					image: "group/groupimage.png", //this should be generated server-side based on members facebook image.
					title: group.name,
					description: "Members: " + group.members.length,
					actions: [
						{ 
							icon: "icons/Info.png",
							args: true,
							event: function(group){
								Alloy.CFG.views.group( group.id );
							}
						}
					]
				});
			});
		}else{
			groups.push({
				title: "Failed to load groups",
				description: "try again later",
				image: "icons/Error.png"
			});
		} 
		
		Alloy.CFG.addTemplates(groups, $.main_content);
		
	//IF REST CALL Failed (unable to connect to server etc.)
	}, function(err){
		Alloy.CFG.addTemplates([{
				title: "Failed to connect to the tinderbox server",
				image: "icons/Error.png"
		}], $.main_content);
	});
}
//invoke right away.
listAllGroups(); // - this is a function as we want to call it later as well

//CREATE NEW GROUP
function new_group(){
	var data = JSON.stringify({
		name: "hey" //TODO: make dialog for user input
	});
	REST.POST( REST.endpoint("/groups/create"), data, function(res){
		console.log(res);
		if(res.status === 200 && res.result == "success"){
			var data = JSON.parse(res.data); 
			//join group with id data._id
			var join_data = JSON.stringify({
				group_id: data._id,
				member_id: Alloy.CFG.FB_ID
			}); 
			REST.POST( REST.endpoint("/groups/join"), join_data, function(res){
				
			});
			
			//load group with id: data._id
		}else{
			alert("Failed to create the group");
		} 
	});
}


