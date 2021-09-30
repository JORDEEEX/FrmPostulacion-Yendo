const { Router}= require('express');
const router = Router();

//npm run dev

router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;