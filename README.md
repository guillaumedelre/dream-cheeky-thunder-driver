dream-cheeky-thunder-driver
===========================

Nodejs API for controller dream cheeky missile launcher.
This is a reinforcement of [jackkwong's *dream-cheeky-api* library](https://github.com/jackkwong/dream-cheeky-api), which handle led.

____________________

Installation
==============
1. `npm install dream-cheeky-thunder-driver`
2. In your js file, add `var DCDriver = require('dream-cheeky-thunder-driver');`

____________________

API
==============

###DCDriver
####DCDriver.DEVICE_CONSTANTS
**Description:** 

A JS object containing constants for Dream Cheeky Thunder Launcher.

####DCDriver.turnOnDebugMode()
**Description:** 

Turn on debug mode (level 4) of USB.

####DCDriver.turnOffDebugMode()
**Description:** 

Turn off USB debug mode (ie. debug level 0).

####DCDriver.moveUp(`durationMS`[, `callback`])
**Description:**

Move up for a period of time.

**Parameters:**

#####`durationMS`
Type: Number

Duration of moving time in ms.
#####`callback`
Type: Function()

A function to execute when the movement is done.

####DCDriver.moveDown(`durationMS`[, `callback`])
**Description:**

Move down for a period of time.

**Parameters:**

#####`durationMS`
Type: Number

Duration of moving time in ms.
#####`callback`
Type: Function()

A function to execute when the movement is done.

####DCDriver.moveLeft(`durationMS`[, `callback`])
**Description:**

Move left for a period of time.

**Parameters:**

#####`durationMS`
Type: Number

Duration of moving time in ms.
#####`callback`
Type: Function()

A function to execute when the movement is done.

####DCDriver.moveRight(`durationMS`[, `callback`])
**Description:**

Move right for a period of time.

**Parameters:**

#####`durationMS`
Type: Number

Duration of moving time in ms.
#####`callback`
Type: Function()

A function to execute when the movement is done.

####DCDriver.stop([`callback`])

Stop movement immediately.

**Parameters:**

#####`callback`
Type: Function()

A function to execute when the movement is stopped.
####DCDriver.fire(`numberOfShot`[, `callback`])

Shoot for `numberOfShot` times consecutively.

**Parameters:**

#####`numberOfShot`
Type: Number

Number of shots
#####`callback`
Type: Function()

A function to execute when all the shooting is done (and when the target is utterly destroyed!).


####DCDriver.park([`callback`])

Go back to a fixed default location (leftmost and bottommost position).

**Parameters:**

#####`callback`
Type: Function()

A function to execute when all the movement is done.

####DCDriver.execute(`commands`[, `callback`])

**NOT STABLE** yet, will be improved.

Convenient method to specify a chain of commands

**Parameters:**

#####`commands`
Type: String

#####`callback`
Type: Function()

A function to execute when the chain of commands is done.

####DCDriver.led(`commands`[, `callback`])

Activate the led on th device

**Parameters:**

#####`commands`
Type: String

#####`callback`
Type: Function()

A function to execute when done.
