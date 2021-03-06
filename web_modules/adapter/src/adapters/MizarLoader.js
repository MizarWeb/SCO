/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of SCO - Space Climate Observatory.
 *
 * SCO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCO. If not, see <http://www.gnu.org/licenses/>.
 **/


// Load Mizar in dev mode
// Each line adds the specifed file to the public folder /mizar/
// e.g. /mizar/external/fits.js
import 'Mizar/external/fits'
import 'Mizar/external/wcs'
import 'Mizar/external/gzip.min'
import 'Mizar/external/samp'

import 'path/path'
import 'underscore/underscore-min'
import 'jquery/dist/jquery.min'
import 'jquery-ui-dist/jquery-ui.min'
import 'string/dist/string'
import 'file-saver/FileSaver.min'
import 'jszip/dist/jszip.min'
import 'xmltojson/lib/xmlToJSON.min'
import 'requirejs/require'
import 'wms-capabilities/dist/wms-capabilities'
import 'moment/min/moment-with-locales.min'

import 'Mizar/src/Registry/WMSServer'
import 'Mizar/src/Registry/WMTSServer'
import 'Mizar/src/Registry/WCSServer'
import 'Mizar/src/Registry/WMTSMetadata'
import 'Mizar/src/Registry/WMTSServerRegistryHandler'
import 'Mizar/src/Registry/WMSServerRegistryHandler'
import 'Mizar/src/Registry/WCSServerRegistryHandler'
import 'Mizar/src/Registry/AbstractRegistryHandler'
import 'Mizar/src/Registry/PendingLayersRegistryHandler'
import 'Mizar/src/Registry/LayerRegistryHandler'

import 'Mizar/src/Error/NetworkError'

import 'Mizar/src/Time/Time'
import 'Mizar/src/Time/TimeTravelParams'
import 'Mizar/src/Time/TimeEnumerated'
import 'Mizar/src/Time/TimeSample'


