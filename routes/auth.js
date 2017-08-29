var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User=require('../model/user.js');

passport.serializeUser(function(user, done) {
    console.log('---serializeUser---');
    done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
    console.log('---deserializeUser---');
    done(null, obj);
});

passport.use(new GitHubStrategy({
        clientID: '184108d1baefa7e6964b',
        clientSecret: 'bec17117b28c177aeb9c0847bf726776b0edb8e2',
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
         //   User.findOrCreate({ githubId: profile.id }, function (err, user) {
         //       return cb(err,user);
         // });
        done(null, profile);
    }
));
router.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/');
});
router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        User.create({uid:req.user.id,username:req.user.username});
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        };
        res.redirect('/');
});
module.exports=router;