/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('findbooks', (table) => {
    table.increments('id')
    table.string('attribute')
    table.string('title')
    table.string('author')
    table.string('summary')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('findbooks')
}
