dream-cheeky-api
================

Nodejs API for controller dream cheeky missile launcher.
This is a rewrite of [pathikrit's *node-thunder-driver* library](https://github.com/pathikrit/node-thunder-driver),  mainly to make it work for modern nodejs environment.


Installation
==============
1. `npm install dream-cheeky-api`
2. In your js file, add `var DCDriver = require('dream-cheeky-api');`

API
==============
###DCDriver.DEVICE_CONSTANTS
**Description:** 

A JS object containing constants for Dream Cheeky Thunder Launcher.

###DCDriver.turnOnDebugMode()
**Description:** 

Turn on debug mode (level 4) of USB.

###DCDriver.moveUp(`durationMS`[, `callback`])
**Description:**

Move up for a period of time.

**Parameters:**

####`durationMS`
Type: Number

Duration of moving time in ms.
####`callback`
Type: Function()

A function to execute when the movement is done.

###DCDriver.moveDown(`durationMS`[, `callback`])
**Description:**

Move down for a period of time.

**Parameters:**

####`durationMS`
Type: Number

Duration of moving time in ms.
####`callback`
Type: Function()

A function to execute when the movement is done.

###DCDriver.moveLeft(`durationMS`[, `callback`])
**Description:**

Move left for a period of time.

**Parameters:**

####`durationMS`
Type: Number

Duration of moving time in ms.
####`callback`
Type: Function()

A function to execute when the movement is done.

###DCDriver.moveRight(`durationMS`[, `callback`])
**Description:**

Move right for a period of time.

**Parameters:**

####`durationMS`
Type: Number

Duration of moving time in ms.
####`callback`
Type: Function()

A function to execute when the movement is done.

###DCDriver.stop([`callback`])

**Parameters:**

####`callback`
Type: Function()

A function to execute when the movement is done.
###DCDriver.fire([`numberOfShoot`, `callback`])
###DCDriver.park([`callback`])
###DCDriver.execute(`commands`, `callback`)