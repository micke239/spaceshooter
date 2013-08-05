define(["../../../lib/signals"], function(Signal) {
  return {
    keyup: {
      forward: new Signal(),
      left: new Signal(),
      right: new Signal(),
      back: new Signal(),
      fire: new Signal()
    },
    keydown: {
      forward: new Signal(),
      left: new Signal(),
      right: new Signal(),
      back: new Signal(),
      fire: new Signal()      
    },
    modelUpdate: new Signal(),
    modelSerialization: new Signal(),
    modelCleanup: new Signal()
  };
});