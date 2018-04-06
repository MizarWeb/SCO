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
import SplashScreenComponent from '../components/SplashScreenComponent'
import { mapSelectors } from '../clients/MapClient'

/**
 * @author Léo Mieulet
 */
export class SplashScreenContainer extends React.Component {
  static propTypes = {
    isDisplayingSplashScreen: PropTypes.bool.isRequired,
  }
  static mapStateToProps = (state, ownProps) => ({
    isDisplayingSplashScreen: mapSelectors.isDisplayingSplashScreen(state),
  })
  static mapDispatchToProps = dispatch => ({
  })

  render() {
    // Only display component if Mizar is loading
    if (this.props.isDisplayingSplashScreen) {
      return (<SplashScreenComponent />)
    }
    return null
  }
}

export default connect(SplashScreenContainer.mapStateToProps, SplashScreenContainer.mapDispatchToProps)(SplashScreenContainer)
