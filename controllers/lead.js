const Lead = require('../models/lead');
const {
    validationResult
} = require('express-validator');

//Middleware to get Lead by id 
const getLeadById = (req, res, next, id) => {
    Lead.findById(id)
        .exec((err, lead) => {
            if (err) {
                return res.status(400).json({
                    error: "product not found in database"
                })
            }
            req.lead = lead;
            next();
        })
};

// create lead
const createLead = (req, res) => {
    console.log(req.body);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(200).json({
            error: errors.array()[0].msg
        })
    }

    const lead = new Lead(req.body);
    lead.save((err, lead) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save in user DB"
            })
        }
        res.json(lead);
    })
};
// get lead
const getLead = (req, res) => {
    return res.json(req.lead);
};

//delete lead
const deleteLead = (req, res) => {
    let lead = req.lead;
    lead.remove((err, leadDeleted) => {
        if (err) {
            return res.status(200).json({
                error: "Not able to delete product"
            })
        }

        return res.json({
            message: "Deletion was successfull",
            leadDeleted
        });
    })
};

//get all leads
const getAllLeads = (req, res) => {
    Lead.find((err, leads) => {
        if (err || !leads) {
            return res.status(400).json({
                error: "No lead Found"
            });
        }
        res.json(leads);
    })
}

const updateLead = (req, res) => {

    Lead.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false},
        (err, lead) => {
            if (err) {
                return res.status(200).json({
                    error: "You are not authorized to update this Lead"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(lead);
        }
    )
}


module.exports = { createLead, getAllLeads, getLeadById, getLead, deleteLead, updateLead }