var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be saved in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Filename will include timestamp
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Endpoint to handle the file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Return JSON response with file details
  res.json({
    name: req.file.filename,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
