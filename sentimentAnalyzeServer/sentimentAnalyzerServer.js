const express = require('express');
const dotenv = require('dotenv');

const app = new express();

dotenv.config();

function getNLUInstance() {
	let api_key = process.env.API_KEY;
	let api_url = process.env.API_URL;

	const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
	const {IamAuthenticator} = require('ibm-watson/auth');

	const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
		// latest version used
		version: '2020-08-01',
		authenticator: new IamAuthenticator({
			apikey: api_key,
		}),
		serviceUrl: api_url,
	});

	return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/", (req, res) => {
	res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
	analyzeParams = {
		'url': req.query.url.trim(),
		'features': {
			'sentiment': {}
		}
	};

	getNLUInstance().analyze(analyzeParams)
		.then(response => {
			return res.send(response.result);
		});
});

app.get("/url/sentiment", (req, res) => {
	analyzeParams = {
		'url': req.query.url.trim(),
		'features': {
			'sentiment': {}
		}
	};

	getNLUInstance().analyze(analyzeParams)
		.then(response => {
			return res.send(response.result);
		});
});

app.get("/text/emotion", (req, res) => {
	analyzeParams = {
		'text': req.query.text,
		'features': {
			'emotion': {}
		}
	};

	getNLUInstance().analyze(analyzeParams)
		.then(response => {
			return res.send(response.result);
		});
});

app.get("/text/sentiment", (req, res) => {
	analyzeParams = {
		'text': req.query.text,
		'features': {
			'sentiment': {}
		}
	};

	getNLUInstance().analyze(analyzeParams)
		.then(response => {
			return res.send(response.result);
		});
});

let server = app.listen(8080 || process.env.PORT, () => {
	console.log('Listening', server.address().port)
})

