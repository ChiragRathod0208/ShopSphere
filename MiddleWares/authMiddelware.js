const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require("../Models/User");

async function isLoggedIn(req, res, next) {
    let token = req.cookies.token;
    let layout = false; 
    
    if(!token)
    {
        layout = true;
        req.layout = layout;
        return res.redirect("/auth");
    }
    
    const decoded = jwt.verify(token, process.env.KEY);

    let user = await userModel.findOne({email: decoded.email});

    if(!user)
    {
        layout = true;
        req.layout = layout;
        return res.redirect("/auth");
    }

    // console.log("User: ", user)
    req.user = user;
    req.layout = layout;
    next();
}

async function isAdmin(req, res, next) {
    let token = req.cookies.token;
    

    if(token === '' || !token)
    {
        layout = true;
        req.layout = layout;
        return res.redirect("/auth");
    }

    const decoded = jwt.verify(token, "secret");

    let user = await userModel.findOne({email: decoded.email});

    if(!user)
    {
        layout = true;
        req.layout = layout;
        return res.redirect("/auth");
    }

    if(!((user.name).startsWith("admin") || (user.role) === "admin"))
    {
        layout = true;
        req.layout = layout;
        return res.redirect("/auth");
    }
    next();
}

module.exports = {
    isLoggedIn,
    isAdmin
}