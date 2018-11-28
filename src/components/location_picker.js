import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest';

class LocationPicker extends Component {
  onSuggestSelect = (suggest) => {
    if (suggest) {
      this.props.stateCallback(suggest);
    }
  }

  render() {
    return (
      <>
        <Geosuggest
          placeholder="location"
          onSuggestSelect={this.onSuggestSelect}
        />
      </>
    )
  }
}

export default LocationPicker

