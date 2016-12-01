var args = $.args,
	REST = require("rest"),
	dialog = require('editdialog');
	

//LIST ALL GROUPS
function listAllGroups(){
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
	
	dialog.show({
    	hint        : "Enter group name",
    	closeButton : "Close",
    	text		: "",
    	callback    : function(text){ 
    		var data = JSON.stringify({
				name: text
			});
			REST.POST( REST.endpoint("/groups/create"), data, function(res){
				if(res.status === 200 && res.result == "success"){
					var data = JSON.parse(res.data); 
					var join_data = JSON.stringify({
						group_id: data._id,
						member_id: Alloy.CFG.user_id
					}); 
					REST.POST( REST.endpoint("/groups/join"), join_data, function(res){
						Alloy.CFG.views._reload();  //refresh the list of groups (download and re-render list)
						Alloy.CFG.views.group( data._id ); //jump to the new group page
					});
				}else{
					alert("Failed to create the group"); 
				} 
			});
    	}//callback end
	});
	
	
	
}


