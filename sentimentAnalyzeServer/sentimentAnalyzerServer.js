const express = require('express');
const dotenv = require("dotenv");
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    return naturalLanguageUnderstanding;
}

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const url = req.query.url;
    const NLUInstance = getNLUInstance();

    const analyzeParams = {
        'url': url,
        'features': {
            'emotion': {
            }
        }
    }

    NLUInstance.analyze(analyzeParams)
    .then(analyzeResults => {
        // console.log(analyzeResults)
        return res.send(analyzeResults.result.emotion.document.emotion)
    })
    .catch(err => {
        console.log('error:', err);
        return res.send({error: err})
    });
});

app.get("/url/sentiment", (req,res) => {
    const url = req.query.url;
    const NLUInstance = getNLUInstance();

    const analyzeParams = {
        'url': url,
        'features': {
            'sentiment': {
            }
        }
    }

    NLUInstance.analyze(analyzeParams)
    .then(analyzeResults => {
        // console.log(analyzeResults.result)
        return res.send(analyzeResults.result.sentiment.document.label)
    })
    .catch(err => {
        console.log('error:', err);
        return res.send({error: err})
    });
});

app.get("/text/emotion", (req,res) => {
    const text = req.query.text;
    const NLUInstance = getNLUInstance();

    const analyzeParams = {
        'html': text,
        'features': {
            'emotion': {
            }
        }
    }

    NLUInstance.analyze(analyzeParams)
    .then(analyzeResults => {
        // console.log(analyzeResults)
        return res.send(analyzeResults.result.emotion.document.emotion)
    })
    .catch(err => {
        console.log('error:', err);
        return res.send({error: err})
    });
});

app.get("/text/sentiment", (req,res) => {
    const text = req.query.text;
    const NLUInstance = getNLUInstance();

    const analyzeParams = {
        'html': text,
        'features': {
            'sentiment': {
            }
        }
    }

    NLUInstance.analyze(analyzeParams)
    .then(analyzeResults => {
        // console.log(analyzeResults.result)
        return res.send(analyzeResults.result.sentiment.document.label)
    })
    .catch(err => {
        console.log('error:', err);
        return res.send({error: err})
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

