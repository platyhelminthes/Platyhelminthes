const Data = require('../../Collections/users')

module.exports = (req, res) => {
    Data.findOneAndUpdate(
        {'email': req.user.email},
        {$set: {'subscription.dietitian.appointment': req.body.date}},
        (err) => {
            if (err) return err
        }
    )
}