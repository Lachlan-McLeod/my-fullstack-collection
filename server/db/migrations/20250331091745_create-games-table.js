/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('games', (table) => {
    table.integer('id').primary()
    table.integer('developer_id')
    table.string('title')
    table.string('release_date')
    table.string('image')  
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('games')
}
