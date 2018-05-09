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
 * @author Pranesh Ravi https://stackoverflow.com/a/40172212/2294168
 * @author Léo Mieulet
 */
export default class ModalTransition extends React.Component {
  static propTypes = {
    mounted: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
  }
  static DEFAULT_STYLE = {
    zIndex: 4,
    position: 'absolute',
    width: '100%',
    height: '100%',
    transition: 'all 0.5s ease',
    pointerEvents: 'none',
  }
  static wrapperStyle = {
    height: '100%',
    width: '100%',
  }
  // Used to ignore transition events from childs
  static animationClassName = 'modal-transition'

  state = { //base css
    show: true,
    style: {
      ...ModalTransition.DEFAULT_STYLE,
      transform: 'translate(-100vw, 0)',
    },
  }

  componentDidMount() {
    if (this.props.mounted) {
      setTimeout(this.mountStyle, 10) //call the into animiation
    }
  }


  /**
   * check for the mounted props
   */
  componentWillReceiveProps(newProps) {
    if (!newProps.mounted && this.props.mounted) {
      //call outro animation when mounted prop is false
      this.unMountStyle()
    } else if (newProps.mounted && !this.props.mounted && this.state.show) {
      // This is a special case where the component is still visible but needs to be mounted
      this.setState({
        style: {
          ...ModalTransition.DEFAULT_STYLE,
          transform: 'translate(-100vw, 0)',
          // no transition
          transition: 'all 0s ease',
        },
      })
      setTimeout(this.mountStyle, 10) //call the into animation
    } else if (newProps.mounted && !this.props.mounted && !this.state.show) {
      // remount the node when the mounted prop is true
      this.setState({
        show: true,
      })
      setTimeout(this.mountStyle, 10) //call the into animation
    }
  }
  unMountStyle = () => { //css for unmount animation
    this.setState({
      style: {
        ...ModalTransition.DEFAULT_STYLE,
        transform: 'translate(100vw, 0)',
      },
    })
  }

  mountStyle = () => { // css for mount animation
    this.setState({
      style: {
        ...ModalTransition.DEFAULT_STYLE,
        transform: 'translate(0vw, 0)',
      },
    })
  }

  /**
   * The DOM will call this method by itself
   */
  transitionEnd = (e) => {
    //remove the node on transition end when the mounted prop is false
    // ignore events if they don't come from the div animated in this class
    if (!this.props.mounted && e.target.className === ModalTransition.animationClassName) {
      this.setState({
        show: false,
        style: {
          ...ModalTransition.DEFAULT_STYLE,
          transform: 'translate(-100vw, 0)',
        },
      })
    }
  }

  render() {
    return (
      <div style={ModalTransition.wrapperStyle}>
        {this.state.show ? (
          <div style={this.state.style} onTransitionEnd={this.transitionEnd} className={ModalTransition.animationClassName}>
            {this.props.children}
          </div>
        ) : null}
      </div>
    )
  }
}
