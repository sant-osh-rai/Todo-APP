const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors  = require('cors')
const path = require('path')

const routes = require('./routes')
const PORT = process.env.PORT || 5000

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
mongoose
  .connect("mongodb://localhost:27017/Todo", { useNewUrlParser: true })
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.log(err));
app.use('/',routes)


app.listen(PORT, () => console.log(`server is up at ${PORT}`));
