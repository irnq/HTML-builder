const fs = require('fs/promises');
const path = require('path');
const { start } = require('repl');

(async function (src, dist) {
  try {
    let files = await fs.readdir(src);
    let styles = [];
    files.forEach(file => {
      if (path.extname(path.join(src, file)) === '.css') styles.push(file);
    });

    await fs.writeFile(dist, '');
    styles.forEach(style => {
      writeBeforeEnd(path.join(src, style), dist);
      console.log(`${style} added in bundle...`);
    });
    console.log(`bundle completed!`);
  } catch (e) {
    console.error(e);
  }
})(path.resolve(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'bundle.css'));

async function writeBeforeEnd(file, dist) {
  try {
    const f = await fs.readFile(file);
    await fs.appendFile(dist, f);
  } catch (e) {
    console.error(`error with 'writeBeforeEnd' function: ${e}`);
  }
}
