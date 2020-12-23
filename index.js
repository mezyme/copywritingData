const fs = require('fs');
fs.readFile('index.txt', (err, data) => {
    if (err) {
        return console.log(err);
    }
    console.log(data.toString());
})