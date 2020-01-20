let User = require('../models/userModel');

exports.getAll = (req, res) => {
  User.find().then(users => {
        if (users.length === 0) {
            res.json({
                status: 1,
                result: [],
                message: 'success',
                length: 0
            });
            return
        }else{
            res.json({
                status: 1,
                result: users,
                message: 'success',
                length: users.length
            });
            return
        }

    });


}