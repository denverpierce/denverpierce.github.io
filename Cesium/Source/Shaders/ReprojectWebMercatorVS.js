//This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
    'use strict';
    return "attribute vec4 position;\n\
attribute float webMercatorT;\n\
uniform vec2 u_textureDimensions;\n\
varying vec2 v_textureCoordinates;\n\
void main()\n\
{\n\
v_textureCoordinates = vec2(position.x, webMercatorT);\n\
gl_Position = czm_viewportOrthographic * (position * vec4(u_textureDimensions, 1.0, 1.0));\n\
}\n\
";
});