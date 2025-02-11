const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        trim : true,
    },
    phone : { 
        type : String,
        require : true,
    },
})

module.exports = mongoose.model("leads", leadSchema);