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
    let i, offset, dayOffset, active;

    for (i = 0; i < 24; i++) {
      offset = (i + baseOffset)%24;
      active = (offset >= startThreshold) && (offset <= endThreshold) ? true : false;
      dayOffset = this.calcDayOffset(i, baseOffset);

      times.push(
        {
          baseTime: baseTime,
          offset: offset,
          dayOffset: dayOffset,
          active: active
        }
      );
    }

    return times;
  }

  calcDayOffset = (hour, offset) => {
    const res = hour + offset;
    if(res >= 24) {
      return 1;
    } else if(res < 0) {
      return -1;
    } else {
      return 0;
    }
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

const formatDays = (dayOffset) => {
  if (dayOffset === 1) {
    return <span className="day">(+1 day)</span>;
  } else if (dayOffset === -1) {
    return <span className="day">(-1 day)</span>;
  } else if (dayOffset === -1) {
  } else {
    return "";
  }
}

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
      </Moment>{formatDays(timeB.dayOffset)}
    </td>
  </tr>
);

export default TimeTable;
