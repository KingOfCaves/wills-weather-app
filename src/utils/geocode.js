const request = require('request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent(address) }.json?access_token=pk.eyJ1Ijoia2luZ29mY2F2ZXMiLCJhIjoiY2pvdmxoOGJnMGFkZzNxbzN3dTdleWFoayJ9.kdVFk9hmsRIp4H-8vska_g&limit=1`;
	request({
		url: url,
		json: true
	}, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services.', undefined);
		} else if (body.features.length === 0) {
			callback('No locations were found.', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[0],
				longitude: body.features[0].center[1],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;