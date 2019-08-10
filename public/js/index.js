const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
	
weatherForm.addEventListener('submit', () => {
	event.preventDefault();
	const location = search.value;

	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	fetch(`/weather?location=${location}`)
	.then(response => {
		return response.json();
	})
	.then(data => {
		if (data.error) {
			messageOne.textContent = `Error: ${ data.error }`
		} else {
			messageOne.textContent = `${ data.location }`
			messageTwo.textContent = `
				${ data.summary } The tempurature is ${data.temperature}°F with a ${data.probability * 100}% of precipitation. The wind speeds are ${data.windSpeed} MPH.
			`
		}
	})
});