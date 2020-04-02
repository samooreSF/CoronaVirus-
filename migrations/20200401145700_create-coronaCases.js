exports.up = function(knex) {
  return knex.schema.createTable('corona_cases', (table) => {
    table.increments('id').primary();
    table.date('report_date').notNullable();
    table.text('state').notNullable();
    table.integer('positive');
    table.integer('negative');
    table.integer('pending');
    table.integer('hospitalized');
    table.integer('death');
    table.integer('total');
    table.text('hash');
    table.text('date_checked');
    table.integer('total_test_results');
    table.text('fips');
    table.integer('death_increase');
    table.integer('hospitalized_increase');
    table.integer('negative_increase');
    table.integer('positive_increase');
    table.integer('total_test_results_increase');

    table.unique(['report_date', 'state']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('corona_cases');
};
