var args = $.args,
	REST = require('rest');
Ti.API.info(args);
function populateModal(){
	REST.GET(REST.endpoint("/user"), function(res){ 
		var users = [];
		
		if(res.status === 200 && res.result == "success"){
			var data = JSON.parse(res.data);
			
			data.forEach(function(user){
				users.push({	
					id: user._id,
				image: user.image, //this should be generated server-side based on members facebook image.
				title: user.name,
				description: "Members: ",
				actions: [
							//Remove member from group
							{ 
								//icon: "icons/Cancel_red.png",
								args: true,
								event: function(member){
									Ti.API.info(member);
									var data = JSON.stringify({ 
										group_id: args.group_id,
										member_id: member.id   
									});
									REST.POST( REST.endpoint("/groups/join"), data, function(res){
										if(res.status === 200){
											$.modal.close();
											Alloy.CFG.views._reload();
										}
									});
								} 
							}
					
				]
			});
			});
			

			Alloy.CFG.addTemplates(users, $.user_list);
			
		}

	});
}
populateModal();
