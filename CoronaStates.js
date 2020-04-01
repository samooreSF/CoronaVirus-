let { Model, snakeCaseMappers } = require('objection');

class Virus extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'Cases';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'state',
      ],
      properties: {
        Date: {type: 'integer'},
        state: {type: 'string'},
        positive: {type: 'integer'},
        negative: {type: 'integer'},
        pending: null,
        hospitalized: {type: 'integer'},
        death: {type: 'integer'},
        total: {type: 'integer'},
        hash: {type: 'string'},
        dateChecked: {type: 'string'},
        totalTestResults: {type: 'integer'},
        fips:{type: 'string'},
        deathIncrease: {type: 'integer'},
        hospitalizedIncrease: {type: 'integer'},
        negativeIncrease: {type: 'integer'},
        positiveIncrease: {type: 'integer'},
        totalTestResultsIncrease: {type: 'integer'},
      }
    }
  }

  static get relationMappings() {
    // Code here to establish relations with other classes
  }

}

module.exports = Superhero;
