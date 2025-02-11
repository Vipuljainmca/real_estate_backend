const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        trim : true,
    },
    type : {
        type : String,
        require : true,
        enum : ["Residential", "Commercial", "Land"]
    },
    size : { 
        type : String,
        require : true,
    },
    location : { 
        type : String,
        require : true,
    },
    budget : { 
        type : String,
        require : true,
    },
    availability  : {
        type : String,
        require : true,
        enum : ["Yes", "No"]
    },
})

module.exports = mongoose.model("property", propertySchema);