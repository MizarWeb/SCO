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
import LinearProgress from 'material-ui/LinearProgress'


/**
 * Help component - clicking on it display the help view
 * @author Léo Mieulet
 */
export class LoadingDataComponent extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  }

  static loadingWrapperStyle = {
    position: 'absolute',
    width: '100%',
    bottom: '0px',
    // desactive event listener
    pointerEvents: 'none',
  }

  render() {
    const props = {}
    if (this.props.isLoading) {
      props.mode = 'indeterminate'
      props.key = 'indeterminate'
    } else {
      props.mode = 'determinate'
      props.key = 'determinate'
      props.value = 0
    }
    return (
      <div
        style={LoadingDataComponent.loadingWrapperStyle}
      >
        <LinearProgress {...props} />
      </div >
    )
  }
}

export default LoadingDataComponent
