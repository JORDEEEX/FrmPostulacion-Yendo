// const { db} = require('../firebase/firebase');
const { analyzeText } = require( "../ibmApi/ibmApi");
const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
var serviceAccount = require("../../db-postulation-firebase-adminsdk-8slfh-261de02099.json");

// initialize firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// const storageFirebase = admin.storage();
const db = admin.firestore();
const storage = admin.storage();
router.get('/', (req, res) => {
    res.render('confirmation');
})


router.post( '/new-employee', async (req, res) => {
    // console.log(JSON.stringify(req.body, null, 2))

    const newEmployee = JSON.parse(JSON.stringify(req.body));// personalData
    typeof(req.body.crimRecords);
    // API IBM EMOTION, SENTIMENT
    let text = `${req.body.personality}. ${req.body.habilities}. ${req.body.goals}.`;
    // console.log(textIbm)
    async function analyzeByIBM (text) {
        return await analyzeText(text);
    }
    results = await analyzeByIBM(text); // IBM results
    let data = Object.assign(newEmployee, results); // objectFormat
    // db.collection("employees").doc().set(data); // db 
    
    // console.log(results)
    res.send('received');
})

module.exports = router;

    // textIbm = 'It costs you to say goodbye, but it should cost you more to wear out your soul and your energy in the wrong place, it costs you because you love him, but you should love you more to accept that it is over, it costs you to face the changes, but living in your comfort zone will cost you more when you wake up in a few years and discover that you are not happy with what you have achieved, I know it is difficult to start from scratch, it hurts when it does not work what we most want, but they are tests, tests to accept that life is unpredictable and that nothing is ours except our will, be in control of your thoughts, do not keep accumulating scenes of the past, do not doubt yourself, for fear of what will happen next life is lost, you do not lose it and if you feel you lost it, go find it, you are always in time, except when you make the same mistake a thousand times and you know you are wrong but you prefer to keep doing it just for not letting it go'
