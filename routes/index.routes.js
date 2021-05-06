const {Router} = require('express');
const router = Router();
const {initPoint} = require('../helpers/mercadopago.config');

router.get('/', (req, res)=>{
    res.render('home');
})
router.get('/detail', (req, res)=>{
    res.render('detail', req.query);
})
router.post('/detail', initPoint)

module.exports = router;

