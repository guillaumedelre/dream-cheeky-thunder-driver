define(['usb', 'deviceConstants'], function(usb, DEVICE_CONSTANTS) {
	
	var launcher = usb.findByIds(DEVICE_CONSTANTS.ID.VENDOR, DEVICE_CONSTANTS.ID.PRODUCT);

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

	return launcher;

});