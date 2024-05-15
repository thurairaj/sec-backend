const mongoose = require('mongoose');


const City =  {
    Subang : "Subang",
    Petaling : "Petaling",
    Kuantan : "Kuantan"
}

const scoreSchema = new mongoose.Schema({
    subject: {type: String, required: true },
    mark: {type: Number, required: true},
}, { _id : false })

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    city: {type: String, enum: City.valueOf(), required: true},
    email: {type: String, required: false, unique: true},
    hobbies: { type: [String], required: false, default: [] },
    scores: {type: [scoreSchema], required: false}
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);