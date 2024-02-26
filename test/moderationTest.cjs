const sinon = require('sinon');
const axios = require('axios');

// Change the content of the text object to test it
// Add the associated language to your texte
const postData = {
	text: "Contenu modere",
	language: "fr-FR"
};

describe('Moderation API', () => {
	it('Returns a probability that the content should be rejected', async () => {
		const axiosPostPredict = sinon.stub(axios, 'post');
		axiosPostPredict.withArgs(`https://moderation.logora.fr/predict?text=${postData.text}&language=${postData.language}`, postData);

		const app = await import('../server/app.js');
		const moderatedContent = app.moderatedContent;

		const result = await moderatedContent(postData, "predict");
		console.log(result);
		axiosPostPredict.restore();
	});

	it('Return a quality score based on text content and votes', async () => {
		const axiosPostScore = sinon.stub(axios, 'post');
		axiosPostScore.withArgs(`https://moderation.logora.fr/score?text=${postData.text}&language=${postData.language}`, postData);

		const app = await import('../server/app.js');
		const moderatedContent = app.moderatedContent;

		const result = await moderatedContent(postData, "score");
		result.score = Math.round(result.score * 10);
		console.log(result);
		axiosPostScore.restore();
	});
});
