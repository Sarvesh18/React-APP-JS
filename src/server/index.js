/*eslint-disable no-console*/

//require('babel-register')
//require('./server')

const path = require('path');
const express = require('express');

//const cors = require('cors');
const useragent = require('express-useragent');

const { handleRender } = require('./helper');

const app = express();

const PORT = process.env.PORT || 8090;


//app.use(cors());

app.use(useragent.express());

app.use(express.static(path.join('./dist')));

app.get('/*', (req, res) => {

    const { isMobile, isTablet, isDesktop } = req.useragent;

    if(isMobile) {
        console.log('Mobile===>');
    }
    else if(isTablet) {
        console.log('Tablet===>');
    }
    else if(isDesktop) {
        console.log('Desktop===>');
    }
    else {
        console.log('Other===>');
    }

    handleRender(req, res);
    //res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🌎  Listening @ ${PORT}.`);
});
