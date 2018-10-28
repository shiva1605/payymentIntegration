const path = require('path')
var paypal = require('paypal-rest-sdk')
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('./db/mongoose')
var {Transaction} =require('./models/transaction')
const app = express();
app.disable('view cache')

paypal.configure({
    'mode' : 'sandbox', //sandbox or live
    'client_id' : 'Your client id',
    'client_secret' : 'Your client secret'
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,OPTIONS"
    );
    next();
})



app.post('/pay/:amount',(req,res) => {
    console.log(req.headers)
    let amount= req.body.amount;
    console.log(amount)
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success/"+amount,
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": amount,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": amount
            },
            "description": "This is the payment description."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            for(let i=0;i<payment.links.length;i++){
                if(payment.links[i].rel==='approval_url'){
                    res.send({message:payment.links[i].href})
                }
            }
        }
    });
})

app.get('/success/:amount',(req,res) =>{
    console.log(3)
    let amount=req.params.amount;
    const payerId= req.query.PayerID;
    const paymentId= req.query.paymentId;
    console.log(22)
    const execute_payment_json ={
        "payer_id" : payerId,
        "transactions" :[
            {
                "amount" :{
                    "currency":"USD",
                    "total" : amount
                }
            }
        ]
    }
    paypal.payment.execute(paymentId,execute_payment_json, (error,payment)=>{
        if(error){
            return res.send(error.response);
        }
        console.log('-----------------')
        console.log(payment)
        const transaction=new Transaction(payment)
        transaction.save().then((data)=>{
            res.redirect('http://localhost:3000/confirmation/success');
        })
        
    })
})

app.use("",express.static(path.join(__dirname,'angular')));
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,"angular","index.html"));
})

module.exports=app