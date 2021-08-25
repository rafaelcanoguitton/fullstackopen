const mongoose = require("mongoose");
const uniqueValidator=require('mongoose-unique-validator');
const url = process.env.MONGODB_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log('connected to MongoDB');
}).catch((e)=>{
  console.log('error connecting to MongoDB:',e.message);
});
const personSchema = new mongoose.Schema({
  name: {
    type:String,
    minlength:8,
    required:true,
    unique:true,
  },
  number: {
    type:String,
    minlength:5,
    required:true,
    unique:true,
  },
});
personSchema.plugin(uniqueValidator);
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports=mongoose.model('Person',personSchema)
