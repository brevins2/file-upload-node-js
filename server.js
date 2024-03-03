const express = require('express');
const multer = require('multer');
const path = require('path');

const fileNameSingle  = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const fileNameMany  = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname, 'uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const destination = multer({storage: fileNameSingle})
const destinationmoreimages = multer({storage: fileNameMany})

const app = express();

app.get('/', (req, res) => {
    res.json({'status': 200, 'message': 'server running successfully'})
})

app.post('/upload-file', destination.single('file'), (req, res) => {
    res.json({"status": 200, 'message': 'server uploaded successfully'});
})

app.post('/upload-files', destinationmoreimages.array('files'), (req, res) => {
    res.json({"status": 200, 'message': 'server uploaded successfully'});
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})
