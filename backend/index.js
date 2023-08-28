const express = require("express");
const app = express();
require('dotenv').config();
const cors = require('cors');

// Database
const database = require("./config/database");
database();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Route
const studentRoute = require('./routes/studentRoute');
app.use("/mahasiswa", studentRoute);

app.post('/mahasiswa/addData', async (req, res) => {
    try {
        const { npm, nama, jurusan } = req.body
        const book = new BookModel({
            npm, nama, jurusan
        })
        const data = await book.save()
        return res.status(200).json ({
            msg: 'Ok',
            data
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
})

const PORT =process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
