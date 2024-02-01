const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req,res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            massage: "Successfully loged in",
            user: req.user,
        });
    } else {
        res.status(403).json({error: true, massage: "user not authhorized"});
    }
});

router.get("/login/failed", (req,res) => {
    res.status(401).json({
        error: true,
        massage: "Login failed",
    });
});

router.get("/google/callbek", passport.authenticate("google", {
        successRedirect: process.env.googleClientURL,
        failureRedirect: "/login/failed",
    })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.googleClientURL);
});

module.exports = router;