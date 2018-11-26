'use strict'

class EditProfile {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      // validation rules
      first_name: 'required|string',
      last_name: 'required|string',
      username: 'required|string|unique:users',
      email: 'required|email|unique:users',
      phone: 'required|unique:users'
    }
  }

  get messages() {
    return {
      'first_name.required': 'You must provide your first name',
      'last_name.required': 'You must provide your last name',
      'username.required': 'You must provide a username',
      'username.unique': 'This username is taken',
      'email.required': 'You must provide an email address',
      'email.email': 'You must provide a valid email address',
      'email.unique': 'This email is already registered',
      'phone.required': 'You must provide a phone number',
      'phone.unique': 'This phone number is already registered'
    }
  }
}

module.exports = EditProfile
