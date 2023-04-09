const passport = require("passport");
const Users = require("../app/models/User.model");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:6969/auth/google/callback",
			passReqToCallback: true,
		},
		async function (request, accessToken, refreshToken, profile, done) {
			try {
				if (profile.id) {
					const user = await Users.findOne({
						email: profile.email,
					});
					if (!user) {
						const newUser = await Users.create({
							email: profile.email,
							authGoogleID: profile.id,
							authType: "google",
						});
						await newUser.save();
						return done(null, newUser);
					}
					return done(null, profile);
				} else {
					done(null);
				}
			} catch (error) {
				return done(error, false);
			}
		}
	)
);
passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});
