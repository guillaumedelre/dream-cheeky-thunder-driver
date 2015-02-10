'use strict';
var __ = require('underscore'), usb = require('usb');
var DCDriver = {};

DCDriver.DEVICE_CONSTANTS = require('./device_constants.js');

DCDriver.turnOnDebugMode = function(){ 
  usb.setDebugLevel(4);
};

DCDriver.turnOffDebugMode = function(){
  usb.setDebugLevel(0);
}


var launcher = usb.findByIds(DCDriver.DEVICE_CONSTANTS.ID.VENDOR, DCDriver.DEVICE_CONSTANTS.ID.PRODUCT);

if (!launcher) {
  throw 'Launcher not found - make sure your Thunder Missile Launcher is plugged in to a USB port';
}

launcher.open();

var launcherInterface = launcher.interface(0);
if (launcherInterface.isKernelDriverActive()) {
  launcherInterface.detachKernelDriver();
}
// comment out the claim function since it's problematic in mac OS
// launcherInterface.claim();

process.on('exit', function(){
  launcherInterface.release();
  console.log("Released usb interface");
  // launcher.close();
  // console.log("Close usb");
});

function signal(cmd, durationMS, callback) {
  launcher.controlTransfer(0x21, 0x09, 0x0, 0x0, new Buffer([0x02, cmd, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
      function (data) {
        if (!__.isNumber(durationMS)) return;
        if (durationMS <= 0) {
          if (__.isFunction(callback)) callback();
          return;
        }

        __.delay(function(){ 
          if(__.isFunction(callback)) callback();
          DCDriver.stop();
        }, durationMS);
      }
  );
}

function trigger(callback, p1, p2) {
  return function () {
    callback(p1, p2);
  };
}


DCDriver.moveUp = function (durationMS, callback) {
  signal(DCDriver.DEVICE_CONSTANTS.CMD.UP, durationMS, callback);
};

DCDriver.moveDown = function (durationMS, callback) {
  signal(DCDriver.DEVICE_CONSTANTS.CMD.DOWN, durationMS, callback);
};

DCDriver.moveLeft = function (durationMS, callback) {
  signal(DCDriver.DEVICE_CONSTANTS.CMD.LEFT, durationMS, callback);
};

DCDriver.moveRight = function (durationMS, callback) {
  signal(DCDriver.DEVICE_CONSTANTS.CMD.RIGHT, durationMS, callback);
};

DCDriver.stop = function (callback) {
  if (__.isFunction(callback) && callback !== DCDriver.stop) {
    signal(DCDriver.DEVICE_CONSTANTS.CMD.STOP, 0, callback);
  } else {
    signal(DCDriver.DEVICE_CONSTANTS.CMD.STOP);
  }
};

DCDriver.fire = function (number, callback) {
  number = __.isNumber(number) && number >= 0 && number <= DCDriver.DEVICE_CONSTANTS.MISSILES.NUMBER ? number : 1;
  if (number === 0) {
    DCDriver.stop(callback);
  } else {
    signal(DCDriver.DEVICE_CONSTANTS.CMD.FIRE, DCDriver.DEVICE_CONSTANTS.MISSILES.RELOAD_DELAY_MS, trigger(DCDriver.fire, number - 1, callback));
  }
};

DCDriver.park = function (callback) {
  DCDriver.execute('l8000,d2000', callback);
};

DCDriver.execute = function (commands, callback) {
  if (__.isString(commands)) {
    DCDriver.execute(commands.split(','), callback);
  } else if (commands.length === 0) {
    DCDriver.stop(callback);
  } else {
    //FIXME: isolate function name resolving logic into module for better organization
    var shorthandTranslationMap = {
      "u": "moveUp",
      "d": "moveDown",
      "l": "moveLeft",
      "r": "moveRight",
      "s": "stop",
      "f": "fire",
      "p": "park"
    };
    var command = commands.shift();
    var func = command.length > 0 ? DCDriver[shorthandTranslationMap[command[0]]] : null;
    if (__.isFunction(func)) {
      var next = trigger(DCDriver.execute, commands, callback);
      if (func === DCDriver.park || func === DCDriver.stop) {
        func(next);
      } else {
        var number;
        try {
          number = parseInt(command.substring(1), 10);
        } catch (ignore) {
          number = null;
        }
        func(number, next);
      }
    } else {
      console.warn('Ignoring bad command: ' + command);
      DCDriver.execute(commands, callback);
    }
  }
};

module.exports = DCDriver;
