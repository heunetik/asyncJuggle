const https = require('https');
const BufferList = require('bl');
const args = process.argv.slice(2);

let resultArray = [null, null, null];

https.get(args[0], callbackFactory(0));
https.get(args[1], callbackFactory(1));
https.get(args[2], callbackFactory(2));

function callbackFactory(pos) {
    return function cb(res) {
        res.pipe(BufferList((err, data) => {
            if(err) {
                console.error("error");
            }
            resultArray[pos] = data.toString();
            const complete = resultArray.reduce((acc, currentVal) => {
                return acc && !!currentVal;
            }, true);
            if(complete) {
                console.log(resultArray);
            }
        }));
    }
}
