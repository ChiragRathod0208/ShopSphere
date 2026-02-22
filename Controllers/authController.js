const bcrypt = require("bcrypt");
const userModel = require("../Models/User");
const tokenUtils = require("../Utils/TokenUtils");

function GetLoginView(req, res) {
    return res.render("auth", {layout: false, message: ''});
}

async function Login(req, res) {
    const {email , password } = req.body;   

    let user = await userModel.findOne({email: email});

    if(!user)
    {
        return res.render("auth", {layout: false, message: "Invalid User Name Or Password", mtype: "error"});
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if(!result){
            return res.render("auth", {layout: false, message: "Invalid User Name Or Password", mtype: "error"});
        }
        
        req.session.user = {
            name: user.name,
            role: user.role
        }

        const token = tokenUtils.GenerateTokens(user);
        res.cookie("token", token);
        res.redirect("/");
        // res.render("/", {success: "LoggedIn Successfully."});
    })
}

async function Register(req, res) {
    const {name, email, password } = req.body;

    let user = await userModel.findOne({email: email});

    if(user)
    {
        return res.render("auth", {layout: false, message: "User Already Exists Try Using Different Email", mtype: "info"});
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            user = await userModel.create({
                name,
                email,
                password: hash,
                role: "user"
            });
        });
    })


    return res.render("auth", {layout: false, message: "Registered Successfully", mtype: "successs"});
}

function Logout(req, res) {
    req.session.destroy(() => {
        res.cookie("token", "");
        // res.cookie("logout", true);
        res.redirect("/");
    });

}

module.exports = {
    GetLoginView,
    Login,
    Register,
    Logout
}