define(["log.conf"], function(conf) {
	"use strict";

    var infoMode = "info", debugMode = "debug", errorMode = "error";

    var log = function(mode, msg) {
        if (console && ("log" in console)) {
            var msgConcat = [];
            msgConcat.push(new Date().toString(), " - ", mode, " - ", msg);
            console.log(msgConcat.join(""));
        }
    };

    var info = function(msg) {
        if (conf.level >= 0) {
            log(infoMode, msg);
        }
    };

    var debug = function(msg) {
        if (conf.level >= 1) {
            log(debugMode, msg);
        }
    };
    
    var error = function(msg) {
        if (conf.level >= 2) {
            log(errorMode, msg);
        }
    };

    return {
        info : info,
        debug : debug,
        error : error
    };
});
