require("dotenv").config();

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must enter name"],
    },
    email: {
      type: String,
      required: [true, "Must enter email"],
    },
    password: {
      type: String,
      required: [true, "Must enter paassword"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.jwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};

userSchema.methods.checkPassword = async function (p) {
  const match = await bcrypt.compare(p, this.password);
  return match;
};

module.exports = mongoose.model("user", userSchema);
