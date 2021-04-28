import { NextFunction, Request, Response } from "express";
import * as jsonwebtoken from "jsonwebtoken";
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var passport = require("passport");
var mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
var config = require("./config");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var googleRouter = require("./routes/google");
var usertestRouter = require("./routes/userhandletest");
var ExtractJwt = require("passport-jwt").ExtractJwt;
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
//intervalfunctions
var updatecc = require("./intervalfunctions/codechefinterval");
var updatecf = require("./intervalfunctions/codeforcesinterval");
var updateleet = require("./intervalfunctions/leetcodeinterval");
var updateallcontests = require("./intervalfunctions/currentContests");
var User = require("./models/users");

var app = express();
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

connect.then(
	() => {
		console.log("Connected correctly to server");
		// updateallcontests();
		// setInterval(updateallcontests, 1800000);
		// updatecc();
		// setInterval(updatecc, 180000);
		// updatecf();
		// setInterval(updatecf, 180000);
		// updateleet();
		// setInterval(updateleet, 180000);
	},
	(err: Error) => {
		console.log(err);
	}
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }: any) => ({ req, res }),
});
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/google", googleRouter);
app.use("/handletest", usertestRouter);
app.use("/usernamecheck", require("./routes/usernamecheck"));
app.use("/getuser", require("./routes/getuser"));
app.use("/allcontests", require("./routes/allcontest"));
app.use((req: Request, _: any, next: NextFunction) => {
	try {
		const token = req.headers["authorization"];
		if (token) {
			const data = jsonwebtoken.verify(token, config.secretKey) as any;
			(req as any).userId = data._id;
		}
	} catch {}
	next();
});
server.applyMiddleware({ app });
// const context=(req:Request)=>{

// }
// app.use(
// 	"/graphql",
// 	graphqlHTTP({
// 		schema,
// 		graphiql: true,
//     context
// 	})
// );

// var intervalfunc = function () {

// };
// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
	next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
function token(token: any, secretKey: any): any {
  throw new Error("Function not implemented.");
}

