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
import CopyrightComponent from '../../components/page/CopyrightComponent'
/**
 *
 * @author Léo Mieulet
 */
export class CopyrightContainer extends React.Component {
  static propTypes = {
    closeCopyright: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    scenario: Shapes.Scenario,
    layerList: Shapes.LayerList,
    globalLayerList: Shapes.GlobalLayerList,
  }
  static mapStateToProps = (state, ownProps) => ({
    scenario: mapSelectors.getCurrentScenario(state),
    layerList: mapSelectors.getLayersInfos(state),
    globalLayerList: mapSelectors.getBaseLayersInfos(state),
  })
  static mapDispatchToProps = dispatch => ({
    closeCopyright: () => dispatch(uiActions.toggleCopyright(false)),
  })

  render() {
    return (
      <CopyrightComponent
        closeCopyright={this.props.closeCopyright}
        mounted={this.props.mounted}
        scenario={this.props.scenario}
        layerList={this.props.layerList}
        globalLayerList={this.props.globalLayerList}
      />
    )
  }
}

export default connect(CopyrightContainer.mapStateToProps, CopyrightContainer.mapDispatchToProps)(CopyrightContainer)

