var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const multer  = require('multer')
const upload = multer({ dest: './uploads/' })

var app = express();


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser());

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {

    res.json({
      error: "You must submit a file"
    })
    return;
  }
  const {originalname, mimetype, size} = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  })
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
