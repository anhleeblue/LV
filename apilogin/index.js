var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, '/view')));

app.listen(777, function() {
	console.log('started listen port', 777);
});
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/signin', function (req, res) {
  var user_name=req.body.email;
  var password=req.body.password;
  if(user_name=='admin' && password=='admin'){
  	res.send('success');
  }
  else{
  	res.send('Failure');
  }
})