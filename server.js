const express = require("express");
const connectDB = require("./config/db");
const router = express.Router();
const path = require("path");

const PORT = process.env.PORT || 8080;
const app = express();

connectDB();

app.listen(PORT, () => {
  console.log("Running on Port", PORT);
});
require("./shell/user");
require("./shell/post");

app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/posts"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
