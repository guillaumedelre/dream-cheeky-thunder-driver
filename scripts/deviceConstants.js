define([], function(){
  
 return {
  ID: {
    VENDOR : 0x2123,
    PRODUCT: 0x1010
  },
  LED: {
      ENABLED: 0x01,
      DISABLED: 0x00
  },
  CMD: {
    LED  : 0x03,
    UP   : 0x02,
    DOWN : 0x01,
    LEFT : 0x04,
    RIGHT: 0x08,
    FIRE : 0x10,
    STOP : 0x20
  },
  MISSILES: {
    NUMBER         : 4,
    RELOAD_DELAY_MS: 4500
  }
 };

});