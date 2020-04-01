let fs = require('fs');

function getStats(file) {
  let text = fs.readFileSync(file, 'utf-8');
  let info = JSON.parse(text);
  return info;
}

if (require.main === module) {
  console.log(getStats("corona.json"));
}

module.exports = getStats;
