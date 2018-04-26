
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

  static helpWrapperStyle = {
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
  static slider = {
    max: 3,
    step: 0.5,
    defaultValue: 0,
    attrName: 'styles',
  }

  handleChange = (e, value) => {
    this.props.updateScenarioParameter(this.props.currentScenario.parameter.attrName, value)
  }

  render() {
    const { currentScenario } = this.props
    const shouldDisplay = !isEmpty(currentScenario.parameter) && currentScenario.parameter.type === 'SLIDER'
    return shouldDisplay ? (
      <div
        style={ScenarioSliderComponent.helpWrapperStyle}
      >
        <Card
          containerStyle={ScenarioSliderComponent.cardStyle}
          className="col-sm-20"
        >
          <Slider
            defaultValue={currentScenario.parameter.defaultValue}
            step={currentScenario.parameter.step}
            max={currentScenario.parameter.max}
            onChange={this.handleChange}
          />
        </Card>
      </div >
    ) : null
  }
}

export default ScenarioSliderComponent
