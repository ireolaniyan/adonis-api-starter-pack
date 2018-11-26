'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')


class UserController {
  async allUsers({ response }) {
    // Get all the registered users in the database. Most likely an ADMIN route
    let users = await User.all()
    response.send(users)
  }

  async register({ request, auth, response }) {
    const userDetails = request.all()
    try {
      // Authenticate user using JWT
      const user = await User.create(userDetails)
      const token = await auth.generate(user)

      return response.send({
        mmessage: "Successully created account",
        data: token
      })
    } catch (error) {
      console.log(error)
      return response.status(404).send({
        message: "Unable to create account. Please try again later"
      })
    }
  }

  async login({ request, auth, response }) {
    try {
      const email = request.input('email')
      const username = request.input('username')
      const password = request.input('password')

      let token
      if (request.input('email')) {
        token = await auth.authenticator('jwtEmail').withRefreshToken().attempt(email, password)
      } else if (request.input('username')) {
        token = await auth.authenticator('jwtUsername').withRefreshToken().attempt(username, password)
      }

      return response.status(200).send({
        message: "Now logged in",
        data: token
      })
    } catch (error) {
      console.log(error)

      let error_message
      if (request.input('email')) {
        error_message = "Email and password do not match"
      } else if (request.input('username')) {
        error_message = "Username and password do not match"
      }

      return response.status(401).send({
        message: error_message
      })
    }
  }

  async profile({ auth, response }) {
    const user = await User.find(auth.current.user.id)
    if (user) {
      return response.status(200).send({
        data: user
      })
    }
    return response.status(404).send({
      message: "User not found"
    })
  }

  async editProfile({ request, auth, response }) {
    try {
      // get the currently authenticated user
      const user = auth.current.user

      // upadate field and save
      user.first_name = request.input('first_name')
      user.last_name = request.input('last_name')
      user.username = request.input('username')
      user.email = request.input('email')
      user.phone = request.input('phone')

      await user.save()

      return response.send({
        status: 'success',
        message: 'Profile Updated',
        data: user
      })
    } catch (error) {
      return response.status(404).send({
        status: 'error',
        message: 'There was a problem updating your profile. Please try again later'
      })
    }
  }

  async changePassword({ request, auth, response }) {
    // get the currently authenticated user
    const user = await auth.current.user

    // verify if the current password matches that in the database
    const verifyPassword = await Hash.verify(
      request.input('password'),
      user.password
    )

    // display error message if password entered is incorrect
    if (!verifyPassword) {
      return response.status(400).send({
        status: 'error',
        message: 'Current password could not be verified! Confirm that is your current password and try again'
      })
    }

    // save the new password
    user.password = await request.input('new_password')
    await user.save()

    return response.send({
      status: 'success',
      message: 'Password changed'
    })
  }
}

module.exports = UserController
