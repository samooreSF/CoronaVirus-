let { Model, snakeCaseMappers } = require('objection');

class CoronaCase extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'corona_cases';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'state',
      ],
      properties: {
        reportDate: {type: 'string', format: 'date'},
        state: {type: 'string'},
        positive: {type: ['integer', 'null']},
        negative: {type: ['integer', 'null']},
        pending: {type: ['integer', 'null']},
        hospitalized: {type: ['integer', 'null']},
        death: {type: ['integer', 'null']},
        total: {type: ['integer', 'null']},
        hash: {type: 'string'},
        dateChecked: {type: 'string'},
        totalTestResults: {type: ['integer', 'null']},
        fips: {type: 'string'},
        deathIncrease: {type: ['integer', 'null']},
        hospitalizedIncrease: {type: ['integer', 'null']},
        negativeIncrease: {type: ['integer', 'null']},
        positiveIncrease: {type: ['integer', 'null']},
        totalTestResultsIncrease: {type: ['integer', 'null']},
      }
    }
  }
}

module.exports = CoronaCase;
