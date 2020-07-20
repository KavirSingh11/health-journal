const passport = require("passport");
const express = require('express');
const router = express.Router();

router.get(
    '/signin',
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);
router.get(
    '/signin/callback',
    passport.authenticate("google"),
    (req,res) => {
        res.redirect('/surveys');
    }  
);