const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    fName: {
        type: String
    },

    lName: {
        type: String
    },

    passwordHash: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: Number,
        min: [18, "must be 18 to use"],
        max: 130
    },
    userName: {
        type: String
    },
    
    

});
usersSchema.methods.fullName = function (){
    return `${this.fName} ${this.lName}`
    
}

module.exports.usersModel = mongoose.model('Users', usersSchema, "users")
module.exports.usersSchema = usersSchema.obj
