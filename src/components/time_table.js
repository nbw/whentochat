import React, { Component } from "react"
import Moment from 'react-moment';
import 'moment-timezone';

import timeHelper from '../utils/time_helper'

class TimeTable extends Component {

  state = {
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

  render() {
    const times = renderTimes(this.state.locATimes, this.state.locBTimes, this.props.timeFormat);
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
