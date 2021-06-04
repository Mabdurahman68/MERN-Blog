const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();

const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");


// mongoose.model('User')
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("successfully connected to online Mongo Cluster ");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});


require('./models/user')
require('./models/post')

app.use(cors())
app.use(express.json())

app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


app.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
