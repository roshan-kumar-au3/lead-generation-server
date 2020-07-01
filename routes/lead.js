const express = require('express');
const router = express.Router();
const {
    check
} = require('express-validator');
const {
    isSignedIn,
    isAuthenticated
} = require('../controllers/auth');
const { createLead, getAllLeads, getLead, updateLead, getLeadById, deleteLead } = require('../controllers/lead');
const { getUserById } = require('../controllers/user')

router.param("userId", getUserById);

router.param("leadId", getLeadById);

router.post("/create/lead/:userId", [
    check("name", "name should be at least 3 char").isLength({
        min: 3
    }),
    check("businessDev", "Business Dev name is required").isLength({
        min: 3
    }),
    check("company", "company name is required").isLength({
        min: 3
    }),
    check("description", "description name is required").isLength({
        min: 3
    }),
    check("email", "email is required").isEmail(),
    check("country", "country name is required").isLength({
        min: 3
    }),
    check("city", "city name is required").isLength({
        min: 3
    }),
    check("roleInOrganisation", "role is required").isLength({
        min: 3
    }),
], isSignedIn, isAuthenticated, createLead);

router.get("/lead/:leadId/:userId", isSignedIn, isAuthenticated, getLead);

router.put("/lead/:leadId/:userId", isSignedIn, isAuthenticated, updateLead);

router.delete("/lead/:leadId/:userId", isSignedIn, isAuthenticated, deleteLead);

router.get("/leads", getAllLeads);

module.exports = router;