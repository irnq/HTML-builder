const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });
const writeRS = new fs.createWriteStream(path.resolve(__dirname, 'text.txt'), 'utf-8');

rl.on('close', () => {
  console.log('You finished input!');
});
rl.on('line', input => {
  if (input !== 'exit') {
    writeRS.write('\n' + input);
  } else {
    writeRS.end();
    rl.close();
  }
});

rl.question('Please write something: \n', input => {
  if (input !== 'exit') {
    writeRS.write(input);
  } else {
    writeRS.end();
    rl.close();
  }
});
