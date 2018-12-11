'use strict'

class RegisterUser {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      // validation rules
      first_name: 'required|string',
      last_name: 'required|string',
      // username: 'required|string|unique:users',
      email: 'required|email|unique:users',
      phone: 'required|unique:users',
      // password: 'required|min:8|max:30'
    }
  }

  get messages() {
    return {
      'first_name.required': 'You must provide your first name',
      'last_name.required': 'You must provide your last name',
      // 'username.required': 'You must provide a username',
      // 'username.unique': 'This username is taken',
      'email.required': 'You must provide an email address',
      'email.email': 'You must provide a valid email address',
      'email.unique': 'This email is already registered',
      'phone.required': 'You must provide a phone number',
      'phone.unique': 'This phone number is already registered'
      // 'password.required': 'You must provide a password',
      // 'password.min': 'You must enter at least 8 characters',
      // 'password.max': 'You can set a maximum of 30 characters'
    }
  }
}

module.exports = RegisterUser
