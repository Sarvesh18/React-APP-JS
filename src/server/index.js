const path = require('path');
const express = require('express');

const { handleRender } = require('./helper');

const app = express();

const PORT = process.env.PORT || 8090;


app.use(express.static(path.join('./dist')));


app.get('/*', (req, res) => {

    handleRender(req, res);
    //res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server Running @ ${PORT}`);
});
