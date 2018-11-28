import React, { Component } from "react"
import Moment from 'react-moment';
import 'moment-timezone';

import timeHelper from '../utils/time_helper'

const TIME24HR = "HH:mm";
const TIME12HR = "h:mm a";

class TimeTable extends Component {

  state = {
    timeFormat: TIME12HR,
    locATimes: [],
    locBTimes: []
  }

  componentDidMount() {
    this.calculate();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(
      (prevProps.locAStart !== this.props.locAStart) || (prevProps.locAEnd   !== this.props.locAEnd) ||
      (prevProps.locBStart !== this.props.locBStart) || (prevProps.locBEnd   !== this.props.locBEnd)
    ) {
      this.calculate();
    }
  }

  calculate = () => {
    this.setState({
      locATimes: this.generateDefaultTimes(0, this.props.locAStart, this.props.locAEnd),
      locBTimes: this.generateDefaultTimes(this.props.offset, this.props.locBStart, this.props.locBEnd )
    });
  }

  toggleTimeFormat = () => {
    switch(this.state.timeFormat){
      case TIME24HR:
        this.setState({timeFormat: TIME12HR});
        break;
      case TIME12HR:
        this.setState({timeFormat: TIME24HR});
        break;
      default:
        this.setState({timeFormat: TIME12HR});
    }
  }

  timeFormatButtonLabel = () => {
    switch(this.state.timeFormat){
      case TIME24HR:
        return "12-hour Time";
      case TIME12HR:
        return "24-hour Time";
      default:
        return "12-hour Time";
    }
  }

  generateDefaultTimes = (baseOffset, startThreshold, endThreshold) => {
    let baseTime = timeHelper.newUTCTime();

    let times = [];
    let i, offset, active;

    for (i = 0; i < 24; i++) {

      offset = (i + Math.abs(baseOffset))%24;
      debugger
      active = (offset >= startThreshold) && (offset <= endThreshold) ? true : false;

      times.push(
        {
          baseTime: baseTime,
          offset: offset,
          active: active
        }
      );
    }

    return times;
  }

  toggleTimeActiveState = (msg, extra) => {
    console.log(msg);
    console.log(extra);
  }

  render() {
    const times = renderTimes(this.state.locATimes, this.state.locBTimes, this.state.timeFormat);
    return (
      <div id="timeTable">
        <table>
          <thead>
            <tr>
              <th>{this.props.locA}</th>
              <th>{this.props.locB}</th>
            </tr>
          </thead>
          <tbody>
            {times}
          </tbody>
        </table>
        <div id="toggleTimeFormat">
          <button onClick={this.toggleTimeFormat}>{this.timeFormatButtonLabel()}</button>
        </div>
      </div>
    )
  }
}

const renderTimes = (timesA, timesB, format) => {
  let times = [];
  let i;
  for (i = 0; i < timesA.length; i++) {
    times.push(renderTime(timesA[i], timesB[i], format));
  }
  return times;
};

const renderTime = (timeA, timeB, format) => (
  <tr key={timeA.offset}>
    <td className={timeA.active ? "active" : ""} >
      <Moment format={format} add={{ hours: timeA.offset}} tz="UTC">
        {timeA.baseTime}
      </Moment>
    </td>
    <td className={timeB.active ? "active" : ""}>
      <Moment format={format} add={{ hours: timeB.offset}} tz="UTC">
        {timeA.baseTime}
      </Moment>
    </td>
  </tr>
);

export default TimeTable;
