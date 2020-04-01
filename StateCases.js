let Knex = require('knex');
let { Model } = require('objection');
let dbConfig = require('knexfile');
let knex = Knex(dbConfig[process.env.NODE_ENV]);
Model.knex(knex);
let getStats = require('getStats');
let CoronaStates = require('CoronaStates');

let arrayOfStates = getStats('corona.json');



async function importCases(cases) {
  return await CoronaStates.query().insertGraph(cases.map((corona) => {
    console.log(hero.powerstats.intelligence);
    return {
        Date:corona.name,
        state: corona.state,
        positive:corona.positive,
        negative: corona.negative,
        pending: null,
        hospitalized: corona.hospitalized,
        death: corona.death,
        total: corona.total,
        hash: corona.hash,
        dateChecked: corona.dateChecked,
        totalTestResults: corona.totalTestResults,
        fips:corona.fips,
        deathIncrease: corona.deathIncrease,
        hospitalizedIncrease: corona.hospitalizedIncrease,
        negativeIncrease: corona.negativeIncrease,
        positiveIncrease: corona.positiveIncrease,
        totalTestResultsIncrease: corona.totalTestResultsIncrease,
    };
  }));
}

(async () => {
  await importCases(arrayOfStates);
})();
