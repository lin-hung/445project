"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 3001; //app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/test', function (req, res) {
  //res.send('Hello sdfrld from the server!')
  var data = {
    abc: "def"
  };
  res.json(data);
  return console.log("test");
});
app.listen(port, function () {
  return console.log("Example listening on port ".concat(port, "!"));
});