const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const { MONGOURI } = require("./key");

mongoose.connect(MONGOURI);
require("./shell/user");

app.use(express.json());

app.use(require("./routes/auth"));

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
mongoose.connection.on("connected", () => {
  console.log("Mongo Connected");
});

mongoose.connection.on("error", (err) => {
  console.log("Connection error", err);
});

app.listen(PORT, () => {
  console.log("Running on Port", PORT);
});
