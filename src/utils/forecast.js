const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/a082c568e556e4b4d9cd26d687974795/${longitude},${latitude}?lang=ja`;
	request({
		url: url,
		json: true
	}, (error, { body }) => {
		if (error) {
			callback(error, undefined);
		} else if (body.error) {
			callback(body.error, undefined);
		} else {
			callback(undefined, {
				summary: body.daily.data[0].summary,
				temperature: body.currently.temperature,
				probability: body.currently.precipProbability * 100
			});
		};
	});
}

module.exports = forecast;