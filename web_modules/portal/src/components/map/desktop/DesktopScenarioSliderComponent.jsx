
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
import { Shapes } from '@sco/domain'
import ScenarioSliderContainer from '../../../containers/common/ScenarioSliderContainer'

/**
 * Display a slider that modify one variable of the scenario
 * @author Léo Mieulet
 */
export class ScenarioSliderComponent extends React.Component {
  static propTypes = {
    currentScenario: Shapes.Scenario,
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
          className="col-sm-20 hidden-xs"
        >
          <ScenarioSliderContainer />
        </Card>
      </div >
    ) : null
  }
}

export default ScenarioSliderComponent
