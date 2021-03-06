'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      // Edit this migration to suite the details you intend to get about the users of your (web or mobile) application
      table.increments()
      table.string('first_name', 80).notNullable()
      table.string('last_name', 80).notNullable()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('phone').notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('confirmation_token')
      table.boolean('is_login').defaultTo(0)
      table.boolean('is_active').defaultTo(0)
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
