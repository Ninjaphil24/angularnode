const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.listen(3000, ()=> {
    console.log('server running..');
})