const User = require('../models/user');
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


const signup = (req, res) => {
    console.log(req.body);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(200).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save in user DB"
            })
        }
        const { name, email, _id } = user
        res.json({ name, email, id: _id});
    })
};

const signin = (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(201).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(201).json({
                error: "User email does not exists"
            });
        }

        if(!user.authenticate(password)) {
            return res.status(201).json({
                error: "Email and password do not match"
            });
        }

        // create Token
        const token = jwt.sign({_id: user._id}, process.env.SECRET);
        // put this token into user cookies
        res.cookie("token", token, {
            expires: new Date(Date.now() + 900000)
        })

        //send response to front end
        const { _id, name, email, role } = user;

        return res.json({ token, user: {_id, name, email, role} })
    })
};

const signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User Signout successfully"
    });
};

//Protected Routes checking token using express-jwt
const isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
});

//Custom Middleware
const isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
}

const isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not admin, Access denied"
        })
    }
    next();
}


module.exports = { signout, signup, signin, isSignedIn, isAuthenticated, isAdmin }