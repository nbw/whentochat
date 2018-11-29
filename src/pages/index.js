import React, { Component } from "react"

import Layout from '../components/layout'
import TimeTable from '../components/time_table'
import LocationPicker from '../components/location_picker'
import DaySlider from '../components/day_slider'
import gMaps from '../utils/gmaps'
import timeZones from '../utils/time_zones'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

const DEFAULT_START_TIME = 7;
const DEFAULT_END_TIME = 22;
const TIME24HR = "HH:mm";
const TIME12HR = "h:mm a";

class IndexPage extends Component {
  state = {
    timeFormat: TIME12HR,
    locationA: {},
    locAStart: DEFAULT_START_TIME,
    locAEnd:   DEFAULT_END_TIME,
    locationB: {},
    locBStart: DEFAULT_START_TIME,
    locBEnd:   DEFAULT_END_TIME,
    showResults: false,
    offset: 0,
    loading: false
  }

  update = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  updateLocationA = (suggest) => {
    this.setState({locationA: suggest});
    if (this.bothLocationsSelected())
      this.calculateResults();
  }

  updateLocationB = (suggest) => {
    this.setState({locationB: suggest});
    if (this.bothLocationsSelected())
      this.calculateResults();
  }

  bothLocationsSelected = () => {
    if (gMaps.location(this.state.locationA) && gMaps.location(this.state.locationB)) {
      return true;
    } else {
      return false;
    }
  }

  calculateResults = () => {
    this.setState({
      loading: true,
      showResults: false
    });

    let timeZoneLocA = timeZones.fromLocation(this.state.locationA);
    let timeZoneLocB = timeZones.fromLocation(this.state.locationB);

    const offset = timeZoneLocB - timeZoneLocA;

    this.setState({
      loading: false,
      showResults: true,
      offset: offset
    });
  }

  locationAName = () => {
    return gMaps.locationName(this.state.locationA);
  }

  locationBName = () => {
    return gMaps.locationName(this.state.locationB);
  }

  loadingSign = () => {
    return <div className="loading"></div>;
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

  render() {
    return (
      <Layout>
        <div>
          <div className="locationPicker">
            <LocationPicker
              stateCallback={this.updateLocationA}
            />
            <DaySlider
              start={this.state.locAStart}
              startCallback={(this.update.bind(this,"locAStart"))}
              end = {this.state.locAEnd}
              endCallback={(this.update.bind(this,"locAEnd"))}
              timeFormat={this.state.timeFormat}
            />
          </div>
          <div className="locationPicker">
            <LocationPicker
              stateCallback={this.updateLocationB}
            />
            <DaySlider
              start={this.state.locBStart}
              startCallback={(this.update.bind(this,"locBStart"))}
              end = {this.state.locBEnd}
              endCallback={(this.update.bind(this,"locBEnd"))}
              timeFormat={this.state.timeFormat}
            />
          </div>
          <div id="toggleTimeFormat">
            <button onClick={this.toggleTimeFormat}>
              <FontAwesomeIcon icon={faClock} />&nbsp;
              {this.timeFormatButtonLabel()}
            </button>
          </div>
        </div>
        { this.state.loading && this.loadingSign() }
        { this.state.showResults &&
            <>
            <hr/>
            <p className="quote">{this.locationAName()} and {this.locationBName()} are {Math.abs(this.state.offset)} hours apart.</p>
            <hr/>
            <TimeTable
              locA={this.locationAName()}
              locAStart={this.state.locAStart}
              locAEnd={this.state.locAEnd}
              locB={this.locationBName()}
              locBStart={this.state.locBStart}
              locBEnd={this.state.locBEnd}
              offset={this.state.offset}
              timeFormat={this.state.timeFormat}
            />
            </>
        }
      </Layout>
    )
  }
}

export default IndexPage
