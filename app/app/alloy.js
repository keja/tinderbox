//calculate layout heights
Alloy.CFG.header_height = 30;
Alloy.CFG.nav_height = 30;
Alloy.CFG.view_height = (Ti.Platform.displayCaps.platformHeight) - (Alloy.CFG.header_height + Alloy.CFG.nav_height);

Ti.API.info('Ti.Platform.displayCaps.density: ' + Ti.Platform.displayCaps.density);
Ti.API.info('Ti.Platform.displayCaps.dpi: ' + Ti.Platform.displayCaps.dpi);
Ti.API.info('Ti.Platform.displayCaps.platformHeight: ' + Ti.Platform.displayCaps.platformHeight);
Ti.API.info('Ti.Platform.displayCaps.platformWidth: ' + Ti.Platform.displayCaps.platformWidth);
if((Ti.Platform.osname === 'iphone')||(Ti.Platform.osname === 'ipad')||(Ti.Platform.osname === 'android')){
  Ti.API.info('Ti.Platform.displayCaps.logicalDensityFactor: ' + Ti.Platform.displayCaps.logicalDensityFactor);
}
if(Ti.Platform.osname === 'android'){
  Ti.API.info('Ti.Platform.displayCaps.xdpi: ' + Ti.Platform.displayCaps.xdpi);
  Ti.API.info('Ti.Platform.displayCaps.ydpi: ' + Ti.Platform.displayCaps.ydpi);
}
console.log("----");
console.log(Alloy.CFG.view_height);

function removeAllChildren(viewObject){
    //copy array of child object references because view's "children" property is live collection of child object references
    var children = viewObject.children.slice(0);
 
    for (var i = 0; i < children.length; ++i) {
        viewObject.remove(children[i]);
    }
}