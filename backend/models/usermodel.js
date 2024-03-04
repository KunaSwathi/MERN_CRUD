const { default: mongoose } = require("mongoose")

//schema
const schemaData = mongoose.Schema({
    name :{
        type : "String",
        required : true
    },
    email :{
        type : "String",
        required : true
    },
    mobile :{
        type : "String",
        required : true
    }

},{
    timestamps :true
})

module.exports = mongoose.model("UserModel", schemaData)