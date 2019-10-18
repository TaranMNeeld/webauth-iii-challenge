
exports.up = function(knex) {
    return knex.schema.table('users', tbl => {
        tbl.text('department', 128);
      });
};

exports.down = function(knex) {
    return knex.schema.table('users', tbl => {
        tbl.dropColumn('department');
      });
};
