const express = require('express');
const app = express();

const path = require("path");
const expressLayout = require('express-ejs-layouts');
const cookieParser = require("cookie-parser");
const session = require("express-session");
require('dotenv').config(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(expressLayout);
app.set('layout', 'ex');
app.use(express.static("Public"));
app.use(express.static(path.join(__dirname, 'node_modules')));


app.use(session({
    secret: "secret",
    resave:false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}));

const { ConnectDB } = require("./config")
const homeRoute = require("./Routes/indexRoute");
const produtRoute = require("./Routes/product");
const adminRoute = require("./Routes/admin");
const authRoute = require("./Routes/auth");
const cartRoute = require('./Routes/cart');
const orderRoute = require('./Routes/order');

ConnectDB(process.env.DB_URL);

app.use("/", homeRoute);
app.use("/admin", adminRoute);
app.use("/product", produtRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.listen(process.env.PORT, () => {
    console.log("Server Is Running");
});