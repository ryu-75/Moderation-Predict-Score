import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.use(express.json());

const moderatedContent = async (data, route) => {
	try {
		const { text, language } = data;
		const response = await axios.get(`https://moderation.logora.fr/${route}?text=${text}&language=${language}`);
		return response.data;
	} catch (e) {
		console.error('Error fetching data: ', e);
		throw e;
	}
}

app.post('/api/moderation/predict', async (req, res) => {
	try {
		const { text, language } = req.body;
		const prediction = await moderatedContent({ text, language }, "predict");
		res.json(prediction);
	} catch (e) {
		console.error('Error fetching data: ', e);
		res.status(500).json({ e: 'Internal server error' });
	}
});

app.post('/api/moderation/score', async (req, res) => {
	try {
		const { text, language } = req.body;
		const { score } = await moderatedContent({ text, language }, "score");
		if (score && score === null) res.status(500).json({ error: 'Null score received' });
		else {
			const roundedScore = Math.round(score * 10);
			res.json({ score: roundedScore });
		}
	} catch (e) {
		console.error('Error fetching data: ', e);
		res.status(500).json({ e: 'Internal server error' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export { moderatedContent };
