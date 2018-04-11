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
import { Card, CardText } from 'material-ui/Card'


/**
 * Help component - clicking on it display the help view
 * @author Léo Mieulet
 */
export class LoadingDataComponent extends React.Component {
  static propTypes = {
  }

  static helpWrapperStyle = {
    position: 'absolute',
    width: '100%',
    bottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // desactive event listener
    pointerEvents: 'none',
  }
  static textStyle = {
    textAlign: 'center',
    padding: '10px',
    userSelect: 'none',
  }
  static cardStyle = {
    paddingBottom: '0',
    zIndex: 2,
    // reactive event listener
    pointerEvents: 'auto',
  }

  render() {
    return (
      <div
        style={LoadingDataComponent.helpWrapperStyle}
      >
        <Card
          containerStyle={LoadingDataComponent.cardStyle}
          className="col-sm-20"
        >
          <LinearProgress />
          <CardText style={LoadingDataComponent.textStyle}>
            Loading data
          </CardText>
        </Card>
      </div >
    )
  }
}

export default LoadingDataComponent
