const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { string } = require('joi');

// >> Here will be the User schema.
const UserSchema;
/*
const UserSchema = new mongoose.Schema({
  username: string,
  password: string,
  firstname: string,
  lastname: string,
  email: string
  //[Opt] deleted: boolean
}, {timestamps: true});
*/
// >> Here will be the pre methods for the schema.
UserSchema.pre('', () => {});

// >> Here will be the User methods for the schema.
UserSchema.methods = {};

// >> Here will be the User model using the User schema.
const UserModel;

module.exports = {
  schema: UserSchema,
  model: UserModel,
}