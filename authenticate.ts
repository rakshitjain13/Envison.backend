var passport = require("passport");
var User = require("./models/users");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
// var GooglePlusTokenStrategy = require("passport-google-oauth20").Strategy;
// var FacebookTokenStrategy = require("passport-facebook-token");

var config = require("./config");

exports.getToken = function (user: any) {
	return jwt.sign(user, config.secretKey, {});
};

var opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secretKey,
};

exports.jwtPassport = passport.use(
	new JwtStrategy(
		opts,
		(jwt_payload: { _id: any }, done: (arg0: null, arg1: boolean) => any) => {
			console.log("JWT payload: ", jwt_payload);
			User.findOne({ _id: jwt_payload._id }, (err: any, user: any) => {
				if (err) {
					return done(err, false);
				} else if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			});
		}
	)
);

exports.verifyUser = passport.authenticate("jwt", { session: false });

// exports.googlePassport = passport.use(
//   new GooglePlusTokenStrategy(
//     {
//       clientID: config.google.clientId,
//       clientSecret: config.google.clientSecret,
//       callbackURL: "http://localhost:5000/google/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       User.findOne({ username: profile.id }, (err, user) => {
//         if (err) {
//           return done(err, false);
//         }
//         if (!err && user !== null) {
//           return done(null, user);
//         } else {
//           user = new User({  username :profile.id });
//           user.displayname = profile.displayName;
//           user.email = profile.emails[0].value;
//           user.save((err, user) => {
//             if (err) return done(err, false);
//             else return done(null, user);
//           });
//         }
//       });
//     }
//   )
// );
