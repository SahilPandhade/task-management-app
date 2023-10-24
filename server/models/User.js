const {model,Schema} = require('mongoose')
const userSchema = new Schema({
    username:{type:String,default:null,required:true,unique:true},
    email:{type:String,unique:true},
    password: {type:String,required:true},
    token: {type:String}
})
module.exports = model('User',userSchema)