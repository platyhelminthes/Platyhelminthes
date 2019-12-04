const Data = require('../../Collections/users')
const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport') 
const uuidv4 = require('uuid/v4');

module.exports = (req,res) => {
    let resetNum = uuidv4()

    Data.findOneAndUpdate(
        {'email': req.body.email},
        {'resetNum': resetNum},
        (err) => {
            if (err) console.log(err)
        }
    )

    var options = {
        service: 'SendGrid',
        auth: {
          api_user: 'fallenangel1996',
          api_key: 'Jakeybear5!'
        }
      }

    var client = nodemailer.createTransport(sgTransport(options));

    let link = '<a href="roshihealth.com/resetPass/'+resetNum+'/'+req.body.email+'">Confirm your account</a>'
    
    const mailOptions = {
     from: 'roshihealth@gmail.com', // sender address
     to: req.body.email, // list of receivers
     subject: 'Your Password Reset Link', // Subject line
     html: '<h1 style="color: red">You have requested a password reset</h1> <p>Please click the following link to reset your password</p>' + link// plain text body
      };
    //var task = {
    //    id: 1,
    //    text: "Choose an intake nurse and make an appointment with them."
    //}
    client.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });


}