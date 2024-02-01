const fs = require('fs');
const moment = require('moment');

// create file with all request from server
exports.fsFile = app => {
    app.use((req, res, next) => {
        const fileName = "./logs/log.txt";
        let Content = '';
        Content += `Time: ${moment().format('D/M/Y')}\n`;
        Content += `Time: ${moment().format('HH:mm:ss')}\n`;
        Content += `Method: ${req.method}\n`;
        Content += `Route: ${req.url}\n`;
        Content += `Status: ${res.statusCode}\n`;
        Content += `\n`;

        fs.appendFile(fileName, Content, err => { });
        next()
    });
}

// create file every day with all request from server that with status code above 400
exports.statusAndError = (status, errorMessage) => {
    if (status >= 400) {
        const fileName = `./logs/${moment().format('D.M.Y')}.txt`;
        let Content = '';
        Content += `Time: ${moment().format('D/M/Y')}\n`;
        Content += `Status: ${status}\n`;
        Content += `errorMessage: ${errorMessage}\n`;
        Content += `\n`;

        fs.appendFile(fileName, Content, err => { });
    }
};