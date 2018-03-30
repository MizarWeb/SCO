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
import Paper from 'material-ui/Paper'

/**
 * Decorate all pages
 * @author Léo Mieulet
 */
export class ModalComponent extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  static modalLayerStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    // desactive event listener
    pointerEvents: 'none',
  }
  static modalWrapperStyle = {
    height: '100%',
    width: '100%',
    marginTop: '190px',
    zIndex: 2,
    // reactive event listener
    pointerEvents: 'auto',
  }

  render() {
    return (
      <div
        style={ModalComponent.modalLayerStyle}
      >
        <Paper
          zDepth={3}
          rounded={false}
          onClick={this.handleChange}
          style={ModalComponent.modalWrapperStyle}
        >
          {this.props.children}
        </Paper>
      </div>
    )
  }
}

export default ModalComponent
