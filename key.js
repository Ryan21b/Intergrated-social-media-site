const express = require("express");
const app = express;

require("./shell/user");
require("./shell/posts");

app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/posts"));
