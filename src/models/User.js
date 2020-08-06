const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userSchema = mongoose.Schema({
    "userid": {
      type: String,
      maxlength: 50,
    },
    "useremail": {
      type: String,
      trim: true,
      unique: 1,
    },
    "password": {
      type: String,
      minglength: 5,
    },
    "username": {
      type: String,
      maxlength: 50,
    },
});

userSchema.pre("save",function(next){
  var user = this;

  if (user.isModified("password")) {
    // console.log('password changed')
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(in_password,cb){
    bcrypt.compare(in_password,this.password,function(err,ismatch){
        if(err)return cb(err);
        cb(null, ismatch);
    });
}

//use token -- not used 

userSchema.methods.generateToken = function (cb) {
  var user = this;
  console.log("user", user);
  console.log("userSchema", userSchema);
  var token = jwt.sign(user._id.toHexString(), "secret");
  var oneHour = moment().add(1, "hour").valueOf();

  user.tokenExp = oneHour;
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, "secret", function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};


const User = mongoose.model("userinfo",userSchema);
module.exports = User;