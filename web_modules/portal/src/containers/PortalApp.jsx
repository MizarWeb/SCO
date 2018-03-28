/**
 * Copyright 2018 SCO - Space Climate Observatory
 *
 * This file is part of CSO.
 *
 * CSO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CSO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with CSO. If not, see <http://www.gnu.org/licenses/>.
 **/
import { MizarAdapter } from '@cso/adapter'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SearchComponent from '../components/SearchComponent'
import MenuComponent from '../components/MenuComponent'
import HelpComponent from '../components/HelpComponent'
import LoadingDataComponent from '../components/LoadingDataComponent'
import InterestingPointPopupComponent from '../components/InterestingPointPopupComponent'
import TemporalComponent from '../components/TemporalComponent'

/**
 * Provides the high level layout
 * @author Léo Mieulet
 */
export class PortalApp extends React.Component {
  static propTypes = {
  }

  componentDidMount() {
    document.querySelector('meta[name="title"]').setAttribute('content', 'Portal interface for CSO instance')
    document.querySelector('meta[name="description"]').setAttribute('content', 'Portal to access each project of the CSO instance.')
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <InterestingPointPopupComponent />
          <LoadingDataComponent />
          <HelpComponent />
          <MenuComponent />
          <SearchComponent />
          <TemporalComponent />
          <MizarAdapter />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default PortalApp
