'use strict'
const mapPage = require('../templates/map.handlebars')
const getFormFields = require(`../../../lib/get-form-fields`)
const mapEvents = require('../usmap/events.js')
const api = require('./api')
const ui = require('./ui')
const mainPageNav = require('../templates/main-page-nav.handlebars')
const store = require('../store.js')
const landingTemplate = require('../templates/landing.handlebars')
// const board = require('../board')

const onSignUp = function (event) {
  const data = getFormFields(this) // this will refer to event.target because it gets passed into addHandlers as a callback.
  event.preventDefault()
  // api.signUp(data) // check the api.js file to see. When successful, show signUpSucess message, otherwise, signUpFailure message
  //   .then(ui.signUpSuccess)
  //   .catch(ui.signUpFailure)
  api.signUp(data) // check the api.js file to see. When successful, show signUpSucess message, otherwise, signUpFailure message
    .then(ui.signUpSuccess)
    .then(() => {
      api.signIn(data)
        .then(ui.signInSuccess)
        .catch(ui.signInFailure)
    })
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) { // stop here , add console to check if code is working so far
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  console.log('in onChangePassword')
  const data = getFormFields(event.target)
  console.log('in onChangePassword and the data is: ', data)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  console.log('in onSignOut')
  api.signOut()
    .then(ui.signOutSuccess)
    .then($('#landing-view-container').html(landingTemplate))
    .then($('#main-view-container').html(''))
    .then($('#nav-container').html(''))
    .then($('.jqvmap-label').html(''))
    .then(addLandingHandlers)
    .catch(ui.signOutFailure)
}

const addLandingHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#modal-signin').on('hidden.bs.modal', function () {
    console.log('store.user is ', store.user)
    if (store.user !== undefined && store.user !== null) {
      $('#landing-view-container').html('')
      $('#main-view-container').html(mainPageNav)
      $('#sign-out').on('submit', onSignOut)
      $('#change-password').on('submit', onChangePassword)
      $('#map-view-container').html(mapPage)
      mapEvents.myGoals()
    }
  })
  // $('#change-password').on('submit', onChangePassword)
  // $('#sign-out').on('submit', onSignOut)
}

module.exports = {
  addLandingHandlers
}
