'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.timestamps()
      table.string('title', 60).unique()
      table.string('thumbnail', 100)
      table.integer('price')
      table.integer('stock')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
