var test;
/*global define*/
define([
        'Cesium/Core/Cartesian3',
        'Cesium/Core/defined',
        'Cesium/Core/formatError',
        'Cesium/Core/getFilenameFromUri',
        'Cesium/Core/Math',
        'Cesium/Core/objectToQuery',
        'Cesium/Core/queryToObject',
        'Cesium/Core/JulianDate',
        'Cesium/Core/ClockRange',
        'Cesium/Core/CesiumTerrainProvider',
        'Cesium/DataSources/DataSourceCollection',
        'Cesium/DataSources/CzmlDataSource',
        'Cesium/DataSources/GeoJsonDataSource',
        'Cesium/DataSources/KmlDataSource',
        'Cesium/Scene/createTileMapServiceImageryProvider',
        'Cesium/Widgets/Viewer/Viewer',
        'Cesium/Widgets/Viewer/viewerCesiumInspectorMixin',
        'Cesium/Widgets/Viewer/viewerDragDropMixin',
        'domReady!'
], function (
        Cartesian3,
        defined,
        formatError,
        getFilenameFromUri,
        CesiumMath,
        objectToQuery,
        queryToObject,
        JulianDate,
        ClockRange,
        CesiumTerrainProvider,
        DataSourceCollection,
        CzmlDataSource,
        GeoJsonDataSource,
        KmlDataSource,
        createTileMapServiceImageryProvider,
        Viewer,
        viewerCesiumInspectorMixin,
        viewerDragDropMixin) {
    'use strict';

    var endUserOptions = queryToObject(window.location.search.substring(1));

    var loadingIndicator = document.getElementById('loadingIndicator');
    var viewer;
    try {
        viewer = new Viewer('cesiumContainer', {
            baseLayerPicker: false,
            navigationHelpButton: false,
            scene3DOnly: true,
            terrainProvider: new CesiumTerrainProvider({
                url: '//assets.agi.com/stk-terrain/world',
                requestVertexNormals: true
            }),
            terrainProviderViewModels: [],
            targetFrameRate: 50
        });
        if (defined(endUserOptions.kml)) {
            viewer.dataSources.add(KmlDataSource.load('Trip.kml'),
                 {
                     camera: viewer.scene.camera,
                     canvas: viewer.scene.canvas
                 });
        }
    } catch (exception) {
        loadingIndicator.style.display = 'none';
        var message = formatError(exception);
        console.error(message);
        if (!document.querySelector('.cesium-widget-errorPanel')) {
            window.alert(message);
        }
        return;
    }



    viewer.extend(viewerDragDropMixin);
    var initialPosition = new Cartesian3(2860851.3460549247, -978123.2836973182, 6421216.013055526);
    viewer.camera.setView({ destination: initialPosition });

    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (commandInfo) {
        //Zoom to custom extent
        viewer.camera.flyTo({ destination: initialPosition });
        //Tell the home button not to do anything.
        commandInfo.cancel = true;
    });

    var showLoadError = function (name, error) {
        var title = 'An error occurred while loading the file: ' + name;
        var message = 'An error occurred while loading the file, which may indicate that it is invalid.  A detailed error report is below:';
        viewer.cesiumWidget.showErrorPanel(title, message, error);
    };

    viewer.dropError.addEventListener(function (viewerArg, name, error) {
        showLoadError(name, error);
    });

    viewer.scene.globe.enableLighting = true;
    viewer.scene.globe.depthTestAgainstTerrain = true;
    test = viewer;

    var start = JulianDate.fromIso8601('2016-07-01T04:00:00.00Z');
    var stop = JulianDate.fromIso8601('2016-07-11T17:25:00.00Z');

    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.clockRange = ClockRange.LOOP_STOP;
    viewer.clock.multiplier = 2000;
    viewer.timeline.zoomTo(start, stop);

    loadingIndicator.style.display = 'none';
});
