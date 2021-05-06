
const {Router} = require('express');
const router = Router();

router.get('/success', (req, res)=>{
    const {payment_id, status, payment_type, external_reference} = req.query
    res.json({
        status,
        payment_id,
        payment_type,
        external_reference
    })
})

router.get('/failure', (req, res)=>{
    res.json(req.query.status)

})

router.get('/pending', (req, res)=>{
    res.json(req.query.status)
})

router.post('/notifications',  (req, res)=>{
    console.log(req.body)
    res.status(200).json('ok')
 })
module.exports = router;