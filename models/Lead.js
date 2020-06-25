const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeadSchema = new Schema({
    name: {
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
    }
},{ timestamps: true });

module.exports = mongoose.model("Lead", LeadSchema);