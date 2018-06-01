import size from 'lodash/size'
import forEach from 'lodash/forEach'
import has from 'lodash/has'

export default {
  // Everytimes the time change, this scenario must ask a HTTP service to get the elevation then transmit it to another layer
  onTimeChange: (mizar, currentDate, componentProps) => {
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        const parsingRegex = /<b>Values: <\/b>([-0-9.]+)<br>/m
        const parsingResult = xmlhttp.responseText.match(parsingRegex)
        if (parsingResult && size(parsingResult) === 2) {
          const value = parsingResult[1]
          forEach(componentProps.layerList, (layer) => {
            const mizarScenarioLayer = mizar.getLayerByID(layer.id)
            if (has(mizarScenarioLayer, 'options.hasParameter')) {
              mizarScenarioLayer.setParameter('sea_elev_time', value)
              mizar.reloadLayer(mizarScenarioLayer)
            }
          })
        }
      }
    }
    const date = currentDate.toISOString()
    xmlhttp.open('GET', `http://80.158.6.138/mapserv?time=${date}&height=2&width=2&transparent=true&format=image/png&styles=&layers=Mediterranean&request=GetFeatureInfo&version=1.3.0&service=wms&map=WMS_MEDIT&query_layers=Mediterranean&x=1&y=1&bbox=3.9780,43.5040,3.9781,43.5041&crs=CRS:84&info_format=text/html`, true)
    xmlhttp.send()
  },
}
