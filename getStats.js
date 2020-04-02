let fs = require('fs');
let fetch = require('node-fetch');
let Knex = require('knex');
let { Model } = require('objection');

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}

let dbConfig = require('./knexfile');
let knex = Knex(dbConfig[process.env.NODE_ENV]);
Model.knex(knex);

let CoronaCase = require('./CoronaCase');

function loadJSON(file) {
  let text = fs.readFileSync(file, 'utf-8');
  return JSON.parse(text);
}

/**
 * Given an object and the name of a key, deletes the key from the object and
 * returns the object (now with key removed).
 *
 * @example
 * // returns { name: 'Jesse' }
 * withoutKey({ name: 'Jesse', age: 36 }, 'age');
 *
 */
function withoutKey(obj, key) {
  delete obj[key];
  return obj;
}

/**
 * The 'date' field in the API results is a literal integer of the form, e.g.,
 * 20200324 instead of '2020-03-24'. This converts those integer dates into
 * a more standard date string.
 */
function formatWeirdNumberDate(numberDate) {
  return numberDate.toString().match(/(\d{4})(\d{2})(\d{2})/).slice(1,4).join('-');
}

/**
 * Breaks an array into multiple arrays containing chunkSize elements. The last
 * chunk might contain fewer than chunkSize elements.
 *
 * @example
 * // [['one', 'two'], ['three', 'four'], ['five']]
 * chunk(['one', 'two', 'three', 'four', 'five'], 2);
 *
 * @example
 * // [['one', 'two', 'three'], ['four', 'five']]
 * chunk(['one', 'two', 'three', 'four', 'five'], 3);
 *
 */
function chunk(array, chunkSize) {
  let numChunks = Math.ceil(array.length / chunkSize);

  return Array(numChunks).fill(null).map((_, i) => array.slice(chunkSize * i, chunkSize * (i + 1)));
}

async function main(knex, url) {
  // let jsonData = await fetch(url);
  // let rawData = await jsonData.json();

  let rawData = await fetch(url).then(res => res.json());

  // let rawData = loadJSON(fileName);

  let insertData = rawData.map((entry) => {
    return withoutKey(Object.assign(entry, {
      reportDate: formatWeirdNumberDate(entry.date),
    }), 'date');
  });

  for (let dataChunk of chunk(insertData, 100)) {
    await CoronaCase.query().insertGraph(dataChunk);
  }

  console.log('Done inserting COVID-19 data');

  await knex.destroy();
}

if (require.main === module) {
  main(knex, 'https://covidtracking.com/api/states/daily');
}

module.exports = loadJSON;
