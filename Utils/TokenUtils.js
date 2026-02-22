const jwt = require("jsonwebtoken");

function GenerateTokens(user) {
    const token = jwt.sign({email: user.email, id: user._id}, process.env.KEY);

    return token;
}

module.exports = {
    GenerateTokens
}