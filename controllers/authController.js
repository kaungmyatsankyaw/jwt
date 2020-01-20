let User = require('../models/userModel');
let bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let config=require('../config');

exports.register = (req, res) => {
    let {
        name,
        username,
        email,
        password
    } = req.body;

    let hash_password = bcrypt.hashSync(password, 10);

    let newUser = new User({
        name: name,
        username: username,
        email: email,
        password: hash_password
    });

    newUser.save(function (err, mongooseResponse) {
        if (err) {
            console.log(err);
            return err;
        }
        data = {
            status: false,
            error_code: 1,
            message: 'Unable to insert'
        };
        if (mongooseResponse) {
            data = {
                status: true,
                error_code: 0,
                result: mongooseResponse,
                message: 'Inserted successfully'
            };
        }
        res.json(data);
    });



}

exports.login = (req, res) => {
    let {
        username,
        password
    } = req.body;
    console.log(req.body)

    User.findOne({
        username: username
    },{'_id':0}, (err, user) => {
        if (!user) return res.json({
            message: "The username does not exist",
            status: 0
        });
        user.comparePassword(password, (error, match) => {
            if (!match) {
                return res.status(400).send({
                    message: "The password is invalid",
                    status: 0
                });
            }
        })

        const _user = {
            "email": user.email,
            "name": user.name
        }

        const token = jwt.sign(_user, config.secret, {
            expiresIn: config.tokenLife
        })

        const refreshToken = jwt.sign(_user, config.refreshTokenSecret, {
            expiresIn: config.refreshTokenLife
        })

        const response = {
            "status":1,
            "message": "Logged in",
            "token": token,
            "refreshToken": refreshToken,
        }
        

        res.json(response)
    })

}