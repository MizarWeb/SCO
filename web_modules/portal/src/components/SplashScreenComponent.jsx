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
import LogoCnes from '../img/logo_cnes.jpg'
import LogoSCO from '../img/SCO_logo.png'

/**
 * Displayed while Mizar is loading
 * @author Léo Mieulet
 */
export class SplashScreenComponent extends React.Component {
  static propTypes = {
    isMizarLibraryLoaded: PropTypes.bool.isRequired,
  }

  /**
   * Add an inline style to prevent scrollbar
   */
  componentWillMount() {
    const app = document.getElementById('app')
    app.setAttribute('style', 'overflow: hidden; height: 100%;')
  }

  /**
   * Remove the inline style that prevents scrollbar
   */
  componentWillUnmount() {
    const app = document.getElementById('app')
    app.setAttribute('style', '')
  }

  getClassForThirdSpinner = () => {
    if (this.props.isMizarLibraryLoaded) {
      return 'bounce3 loaded'
    }
    return 'bounce3'
  }

  /**
   * The DOM returned by this function imitates what is defined in index.ejs while loading
   * Mizar, when there is a WebGL issue, expect a node with 'loading' id
   */
  render() {
    return (
      <div id="loading">
        <div id="loader">
          <img src={LogoSCO} alt="Space Climate Observatory" className="sco-logo" />
          <div className="spinner">
            <div className="bounce1 loaded" />
            <div className="bounce2 loaded" />
            <div className={this.getClassForThirdSpinner()} />
            <div className="bounce4" />
          </div>
          <img src={LogoCnes} alt="Centre national d'études spaciales" className="cnes-logo" />
        </div>
      </div >
    )
  }
}

export default SplashScreenComponent
