const { analyzeText } = require( "../ibmApi/ibmApi");
const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
var serviceAccount = require("../../db-postulation-firebase-adminsdk-8slfh-261de02099.json");

// initialize firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const storage = admin.storage();
router.get('/', (req, res) => {
    res.render('index');
})

router.post( '/new-employee', async (req, res) => {

    const newEmployee = JSON.parse(JSON.stringify(req.body));// personalData
    typeof(req.body.crimRecords);
    // API IBM EMOTION, SENTIMENT
    let text = `${req.body.personality}. ${req.body.habilities}. ${req.body.goals}.`;
    async function analyzeByIBM (text) {
        return await analyzeText(text);
    }
    results = await analyzeByIBM(text); // IBM results
    let data = Object.assign(newEmployee, results); // objectFormat
    db.collection("employees").doc().set(data); // db 
    res.redirect('/succesful');
})
router.get('/succesful', (req, res) => {
    res.render('confirmation');
})
module.exports = router;