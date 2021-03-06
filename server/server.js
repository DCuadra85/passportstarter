const express = require("express");
const cors = require("cors");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const AmazonStrategy = require("passport-amazon").Strategy;
const GoogleStrategy = require("passport-google").Strategy;
const InstagramStategy = require("passport-instagram").Strategy;
const TwitchStrategy = require("passport-twitch").Strategy;
const SpotifyStrategy = require("passport-spotify").Strategy;
const keys = require("../config");
const chalk = require("chalk");

let user = {};


passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((user,cb) => {
    cb(null,user);
});


// Facebook Strategy
passport.use(new FacebookStrategy ({
    clinetID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
    callbackURL: "/auth/facebook/callback"
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
    }
));

// Google Strategy
passport.use(new GoogleStrategy ({
    clinetID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: "/auth/google/callback"
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
    }
));

// Amazon Strategy
passport.use(new AmazonStrategy ({
    clinetID: keys.AMAZON.clientID,
    clientSecret: keys.AMAZON.clientSecret,
    callbackURL: "/auth/amazon/callback"
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
    }
));

// GitHub Strategy
passport.use(new GithubStrategy ({
    clinetID: keys.GITHUB.clientID,
    clientSecret: keys.GITHUB.clientSecret,
    callbackURL: "/auth/github/callback"
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
    }
));

// Instagram Strategy
passport.use(new InstagramStategy ({
    clinetID: keys.INSTAGRAM.clientID,
    clientSecret: keys.INSTAGRAM.clientSecret,
    callbackURL: "/auth/instagram/callback"
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
    }
));

    // Spotify Strategy
    passport.use(new SpotifyStrategy ({
        clinetID: keys.SPOTIFY.clientID,
        clientSecret: keys.SPOTIFY.clientSecret,
        callbackURL: "/auth/spotify/callback"
    },
        (accessToken, refreshToken, profile, cb) => {
            console.log(chalk.blue(JSON.stringify(profile)));
            user = { ...profile };
            return cb(null, profile);
        }
    ));

// Twitch Strategy
passport.use(new TwitchStrategy ({
    clinetID: keys.TWITCH.clientID,
    clientSecret: keys.TWITCH.clientSecret,
    callbackURL: "/auth/twitch/callback"
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
    }
));




const app = express();
app.use(cors());
app.use(passport.initialize());

app.get("/auth/google", passport.authenticate("google", 
{scope: ["profile", "email"]
}));
app.get("/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
        res.redirect("/profile");
    })


app.get("/auth/facebook", passport.authenticate("facebook", {scope: ["profile", "email"]}));
app.get("/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
        res.redirect("/profile");
    });
    


app.get("/auth/amazon", passport.authenticate("amazon", {scope: ["profile"]}));
app.get("/auth/amazon/callback",
    passport.authenticate("amazon"),
    (req, res) => {
        res.redirect("/profile");
    });


app.get("/auth/github", passport.authenticate("github"));
app.get("/auth/github/callback",
    passport.authenticate("github"),
    (req, res) => {
        res.redirect("/profile");
    });

app.get("/auth/instagram", passport.authenticate("instagram"));
app.get("/auth/instagram/callback",
    passport.authenticate("instagram"),
    (req, res) => {
        res.redirect("/profile");
    });


app.get("/auth/spotify", passport.authenticate("spotify"));
app.get("/auth/spotify/callback",
    passport.authenticate("spotify"),
    (req, res) => {
        res.redirect("/profile");
    });


app.get("/auth/twitch", passport.authenticate("twitch.js"));
app.get("/auth/twitch/callback",
    passport.authenticate("twitch.js"),
    (req, res) => {
        res.redirect("/profile");
    });

app.get("/user", (req, res) => {
    console.log("Getting user data!");
    res.send(user);
});

app.get("/auth/logout", (req, res) => {
    console.log("log out");
    user = {};
    res.redirect("/")
})



const PORT = process.env.PORT || 5000;
app.listen(PORT);