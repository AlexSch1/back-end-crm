const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const passport = require('passport');
//
const authRoutes = require("./routes/auth");
const analyticsRoutes = require("./routes/analytics");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const positionRoutes = require("./routes/position");
const keys = require("./config/keys");


mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connect'))
    .catch(error => console.error(error));

// app.use(passport.initialize());
// require('./middelware/passport')(passport);
//
app.use(require("morgan")("dev"));
// app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("cors")());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/position", positionRoutes);

module.exports = app;
