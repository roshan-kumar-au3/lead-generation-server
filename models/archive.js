const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArchiveSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
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
    remarks: {
        type: String,
        trim: true
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
    updatedby: {
        type: String,
        trim: true
    },
    businessDev: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    contacted: {
        type: Boolean,
        default: 'no'
    },
    followups: {
        type: Boolean,
        default: 'no'
    },
    followupTime: {
        type: Date
    }
},{ timestamps: true });

module.exports = mongoose.model("Archive", ArchiveSchema);