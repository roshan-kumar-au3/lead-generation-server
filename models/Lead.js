const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeadSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    company: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    roleInOrganisation: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    city: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    country: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    businessDev: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
},{ timestamps: true });

module.exports = mongoose.model("Lead", LeadSchema);