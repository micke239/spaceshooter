require(["ui/loop"], function(loop) {
	"use strict";
	
	var modelWorker = new Worker("src/model/modelWorker.js");

	loop.init(modelWorker, document.getElementById("canvas"));
	
});
