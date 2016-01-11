define(['underscore', 'launcherUSB', 'deviceConstants'], function(__, launcher, DEVICE_CONSTANTS){
    return function led(cmd, callback) {
        var durationMS = 100;
        launcher.controlTransfer(0x21, 0x09, 0x0, 0x0, new Buffer([0x03, cmd, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
            function (data) {
                var ledCommand = [
                    DEVICE_CONSTANTS.LED.ENABLED,
                    DEVICE_CONSTANTS.LED.DISABLED
                ];

                if (!__.isNumber(durationMS)) return;
                if (durationMS <= 0) {
                    if (__.isFunction(callback)) callback();
                    return;
                }

                if (!__.contains(ledCommand, cmd)) {
                    __.delay(callback, durationMS);
                    return;
                }

                __.delay(function(){
                    if(__.isFunction(callback)) callback();
                    led(DEVICE_CONSTANTS.LED.DISABLED);
                }, durationMS);
            }
        );
    }
});
