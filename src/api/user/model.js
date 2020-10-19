const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { string, boolean } = require('joi');

// >> Here will be the User schema.
//const UserSchema;

const UserSchema = new mongoose.Schema({
  username: {type:String, required:true},
  password: {type:String, required:true},
  firstname: {type:String, required:true},
  lastname: {type:String, required:true},
  email: {type:String, required:true},
  deleted: {type:Boolean}
}, {timestamps: true});

// >> Here will be the pre methods for the schema.
UserSchema.pre('', () => {});

// >> Here will be the User methods for the schema.
//UserSchema.methods = {};

UserSchema.methods.encryptPassword= async password => {
  //Asíncrono
  const salt= await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

//Comparar 2 cifrados
UserSchema.methods.matchPassword= async function(password) {
  return await bcrypt.compare(password, this.password)
}

// >> Here will be the User model using the User schema.
//const UserModel;
const UserModel= mongoose.model('users', UserSchema, 'collection');

module.exports = {
  schema: UserSchema,
  model: UserModel,
}