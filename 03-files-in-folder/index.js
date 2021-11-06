const fs = require('fs/promises');
const path = require('path');

(async function (p) {
  try {
    let data = await fs.readdir(p, { withFileTypes: true });
    data.forEach(el => {
      if (el.isFile()) {
        consoleFileStats(path.join(p, el.name));
      }
    });
  } catch (e) {
    console.error(e);
  }
})(path.resolve(__dirname, 'secret-folder'));

async function consoleFileStats(file) {
  try {
    const stat = await fs.stat(file);
    console.log(
      `${path.basename(file, path.extname(file))} - ${path.extname(file).replace('.', '')} - ${
        stat.size / 1024
      }kb`
    );
    return stat.size;
  } catch (e) {
    console.error(`cant get stats: ${e}`);
  }
}
