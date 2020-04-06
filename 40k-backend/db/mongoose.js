const mongoose = require('mongoose');
const { usersModel: Users, usersSchema } = require("../models/usersModel")
require('dotenv').config()

function connect(objConnect) {
    const uri = `mongodb+srv://Mark808:${process.env.DB_PASSWORD}@cluster0-33b9c.mongodb.net/test?retryWrites=true&w=majority`

    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "helio"
    });


}//end of connect function

//start of close function
function close() {
    mongoose.connection.close()
}//end of close function

//start of create function
function create(objCreate) {

    let serial = {}

    //use the schema as a templete to check for properties in document to write
    //if the document has a matching property copy it to the new object
    //write the new object

    for (let key in usersSchema) {
        if (objCreate.doc.hasOwnProperty(key)) {
            serial[key] = objCreate.doc[key]
        }

    }
    return Users.create(serial)
}// end of create

//start of readOne
function readOne(objRead) {

    return Users.findById(objRead.id).exec()

}//end of readOne

//start of find by email
function findByEmail(email) {

    console.log("EMAIL",email)
    return Users.findOne(email).exec()

}//end of findby email

//start of update
function update(objUpdate) {
    let serial = {}
    for (let key in usersSchema) {
        if (objUpdate.doc.hasOwnProperty(key)) {
            serial[key] = objUpdate.doc[key]
        }
    }
    return Users.updateOne({ _id: objUpdate.id },serial).exec()
} //end of update

//start of del
function del(objDelete) {

    return Users.deleteOne({ _id: objDelete.id }).exec()
}//end of del

//start of replace
function replace(objReplace) {
    let serial = {}
    for (let key in usersSchema) {
        if (objReplace.doc.hasOwnProperty(key)) {
            serial[key] = objReplace.doc[key]
        }

    }
    return Users.replaceOne({ _id: objReplace.id }, serial).exec()

}//end of replace
//start of readAll
function readAll(objRead) {
    return Users.find().exec()
}//end of replace


//start of module.exports
module.exports.connect = connect
module.exports.create = create
module.exports.close = close
module.exports.readOne = readOne
module.exports.update = update
module.exports.del = del
module.exports.replace = replace
module.exports.readAll = readAll
module.exports.findByEmail= findByEmail