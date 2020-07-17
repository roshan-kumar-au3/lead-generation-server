const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FunnelSchema = new Schema({
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
    phone: {
        type: String,
        trim: true,
        required: true
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
    updatedby: {
        type: String,
        trim: true
    },
    funnelStage: {
        type: String,
        enum: ["awareness", "interest", "consideration", "evaluation"],
        trim: true,
        default: 'awareness'
    },
    followups: {
        type: Boolean,
        default: 'no'
    },
    followupTime: {
        type: Date
    }
},{ timestamps: true });

module.exports = mongoose.model("Funnel", FunnelSchema);