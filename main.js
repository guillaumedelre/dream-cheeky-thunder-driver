  'use strict';
  var __ = require('underscore'), usb = require('usb');
  var DCDriver = {};

  var DEVICE = {
    ID: {
      VENDOR : 0x2123,
      PRODUCT: 0x1010
    },

    CMD: {
      UP   : 0x02,
      DOWN : 0x01,
      LEFT : 0x04,
      RIGHT: 0x08,
      FIRE : 0x10,
      STOP : 0x20,
      RESET: 'l8000,d2000'
    },

    MISSILES: {
      NUMBER         : 4,
      RELOAD_DELAY_MS: 4500
    }
  };

  DCDriver.DEVICE_CONSTANTS = DEVICE;
  
  DCDriver.turnOnDebugMode = function(){ 
    usb.setDebugLevel(4);
  };


  var launcher = usb.findByIds(DEVICE.ID.VENDOR, DEVICE.ID.PRODUCT);

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

  // duration in ms
  function signal(cmd, duration, callback) {
    launcher.controlTransfer(0x21, 0x09, 0x0, 0x0, new Buffer([0x02, cmd, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
        function (data) {
          if (__.isNumber(duration)) {
            __.delay(__.isFunction(callback) ? callback : function(){ DCDriver.stop() }, duration);
          }
        }
    );
  }

  function trigger(callback, p1, p2) {
    return function () {
      callback(p1, p2);
    };
  }


  DCDriver.moveUp = function (duration, callback) {
    signal(DEVICE.CMD.UP, duration, callback);
  };

  DCDriver.moveDown = function (duration, callback) {
    signal(DEVICE.CMD.DOWN, duration, callback);
  };

  DCDriver.moveLeft = function (duration, callback) {
    signal(DEVICE.CMD.LEFT, duration, callback);
  };

  DCDriver.moveRight = function (duration, callback) {
    signal(DEVICE.CMD.RIGHT, duration, callback);
  };

  DCDriver.stop = function (callback) {
    if (__.isFunction(callback) && callback !== DCDriver.stop) {
      signal(DEVICE.CMD.STOP, 0, callback);
    } else {
      signal(DEVICE.CMD.STOP);
    }
  };

  DCDriver.fire = function (number, callback) {
    number = __.isNumber(number) && number >= 0 && number <= DEVICE.MISSILES.NUMBER ? number : 1;
    if (number === 0) {
      DCDriver.stop(callback);
    } else {
      signal(DEVICE.CMD.FIRE, DEVICE.MISSILES.RELOAD_DELAY_MS, trigger(DCDriver.fire, number - 1, callback));
    }
  };

  DCDriver.park = function (callback) {
    DCDriver.execute(DEVICE.CMD.RESET, callback);
  };

  DCDriver.execute = function (commands, callback) {
    if (__.isString(commands)) {
      DCDriver.execute(commands.split(','), callback);
    } else if (commands.length === 0) {
      DCDriver.stop(callback);
    } else {
      var command = commands.shift(), func = command.length > 0 ? DCDriver[command[0]] : null;
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