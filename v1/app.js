

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
app.locals.moment = require('moment');
var passport = require("passport");
var localstrategy = require("passport-local");
var methodoverride = require("method-override");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

require('dotenv').config();

var commentRoutes = require("./routes/comments"),
    reviewRoutes     = require("./routes/reviews"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")


mongoose.connect("mongodb://localhost:27017/tour_ism", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodoverride("_method"));
app.use(flash());
//seedDB();


app.use(require("express-session")({
    secret: "Rusty wins cutest dog",
    resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);






app.listen(process.env.PORT, process.env.IP, function(){
    console.log("project has started");
});
