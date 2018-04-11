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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { I18nProvider } from '@sco/components'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MapToolsContainer from './map/MapToolsContainer'
import PageContainer from './page/PageContainer'
import SplashScreenContainer from './SplashScreenContainer'
import MizarContainer from './map/MizarContainer'
import messages from '../i18n/index'

// created using https://cimdalli.github.io/mui-theme-generator/
const muiTheme = getMuiTheme({
  palette: {
    primary2Color: '#312783',
    primary1Color: '#00AAFF',
    accent1Color: '#009D45',
  },
})

/**
 * Provides the high level layout
 * @author Léo Mieulet
 */
export class PortalApp extends React.Component {
  static propTypes = {
  }


  componentDidMount() {
    document.querySelector('meta[name="title"]').setAttribute('content', 'Portal interface for SCO instance')
    document.querySelector('meta[name="description"]').setAttribute('content', 'Portal to access each project of the SCO instance.')
  }
  render() {
    return (
      <I18nProvider messages={messages}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <PageContainer />
            <MapToolsContainer />
            <SplashScreenContainer />
            <MizarContainer />
          </div>
        </MuiThemeProvider>
      </I18nProvider>
    )
  }
}

export default PortalApp
