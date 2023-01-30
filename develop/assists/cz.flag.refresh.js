var fs = require('fs');
var dayjs = require('dayjs');
const { resolve } = require('path');

function prompt(err) {
  if (err) {
    return console.error(err);
  }

  console.log('cz.flag.json update success');
}

var content = JSON.stringify({
  datetime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
});

// eslint-disable-next-line no-undef
const filePath = resolve('./develop/assists');

fs.writeFile(`${filePath}/cz.flag.json`, content, prompt);
