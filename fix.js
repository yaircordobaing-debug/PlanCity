const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
        results = results.concat(walk(fullPath));
    } else {
        results.push(fullPath);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src')).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Remove backslashes before backticks and dollar signs
  content = content.replace(/\\\`/g, '\`').replace(/\\\$/g, '$');
  fs.writeFileSync(file, content);
});
console.log('Fixed escaping issues in ' + files.length + ' files.');
