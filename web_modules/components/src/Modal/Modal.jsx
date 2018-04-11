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
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import ModalTransition from './ModalTransition'
/**
 * Decorate all pages
 * @author Léo Mieulet
 */
export class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
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
    height: 'calc(100% - 85px)', // 85*2 (=header)
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 3,
    // reactive event listener
    pointerEvents: 'auto',
  }
  static headerWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
  static headerCloseButtonStyle = {
    marginRight: '20px',
  }
  static scrollWrapperStyle = {
    height: 'calc(100% - 68px)', // 68 (=CardTitle)
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
      <ModalTransition
        mounted={this.props.mounted}
      >
        <div
          style={Modal.modalLayerStyle}
        >
          <Paper
            zDepth={3}
            rounded={false}
            onClick={this.handleChange}
            style={Modal.modalWrapperStyle}
          >
            <div style={Modal.headerWrapperStyle}>
              {this.props.title}
              <div style={Modal.headerCloseButtonStyle}>
                <IconButton onClick={this.props.onClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <div
              style={Modal.scrollWrapperStyle}
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
            </div>
          </Paper>
        </div>
      </ModalTransition>
    )
  }
}

export default Modal
