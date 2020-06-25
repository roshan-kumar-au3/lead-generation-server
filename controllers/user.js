const User = require('../models/user');

const getUserById = (req, res, next, id) => {
    User.findById(id, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user;
        next();
    });
}

const getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

const getAllUsers = (req, res) => {
    User.find((err, users) => {
        if (err || !users) {
            return res.status(400).json({
                error: "No User Found"
            });
        }

        res.json(users);
    })
}

const updateUser = (req, res) => {

    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false},
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to update this user"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
    )
}



module.exports = { getUserById, getUser, getAllUsers, updateUser};
