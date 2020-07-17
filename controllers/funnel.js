const Funnel = require('../models/funnel');

const {
    validationResult
} = require('express-validator');

//Middleware to get Lead by id 
const getFunnelById = (req, res, next, id) => {
    Funnel.findById(id)
        .exec((err, funnel) => {
            if (err) {
                return res.status(400).json({
                    error: "product not found in database"
                })
            }
            req.funnel = funnel;
            next();
        })
};

// get lead
const getFunnel = (req, res) => {
    return res.json(req.funnel);
};

const updateFunnel = (req, res) => {
    console.log(req.body);
    req.body.updatedby = req.profile.name;

    Funnel.findByIdAndUpdate(
        { _id: req.funnel._id },
        { $set: req.body },
        { new: true, useFindAndModify: false},
        (err, funnel) => {
            if (err) {
                return res.status(200).json({
                    error: "Unable to update this Lead"
                })
            }
            res.json(funnel);
        }
    )
};

module.exports = {getFunnelById, getFunnel, updateFunnel}