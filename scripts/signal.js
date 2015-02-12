define(['underscore', 'launcherUSB', 'deviceConstants'], function(__, launcher, DEVICE_CONSTANTS){
  return function signal(cmd, durationMS, callback) {
    launcher.controlTransfer(0x21, 0x09, 0x0, 0x0, new Buffer([0x02, cmd, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
        function (data) {
          var movementCommand = [
            DEVICE_CONSTANTS.CMD.UP,
            DEVICE_CONSTANTS.CMD.DOWN,
            DEVICE_CONSTANTS.CMD.LEFT,
            DEVICE_CONSTANTS.CMD.RIGHT
          ];

          if (!__.isNumber(durationMS)) return;
          if (durationMS <= 0) {
            if (__.isFunction(callback)) callback();
            return;
          }

          if (!__.contains(movementCommand, cmd)) {
            __.delay(callback, durationMS);
            return;
          }

          __.delay(function(){
            if(__.isFunction(callback)) callback();
            signal(DEVICE_CONSTANTS.CMD.STOP);
          }, durationMS);
        }
    );
  }
});
