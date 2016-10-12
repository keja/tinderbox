var views = {
	
};
var map = Alloy.createController('map').getView();

function showMap(){
	removeAllChildren($.view);
	$.view.add([ map ]);
	console.log("shop map");

}
$.index.open();
