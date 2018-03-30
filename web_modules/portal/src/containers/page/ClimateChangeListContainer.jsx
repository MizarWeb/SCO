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
import { userActions } from '../../clients/UserClient'
import ModalComponent from '../../components/page/ModalComponent'
import ClimateChangeListComponent from '../../components/page/ClimateChangeListComponent'
/**
 *
 * @author Léo Mieulet
 */
export class ClimateChangeListContainer extends React.Component {
  static propTypes = {
    closeView: PropTypes.func.isRequired,
  }
  static mapStateToProps = (state, ownProps) => ({
  })
  static mapDispatchToProps = dispatch => ({
    closeView: () => dispatch(userActions.toggleMenu(false)),
  })

  render() {
    return (
      <ModalComponent>
        <ClimateChangeListComponent
          closeView={this.props.closeView}
        />
      </ModalComponent>
    )
  }
}

export default connect(ClimateChangeListContainer.mapStateToProps, ClimateChangeListContainer.mapDispatchToProps)(ClimateChangeListContainer)

