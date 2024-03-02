const express = require('express');
const multer = require('multer');

const fileName  = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const destination = multer({storage: fileName})

const app = express();

app.get('/', (req, res) => {
    res.json({'status': 200, 'message': 'server running successfully'})
})

app.post('/upload-files', destination.single('file'), (req, res) => {
    res.json({"status": 200, 'message': 'server uploaded successfully'});
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})
