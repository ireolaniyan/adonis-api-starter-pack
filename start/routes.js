'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'UserController.register').validator('RegisterUser')
Route.put('/register/confirm/:confirmation_token', 'Members/UserController.confirmEmail')
Route.post('/login', 'UserController.login')
Route.group(() => {
  Route.get('/profile', 'UserController.profile')
  // TODO: Validate the editProfie route
  Route.put('/editProfile', 'UserController.editProfile')
  Route.put('/changePassword', 'UserController.changePassword')
})
  .prefix('account')
  .middleware(['auth:jwt'])
Route.get('/logout', 'UserController.logout').middleware('auth')
