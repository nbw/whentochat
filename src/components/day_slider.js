import React, { Component } from 'react'

import timeHelper from '../utils/time_helper'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Moment from 'react-moment';
import 'moment-timezone';

const TIME_MIN = 0
const TIME_MAX = 24
const DEFAULT_START_TIME = 7;
const DEFAULT_END_TIME = 22;

class DaySlider extends Component {
  onSliderChange = (values) => {
    this.props.startCallback(values[0]);
    this.props.endCallback(values[1]);
  }

  handleStyle = () => {
    const style = {
      borderWidth: 0,
      height: 25,
      width: 15,
      marginLeft: -14,
      marginTop: -11,
      borderRadius: 0,
      backgroundColor: 'white',
    }
    return [style, style];
  }

  railStyle = () => {
    return {
      backgroundColor: "#FFF",
      opacity: 0.4
    }
  }

  trackStyle = () => {
    const style = {
      backgroundColor: "#FFF"
    };
    return [style];
  }

  render() {
    const format = this.props.timeFormat;
    return (
      <div className="time-slider">
        <div className="slider">
          <Range
            handleStyle={this.handleStyle()}
            trackStyle={this.trackStyle()}
            railStyle={this.railStyle()}
            min={TIME_MIN}
            max={TIME_MAX}
            defaultValue = {[DEFAULT_START_TIME, DEFAULT_END_TIME]}
            allowCross={false}
            onChange={this.onSliderChange}
          />
        </div>
        <div className="time">
          <Moment format={format} add={{ hours: this.props.start}} tz="UTC">
            {timeHelper.newUTCTime()}
          </Moment>
          &nbsp;-&nbsp;
          <Moment format={format} add={{ hours: this.props.end}} tz="UTC">
            {timeHelper.newUTCTime()}
          </Moment>
        </div>
      </div>
    )
  }
}

export default DaySlider


