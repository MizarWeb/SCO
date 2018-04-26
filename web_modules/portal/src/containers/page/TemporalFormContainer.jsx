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
import { connect } from 'react-redux'
import { Shapes } from '@sco/domain'
import { uiActions } from '../../clients/UIClient'
import { mapSelectors, mapActions } from '../../clients/MapClient'
import TemporalFormComponent from '../../components/page/TemporalFormComponent'
/**
 *
 * @author Léo Mieulet
 */
export class TemporalFormContainer extends React.Component {
  static propTypes = {
    closeForm: PropTypes.func.isRequired,
    updateTemporalFilter: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    layerTemporalInfos: Shapes.LayerTemporalInfos,
  }
  static mapStateToProps = (state, ownProps) => ({
    layerTemporalInfos: mapSelectors.getLayerTemporalInfos(state),
  })
  static mapDispatchToProps = dispatch => ({
    closeForm: () => dispatch(uiActions.toggleTemporalFilter(false)),
    updateTemporalFilter: ({ start, stop, step }) => dispatch(mapActions.updateTemporalFilter(start, stop, step)),
  })
  handleSubmit = (values) => {
    this.props.closeForm()
    this.props.updateTemporalFilter(values)
  }
  render() {
    return (
      <TemporalFormComponent
        closeForm={this.props.closeForm}
        onSubmit={this.handleSubmit}
        mounted={this.props.mounted}
        layerTemporalInfos={this.props.layerTemporalInfos}
      />
    )
  }
}

export default connect(TemporalFormContainer.mapStateToProps, TemporalFormContainer.mapDispatchToProps)(TemporalFormContainer)

