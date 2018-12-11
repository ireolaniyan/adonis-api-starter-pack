'use strict'

const { hooks } = require('@adonisjs/ignitor')


hooks.after.providersBooted(() => {
  const View = use('View')                    // pull in the view provider
  const Env = use('Env')

  View.global('appUrl', path => {
    const APP_URL = Env.get('APP_URL')

    // return app url with path if path argument is provided else return only app url
    return path ? `${APP_URL}/${path}` : APP_URL
  })
})
