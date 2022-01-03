const stripe = require('stripe')(process.env.stripe_SecretKey);
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SendGridSecret);
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);

module.exports = {
  paymentui: async (req,res) => {
    res.render('stripe', { 
      key: process.env.stripe_PublishableKey 
      }) 
  },

  paymentMethod: async (req,res) => {
      stripe.customers.create({ 
      email: req.body.stripeEmail, 
      source: req.body.stripeToken, 
      name: 'Rohit Shaw', 
      address: { 
          line1: 'TC 9/4 Old MES colony', 
          postal_code: '110092', 
          city: 'Kolkata', 
          state: 'West Bengal', 
          country: 'India', 
      } 
      }) 
      .then((customer) => { 
          return stripe.charges.create({ 
              amount: 99999,    
              description: 'Payment Testing', 
              currency: 'INR', 
              customer: customer.id 
          }); 
      }) 
      .then((charge) => { 
          res.send("Success") 
      }) 
      .catch((err) => { 
          res.send(err)    
      }); 
  },

  mail: async (req,res) => {
    const msg = {
        to: 'mailtorohitshaw@gmail.com', 
        from: {
            name:"ROHIT SHAW",
            email:"rohitkanchanshaw95@gmail.com"
        },
        subject: 'Sending with SendGrid Library',
        text: 'Implementing with Node.js',
        html: '<strong>Hi! My name is Rohit, I am a Software Developer!</strong>',
    }
    sendgrid.send(msg)
    .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
    res.status(200).send('Mail Send')
    })
    .catch((error) => {
    console.error(error)
    })
  },

  inbox: async(req,res)=>{
    twilio.messages
    .create({
    body: 'This is a message!',
    from: '+13252403465',
    to: '+918777694371'
    })
    .then(message => {
      console.log(message.sid);
      res.status(200).send('Message sent successfully!')
    });
  }

}