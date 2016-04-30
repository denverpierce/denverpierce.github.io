require({
	baseUrl : '.',
	paths : {
		domReady : 'Cesium/ThirdParty/requirejs-2.1.20/domReady',
		Cesium : 'Cesium/Source'
	}
}, [
		'Cesium/Core/CesiumTerrainProvider',
		'Cesium/Core/ClockRange',
		'Cesium/Core/defined',
		'Cesium/DataSources/KmlDataSource',
		'Cesium/Widgets/Viewer/Viewer',
		'domReady!'
	], function (
		CesiumTerrainProvider,
		ClockRange,
		defined,
		KmlDataSource,
		Viewer,
		when) {
	'use strict';

	var loadingIndicator = document.getElementById('loadingIndicator');

	var viewer = new Viewer('cesiumContainer', {
			baseLayerPicker : false,
			homeButton : false,
			sceneModePicker : false,
			navigationHelpButton : false,
			scene3DOnly : true,
			terrainProvider : new CesiumTerrainProvider({
				url : '//assets.agi.com/stk-terrain/world',
				requestVertexNormals : true
			}),
			terrainProviderViewModels : [],
			targetFrameRate : 50,
			dataSources
		});

	viewer.scene.globe.enableLighting = true;
	viewer.scene.globe.depthTestAgainstTerrain = true;

	var start = JulianDate.fromIso8601('2016-06-30');
	var stop = JulianDate.fromIso8601('2016-07-11');

	viewer.clock.startTime = start.clone();
	viewer.clock.stopTime = stop.clone();
	viewer.clock.currentTime = start.clone();
	viewer.clock.clockRange = ClockRange.LOOP_STOP;
	viewer.clock.multiplier = 100000;

	loadingIndicator.style.display = 'none';
});
