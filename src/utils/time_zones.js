import gMaps from './gmaps'

var timeZones = {
	fromLocation: async function(response) {
    const lat = gMaps.lat(response);
    const lng = gMaps.lng(response);
    return await this.fromLatLong(lat,lng);
	},
	fromLatLong: async function(lat,lng) {
    let promise = new Promise((resolve, reject) => {
      fetch(`http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=nwillson`)
        .then(function(response) {
				  resolve(response.json());
        });
    });
    return promise;
	}
}

export default timeZones
