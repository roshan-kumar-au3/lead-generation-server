const express = require('express');
const router = express.Router();
const {
    check
} = require('express-validator');
const {
    isSignedIn,
    isAuthenticated
} = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const { getFunnelById, getFunnel, updateFunnel } = require('../controllers/funnel');

router.param("userId", getUserById);

router.param("funnelId", getFunnelById);

router.get("/funnel/:funnelId/:userId", getFunnel);

router.put("/funnel/:funnelId/:userId",[
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
], isSignedIn, isAuthenticated, updateFunnel);

module.exports = router;