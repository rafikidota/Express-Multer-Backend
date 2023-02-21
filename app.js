const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { DBConnection } = require('./db/config');
require('dotenv').config();
const multer = require('multer');
const fileFilter = require('./middleware/file-filter');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const port = process.env.PORT || 4000;

// Creating server/application  Express
const app = express();

//Database
DBConnection();

//Public
app.use(express.static('public'));

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//CORS
app.use(cors());

//Read and parse body
app.use(express.json());

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'files'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
app.use(multer({
    dest: path.join(__dirname, 'files'),
    fileFilter,
    limits: { fileSize: 1000000 },
    storage
}).single('image'));

//Routes
app.use('/api/doctor', require('./routes/doctor.route'));

//Other routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
