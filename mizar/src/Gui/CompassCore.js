/*******************************************************************************
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of MIZAR.
 *
 * MIZAR is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MIZAR is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MIZAR. If not, see <http://www.gnu.org/licenses/>.
 ******************************************************************************/
/*global define: false */

/**
 * Compass module : map control with "north" component
 */
define(["jquery","../Utils/Constants"], function ($, Constants) {

    /**
     *    Private variables
     */
    var parentElement = null;
    var ctx = null;
    var crs = null;
    var svgDoc;

    /**************************************************************************************************************/

    /**
     * Aligns with north.
     * @param {object} event
     * @private
     */
    function _alignWithNorth(event) {
        var coordinateSystem = ctx.getCoordinateSystem();
        var radius = coordinateSystem.getGeoide().getRadius();

        // scale the up direction to the sphere's surface in order to have the right value after projection.
        var up = [0, 0, radius];

        var temp = [];
        coordinateSystem.from3DToGeo(up, temp);
        temp = coordinateSystem.convert(temp, coordinateSystem.getGeoideName(), crs);
        coordinateSystem.fromGeoTo3D(temp, up);
        ctx.getNavigation().moveUpTo(up);
    }

    /**************************************************************************************************************/

    function updateNorthPlanet() {
        var navigation = ctx.getNavigation();
        var currentHeading = navigation.getHeading();

        var upHeading = 0;
        var degNorth = currentHeading-upHeading;

        var northText = svgDoc.getElementById("NorthText");
        northText.setAttribute("transform", "rotate(" + degNorth + " 40 40)");

    }

    function updateNorthSky() {
        var geo = [];
        var coordinateSystem = ctx.getCoordinateSystem();
        var center = ctx.getNavigation().center3d ? ctx.getNavigation().center3d : center = ctx.getNavigation().geoCenter;
        coordinateSystem.from3DToGeo(center, geo);
        geo = coordinateSystem.convert(geo, crs, coordinateSystem.getGeoideName());

        var LHV = [];
        coordinateSystem.getLHVTransform(geo, LHV);

        var temp = [];
        var north = [LHV[4], LHV[5], LHV[6]];
        var vertical = [LHV[8], LHV[9], LHV[10]];

        var up = vec3.create(ctx.getNavigation().up);
        vec3.scale(up, coordinateSystem.getGeoide().getRadius());

        coordinateSystem.from3DToGeo(up, temp);
        temp = coordinateSystem.convert(temp, crs, coordinateSystem.getGeoideName());
        coordinateSystem.fromGeoTo3D(temp, up);
        vec3.normalize(up);
        // Find angle between up and north
        var cosNorth = vec3.dot(up, north) / (vec3.length(up) * vec3.length(north));
        var radNorth = Math.acos(cosNorth);

        if (isNaN(radNorth)) {
            return;
        }
        var degNorth = radNorth * 180 / Math.PI;

        // Find sign between up and north
        var sign;
        vec3.cross(up, north, temp);
        sign = vec3.dot(temp, [vertical[0], vertical[1], vertical[2]]);
        if (sign < 0) {
            degNorth *= -1;
        }

        var northText = svgDoc.getElementById("NorthText");
        northText.setAttribute("transform", "rotate(" + degNorth + " 40 40)");
    }
    /**
     * Function updating the north position on compass
     */
    function updateNorth() {
        var mode = ctx.getMode();
        switch (mode) {
            case Constants.CONTEXT.Sky:
                updateNorthSky();
                break;
            case Constants.CONTEXT.Planet:
                updateNorthPlanet();
                break;
            default:
                throw new RangeError("CompassCore is not supported for this context", "CompassCore.js");
        }
    }

    /**************************************************************************************************************/

    /**
     *    Remove compass element
     *    
     */
    function remove() {
        ctx.unsubscribe(Constants.EVENT_MSG.NAVIGATION_MODIFIED, updateNorth);
        document.getElementById(parentElement).innerHTML = '';
    }

    /**************************************************************************************************************/

    return {
        init: function (options) {
            parentElement = options.element;
            ctx = options.ctx;
            crs = options.crs;
            svgDoc = options.svgDoc;
        },
        updateNorth: updateNorth,
        _alignWithNorth: _alignWithNorth,
        remove: remove

    };
});
