import React, { Component } from "react"

import Layout from '../components/layout'
import TimeTable from '../components/time_table'
import LocationPicker from '../components/location_picker'
import DaySlider from '../components/day_slider'
import Share from '../components/share'
import gMaps from '../utils/gmaps'
import URLCoder from '../utils/url'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

const DEFAULT_START_TIME = 7;
const DEFAULT_END_TIME = 22;
const TIME24HR = "HH:mm";
const TIME12HR = "h:mm a";

// Pull default state from the URL if available.

class IndexPage extends Component {
  state = {
    timeFormat: TIME12HR,
    locA:       {},
    locAStart:  DEFAULT_START_TIME,
    locAEnd:    DEFAULT_END_TIME,
    locB:       {},
    locBStart:  DEFAULT_START_TIME,
    locBEnd:    DEFAULT_END_TIME,
  }

  componentDidMount() {
    const urlCoder = URLCoder.fromURL(window.location);
    if (urlCoder && urlCoder !== {}) {
      this.setState({
        locA:       urlCoder.locA || {},
        locAStart:  urlCoder.locAStart || DEFAULT_START_TIME,
        locAEnd:    urlCoder.locAEnd   || DEFAULT_END_TIME,
        locB:       urlCoder.locB || {},
        locBStart:  urlCoder.locBStart || DEFAULT_START_TIME,
        locBEnd:    urlCoder.locBEnd   || DEFAULT_END_TIME,
      })
    }
  }

  update = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  updateLocationA = (suggest) => {
    this.setState({
      locA: {
        name: gMaps.locationName(suggest),
        utc_offset: gMaps.utc_offset(suggest)
      }
    });
  }

  updateLocationB = (suggest) => {
    this.setState({
      locB: {
        name: gMaps.locationName(suggest),
        utc_offset: gMaps.utc_offset(suggest)
      }
    });
  }

  bothLocationsSelected = () => {
    if ((this.state.locA) && (this.state.locB)) {
      return true;
    } else {
      return false;
    }
  }

  locationAName = () => {
    return this.state.locA.name || '';
  }

  locationBName = () => {
    return this.state.locB.name || '';
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

  generateShareLink = () => {
    let u = URLCoder.fromState(this.state);
    return u.url;
  }

  offset = () => {
    if (this.bothLocationsSelected()) {
      let timeZoneLocA = this.state.locA.utc_offset;
      let timeZoneLocB = this.state.locB.utc_offset;

      return (timeZoneLocB - timeZoneLocA)/60;
    } else {
      return 0;
    }
  }


  render() {
    return (
      <Layout>
        <div>
          <div className="locationPicker">
            <LocationPicker
              stateCallback={this.updateLocationA}
              placeHolder="your location"
              initialValue={this.locationAName()}
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
              placeHolder="their location"
              initialValue={this.locationBName()}
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
          <div
            style={{
              margin: '0 auto',
              padding: '0px 1.0875rem 1.45rem',
              paddingTop: 0,
            }}
          >
          </div>
        </div>
        { Math.abs(this.offset()) > 0 &&
            <>
            <hr/>
            <p className="quote">{this.locationAName()} and {this.locationBName()} are {Math.abs(this.offset())} hours apart.</p>
            <hr/>
            <TimeTable
              locA={this.locationAName()}
              locAStart={this.state.locAStart}
              locAEnd={this.state.locAEnd}
              locB={this.locationBName()}
              locBStart={this.state.locBStart}
              locBEnd={this.state.locBEnd}
              offset={this.offset()}
              timeFormat={this.state.timeFormat}
            />
            <Share
              generateLink={() => this.generateShareLink()}
            />
            </>
        }
      </Layout>
    )
  }
}

export default IndexPage
