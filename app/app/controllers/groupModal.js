var args = $.args,
	REST = require('rest');
Ti.API.info(args);
function populateModal(){
	REST.GET(REST.endpoint("/groups"), function(res){ 
		var groups = [];
		
		if(res.status === 200 && res.result == "success"){
			var data = JSON.parse(res.data);
			
			data.forEach(function(g){
				groups.push({	
					id: g._id,
					image: "group/groupimage.png",
					title: g.name,
					description: "click here to add to the group",
					actions: [
							{
								args: true,
								event: function(group){
									console.log("hej");
									var data = JSON.stringify({
										artist_id: args.artist_id,
										group_id: group.id
									});
									REST.POST( REST.endpoint("/groups/pin-artist"), data, function(res){
										$.modal.close();
										Alloy.CFG.views._reload("groups");
									});
								} 
							}
					]
				});
			});
			

			Alloy.CFG.addTemplates(groups, $.group_list);
			
		}

	});
}
populateModal();
