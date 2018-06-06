/*
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
 *
 * This file is a work derived from Regards OSS
 *
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import IconButton from 'material-ui/IconButton'
import { LOCALES_ENUM, LOCALES_ENUM_VALUES } from '@sco/domain'
import frIcon from '../../../img/fr_flag.png'
import enIcon from '../../../img/gb_flag.png'

/**
 * React component to display the language selector widget
 * @author Sébastien Binda
 */
class SelectLocaleComponent extends React.Component {
  static propTypes = {
    currentLocale: PropTypes.oneOf(LOCALES_ENUM_VALUES),
    toggleLocale: PropTypes.func.isRequired,
  }
  static contextTypes = {
    intl: PropTypes.object,
  }

  /** Maps locale to icon */
  static localToIcon = {
    [LOCALES_ENUM.FR]: frIcon,
    [LOCALES_ENUM.EN]: enIcon,
  }
  static iconStyle = {
    width: '35px', height: '35px',
  }

  static buttonStyle = {
    width: '35px',
    height: '35px',
    padding: '0px',
  }

  render() {
    const { currentLocale, toggleLocale } = this.props
    const { intl: { formatMessage } } = this.context

    const localeIcon = SelectLocaleComponent.localToIcon[currentLocale]

    return (
      <div>
        <IconButton
          iconStyle={SelectLocaleComponent.iconStyle}
          style={SelectLocaleComponent.buttonStyle}
          onClick={toggleLocale}
          disableTouchRipple
        >
          <img
            src={localeIcon}
            alt={formatMessage({ id: 'page.menu.locale' })}
          />
        </IconButton>
      </div>
    )
  }
}
export default SelectLocaleComponent
