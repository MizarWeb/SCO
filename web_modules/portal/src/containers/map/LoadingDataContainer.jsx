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
import { mapSelectors } from '../../clients/MapClient'
import LoadingDataComponent from '../../components/map/LoadingDataComponent'

/**
 * @author Léo Mieulet
 */
export class LoadingDataContainer extends React.Component {
  static propTypes = {
    loadingLayers: PropTypes.bool.isRequired,
  }
  static mapStateToProps = (state, ownProps) => ({
    loadingLayers: mapSelectors.isLoadingLayers(state),
  })

  render() {
    return (
      <LoadingDataComponent isLoading={this.props.loadingLayers} />
    )
  }
}

export default connect(LoadingDataContainer.mapStateToProps)(LoadingDataContainer)
