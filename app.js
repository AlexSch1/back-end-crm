const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const cors = require("cors");
// const morgan = require("morgan");
// const mongoose = require("mongoose");
// const passport = require('passport');
//
const authRoutes = require("./routes/auth");
const analyticsRoutes = require("./routes/analytics");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const positionRoutes = require("./routes/position");
// const keys = require("./config/keys");
//
// mongoose.connect(keys.mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('conent'));
//
//
// app.use(passport.initialize());
// require('./middelware/passport')(passport);
//
// app.use(morgan("dev"));
// app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/position", positionRoutes);

module.exports = app;
