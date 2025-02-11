const bcrypt = require("bcrypt");
const User = require("../models/leads");


exports.signup = async (req, res) => {
    try{
        console.log("signup req")
        const {name, email, password, role} = req.body;
        console.log(name, email,password,role);
        const existingUser = await User.findOne({email});

        if(existingUser){
           return  res.status(400).json({
            success : false,
            message : "user already exists"
           })
        }
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);

        }catch(err){
            console.log("hashing failed");
            return res.status(400).json({
                success : false,
                message : "hashing failed",
                error : err
            })
        }

        const user = await User.create({
            name, email, password : hashedPassword, role
        });
        return res.status(200).json({
            success : true,
            message : "user created successfully"
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "failed to create sign in entry"
        })
    }
}