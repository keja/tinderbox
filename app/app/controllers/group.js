$.btnBack.addEventListener("click", function(){
	Alloy.CFG.views.groups();
});

var args = $.args,
	REST = require("rest");

function showGroupMembers(group_id){
	REST.GET( REST.endpoint("/groups/" + group_id), function(res){ 
		var members = [];
	
		if(res.status === 200 && res.result == "success"){
			var data = JSON.parse(res.data);
			//update the name label in the view
			$.headlab.text = data.name;
			if(data.members && data.members.length > 0){
				data.members.forEach(function(member){
	
					members.push({
						id: member._id,
						image: member.image, 
						title: member.name,
						description: "",
						actions: [
							//Remove member from group
							{ 
								icon: "icons/Cancel_red.png",
								args: true,
								event: function(member){
									var data = JSON.stringify({
										group_id: args.group_id,
										member_id: member.id
									});
									REST.POST( REST.endpoint("/groups/leave"), data, function(res){
										if(res.status === 200){
											showGroupMembers(args.group_id); //download and group re-render list
										}
									});
								} 
							},
							
							//Locate member on map
							{
								icon: "icons/Near_Me_green.png",
								args: true,
								event: function(member){
									Alloy.CFG.views.map({
										type: "user",
										id: member.id
									});
								}
							}
						]
					});
				}); 
			}
		}else{
			groups.push({
				title: "Failed to load groups",
				description: "try again later",
				image: "icons/Error.png"
			});
		} 
		
		Alloy.CFG.addTemplates(members, $.main_content);
		
	//IF REST CALL Failed (unable to connect to server etc.)
	}, function(err){
		Alloy.CFG.addTemplates([{
				title: "Failed to connect to the tinderbox server",
				image: "icons/Error.png"
		}], $.main_content);
	});
}
if(args.group_id){
	showGroupMembers(args.group_id); 
}


