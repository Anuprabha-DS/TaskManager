const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name :{type:String,required:true,trim:true},
    email:{type:String,required:true,unique: true,trim: true,lowercase: true},
    password:{type: String,required: true,minlength: 6},
    
}, { timestamps: true })// Adds createdAt and updatedAt fields automatically

const User = mongoose.model('User',userSchema)
module.exports = User
