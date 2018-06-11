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
import { CardTitle, Modal, DateField } from '@sco/components'
import { TEMPORAL_STEP_ENUM, Shapes, LOCALES_ENUM_VALUES } from '@sco/domain'
import { CardActions, CardText } from 'material-ui/Card'
import isDate from 'lodash/isDate'
import isEqual from 'lodash/isEqual'
import includes from 'lodash/includes'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import './TemporalFormComponent.css'

/**
 * Temporal form
 * @author Léo Mieulet
 */
export class TemporalFormComponent extends React.Component {
  static propTypes = {
    closeForm: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    layerTemporalInfos: Shapes.LayerTemporalInfos,
    currentLocale: PropTypes.oneOf(LOCALES_ENUM_VALUES),
  }
  static contextTypes = {
    intl: PropTypes.object,
  }
  static lineWrapperStyle = {
    marginBottom: '8px',
  }
  static actionWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }
  static buttonStyle = {
    margin: '0 10px',
  }

  state = {
    start: null,
    stop: null,
    step: TEMPORAL_STEP_ENUM.DAY,
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.layerTemporalInfos, nextProps.layerTemporalInfos) ||
      (nextProps.mounted && !this.props.mounted)
    ) {
      this.setState({
        start: nextProps.layerTemporalInfos.beginDate,
        stop: nextProps.layerTemporalInfos.endDate,
        step: nextProps.layerTemporalInfos.step,
      })
    }
  }

  /**
   * Save the new start date
   */
  onChangeStartDate = (value) => {
    value.setUTCHours(0)
    this.setState({
      start: value,
    })
  }

  /**
   * Save the new stop date
   */
  onChangeStopDate = (value) => {
    value.setUTCHours(0)
    this.setState({
      stop: value,
    })
  }

  /**
   * Save the new step time
   */
  onChangeStepTime = (value) => {
    this.setState({
      step: value,
    })
  }


  /**
   * Return a usable date or null (which is correct for the subcomponent DatePicker & TimePicker)
   * @param value
   * @returns {*}
   */
  getDateForComponent = (value) => {
    if (isDate(value)) {
      return value
    }
    if (Date.parse(value) > 0) {
      return new Date(value)
    }
    return null
  }

  /**
   * Return props for step time buttons
   */
  decorateStepTimeButtons = (value) => {
    if (includes(this.props.layerTemporalInfos.unavailableSteps, value)) {
      return { disabled: true }
    }
    return value === this.state.step ? { primary: true } : {}
  }

  submitForm = () => {
    this.props.onSubmit(this.state)
  }


  render() {
    return (
      <Modal
        title={
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'page.temporal-form.title' })}
          />
        }
        onClose={this.props.closeForm}
        mounted={this.props.mounted}
        hasSubtitle={false}
      >
        <div>
          <CardText>
            <div className="row form-line" style={TemporalFormComponent.lineWrapperStyle}>
              <div className="col-sm-20 col-sm-offset-28 col-md-15 col-md-offset-33 form-input">
                <Subheader>{this.context.intl.formatMessage({ id: 'page.temporal-form.startDate' })}</Subheader>
              </div>
              <div className="col-sm-49 col-sm-offset-3">
                <DateField
                  value={this.getDateForComponent(this.state.start)}
                  dateHintText="Date"
                  onChange={this.onChangeStartDate}
                  locale={this.props.currentLocale}
                />
              </div>
            </div>
            <div className="row form-line" style={TemporalFormComponent.lineWrapperStyle}>
              <div className="col-sm-20 col-sm-offset-28 col-md-15 col-md-offset-33 form-input">
                <Subheader>{this.context.intl.formatMessage({ id: 'page.temporal-form.stopDate' })}</Subheader>
              </div>
              <div className="col-sm-49 col-sm-offset-3">
                <DateField
                  value={this.getDateForComponent(this.state.stop)}
                  dateHintText="Date"
                  onChange={this.onChangeStopDate}
                  locale={this.props.currentLocale}
                />
              </div>
            </div>
            <div className="row form-line" style={TemporalFormComponent.lineWrapperStyle}>
              <div className="col-sm-20 col-sm-offset-28 col-md-15 col-md-offset-33 form-input step-time-label">
                <Subheader>{this.context.intl.formatMessage({ id: 'page.temporal-form.stepTime.label' })}</Subheader>
              </div>
              <div className="col-sm-49 col-sm-offset-3 col-xs-100">
                <RaisedButton
                  label={this.context.intl.formatMessage({ id: 'page.temporal-form.stepTime.6hour' })}
                  onClick={() => { this.onChangeStepTime(TEMPORAL_STEP_ENUM.SIX_HOURS) }}
                  {...this.decorateStepTimeButtons(TEMPORAL_STEP_ENUM.SIX_HOURS)}
                />
                <RaisedButton
                  label={this.context.intl.formatMessage({ id: 'page.temporal-form.stepTime.1day' })}
                  onClick={() => { this.onChangeStepTime(TEMPORAL_STEP_ENUM.DAY) }}
                  {...this.decorateStepTimeButtons(TEMPORAL_STEP_ENUM.DAY)}
                />
                <RaisedButton
                  label={this.context.intl.formatMessage({ id: 'page.temporal-form.stepTime.1month' })}
                  onClick={() => { this.onChangeStepTime(TEMPORAL_STEP_ENUM.MONTH) }}
                  {...this.decorateStepTimeButtons(TEMPORAL_STEP_ENUM.MONTH)}
                />
                <RaisedButton
                  label={this.context.intl.formatMessage({ id: 'page.temporal-form.stepTime.1year' })}
                  onClick={() => { this.onChangeStepTime(TEMPORAL_STEP_ENUM.YEAR) }}
                  {...this.decorateStepTimeButtons(TEMPORAL_STEP_ENUM.YEAR)}
                />
              </div>
            </div>
          </CardText>
          <CardActions style={TemporalFormComponent.actionWrapperStyle}>
            <RaisedButton
              label={this.context.intl.formatMessage({ id: 'page.actions.save' })}
              onClick={this.submitForm}
              primary
              style={TemporalFormComponent.buttonStyle}
            />
            <RaisedButton
              label={this.context.intl.formatMessage({ id: 'page.actions.close' })}
              onClick={this.props.closeForm}
              style={TemporalFormComponent.buttonStyle}
            />
          </CardActions>
        </div>
      </Modal>
    )
  }
}

export default TemporalFormComponent
