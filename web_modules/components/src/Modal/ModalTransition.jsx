import Animate from 'react-move/Animate'
import { easeExpOut } from 'd3-ease'


/**
 * @author Pranesh Ravi https://stackoverflow.com/a/40172212/2294168
 * @author Léo Mieulet
 */
export default class App extends React.Component {
  static propTypes = {
    mounted: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
  }
  static DEFAULT_STYLE = {
    zIndex: 2,
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

  state = { //base css
    show: true,
    style: {
      ...App.DEFAULT_STYLE,
      transform: 'translate(100vw, 0)',
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
          ...App.DEFAULT_STYLE,
          transform: 'translate(100vw, 0)',
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
        ...App.DEFAULT_STYLE,
        transform: 'translate(-100vw, 0)',
      },
    })
  }

  mountStyle = () => { // css for mount animation
    this.setState({
      style: {
        ...App.DEFAULT_STYLE,
        transform: 'translate(0vw, 0)',
      },
    })
  }

  /**
   * The DOM will call this method by itself
   */
  transitionEnd = () => {
    if (!this.props.mounted) { //remove the node on transition end when the mounted prop is false
      this.setState({
        show: false,
        style: {
          ...App.DEFAULT_STYLE,
          transform: 'translate(100vw, 0)',
        },
      })
    }
  }

  render() {
    return (
      <div style={App.wrapperStyle}>
        {this.state.show ? (
          <div style={this.state.style} onTransitionEnd={this.transitionEnd}>
            {this.props.children}
          </div>
        ) : null}
      </div>
    )
  }
}
