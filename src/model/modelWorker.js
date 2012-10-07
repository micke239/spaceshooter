importScripts("../../config/globals.js");
importScripts(__basedir + "config/model-require.js");
importScripts(__basedir + "lib/require-2.0.6.js");

require(["star"], function(star) {
	
	var model = [], i, updateIntervalMs = 17, updateIntervalSeconds = updateIntervalMs / 1000;
	
	var updateModel = function() {
		var i;
		
		for (i = 0; i < model.length; i++) {
			model[i].update(updateIntervalSeconds);
		};
	};
	
	var serializedModel = function() {
		var serializedModel = [], i;
		
		for(i = 0; i < model.length; i++) {
			serializedModel.push(model[i].serialize())
		}
		
		return serializedModel;
	};
	
	var run = function() {
		var start = new Date();
		
		updateModel();
		
		self.postMessage({type:"model", data: serializedModel()});
		
		setTimeout(run, updateIntervalMs - (new Date() - start));
	};
	
	for (i = 0; i < 100; i++) {
		model.push(star());
	}
	
	self.postMessage({type:"log", data: "ModelWorker initialization complete."});
	
	run();
});

