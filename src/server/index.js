const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, '..', '..', 'dist')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Running @ ${process.env.PORT || 3000}`);
});

//import React from 'react';
//import { createStore } from 'redux';
//import { Provider } from 'react-redux';
