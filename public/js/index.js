console.log('Loaded');

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
				${ data.summary } ${data.temperature}°F, ${data.probability * 100}%
			`
		}
	})
});