var args = $.args,

	REST = require("rest");

REST.GET( REST.endpoint("/groups"), function(res){ 
	var groups = [];
	
	if(res.status === 200){
		var data = JSON.parse(res.data);
		data.forEach(function(group){
			console.log(group);
			groups.push({
				title: group.name,
				description: "Members: " + group.members.length
			});
		});
	}else{
		groups.push({
			title: "Failed to load groups",
			description: "check internet connection",
			image: ""
		});
	}
	
	Alloy.CFG.addTemplates(groups, $.main_content);
});