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

define(['../Utils/Utils', './AbstractLayer', '../Utils/Constants', '../Renderer/FeatureStyle'],
    function (Utils, AbstractLayer, Constants, FeatureStyle) {
        /**
         * AbstractVectorLayer layer configuration
         * @typedef {AbstractVectorLayer.configuration} AbstractLayer.vector_configuration
         * @property {string} url - the url of json data to load when attaching to globe
         * @property {int} [minLevel = 0] - minimum rendering level depending on tile level
         * @property {int} [maxLevel = 15] - maximum rendering level depending on tile level
         * @property {function} [callback] - the callback function called when data are loaded. Data loaded are passed in parameter of the function.
         */
        /**
         * @name AbstractVectorLayer
         * @class
         *    Create a layer to display vector data in GeoJSON format.
         * @augments AbstractLayer
         * @param {LAYER} type - the type of the layer
         * @param {AbstractVectorLayer.configuration} options - Configuration properties for the AbstractVectorLayer
         * @constructor
         * @implements {VectorLayer}
         */
        var AbstractVectorLayer = function (type, options) {
            options.zIndex = options.zIndex || Constants.DISPLAY.DEFAULT_VECTOR;
            AbstractLayer.prototype.constructor.call(this, type, options);

            this.vectorLayer = true;
            this.url = options.url;

            if (options && options.callback) {
                this.callback = options.callback;
            } else {
                this.callback = null;
            }

            this.minLevel = options && options.hasOwnProperty('minLevel') ? options.minLevel : 0;
            this.maxLevel = options && options.hasOwnProperty('maxLevel') ? options.maxLevel : 21;

            this.features = [];
        };

        /**************************************************************************************************************/

        Utils.inherits(AbstractLayer, AbstractVectorLayer);

        /**************************************************************************************************************/

        /**
         * Returns the min level for which the vector is displayed.
         * @function getMinLevel
         * @memberOf AbstractVectorLayer#
         * @returns {int} Returns the min level for which the vector is displayed.
         */
        AbstractVectorLayer.prototype.getMinLevel = function () {
            return this.minLevel;
        };

        /**
         * Returns the max level for which the vector is not displayed.
         * @function getMaxLevel
         * @memberOf AbstractVectorLayer#
         * @returns {int} Returns the max level for which the vector is not displayed.
         */
        AbstractVectorLayer.prototype.getMaxLevel = function () {
            return this.maxLevel;
        };

        /**
         * Returns the URL to get the vector data.
         * @function getUrl
         * @memberOf AbstractVectorLayer#
         * @returns {String} the URL to get the vector data
         */
        AbstractVectorLayer.prototype.getUrl = function () {
            return this.proxify(this.url);
        };

        /**
         * Attach the vector layer to the globe
         * @function _attach
         * @memberOf AbstractVectorLayer#
         * @param {AbstractGlobe} g globe
         * @private
         */
        AbstractVectorLayer.prototype._attach = function (g) {
            AbstractLayer.prototype._attach.call(this, g);

            // Add the feature to renderers
            for (var i = 0; i < this.features.length; i++) {
                this._addFeatureToRenderers(this.features[i]);
            }
        };

        /**
         * Detach the vector layer from the globe
         * @function _detach
         * @memberOf AbstractVectorLayer#
         * @private
         */
        AbstractVectorLayer.prototype._detach = function () {
            // Remove feature from renderers
            for (var i = 0; i < this.features.length; i++) {
                this._removeFeatureFromRenderers(this.features[i]);
            }

            AbstractLayer.prototype._detach.call(this);
        };

        /**
         * Adds a feature collection, in GeoJSON format
         * @function addFeatureCollection
         * @memberOf AbstractVectorLayer#
         * @param {GeoJSON} featureCollection Feature Collection
         */
        AbstractVectorLayer.prototype.addFeatureCollection = function (featureCollection) {
            // Note : use property defined as ['']  to avoid renaming when compiled in advanced mode with the closure compiler
            var features = featureCollection.features;
            if (features) {
                for (var i = 0; i < features.length; i++) {
                    this.addFeature(features[i]);
                }
            }
        };

        /**
         * Removes a feature collection, in GeoJSON format
         * @function removeFeatureCollection
         * @memberOf AbstractVectorLayer#
         * @param {GeoJSON} featureCollection Feature Collection
         */
        AbstractVectorLayer.prototype.removeFeatureCollection = function (featureCollection) {
            // Note : use property defined as ['']  to avoid renaming when compiled in advanced mode with the closure compiler
            var features = featureCollection.features;
            if (features) {
                for (var i = 0; i < features.length; i++) {
                    this.removeFeature(features[i]);
                }
            }
        };


        /**
         * Add a feature to renderers.
         * @function _addFeatureToRenderers
         * @memberOf AbstractVectorLayer#
         * @param {GeoJSON} feature Feature
         * @private
         */
        AbstractVectorLayer.prototype._addFeatureToRenderers = function (feature) {
            var geometry = feature.geometry;

            // Manage style, if undefined try with properties, otherwise use defaultStyle
            var style = this.style;
            var props = feature.properties;
            if (props && props.style) {
                style = props.style;
            }

            // Manage geometry collection
            if (geometry.type === "GeometryCollection") {
                var geoms = geometry.geometries;
                for (var i = 0; i < geoms.length; i++) {
                    this.getGlobe().getVectorRendererManager().addGeometry(this, geoms[i], style);
                }
            }
            else {
                // Add geometry to renderers
                this.getGlobe().getVectorRendererManager().addGeometry(this, geometry, style);
            }
        };


        /**
         * Removes a feature from renderers.
         * @function _removeFeatureFromRenderers
         * @memberOf AbstractVectorLayer#
         * @param {GeoJSON} feature Feature
         * @returns {boolean} True when the feature is removed from the globe otherwise False
         * @private
         */
        AbstractVectorLayer.prototype._removeFeatureFromRenderers = function (feature) {
            var isRemoved = true;
            var geometry = feature.geometry;

            // Manage geometry collection
            if (geometry.type === "GeometryCollection") {
                var geoms = geometry.geometries;
                if (this.getGlobe() && this.getGlobe().getVectorRendererManager()) {
                    for (var i = 0; i < geoms.length; i++) {
                        isRemoved = isRemoved && this.getGlobe().getVectorRendererManager().removeGeometry(geoms[i], this);
                    }
                } else {
                    isRemoved = false;
                }
            } else if (this.getGlobe() && this.getGlobe().getVectorRendererManager()) {
                isRemoved = this.getGlobe().getVectorRendererManager().removeGeometry(geometry, this);
            } else {
                isRemoved = false;
            }
            return isRemoved;
        };

        /**
         * Add a feature to the layer
         * @function addFeature
         * @memberOf AbstractVectorLayer#
         * @param {GeoJSON} feature Feature
         */
        AbstractVectorLayer.prototype.addFeature = function (feature) {
            // Check feature geometry : only add valid feature
            var geometry = feature.geometry;
            if (!geometry || !geometry.type) {
                return;
            }
            this.features.push(feature);

            // Add features to renderer if layer is attached to planet
            if (this.getGlobe()) {
                this._addFeatureToRenderers(feature);
                if (this.isVisible()) {
                    this.getGlobe().getRenderContext().requestFrame();
                }
            }
        };

        /**
         * Removes a feature from the layer.
         * @function removeFeature
         * @memberOf AbstractVectorLayer#
         * @param {GeoJSON} feature Feature
         */
        AbstractVectorLayer.prototype.removeFeature = function (feature) {
            var index = this.features.indexOf(feature);
            this.features.splice(index, 1);
            if (this.getGlobe()) {
                this._removeFeatureFromRenderers(feature);
                if (this.isVisible()) {
                    this.getGlobe().getRenderContext().requestFrame();
                }
            }
        };

        /**
         * Removes all features from the layer.
         * @function removeAllFeatures
         * @memberOf AbstractVectorLayer#
         */
        AbstractVectorLayer.prototype.removeAllFeatures = function () {
            // Remove feature from renderers
            if (this.getGlobe()) {
                for (var i = 0; i < this.features.length; i++) {
                    this._removeFeatureFromRenderers(this.features[i]);
                }
            }
            this.features.length = 0;

            // Refresh rendering if needed
            if (this.getGlobe() && this.isVisible()) {
                this.getGlobe().getRenderContext().requestFrame();
            }
        };

        /**
         * Modifies the feature style for a specific feature.
         * @function modifyFeatureStyle
         * @memberOf AbstractVectorLayer#
         * @param {GeoJson} feature feature for which the feature style is modified
         * @param {FeatureStyle} style Feature style
         */
        AbstractVectorLayer.prototype.modifyFeatureStyle = function (feature, style) {
            if (this._removeFeatureFromRenderers(feature)) {
                feature.properties.style = style;
                this._addFeatureToRenderers(feature);
            }
        };

        /**
         * Modifies the feature style for all features.
         * @function modifyStyle
         * @memberOf AbstractVectorLayer#
         * @param {FeatureStyle} style Feature style
         */
        AbstractVectorLayer.prototype.modifyStyle = function (style) {
            var i;
            for (i = 0; i < this.features.length; i++) {
                this._removeFeatureFromRenderers(this.features[i]);
            }

            this.setStyle(style);

            for (i = 0; i < this.features.length; i++) {
                this._addFeatureToRenderers(this.features[i]);
            }
        };


        return AbstractVectorLayer;

    });