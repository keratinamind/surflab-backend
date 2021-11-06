const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
require("./config/passport");
const customerRoute = require("./routes/customerRoute");
const dealDetailRoute = require('./routes/dealDetailRoute');
const dealCategoryRoute = require('./routes/dealCategoryRoute');
const dealBookingRoute = require('./routes/dealBookingRoute');
const ShopRoute = require('./routes/shopRoute')
const passport = require("passport");

const port = process.env.PORT;

app.use(passport.initialize());
app.use(express.json());
app.use(cors());

app.use("/images",express.static("images"))
app.use("/customer", customerRoute);
app.use("/dealdetail",passport.authenticate("jwt-customer", {session: false}), dealDetailRoute);
app.use("/dealcategory",passport.authenticate("jwt-customer", {session: false}), dealCategoryRoute);
app.use("/dealbooking",passport.authenticate("jwt-customer", {session: false}), dealBookingRoute);
app.use("/shop", ShopRoute);

app.use((err, req, res, next ) => { console.log(err)})



app.listen(port, () => {console.log(`server running on port ${port}`)});