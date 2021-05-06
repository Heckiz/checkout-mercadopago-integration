const mercadopago = require('mercadopago');
const checkoutPro = {};

mercadopago.configure({
    access_token: process.env.SELLER_ACCESS_TOKEN,
    integrator_id: process.env.INTEGRATOR_ID,
});

checkoutPro.initPoint = async (req, res) => {

    var fullUrl = req.protocol + '://' + req.get('Host');
    const imageUrl =(fullUrl + (req.query.img).substring(1))
    let preference = {
        items: [
            {
                id: 1234,
                title: req.query.title,
                picture_url: imageUrl,
                description: 'Dispositivo móvil de Tienda e-commerce',
                quantity: parseInt(req.query.unit),
                unit_price: parseInt(req.query.price)
            }
        ],
        payer: {
            name: 'Lalo',
            surname: 'Landa',
            email: 'test_user_63274575@testuser.com',
            phone: {
                area_code: '11',
                number: 22223333
            },
            address: {
                street_name: 'Falsa',
                street_number: 123,
                zip_code: '1111'
            }
        },
        back_urls: {
            success: fullUrl +'/payment/success',
            failure: fullUrl +'/payment/failure',
            pending: fullUrl +'/payment/pending'
        },
        auto_return: 'approved',
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: 'amex'
                }
            ],
            excluded_payment_types: [
                {
                    id: 'atm'
                }
            ],
            installments: 6
        },
        external_reference: 'fabo.romero97@gmail.com',
        notification_url: fullUrl +'/payment/notifications?source_news=webhooks'

    }

    
    const response = await mercadopago.preferences.create(preference);
    res.redirect(response.body.init_point);
}


module.exports = checkoutPro;