/*global require*/
require({
    baseUrl : '.',
    paths : {
        domReady : 'Cesium/ThirdParty/requirejs-2.1.20/domReady',
        Cesium : 'Cesium/Source'
    }
}, [
        'IcelandTrip'
    ], function() {
});