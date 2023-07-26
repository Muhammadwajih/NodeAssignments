const mongoose = require('mongoose');
 
const StudentSchema = new mongoose.Schema({
    StudentId: {type : Number, required : true},
    Name: {type : String},
    Roll: {type : Number},
    Birthday: {type : String},
    Address: { type : String}
});
  
module.exports = mongoose.model(
    'student', StudentSchema, 'Students');