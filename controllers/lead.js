const Lead = require('../models/lead');
const {
    validationResult
} = require('express-validator');



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


module.exports = { createLead, getAllLeads }