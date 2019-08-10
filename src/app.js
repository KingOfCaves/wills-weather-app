const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const public_dir = path.join(__dirname, '../public');
const views_dir = path.join(__dirname, '../templates/views');
const partials_dir = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', views_dir);
hbs.registerPartials(partials_dir);

// Setup static directory to serve
app.use(express.static(public_dir));


app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App'
	});
});
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me'
	});
});
app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		msg: 'This is an example message?'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.location) {
		return res.send({
			error: 'A location must be provided'
		});
	};

	geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		};

		forecast(latitude, longitude, (error, { summary, temperature, probability }) => {
			if (error) {
				return res.send({ error	});
			};

			res.send({
				location,
				summary,
				temperature,
				probability
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Help',
		error: 'Help article not found.'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: 404,
		error: 'Page not found.'
	});
});

app.listen(port, () => {
	console.log(`Server is running, PORT: ${ port }`);
});