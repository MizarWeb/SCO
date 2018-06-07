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

import { DatePicker, IconButton, TextField } from 'material-ui'
import isNaN from 'lodash/isNaN'
import isEmpty from 'lodash/isEmpty'
import isDate from 'lodash/isDate'
import ActionDateRange from 'material-ui/svg-icons/action/date-range'
import format from 'date-fns/format'
import parse from 'date-fns/parse'

/**
 * Overrides DatePicker from material UI to allow manual text fill and use of time picker
 * @author Sébastien Binda
 */
export default class DatePickerField extends React.Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
    dateHintText: PropTypes.string,
    defaultValue: PropTypes.instanceOf(Date), // Default date to use if value is null or undefined
    autoOk: PropTypes.bool,
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    locale: PropTypes.string,
  }

  static defaultProps = {
    locale: 'en',
  }

  static DATE_FORMAT_US = 'MM/DD/YYYY'
  static DATE_FORMAT = 'DD/MM/YYYY'

  static dateTextFieldStyle = {
    width: '90px',
  }

  static timeTextFieldStyle = {
    width: '70px',
  }

  static iconStyle = {
    opacity: '0.65',
  }

  static layoutStyle = {
    display: 'flex',
    width: '140px',
  }
  static wrapperStyle = {
    display: 'flex',
    width: '150px',
  }
  static datePickerWrapperStyle = {
    width: '0px',
    height: '0px',
    marginLeft: '-185px',
  }

  static getUsDate = (dateString) => {
    const parts = dateString.split('/')
    if (parts.length === 3) {
      return `${parts[1]}/${parts[0]}/${parts[2]}`
    }
    return null
  }

  static formatDateWithLocale = (date, locale) => {
    if (locale === 'en') {
      return date ? format(date, DatePickerField.DATE_FORMAT_US) : ''
    }
    return date ? format(date, DatePickerField.DATE_FORMAT) : ''
  }

  static parseDateWithLocale = (dateString, locale) => {
    // The dateString is UTC
    let usDateString
    if (locale !== 'en') {
      usDateString = DatePickerField.getUsDate(dateString)
    } else {
      usDateString = dateString
    }
    // The parser use the current timezone
    const returningDate = parse(usDateString, DatePickerField.DATE_FORMAT_US)
    // Reset to UTC
    returningDate.setUTCFullYear(returningDate.getFullYear())
    returningDate.setUTCMonth(returningDate.getMonth())
    returningDate.setUTCDate(returningDate.getDate())
    returningDate.setUTCHours(returningDate.getHours())
    returningDate.setUTCMinutes(returningDate.getMinutes())
    returningDate.setUTCSeconds(returningDate.getSeconds())
    return returningDate
  }

  constructor(props) {
    super(props)

    const date = isDate(props.defaultValue) ? props.defaultValue : props.value
    const defaultDate = date ||
      parse(`${format(new Date(), DatePickerField.DATE_FORMAT_US)}`,
        `${DatePickerField.DATE_FORMAT_US}`)

    this.state = {
      dateText: date ? DatePickerField.formatDateWithLocale(date, props.locale) : '',
      defaultDate,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.handleChangeDate(nextProps.value)
    }
  }

  handleChangeDate = (newDate) => {
    if (newDate) {
      const newDateText = DatePickerField.formatDateWithLocale(newDate, this.props.locale)
      if (this.state.dateText !== newDateText) {
        this.setState({ dateText: newDateText })
      }
    } else {
      this.setState({ dateText: '' })
    }
  }

  handleChangeDatePicker = (event, date) => {
    if (!date) {
      this.setState({ dateText: '' })
    } else {
      const { dateText, defaultDate } = this.state
      const { value } = this.props
      if (!value) {
        date.setHours(defaultDate.getHours())
        date.setMinutes(defaultDate.getMinutes())
        date.setSeconds(defaultDate.getSeconds())
      } else {
        date.setHours(value.getHours())
        date.setMinutes(value.getMinutes())
        date.setSeconds(value.getSeconds())
      }
      const newDateText = DatePickerField.formatDateWithLocale(date, this.props.locale)
      if (dateText !== newDateText) {
        this.setState({ dateText: newDateText },
          () => this.props.onChange(date))
      }
    }
  }


  handleDateInputChange = (event, value) => {
    this.setState({ dateText: value })
  }

  isADate = (maybeDate) => {
    if (Object.prototype.toString.call(maybeDate) === '[object Date]') {
      if (isNaN(maybeDate.getTime())) {
        return false
      }
      return true
    }
    return false
  }

  /**
   * Save the Date set manually by the user (e.g. YYYY:MM:DD) when the user unblur the TextField
   */
  handleDateInputBlur = (dateText) => {
    const {
      value, locale, onChange,
    } = this.props
    if (!isEmpty(dateText)) {
      const parsedDate = DatePickerField.parseDateWithLocale(dateText, locale)
      if (this.isADate(parsedDate)) {
        // the date is valid, let's save it
        onChange(parsedDate)
      } else {
        // the date is invalid, let's rollback
        this.setState({ dateText: DatePickerField.formatDateWithLocale(value, locale) })
      }
    } else {
      // the user wants to remove the date
      onChange()
    }
  }


  renderDate() {
    const { dateHintText } = this.props

    return (
      <div style={DatePickerField.layoutStyle}>
        <TextField
          style={DatePickerField.dateTextFieldStyle}
          value={this.state.dateText}
          hintText={dateHintText}
          onChange={this.handleDateInputChange}
          onBlur={event => this.handleDateInputBlur(event.currentTarget.value)}
        />

        <IconButton
          style={DatePickerField.iconStyle}
          onClick={() => this.datePicker.focus()}
        >
          <ActionDateRange />
        </IconButton>

        <div
          style={DatePickerField.datePickerWrapperStyle}
        >
          <DatePicker
            id="dataPicker"
            floatingLabelText=""
            value={this.props.value}
            errorText=""
            disabled={false}
            formatDate={date => format(date, DatePickerField.DATE_FORMAT_US)}
            autoOk={this.props.autoOk}
            okLabel={this.props.okLabel}
            cancelLabel={this.props.cancelLabel}
            container="inline"
            fullWidth
            onChange={this.handleChangeDatePicker}
            ref={(c) => {
              this.datePicker = c
            }}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div style={DatePickerField.wrapperStyle}>
        {this.renderDate()}
      </div>
    )
  }
}
