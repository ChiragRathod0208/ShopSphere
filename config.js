const mongoose = require("mongoose");

function ConnectDB(url) {
    mongoose.connect(url)
    .then(() => console.log("DB Connected Successfully"))
    .catch((err) => console.log("An Error Has Occured While Connectimg DB", err));
}

module.exports = {
    ConnectDB
}