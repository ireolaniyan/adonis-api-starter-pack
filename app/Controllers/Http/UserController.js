'use strict'

const User = use('App/Models/User')

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
}

module.exports = UserController
