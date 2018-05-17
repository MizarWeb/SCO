
/**
 * Copyright 2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import size from 'lodash/size'
import has from 'lodash/has'
import { Plot } from '@sco/adapter'
import { Shapes } from '@sco/domain'
import isEqual from 'lodash/isEqual'
import findIndex from 'lodash/findIndex'
import slice from 'lodash/slice'
import max from 'lodash/max'
import isDate from 'lodash/isDate'

/**
 * Display a graph associated with scenario data
 * @author Léo Mieulet
 */
export class ScenarioGraphComponent extends React.Component {
  static propTypes = {
    currentScenario: Shapes.Scenario,
    layerTemporalInfos: Shapes.LayerTemporalInfos,
  }

  static helpWrapperStyle = {
    position: 'absolute',
    width: '100%',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // desactive event listener
    pointerEvents: 'none',
  }
  static textStyle = {
    textAlign: 'center',
    padding: '10px',
    userSelect: 'none',
  }
  static cardStyle = {
    height: '40vh',
    paddingBottom: '0',
    zIndex: 2,
    // reactive event listener
    pointerEvents: 'auto',
  }

  constructor(props) {
    super(props)
    const isDefined = has(props.currentScenario, 'graph') && isDate(props.layerTemporalInfos.currentDate)
    this.state = {
      // graph data, can be reworked depending of the scenario
      data: isDefined ? this.recomputeData(props) : [],
      // layout property, can be reworked depending of the scenario
      layout: isDefined ? this.recomputeLayout(props) : {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.currentScenario)
      && !isEmpty(nextProps.currentScenario.graph)
      && !isEmpty(nextProps.layerTemporalInfos)
      && isDate(nextProps.layerTemporalInfos.currentDate)
      && (
        !isEqual(this.props.currentScenario, nextProps.currentScenario)
        || !isEqual(this.props.layerTemporalInfos, nextProps.layerTemporalInfos)
      )
    ) {
      this.setState({
        data: this.recomputeData(nextProps),
        layout: this.recomputeLayout(nextProps),
      })
    }
  }

  /**
   * Slice the dataset with the layerTemporalInfos current date
   */
  recomputeData = (nextProps) => {
    const { data, splitColor } = nextProps.currentScenario.graph
    if (nextProps.currentScenario.graph.useScenarioDateToSplitData && size(nextProps.currentScenario.graph.data) === 1) {
      const { currentDate } = nextProps.layerTemporalInfos
      const firstPartDataIndex = findIndex(data[0].x, date => (
        new Date(date).getTime() > currentDate.getTime()
      ))
      // If there is no need to create 2 series of points
      if (firstPartDataIndex === size(data[0].x) || firstPartDataIndex <= 0) {
        return data
      }
      // split data in 2 series
      const firstSerie = {
        ...data[0],
        x: slice(data[0].x, 0, firstPartDataIndex),
        y: slice(data[0].y, 0, firstPartDataIndex),
        marker: {
          color: splitColor,
        },
      }
      const secondSerie = {
        ...data[0],
        x: slice(data[0].x, firstPartDataIndex),
        y: slice(data[0].y, firstPartDataIndex),
      }
      return [firstSerie, secondSerie]
    }
    return data
  }

  /**
   * Add a vertical bar using the layerTemporalInfos current date
   */
  recomputeLayout = (nextProps) => {
    const { data, layout, splitColor } = nextProps.currentScenario.graph
    if (nextProps.currentScenario.graph.useScenarioDateToSplitData && size(data) === 1) {
      const { currentDate } = nextProps.layerTemporalInfos
      const firstPartDataIndex = findIndex(data[0].x, date => (
        new Date(date).getTime() > currentDate.getTime()
      ))
      const maxValue = max(data[0].y)
      // If there is no need to create the vertical line
      if (firstPartDataIndex === size(data[0].x) || firstPartDataIndex <= 0) {
        return layout
      }
      const currentDateForLine = data[0].x[firstPartDataIndex]
      return {
        ...layout,
        shapes: [
          {
            visible: true,
            type: 'line',
            x0: currentDateForLine,
            y0: 0,
            x1: currentDateForLine,
            y1: maxValue,
            line: {
              color: splitColor,
              width: 2,
              dash: 'dash',
            },
          },
        ],
      }
    }
    return layout
  }

  render() {
    const { currentScenario } = this.props
    const shouldDisplay = !isEmpty(currentScenario.graph)
    return shouldDisplay ? (
      <div
        style={ScenarioGraphComponent.helpWrapperStyle}
        className="hidden-xs"
      >
        <Plot
          className="col-sm-25"
          data={this.state.data}
          layout={this.state.layout}
          config={currentScenario.graph.config}
          useResizeHandler
        />
      </div >
    ) : null
  }
}

export default ScenarioGraphComponent
