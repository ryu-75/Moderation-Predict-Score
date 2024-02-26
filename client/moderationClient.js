const postData = {
	text: "Bad",
	language: "en-US"
};

fetch(`http://localhost:3000/api/moderation/predict`, {
	method: 'POST',
	header: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(postData)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error: ', error));

fetch(`http://localhost:3000/api/moderation/score`, {
	method: 'POST',
	header: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(postData)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error: ', error));
