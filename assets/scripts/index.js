'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

const landingTemplate = require('./templates/landing.handlebars')

// showLandingTemplate()
// showMapTemplate()
// showStateAllTemplate()
// showStateItemCreateTemplate()
// showStateItemDetailsTemplate()
// showStateItemUpdateTemplate()
//

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
require('./jquery.vmap.js')
require('./jquery.vmap.usa.js')
const authEvents = require('./auth/events.js')

$(() => {
  $('#landing-view-container').append(landingTemplate)
  authEvents.addLandingHandlers()
  // mapEvents.usMap() Need to call this when we get to map page instead of loading it on document ready.
  // mapEvents.addHandlers()
})
