const express = require('express');
const cors = require('cors');
const { runBanglaCode } = require('./controller/BanglaToPython');
require('dotenv').config();

const port = process.env.PORT || 5000
const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('App is running!');
});

app.post('/toPython',runBanglaCode)

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
