const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  userName: { type: String, unique: true },
  firstName: String,
  lastName: String, 
  phoneNum: String,
  email: {
    type: String,
    minLength: 8,
    required: true,
    lowercase: true,
    unique: true
  },
  role: { type: String, enum: ["Customer", "Tech", "Manager"], default:"Customer" },
  password: String,
});

UserSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
