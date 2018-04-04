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
import ScrollArea from 'react-scrollbar'

/**
 * Decorate all pages
 * @author Léo Mieulet
 */
export class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  static modalLayerStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    // desactive event listener
    pointerEvents: 'none',
  }
  static modalWrapperStyle = {
    height: 'calc(100% - 85px)',
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 2,
    // reactive event listener
    pointerEvents: 'auto',
  }
  static scrollAreaContent = {
    borderWidth: '0 0 0 1px',
    borderColor: '#000',
    borderStyle: 'solid',
    minHeight: '100%',
  }
  static scrollAreaStyle = {
    height: '100%',
    width: '100%',
  }
  static scrollBarStyle = {
    background: '#000',
    borderRadius: '3px',
    width: '6px',
  }
  render() {
    return (
      <div
        style={Modal.modalLayerStyle}
      >
        <Paper
          zDepth={3}
          rounded={false}
          onClick={this.handleChange}
          style={Modal.modalWrapperStyle}
        >
          <ScrollArea
            speed={0.8}
            smoothScrolling
            horizontal={false}
            vertical
            style={Modal.scrollAreaStyle}
            contentStyle={Modal.scrollAreaContent}
            verticalScrollbarStyle={Modal.scrollBarStyle}
          >
            {this.props.children}
          </ScrollArea>
        </Paper>
      </div>
    )
  }
}

export default Modal
