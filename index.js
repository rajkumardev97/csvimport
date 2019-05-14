var app = require("express")();
var fileUpload = require("express-fileupload");
var mongoose = require("mongoose");

var server = require("http").Server(app);

// DB Config
const db = require("./config/keys").mongoURI;

mongoose.Promise = global.Promise;
//Connect to Mongo

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use(fileUpload());

server.listen(80);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

var template = require("./template.js");
app.get("/template", template.get);

var upload = require("./upload.js");
app.post("/", upload.post);
