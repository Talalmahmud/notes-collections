const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const dbConnect = async (url) => {
  await mongoose.connect(url);
};

module.exports = dbConnect;
