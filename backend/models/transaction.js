var mongoose = require('mongoose')

var Transaction = mongoose.model('Transaction',{
    id : String,
    intent : String,
    state:String,
    cart:String,
    payer:{
        payment_method:String,
        status:String,
        payer_info:{
            email:String,
            first_name:String,
            last_name:String,
            payer_id:String,
            shipping_address:{
                recipient_name:String,
                line1:String,
                city:String,
                state:String,
                postal_code:String,
                country_code:String,
            },
            country_code:String,

        }
    },
    transactions:[{
        amount:{total:String,currency:String,details:{}},
        payee:{
            merchant_id:String,
            email: String
        },
        description:String,
        item_list:{
            items:
            [{
                name:String,
                sku:String,
                price:String,
                currency:String,
                quantity:Number
            }],
        }
    }]
})

module.exports= {Transaction}