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
import { Shapes } from '@sco/domain'
import { connect } from 'react-redux'
import { uiActions } from '../../clients/UIClient'
import { mapSelectors } from '../../clients/MapClient'
import LegendComponent from '../../components/page/LegendComponent'
/**
 *
 * @author Léo Mieulet
 */
export class LegendContainer extends React.Component {
  static propTypes = {
    closeLegend: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    scenario: Shapes.Scenario,
    layerList: Shapes.LayerList,
  }
  static mapStateToProps = (state, ownProps) => ({
    scenario: mapSelectors.getCurrentScenario(state),
    layerList: mapSelectors.getLayers(state),
  })
  static mapDispatchToProps = dispatch => ({
    closeLegend: () => dispatch(uiActions.toggleLegend(false)),
  })

  render() {
    return (
      <LegendComponent
        closeLegend={this.props.closeLegend}
        mounted={this.props.mounted}
        scenario={this.props.scenario}
        layerList={this.props.layerList}
      />
    )
  }
}

export default connect(LegendContainer.mapStateToProps, LegendContainer.mapDispatchToProps)(LegendContainer)

