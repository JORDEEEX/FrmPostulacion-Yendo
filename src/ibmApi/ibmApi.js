const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2021-08-01',
    authenticator: new IamAuthenticator({
        apikey: 'ne7r9mL1j84t5r1zAyb9B9WfVa3cYfaW1gbm2lL7LLMb',
    }),
    serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/3ba76534-8835-4a3f-9a9b-b853bc2de84a',
});
const languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    authenticator: new IamAuthenticator({
        apikey: 'rDeXp7uHMEuAvwPzjHzif2yeBRCoufW410qlq8JGBowm',
    }),
    serviceUrl: 'https://api.us-south.language-translator.watson.cloud.ibm.com/instances/36948691-016c-40f4-a9cf-7e07d4ab1535',
});

async function analyzeText(text) {
    const translateParams = {
        text: text,
        modelId: 'es-en',
    };
    const result = await languageTranslator.translate(translateParams)
        .then(async translationResult => {
            let traduction = translationResult.result.translations[0]['translation'];
            const analyzeParams = {
                'text': traduction,
                'features': {
                    'emotion': {},
                    'sentiment': {}
                }
            };
            const result = await naturalLanguageUnderstanding.analyze(analyzeParams)
                .then(async analysisResults => {
                    let emotions = analysisResults['result']['emotion']['document']['emotion'];
                    let sentiments = analysisResults['result']['sentiment']['document'];
                    let result = Object.assign(emotions, sentiments);
                    // db.collection("employees").doc().set(data);
                    // console.log(JSON.stringify(result, null, 2));
                    return result;
                })
                .catch(err => {
                    console.log('error:', err)
                })
                // console.log(result);
                return result;
        })
        .catch(err => {
            console.log('error:', err);
        });
        
        // console.log(result);
    return result;
}

module.exports = {
    analyzeText: analyzeText
}