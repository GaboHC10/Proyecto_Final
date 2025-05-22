const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.status(200);
    res.send('Bienvenidos al Servidor');
});

app.get('/:nombre', (req, res, next) => {
    req.params.name;
    res.status(200).send('Estas en la página Nombre');
});

app.listen(process.env.PORT || 4000, () => {
    console.log('Server is Running...');
});