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
			data.members.forEach(function(member){
				//console.log(group);
				
				members.push({
					image: member.image, //this should be generated server-side based on members facebook image.
					title: member.name,
					description: "",
					actions: [
						{ 
							icon: "icons/Info.png",
							args: true,
							event: function(group){
								alert("Clicked group: " + group.id);
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

