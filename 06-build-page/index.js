const fs = require('fs/promises');
const path = require('path');

(async function (dist) {
  try {
    const folder = await fs.readdir(path.resolve(__dirname));
    if (folder.includes('project-dist')) {
      await fs.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true });
    }
    await fs.mkdir(dist);
    await copyDir(path.join(__dirname, 'assets'), path.join(dist, 'assets'));
    await compileStyle(path.join(__dirname, 'styles'), dist);
    await buildTemplate(
      path.join(__dirname, 'template.html'),
      path.join(__dirname, 'components'),
      path.join(dist, 'index.html')
    );
  } catch (e) {
    console.error(e);
  }
})(path.join(__dirname, 'project-dist'));

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

async function compileStyle(src, dist) {
  try {
    const s = await fs.readdir(src, { withFileTypes: true });
    await fs.writeFile(path.join(dist, 'style.css'), '');
    s.forEach(async el => {
      if (el.isFile() && path.extname(path.join(src, el.name)) === '.css') {
        const f = await fs.readFile(path.join(src, el.name));
        await fs.appendFile(path.join(dist, 'style.css'), f);
      }
    });
  } catch (e) {
    console.error(`problem with 'compileStyle()' function: ${e}`);
  }
}

async function buildTemplate(template, src, dist) {
  try {
    const s = await fs.readdir(src, { withFileTypes: true });
    let html = await fs.readFile(template, { encoding: 'utf-8' });
    for (const file of s) {
      if (path.extname(path.join(src, file.name)) === '.html') {
        const name = '{{' + file.name.replace(/\.html$/gi, '') + '}}';
        f = await fs.readFile(path.join(src, file.name), { encoding: 'utf-8' });
        html = html.replace(name, f);
      }
    }
    await fs.writeFile(path.join(dist), html);
  } catch (e) {
    console.error(`problem with 'buildTemplate()' function: ${e}`);
  }
}
