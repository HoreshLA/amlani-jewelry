const fs = require('fs'), path = require('path');

function buildProducts(dir) {
  return fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()
    .map(f => ({ id: f.replace(/\.json$/, ''), ...JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) }));
}

function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? prefix + '.' + k : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}

function injectHome(html, home) {
  const flat = flatten(home);
  return html.replace(/<!--cms:([\w.]+)-->[\s\S]*?<!--\/cms:\1-->/g, (m, key) =>
    key in flat ? `<!--cms:${key}-->${flat[key]}<!--/cms:${key}-->` : m);   // missing key -> leave region untouched
}

function main() {
  const products = buildProducts('site/content/products');
  fs.writeFileSync('site/products.json', JSON.stringify(products) + '\n');
  const home = JSON.parse(fs.readFileSync('site/content/home.json', 'utf8'));
  const html = fs.readFileSync('site/index.html', 'utf8');
  fs.writeFileSync('site/index.html', injectHome(html, home));
  console.log('built', products.length, 'products; injected home.json');
}

function selfTest() {
  // aggregation: id from filename, cats stays array, missing cats ok
  const tmp = fs.mkdtempSync('bt-');
  fs.writeFileSync(path.join(tmp, 'ring-x.json'), JSON.stringify({ name: 'X', cats: ['rings'] }));
  fs.writeFileSync(path.join(tmp, 'a-y.json'), JSON.stringify({ name: 'Y' }));
  const ps = buildProducts(tmp);
  console.assert(ps[0].id === 'a-y' && ps[1].id === 'ring-x', 'sorted + id from filename');
  console.assert(Array.isArray(ps[1].cats) && ps[0].cats === undefined, 'cats array / missing ok');
  fs.rmSync(tmp, { recursive: true });
  // injection: replaces content, idempotent, missing key untouched
  const h = { hero: { lede: 'NEW' } };
  const src = '<p><!--cms:hero.lede-->OLD<!--/cms:hero.lede--></p><i><!--cms:gone-->KEEP<!--/cms:gone--></i>';
  const once = injectHome(src, h);
  console.assert(once.includes('>NEW<') && once.includes('>KEEP<'), 'inject + missing-key untouched');
  console.assert(injectHome(once, h) === once, 'idempotent');
  console.log('self-test OK');
}

process.argv.includes('--self-test') ? selfTest() : main();
