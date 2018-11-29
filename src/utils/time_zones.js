import gMaps from './gmaps'

var timeZones = {
  fromLocation: function(response) {
    return gMaps.utc_offset(response)/60;
  },
  fromLatLong: async function(lat,lng) {
    let promise = new Promise((resolve, reject) => {
      fetch(`https://secure.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=nwillson`)
        .then(function(response) {
          resolve(response.json());
        });
    });
    return promise;
  }
}

export default timeZones
