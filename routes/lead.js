const express = require('express');
const router = express.Router();
const {
    check
} = require('express-validator');
const {
    isSignedIn,
    isAuthenticated
} = require('../controllers/auth');
const { createLead, getAllLeads, getLead, updateLead
    , getLeadById, deleteLead, archiveLead, moveLeadToFunnel, getAllFunnelLead } = require('../controllers/lead');
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
        min: 1
    }),
    check("phone", "phone number is required and must have max and min length of ten").isLength({
        min: 10,
        max: 10
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

router.put("/lead/:leadId/:userId",[
    check("name", "name should be at least 3 char").isLength({
        min: 3
    }),
    check("businessDev", "Business Dev name is required").isLength({
        min: 3
    }),
    check("company", "company name is required").isLength({
        min: 1
    }),
    check("phone", "phone number is required and must have max and min length of ten").isLength({
        min: 10,
        max: 10
    }),
    check("description", "description name is required").isLength({
        min: 3
    }),
    check("email", "Enter valid email address").isEmail(),
    check("country", "country name is required").isLength({
        min: 3
    }),
    check("city", "city name is required").isLength({
        min: 3
    }),
    check("roleInOrganisation", "role is required").isLength({
        min: 3
    }),
], isSignedIn, isAuthenticated, updateLead);

router.delete("/lead/:leadId/:userId", isSignedIn, isAuthenticated, deleteLead);
router.get("/leads", getAllLeads);

router.get("/funnels", getAllFunnelLead);

router.post("/create/archive/:leadId/:userId", archiveLead);
router.post("/create/funnel/:leadId/:userId", moveLeadToFunnel);


module.exports = router;