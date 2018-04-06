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

/**
 * Displayed while Mizar is loading
 * @author Léo Mieulet
 */
export class SplashScreenComponent extends React.Component {
  static propTypes = {
  }

  /**
   * Add an inline style to prevent scrollbar
   */
  componentWillMount() {
    const app = document.getElementById('app')
    app.setAttribute('style', 'overflow: hidden; height: 100vh;')
  }

  /**
   * Remove the inline style that prevents scrollbar
   */
  componentWillUnmount() {
    const app = document.getElementById('app')
    app.setAttribute('style', '')
  }

  /**
   * The DOM returned by this function imitates what is defined in index.ejs while loading
   */
  render() {
    return (
      <div id="loader">
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1" />
          <div className="sk-cube sk-cube2" />
          <div className="sk-cube sk-cube3" />
          <div className="sk-cube sk-cube4" />
          <div className="sk-cube sk-cube5" />
          <div className="sk-cube sk-cube6" />
          <div className="sk-cube sk-cube7" />
          <div className="sk-cube sk-cube8" />
          <div className="sk-cube sk-cube9" />
        </div>
      </div>
    )
  }
}

export default SplashScreenComponent
