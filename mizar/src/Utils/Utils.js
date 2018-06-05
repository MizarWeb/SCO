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
/***************************************
 * Copyright 2011, 2012 GlobWeb contributors.
 *
 * This file is part of GlobWeb.
 *
 * GlobWeb is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, version 3 of the License, or
 * (at your option) any later version.
 *
 * GlobWeb is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with GlobWeb. If not, see <http://www.gnu.org/licenses/>.
 ***************************************/

define(["jquery", "moment", "./Numeric", "./UtilsIntersection", "../Error/NetworkError"], function ($, Moment, Numeric, UtilsIntersection, NetworkError) {

    var Utils = {};

    /**
     * Inherits from an object
     */
    Utils.inherits = function (base, sub) {
        function tempCtor() {
        }

        tempCtor.prototype = base.prototype;
        sub.prototype = new tempCtor();
        sub.prototype.constructor = sub;
    };

    /**
     *    HSV values in [0..1[
     *    returns [r, g, b] values from 0 to 255
     */
    function hsv_to_rgb(h, s, v) {
        var h_i = Math.floor(h * 6);
        var f = h * 6 - h_i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        var r;
        var g;
        var b;
        switch (h_i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
            default:
                r = 1;
                g = 1;
                b = 1;
        }
        return [r, g, b];
    }

    /**
     * Generates eye-friendly color based on hsv.
     * @return {int[]} rgb array
     */
    Utils.generateColor = function () {
        //use golden ratio
        var golden_ratio_conjugate = 0.618033988749895;
        var h = Math.random();
        h += golden_ratio_conjugate;
        h %= 1;
        return hsv_to_rgb(h, 0.5, 0.95);
    };

    /**
     * Format the given feature identifier to remove special caracters(as ?, [, ], ., etc..) which cannot be used as HTML id's
     * @param {string} id - identifier
     * @return {string} HTML identifier
     */
    Utils.formatId = function (id) {
        var result;
        if (typeof id === 'string') {
            result = id.replace(/\s{1,}|\.{1,}|\[{1,}|\]{1,}|\({1,}|\){1,}|\~{1,}|\+{1,}|\°{1,}|\-{1,}|\'{1,}|\"{1,}/g, "");
        } else {
            result = id;
        }
        return result;
    };

    /**
     * Checks if a value v is between the interval [min, max].
     * @function isValueBetween
     * @param {float} v - value
     * @param {float} min - min value
     * @param {float} max - max value
     * @return {boolean} True when v is between min and max otherwise False
     */
    Utils.isValueBetween = function (v, min, max) {
        return ((v >= min) && (v <= max));
    };


    /**
     * Computes base URL from getCapabilities URL.
     * @function computeBaseUrlFromCapabilities
     * @param {string} capabilitiesUrl - getCapabilities URL
     * @param {string[]} parameters - parameters of the getCapabilities
     * @return {string} base URL
     */
    Utils.computeBaseUrlFromCapabilities = function (capabilitiesUrl, parameters) {
        if (typeof capabilitiesUrl != "string" || capabilitiesUrl.length == 0 || !Array.isArray(parameters)) return null;

        var url = capabilitiesUrl;
        if (url.indexOf("?") > -1) {
            url = url.substr(0, url.indexOf("?"));
        }
        // url cannot be undefined because we need to query a getCapabilities or something else with a parameter
        var queryString = capabilitiesUrl.replace(url + "?", "") || capabilitiesUrl;
        var query = Utils.parseQuery(queryString);
        // we delete all parameters required by a standard.
        for (var i = 0; i < parameters.length; i++) {
            var parameter = parameters[i];
            delete query[parameter];
        }
        // we build the new Url with remaining parameters.
        var nbParameter = 0;
        for (var key in query) {
            var value = query[key];
            if (nbParameter == 0) {
                url = url + "?" + key + "=" + value;
            } else {
                url = url + "&" + key + "=" + value;
            }
            nbParameter++;
        }

        return url;
    };

    Utils.parseQuery = function(str) {
        if (typeof str != "string" || str.length == 0) return {};
        var s = str.split("&");
        var s_length = s.length;
        var bit, query = {}, first, second;
        for (var i = 0; i < s_length; i++) {
            bit = s[i].split("=");
            first = decodeURIComponent(bit[0]);
            if (first.length == 0) continue;
            second = decodeURIComponent(bit[1]);
            if (typeof query[first] == "undefined") query[first] = second;
            else if (query[first] instanceof Array) query[first].push(second);
            else query[first] = [query[first], second];
        }
        return query;
    };

    /**
     * Add parameter to
     * @function addParameterTo
     * @param {String} url - parameter url
     * @param {String} name - parameter name
     * @param {String} value - parameter value
     * @return {String} url updated
     */
    Utils.addParameterTo = function (url, name, value) {
        var separator = "&";
        if ((typeof url !== "string") || (url.indexOf('?', 0) === -1)) {
            separator = "?";
        }
        return url + separator + name + "=" + value;
    };

    /**
     * Parses the base URL.
     * @function parseBaseURL
     * @param {string} url - the URL
     * @return {*} the base URL
     */
    Utils.parseBaseURL = function(url) {
        var result;
        var index = url.indexOf('?');
        if (index == -1) {
            result = url;
        } else {
            result = url.substring(0, url.indexOf('?')+1);
        }
        return result;
    };

    /**
     * Parses the query string and returns the parameters of the URL.
     * @function parseQueryString
     * @param {string} url - query string
     * @return {{}} parameters of the query string
     */
    Utils.parseQueryString = function (url) {
        var queryString = url.substring(url.indexOf('?')+1).split('&');
        var params = {};
        var pair;
        // march and parse
        for (var i = queryString.length - 1; i >= 0; i--) {
            pair = queryString[i].split('=');
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return params;
    };

    /**
     * Request an URL.
     * @function requestUrl
     * @param {string} url - URL to request
     * @param {string} datatype - datatype of the response
     * @param {Object} options - options
     * @param {Utils~requestCallback} callback - The callback that handles the response.
     * @param {Utils~requestFallback} fallBack - The fallback that handles the error.
     */
    Utils.requestUrl = function (url, datatype, options, callback, fallBack) {
        $.ajax({
            type: "GET",
            url: url,
            dataType: datatype,
            success: function (response) {
                if(callback) {
                    callback(response, options);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                var message;
                var code;
                if (xhr.status === 0) {
                    message = "Unreachable URL or No 'Access-Control-Allow-Origin' header is present on the "+url;
                    code = 0;
                } else {
                    message = thrownError.message;
                    code = thrownError.code;
                }
                if(fallBack) {
                    fallBack(new NetworkError(message, "Utils.js", code));
                }
            }
        });
    };

    /**
     * This callback process the response when the request is a success.
     * @callback Utils~requestCallback
     * @param {Object} response - the response of the server
     * @param {Object} options - options
     */

    /**
     * This fallback process the error of the server.
     * @callback Utils~requestFallback
     * @param {Object} request - the request to the server
     * @param {int} status - status code
     * @param {Object} error - error
     * @param {Object} options - options
     */

    /**
     * Proxifies an URL according to a proxy configuration.
     * @function proxify
     * @param {string} url - URL to proxify
     * @param {{use:boolean, url:string}} proxy - proxy configuration
     * @return {*}
     */
    Utils.proxify = function (url, proxy) {
        if (typeof url !== 'string') {
            return url;
        }
        var proxifiedUrl = url;
        if (proxy) {
            if (proxy.use === true) {
                if (url.toLowerCase().startsWith("http") === false) {
                    proxifiedUrl = url;
                } else if (url.startsWith(proxy.url)) {
                    proxifiedUrl = url; // No change, proxy always set
                } else {
                    proxifiedUrl = proxy.url + encodeURIComponent(url); // Add proxy redirection
                }
            }
        }
        return proxifiedUrl;
    };

    /**
     * Converts UTC hms from date to hours.
     * @function _UT
     * @param {date} date - date
     * @returns {number} hours
     * @private
     */
    function _UT(date) {
        var hour = date.getUTCHours();
        var min = date.getUTCMinutes();
        var sec = date.getUTCSeconds();
        return hour + min/60 + sec/3600;
    }

    /**
     * Computes Julian day number at 0 hr UT.
     * @function _J0
     * @param {date} date - date
     * @returns {number} Julian day number at 0 hr UT
     * @private
     */
    function _J0(date) {
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth()+1;
        var day = date.getUTCDate();
        var UT = _UT(date);
        //TODO check 1721013.5 should be -730531.5 !!!
        return 367*year - Math.floor(7/4*(year + Math.floor((month+9)/12))) +
            Math.floor(275*month/9) + day + 1721013.5;
    }

    /**
     * Computes Julian day.
     * @function JD
     * @param {date} date - date
     * @returns {number} julian day
     * @private
     */
    Utils.JD = function(date) {
        return _J0(date) + _UT(date)/24;
    };

    /**
     * Computes the Greenwich sidereal time at 0 hr UT.
     * See equation [Seidelmann,1992]
     * @function _GST0
     * @param date date
     * @returns {number} the Greenwich sidereal time at 0 hr UT
     * @private
     */
    function _GST0(date) {
        //JC is Julian centuries between the Julian day J0 and J2000(2,451,545.0)
        var julianCentury = (_J0(date) - 2451545.0)/36525;
        var GST0 = 100.4606184 + 36000.77004*julianCentury + 
            0.000387933*julianCentury*julianCentury - 
            2.583e-8*julianCentury*julianCentury*julianCentury;
        return GST0%360;
    }

    /**
     * Computes the Greenwich sidereal time at any other UT time.
     * @function GST
     * @param {date} date - date
     * @returns {number} the Greenwich sidereal time at any other UT time
     */
    Utils.GST = function(date) {
        return (_GST0(date) + 360.98564724*_UT(date)/24)%360;
    };

    /**
     * Computes the local sidereal time.
     * @function LST
     * @param {date} date - date
     * @param {float} longitude - longitude
     * @returns {number}
     */
    Utils.LST = function( date, longitude ) {
        return (Utils.GST(date) + longitude)%360;
    };

    /**
     * Computes the Sidereal Hour Angle
     * @function SHA
     * @param {float} ra - right ascension in decimal degree
     * @returns {number} SHA in decimal degree
     */
    Utils.SHA = function(ra) {
        return 360.0 - 15.0 * ra * 24.0 / 360.0;
    };

    /**
     * Computes the GHA (Greenwich Hour Angle).
     * GHA indicates the position past the plane of the Greenwich meridian measured in degrees. Equivalent to longitude on earth.
     * @function GHA
     * @param {date} date - date
     * @param {float} ra - right ascension in decimal degree
     * @returns {number} Greenwich Hour Angle in decimal degree
     */
    Utils.GHA = function(date, ra) {
        var GHA_Aries = 15.0 * Utils.GST(date) * 24.0 / 360.0;
        return (Utils.SHA(ra) + GHA_Aries)%360;
    };

    /**
     * Converts longitude/latitude to XYZ
     * @function longLat2XYZ
     * @param {float} longitude - longitude in decimal degree
     * @param {float} latitude - latitude in decimal degree
     * @returns {{x: float, y: float, z: float}} the cartesian coordinates
     */
    Utils.longLat2XYZ = function(longitude, latitude) {
        var latInRadians = Numeric.toRadian(latitude);
        var longInRadians = Numeric.toRadian(longitude);
        var cosLat = Math.cos(latInRadians);
        return {
            x:cosLat * Math.cos(longInRadians),
            y:cosLat * Math.sin(longInRadians),
            z:Math.sin(latInRadians)
        };
    };

    /**
     * Computes the distance of the camera in meters for which the bbox of the target is the camera FOV.
     * @function computeDistanceCameraFromBbox
     * @param {float[]} bbox - bbox of the target
     * @param {float} fov - camera FOV
     * @param {float} planetRadius - planet radius in meters
     * @param {boolean} isFlat - is it a projected CRS
     * @return {float} the distance of the camera in meters.
     */
    Utils.computeDistanceCameraFromBbox = function(bbox, fov, planetRadius, isFlat) {
        var angularDistance = Math.abs(bbox[2] - bbox[0]);
        if (UtilsIntersection.isCrossDateLine(bbox[0], bbox[2])) {
            angularDistance = 360 - angularDistance;
        }
        var visibleAngularDistance;
        if(isFlat) {
            visibleAngularDistance = angularDistance;
        } else if (angularDistance > 180) {
            visibleAngularDistance = 360 - angularDistance;
        } else {
            visibleAngularDistance = angularDistance;
        }

        var distance = 2 * Math.PI * planetRadius * visibleAngularDistance / 360;
        return 0.5 * distance / Math.tan(0.5 * Numeric.toRadian(fov));
    };

    Utils.defineTimeRequest = function(temporalRanges, timeRequest) {
        var startDate= timeRequest.from;
        var stopDate = timeRequest.to;

        var times = temporalRanges.split(",");
        if(times.length == 1) {
            // no range
            var time = times[0];

        } else {
            // temporalRange
            var startTime = times[0];
            var stopTime = times[1];
            var frequency = times[2];
        }
    };

    Utils.formatResolution = function(format) {
        var timeResolution;
        if (Utils.aContainsB.call(this, format, 'ss')) {
            timeResolution = "seconds";
        } else if (Utils.aContainsB.call(this, format, 'mm')) {
            timeResolution = "minutes";
        } else if (Utils.aContainsB.call(this, format, "HH")) {
            timeResolution = "hours";
        } else if (Utils.aContainsB.call(this, format, 'DD')) {
            timeResolution = "days";
        } else if (Utils.aContainsB.call(this, format, "MM")) {
            timeResolution = "months";
        } else if (Utils.aContainsB.call(this, format, "YYYY")) {
            timeResolution = "years";
        } else {
            throw new Error();
        }
        return timeResolution;
    };

    Utils.aContainsB = function(a, b) {
        return a.indexOf(b) >= 0;
    };

    Utils.convertToMoment = function(time) {
        return (time instanceof Moment()) ? time : Moment().utc(time);
    };


    return Utils;

});
