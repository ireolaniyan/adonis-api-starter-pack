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
}

module.exports = UserController