import 'Mizar/src/Layer/AbstractLayer'
import 'Mizar/src/Layer/AbstractRasterLayer'
import 'Mizar/src/Layer/WCSElevationLayer'
import 'Mizar/src/Layer/InterfaceLayer'
import 'Mizar/src/Layer/TileWireframeLayer'
import 'Mizar/src/Layer/AtmosphereLayer'
import 'Mizar/src/Layer/VectorLayer'
import 'Mizar/src/Layer/WMSLayer'
import 'Mizar/src/Layer/InterfaceVectorLayer'
import 'Mizar/src/Layer/WMSElevationLayer'
import 'Mizar/src/Layer/HipsMetadata'
import 'Mizar/src/Layer/AbstractHipsLayer'
import 'Mizar/src/Layer/HipsGraphicLayer'
import 'Mizar/src/Layer/LayerFactory'
import 'Mizar/src/Layer/FitsLoader'
import 'Mizar/src/Layer/BingLayer'
import 'Mizar/src/Layer/JsCSV/csv'
import 'Mizar/src/Layer/HipsCatLayer'
import 'Mizar/src/Layer/GeoJsonLayer'
import 'Mizar/src/Layer/FitsRequest'
import 'Mizar/src/Layer/HipsFitsLayer'
import 'Mizar/src/Layer/CoordinateGridLayer'
import 'Mizar/src/Layer/InterfaceRasterLayer'
import 'Mizar/src/Layer/OpenSearch/OpenSearchCache'
import 'Mizar/src/Layer/OpenSearch/OpenSearchForm'
import 'Mizar/src/Layer/OpenSearch/OpenSearchResult'
import 'Mizar/src/Layer/OpenSearch/OpenSearchRequestPool'
import 'Mizar/src/Layer/OpenSearch/OpenSearchParam'
import 'Mizar/src/Layer/OpenSearch/OpenSearchUtils'
import 'Mizar/src/Layer/GroundOverlayLayer'
import 'Mizar/src/Layer/OSMLayer'
import 'Mizar/src/Layer/MocLayer'
import 'Mizar/src/Layer/WMTSLayer'
import 'Mizar/src/Layer/OpenSearchLayer'
import 'Mizar/src/Layer/AbstractVectorLayer'
import 'Mizar/src/Layer/JsVotable/votable'
import 'Mizar/src/Layer/JsVotable/abstractNode'
import 'Mizar/src/Layer/JsVotable/utils'
import 'Mizar/src/Layer/JsVotable/JsVotable'
import 'Mizar/src/Layer/JsVotable/min'
import 'Mizar/src/Layer/JsVotable/coosys'
import 'Mizar/src/Layer/JsVotable/max'
import 'Mizar/src/Layer/JsVotable/tabledata'
import 'Mizar/src/Layer/JsVotable/values'
import 'Mizar/src/Layer/JsVotable/table'
import 'Mizar/src/Layer/JsVotable/link'
import 'Mizar/src/Layer/JsVotable/fits'
import 'Mizar/src/Layer/JsVotable/resource'
import 'Mizar/src/Layer/JsVotable/field'
import 'Mizar/src/Layer/JsVotable/description'
import 'Mizar/src/Layer/JsVotable/cache'
import 'Mizar/src/Layer/JsVotable/abstractData'
import 'Mizar/src/Layer/JsVotable/fieldref'
import 'Mizar/src/Layer/JsVotable/td'
import 'Mizar/src/Layer/JsVotable/definitions'
import 'Mizar/src/Layer/JsVotable/binary2'
import 'Mizar/src/Layer/JsVotable/param'
import 'Mizar/src/Layer/JsVotable/stream'
import 'Mizar/src/Layer/JsVotable/option'
import 'Mizar/src/Layer/JsVotable/group'
import 'Mizar/src/Layer/JsVotable/binary'
import 'Mizar/src/Layer/JsVotable/converter/base64'
import 'Mizar/src/Layer/JsVotable/converter/geojson'
import 'Mizar/src/Layer/JsVotable/data'
import 'Mizar/src/Layer/JsVotable/info'
import 'Mizar/src/Layer/JsVotable/tr'
import 'Mizar/src/Layer/JsVotable/paramref'
import 'Mizar/src/Renderer/PolygonRenderer'
import 'Mizar/src/Renderer/ConvexPolygonRenderer'
import 'Mizar/src/Renderer/DynamicImage'
import 'Mizar/src/Renderer/pnltri.min'
import 'Mizar/src/Renderer/GroundOverlayRenderer'
import 'Mizar/src/Renderer/StencilPolygonRenderer'
import 'Mizar/src/Renderer/RenderContext'
import 'Mizar/src/Renderer/GeoBound'
import 'Mizar/src/Renderer/glMatrix'
import 'Mizar/src/Renderer/Ray'
import 'Mizar/src/Renderer/PolygonRenderable'
import 'Mizar/src/Renderer/RendererTileData'
import 'Mizar/src/Renderer/ColorMap'
import 'Mizar/src/Renderer/pnltri'
import 'Mizar/src/Renderer/LineStringRenderable'
import 'Mizar/src/Renderer/LineRenderer'
import 'Mizar/src/Renderer/RasterOverlayRenderer'
import 'Mizar/src/Renderer/VectorRendererManager'
import 'Mizar/src/Renderer/PointSpriteRenderer'
import 'Mizar/src/Renderer/Frustum'
import 'Mizar/src/Renderer/FeatureOverlayManager'
import 'Mizar/src/Renderer/PlanetPolygonRenderable'
import 'Mizar/src/Renderer/PointRenderer'
import 'Mizar/src/Renderer/BoundingBox'
import 'Mizar/src/Renderer/PolygonCutter'
import 'Mizar/src/Renderer/Program'
import 'Mizar/src/Renderer/BatchRenderable'
import 'Mizar/src/Renderer/VectorRenderer'
import 'Mizar/src/Renderer/FeatureStyle'
import 'Mizar/src/Parser/ParserFactory'
import 'Mizar/src/Parser/JsonProcessor'
import 'Mizar/src/Parser/KMLParser'
import 'Mizar/src/Mizar'
import 'Mizar/src/NameResolver/DictionaryNameResolver'
import 'Mizar/src/NameResolver/InterfaceNameResolver'
import 'Mizar/src/NameResolver/DefaultNameResolver'
import 'Mizar/src/NameResolver/AbstractNameResolver'
import 'Mizar/src/NameResolver/NameResolver'
import 'Mizar/src/NameResolver/CDSNameResolver'
import 'Mizar/src/NameResolver/IMCCENameResolver'
import 'Mizar/src/Globe/InterfaceGlobe'
import 'Mizar/src/Globe/AbstractGlobe'
import 'Mizar/src/Globe/Sky'
import 'Mizar/src/Globe/Planet'
import 'Mizar/src/Globe/GlobeFactory'
import 'Mizar/src/Tiling/MercatorTiling'
import 'Mizar/src/Tiling/TiledVectorRenderer'
import 'Mizar/src/Tiling/HEALPixTiling'
import 'Mizar/src/Tiling/TiledVectorRenderable'
import 'Mizar/src/Tiling/Tile'
import 'Mizar/src/Tiling/TileRequest'
import 'Mizar/src/Tiling/HEALPixTables'
import 'Mizar/src/Tiling/GeoTiling'
import 'Mizar/src/Tiling/TileIndexBuffer'
import 'Mizar/src/Tiling/HEALPixBase'
import 'Mizar/src/Tiling/TilePool'
import 'Mizar/src/Tiling/Mesh'
import 'Mizar/src/Tiling/TileManager'
import 'Mizar/src/Tiling/Triangulator'
import 'Mizar/src/Navigation/AbstractNavigation'
import 'Mizar/src/Navigation/PlanetNavigation'
import 'Mizar/src/Navigation/AstroNavigation'
import 'Mizar/src/Navigation/MouseNavigationHandler'
import 'Mizar/src/Navigation/NavigationFactory'
import 'Mizar/src/Navigation/TouchNavigationHandler'
import 'Mizar/src/Navigation/NavigationHandlerFactory'
import 'Mizar/src/Navigation/GoogleMouseNavigationHandler'
import 'Mizar/src/Navigation/GroundNavigation'
import 'Mizar/src/Navigation/KeyboardNavigationHandler'
import 'Mizar/src/Navigation/InterfaceNavigation'
import 'Mizar/src/Navigation/FlatNavigation'
import 'Mizar/src/Utils/UtilsIntersection'
import 'Mizar/src/Utils/Stats'
import 'Mizar/src/Utils/Cache'
import 'Mizar/src/Utils/Long'
import 'Mizar/src/Utils/Utils'
import 'Mizar/src/Utils/CircleFinder'
import 'Mizar/src/Utils/Event'
import 'Mizar/src/Utils/UtilityFactory'
import 'Mizar/src/Utils/AttributionHandler'
import 'Mizar/src/Utils/ImageRequest'
import 'Mizar/src/Utils/Tuning'
import 'Mizar/src/Utils/UtilsFits'
import 'Mizar/src/Utils/Numeric'
import 'Mizar/src/Utils/Constants'
import 'Mizar/src/Gui/TimeTravel'
import 'Mizar/src/Gui/dialog/ErrorDialog'
import 'Mizar/src/Gui/dialog/AboutDialog'
import 'Mizar/src/Gui/dialog/CrsDialog'
import 'Mizar/src/Gui/Compass'
import 'Mizar/src/Gui/Tracker/AbstractTracker'
import 'Mizar/src/Gui/Tracker/PositionTracker'
import 'Mizar/src/Gui/Tracker/InterfaceTracker'
import 'Mizar/src/Gui/Tracker/ElevationTracker'
import 'Mizar/src/Animation/AnimationFactory'
import 'Mizar/src/Animation/InterfaceAnimation'
import 'Mizar/src/Animation/InertiaAnimation'
import 'Mizar/src/Animation/InterpolatedAnimation'
import 'Mizar/src/Animation/PathAnimation'
import 'Mizar/src/Animation/SegmentedAnimation'
import 'Mizar/src/Animation/AbstractAnimation'
import 'Mizar/src/Provider/ProviderFactory'
import 'Mizar/src/Provider/StarProvider'
import 'Mizar/src/Provider/CraterProvider'
import 'Mizar/src/Provider/ConstellationProvider'
import 'Mizar/src/Provider/AbstractProvider'
import 'Mizar/src/Provider/PlanetProvider'
import 'Mizar/src/Provider/InterfaceProvider'
import 'Mizar/src/Provider/TrajectoryProvider'
import 'Mizar/src/Services/ServiceFactory'
import 'Mizar/src/Services/TimeTravelCore'
import 'Mizar/src/Services/CompassCore'
import 'Mizar/src/Services/PickingManagerCore'
import 'Mizar/src/Services/Triangle'
import 'Mizar/src/Services/MeasureToolPlanetCore'
import 'Mizar/src/Services/SelectionToolCore'
import 'Mizar/src/Services/SampCore'
import 'Mizar/src/Services/MocBase'
import 'Mizar/src/Services/FitsVisu'
import 'Mizar/src/Services/FitsHips'
import 'Mizar/src/Services/ImageProcessingCore'
import 'Mizar/src/Services/HistogramCore'
import 'Mizar/src/Services/ExportToolCore'
import 'Mizar/src/Services/MeasureToolSkyCore'
import 'Mizar/src/Services/MollweideViewerCore'
import 'Mizar/src/Projection/InterfaceProjection'
import 'Mizar/src/Projection/AitoffProjection'
import 'Mizar/src/Projection/MercatorProjection'
import 'Mizar/src/Projection/MollweideProjection'
import 'Mizar/src/Projection/AugustProjection'
import 'Mizar/src/Projection/ProjectionFactory'
import 'Mizar/src/Projection/AzimuthProjection'
import 'Mizar/src/Projection/AbstractProjection'
import 'Mizar/src/Projection/PlateProjection'
import 'Mizar/src/ReverseNameResolver/AbstractReverseNameResolver'
import 'Mizar/src/ReverseNameResolver/InterfaceReverseNameResolver'
import 'Mizar/src/ReverseNameResolver/CDSReverseNameResolver'
import 'Mizar/src/ReverseNameResolver/DefaultReverseNameResolver'
import 'Mizar/src/ReverseNameResolver/ReverseNameResolver'
import 'Mizar/src/rconfig'
import 'Mizar/src/Crs/EquatorialCrs'
import 'Mizar/src/Crs/Mars2000Crs'
import 'Mizar/src/Crs/HorizontalLocalCrs'
import 'Mizar/src/Crs/WGS84Crs'
import 'Mizar/src/Crs/CoordinateSystemFactory'
import 'Mizar/src/Crs/SunCrs'
import 'Mizar/src/Crs/AbstractCrs'
import 'Mizar/src/Crs/InterfaceCrs'
import 'Mizar/src/Crs/Geoide'
import 'Mizar/src/Crs/Moon2000Crs'
import 'Mizar/src/Crs/AstroCoordTransform'
import 'Mizar/src/Crs/GalacticCrs'
import 'Mizar/src/Crs/ProjectedCrs'
import 'Mizar/src/Context/ContextFactory'
import 'Mizar/src/Context/SkyContext'
import 'Mizar/src/Context/AbstractContext'
import 'Mizar/src/Context/PlanetContext'
import 'Mizar/src/Context/GroundContext'
import 'Mizar/src/Context/InterfaceContext'
import 'Mizar/src/SceneGraph/SceneGraph'
import 'Mizar/src/SceneGraph/Navigation'
import 'Mizar/src/SceneGraph/ColladaParser'
import 'Mizar/src/SceneGraph/Ray'
import 'Mizar/src/SceneGraph/Renderer'
import 'Mizar/src/SceneGraph/LODTreeRenderer'
import 'Mizar/src/SceneGraph/LODTreeLoader'
import 'Mizar/src/SceneGraph/LODNode'

import 'Mizar/shaders/GroundFrag.glsl'
import 'Mizar/shaders/GroundFromAtmosphereVert.glsl'
import 'Mizar/shaders/GroundFromSpaceVert.glsl'
import 'Mizar/shaders/SkyFrag.glsl'
import 'Mizar/shaders/SkyFromAtmosphereVert.glsl'
import 'Mizar/shaders/SkyFromSpaceVert.glsl'
