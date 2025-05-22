const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.status(200);
    res.send('Bienvenidos');
});


app.listen(4000, () => {
    console.log('Server is Running...');
});