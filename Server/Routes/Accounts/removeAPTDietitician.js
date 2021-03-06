const Data = require('../../Collections/users')

module.exports = (req,res) => {
    Data.findOneAndUpdate(
        {'email': req.user.email},
        {$inc: {'subscription.dietitian.appointmentTokens': -1}},
        {safe: true, upsert: true},
        function(err) {
            console.log(err);
        }
    )
}