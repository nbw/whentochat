// Util for parsing a google maps response
var gMaps = {
  location: function(response) {
    return response.location;
  },
  lng: function(response) {
    return response.location.lng;
  },
  lat: function(response) {
    return response.location.lat;
  },
  locationName: function(response) {
    if (response.gmaps) {
      return response.gmaps.name;
    } else {
      return "";
    }
  }
}

export default gMaps
