const fs = require('fs/promises');
const path = require('path');

(async function (p) {
  try {
    let folder = await fs.readdir(path.resolve(__dirname));
    if (folder.includes('files-copy')) {
      await fs.rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true });
    }
    await copyDir(p, path.join(__dirname, 'files-copy'));
    console.log(`'files' copied to '${path.join(__dirname, 'files-copy')}' successfully!`);
  } catch (e) {
    console.error(e);
  }
})(path.resolve(__dirname, 'files'));

async function copyDir(src, dist) {
  try {
    const s = await fs.readdir(src, { withFileTypes: true });
    await fs.mkdir(dist);
    s.forEach(async el => {
      if (!el.isDirectory()) {
        fs.copyFile(path.join(src, el.name), path.join(dist, el.name));
      } else {
        await copyDir(path.join(src, el.name), path.join(dist, el.name));
      }
    });
  } catch (e) {
    console.error(`problem with 'copyDir()' function: ${e}`);
  }
}
