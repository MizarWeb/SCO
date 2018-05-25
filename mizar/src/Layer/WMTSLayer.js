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

define(['../Utils/Utils', './AbstractLayer', './AbstractRasterLayer', '../Utils/Constants', '../Registry/WMTSMetadata'],
    function (Utils, AbstractLayer, AbstractRasterLayer, Constants, WMTSMetadata) {
        /**
         * Configuration parameters to query a Web Map Tile Service (WMTS)
         * @typedef {AbstractRasterLayer} AbstractRasterLayer.wmts_configuration
         * @property {string} [version = "1.0.0"] WMTS version
         * @property {string} layer - basic unit of geographic information that may be requested as a map from a server
         * @property {string} matrixSet - The name of pyramidal images
         * @property {int} startLevel - Start level of the index
         * @property {string} [style] - Styled Layers Descriptor
         */
        /**
         * @name WMTSLayer
         * @class
         *    Creates a layer for imagery data using WMTS protocol.
         *    <br/>
         *    WMTS protocol provides tiles with a resolution of <i>tilePixelSize</i><br/>
         *    based on a GeoTiling(4, 2)<br/>
         *    <img src="../doc/images/wmts_tile.png"/><br/>
         *    <br/
         *    Example of a WMTS request:
         *    <code>
         *            http://example.com/wmts?LAYER=MyLayer1,MyLayer2&
         *            EXCEPTIONS=text/xml&FORMAT=image/jpeg&SERVICE=WMTS&
         *            VERSION=1.0.0&REQUEST=GetTile&STYLE=normal&
         *            TILEMATRIXSET=PM&TILEMATRIX=18&TILEROW=90241&TILECOL=132877&
         *    </code>
         *    <br/><br/>
         *    The parameters of a WMTS server are the following:
         *    <ul>
         *        <li><b>TILEMATRIXSET</b>: The name of pyramidal images</li>
         *        <li><b>TILEMATRIX</b>: The name of the matrix that contains the tile</li>
         *        <li><b>TILEROW</b>: The line number from the top left corner from the tile</li>
         *        <li><b>TILECOL</b>: The column number from the top left corner from the tile</li>
         *    </ul>
         *    <img src="../doc/images/wmts_pixel.png"/>
         *
         * @augments AbstractRasterLayer
         * @param {AbstractRasterLayer.configuration} options - WMTS configuration
         * @property {int} [tilePixelSize = 256] - tile in pixels
         * @property {int} [numberOfLevels = 21] - number of levels
         * @property {string} [version = "1.0.0"] - WMS version
         * @property {string} [transparent]
         * @property {string} [time] - Time dimension
         * @property {string} [format = "image/png"] - output image format
         * @constructor
         * @memberOf module:Layer
         * @see {@link http://www.opengeospatial.org/standards/wmts WMTS} standard
         * @see {@link http://www.opengeospatial.org/standards/sld SLD} standard
         */
        var WMTSLayer = function (options) {

            AbstractRasterLayer.prototype.constructor.call(this, Constants.LAYER.WMTS, options);
            this.getTileBaseUrl = _queryImage.call(this, this.getBaseUrl(), options);
            this.timeID = null;
            this.mustbeSkipped = false;
        };

        /**************************************************************************************************************/

        Utils.inherits(AbstractRasterLayer, WMTSLayer);

        /**************************************************************************************************************/

        function _queryImage(baseUrl, options) {
            var url = baseUrl;
            url = Utils.addParameterTo(url, "service","wmts");
            url = Utils.addParameterTo(url, "version",options.version || "1.0.0");
            url = Utils.addParameterTo(url,"request", "GetTile");
            url = Utils.addParameterTo(url,"layer", options.layers);
            url = Utils.addParameterTo(url, "tilematrixset", "WGS84");
//            url = Utils.addParameterTo(url, "tilematrixset", options.tilematrixset);

            if (options.style) {
                url = Utils.addParameterTo(url, "style",options.style);
            }
            url = Utils.addParameterTo(url, "format", options.hasOwnProperty('format') ? options.format : 'image/png');
            if (options.hasOwnProperty('time')) {
                this.mustbeSkipped = (this.timeID == null);
                url = Utils.addParameterTo(url, "time", this.timeID);
            } else {
                this.mustbeSkipped = false;
                this.timeID = null;
            }
            return url;
        }

        WMTSLayer.prototype.setTime = function(time) {
            AbstractLayer.prototype.setTime(time);
            this.setParameter("time", time);
        };

        WMTSLayer.getCapabilitiesFromBaseURl = function(baseUrl, options) {
            var getCapabilitiesUrl = baseUrl;
            getCapabilitiesUrl = Utils.addParameterTo(getCapabilitiesUrl, "service", "WMTS");
            getCapabilitiesUrl = Utils.addParameterTo(getCapabilitiesUrl, "request", "getCapabilities");
            getCapabilitiesUrl = Utils.addParameterTo(getCapabilitiesUrl, "version", options.hasOwnProperty('version') ? options.version : '1.0.0');
            return getCapabilitiesUrl;
        };

        /**************************************************************************************************************/

        /**
         * Returns an url for the given tile
         * @function getUrl
         * @memberOf WMTSLayer#
         * @param {Tile} tile Tile
         * @return {String} Url
         */
        WMTSLayer.prototype.getUrl = function (tile) {
            var url;
            if(this.mustbeSkipped) {
                url = null;
            } else {
                url = this.getTileBaseUrl;
                url = Utils.addParameterTo(url, "tilematrix", tile.level + 1);
                url = Utils.addParameterTo(url, "tilecol", tile.x);
                url = Utils.addParameterTo(url, "tilerow", tile.y);
            }
            return this.proxify(url, tile.level);
        };

        WMTSLayer.prototype.setParameter = function (paramName,value) {
            if (this.containsDimension(paramName)) {
                if(this._hasToBeRefreshed.call(paramName, value)) {
                    this.options[paramName] = value;
                    this.getCoverageBaseUrl = _queryImage.call(this, this.getBaseUrl(), this.options);
                    this.forceRefresh();
                    this.mustbeSkipped = false;
                } else {
                    this.mustbeSkipped = true;
                }
            }
        };

        ///**
        // * Checks if Mizar must query the WMS server to refresh data.
        // * When the camera does not move but that the time change, we have two cases :
        // * - the requested time is included in the time frame of the image => no query
        // * - the requested time is outside of the time frame of the image => this is a new image, need to query
        // * @param paramName
        // * @param value
        // * @return {*}
        // * @private
        // */
        //WMTSLayer.prototype._hasToBeRefreshed = function(paramName, value) {
        //    var hasToBeRefreshed;
        //    if(paramName==="time") {
        //        var timeRequest = AbstractLayer.createTimeRequest(value);
        //        var allowedTime = this.getDimensions().time;
        //        var selectedDate = AbstractLayer.selectedTime(allowedTime.value, timeRequest);
        //        if(this.timeID != null && selectedDate == null) {
        //            // we query because the state has changed
        //            hasToBeRefreshed = true;
        //            this.timeID = null;
        //        } else if(selectedDate == null) {
        //            // No image found on the server related to the requested time, no need to query => we save network
        //            hasToBeRefreshed = false;
        //        } else if (this.timeID === selectedDate) {
        //            // Same state, no need to query
        //            hasToBeRefreshed = false;
        //        } else {
        //            // At the requested time, there is an image on the server and this is not the current one => query
        //            hasToBeRefreshed = true;
        //            this.timeID = selectedDate;
        //        }
        //    } else {
        //        hasToBeRefreshed = true;
        //    }
        //    this.mustbeSkipped = !hasToBeRefreshed;
        //    return hasToBeRefreshed;
        //};


        /**************************************************************************************************************/

        return WMTSLayer;

    });
