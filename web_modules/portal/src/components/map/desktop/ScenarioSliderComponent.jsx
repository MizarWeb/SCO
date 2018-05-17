
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
import isEqual from 'lodash/isEqual'
import { Card } from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import { Shapes } from '@sco/domain'

/**
 * Display a slider that modify one variable of the scenario
 * @author Léo Mieulet
 */
export class ScenarioSliderComponent extends React.Component {
  static propTypes = {
    currentScenario: Shapes.Scenario,
    updateScenarioParameter: PropTypes.func.isRequired,
  }
  static sliderWrapperStyle = {
    position: 'absolute',
    width: '100%',
    bottom: '20px',
    display: 'flex',
    justifyContent: 'center',
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
    paddingBottom: '0',
    zIndex: 2,
    // reactive event listener
    pointerEvents: 'auto',
  }
  static cardRoundedStyle = {
    borderRadius: 25,
    padding: '0 25px',
  }
  static sliderStyle = {
    marginTop: 5,
    marginBottom: 4,
  }
  static titleStyle = {
    textAlign: 'center',
  }
  static sliderLegendStyle = {
    fontSize: '0.8em',
    color: '#00AAFF',
    display: 'flex',
    justifyContent: 'space-between',
    fontStyle: 'italic',
  }
  static currentValueWrapper = {
    display: 'flex',
    margin: '6px 5px 0',
  }
  static currentValueStyle = {
    fontSize: '0.9em',
    fontWeight: 500,
  }
  state = {
    value: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.currentScenario)
      && !isEmpty(nextProps.currentScenario.parameter)
      && !isEqual(this.props.currentScenario, nextProps.currentScenario)
    ) {
      this.setState({
        value: nextProps.currentScenario.parameter.defaultValue,
      })
    }
  }

  getSpaceBeforeDateValue = () => ({
    flexGrow: this.state.value / this.props.currentScenario.parameter.max * 100,
  })

  getSpaceAfterDateValue = () => ({
    flexGrow: 100 - (this.state.value / this.props.currentScenario.parameter.max * 100),
  })
  handleChange = (e, value) => {
    this.setState({
      value,
    })
    this.props.updateScenarioParameter(this.props.currentScenario.parameter.attrName, value)
  }

  render() {
    const { currentScenario } = this.props
    const shouldDisplay = !isEmpty(currentScenario.parameter) && currentScenario.parameter.type === 'SLIDER'
    return shouldDisplay ? (
      <div
        style={ScenarioSliderComponent.sliderWrapperStyle}
      >
        <Card
          containerStyle={ScenarioSliderComponent.cardStyle}
          style={ScenarioSliderComponent.cardRoundedStyle}
          className="col-sm-20"
        >
          <div style={ScenarioSliderComponent.titleStyle}>{currentScenario.parameter.title}</div>
          <div>
            <div style={ScenarioSliderComponent.sliderLegendStyle}>
              <span>{currentScenario.parameter.formatValue(currentScenario.parameter.defaultValue)}</span>
              <span>{currentScenario.parameter.formatValue(currentScenario.parameter.max)}</span>
            </div>
            <Slider
              sliderStyle={ScenarioSliderComponent.sliderStyle}
              defaultValue={currentScenario.parameter.defaultValue}
              step={currentScenario.parameter.step}
              max={currentScenario.parameter.max}
              onChange={this.handleChange}
            />
          </div>
          <div style={ScenarioSliderComponent.currentValueWrapper}>
            <div style={this.getSpaceBeforeDateValue()} />
            <span style={ScenarioSliderComponent.currentValueStyle}>{currentScenario.parameter.formatValue(this.state.value)}</span>
            <div style={this.getSpaceAfterDateValue()} />
          </div>
        </Card>
      </div >
    ) : null
  }
}

export default ScenarioSliderComponent
