const Lead = require('../models/lead');
const Funnel = require('../models/funnel');
const Archive = require('../models/archive');

const {
    validationResult
} = require('express-validator');
const lead = require('../models/lead');

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
    console.log(req.body);
    req.body.updatedby = req.profile.name;

    const errors = validationResult(req)

    Lead.findByIdAndUpdate(
        { _id: req.lead._id },
        { $set: req.body },
        { new: true, useFindAndModify: false},
        (err, lead) => {
            if (err) {
                return res.status(200).json({
                    error: "Unable to update this Lead"
                })
            }
            res.json(lead);
        }
    )
};

const archiveLead = (req, res) => {
    console.log(req.body);
    let lead = req.lead;
    const archive = new Archive(req.body);
    archive.save((err, archive) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to archive"
            })
        }
        // res.json(archive);
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
    })
    
}

const moveLeadToFunnel = (req, res) => {
    console.log(req.body);

    const funnel = new Funnel(req.body);
    Funnel.findById(req.body._id)
                .exec((err, lead) => {
                    if(err) {
                        res.json({
                            error: "Some Error in Adding"
                        })
                    }
                    if(lead) {
                        res.json({
                            message: "Already in funnel"
                        })
                    }
                    if(!err && !lead) {
                        funnel.save((err, funnel) => {
                            if (err) {
                                return res.json({
                                    error: "Already in funnel"
                                })
                            }
                            res.json({
                                message: "Added to Funnel",
                                funnel
                            });
                        })
                    }
                })
}

//get all leads
const getAllFunnelLead = (req, res) => {
    Funnel.find((err, leads) => {
        if (err || !leads) {
            return res.status(400).json({
                error: "No lead Found"
            });
        }
        res.json(leads);
    })
}

module.exports = { createLead, getAllLeads, getLeadById, getLead, deleteLead, updateLead, moveLeadToFunnel, archiveLead, getAllFunnelLead }