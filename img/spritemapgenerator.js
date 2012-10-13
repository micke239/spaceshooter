var fs = require("fs"), 
	regexp = /([^\s]+(\.(jpg|png|gif|bmp|jpeg|tiff))$)/i, bytesRead,
	files, len, buf, fd, stat, size, i,
	bufferSize = 16324, read, hexString,
	spriteMap = {};
	
var mimeType = {
	"png" : "image/png",
	"jpg" : "image/jpeg",
	"jpeg" : "image/jpeg", 
	"gif" : "image/gif",
	"bmp" : "image/bmp",
	"tiff" : "image/tiff"
}

var defaultMime = mimeType.png;

files = fs.readdirSync(__dirname); 
len = files.length;
for (i = 0; i < len; i++) {
	if (regexp.test(files[i])) {
		buf = new Buffer(bufferSize);
		fd = fs.openSync(files[i], "r");
		
		stat = fs.fstatSync(fd);
		size = stat.size;

		process.stdout.write("Preparing to read " + files[i] + " with size " + size + " ... ");
		
		hexString = ""; read = 0;
		while (read != size) {	
			bytesRead = fs.readSync(fd, buf, 0, bufferSize, read);
			
			hexString += buf.toString("base64");
			
			read += bytesRead;
		}

		spriteMap[files[i].substr(0, files[i].lastIndexOf('.')) || files[i]] = {
			mimeType: mimeType[(files[i].substr(files[i].lastIndexOf('.')+1, files[i].length)).toLowerCase()] || defaultMime, 
			data: hexString
		};
		
		process.stdout.write("Read " + files[i] + " and successfully created its object!\n");
	}
}

var returnString = "define(function() { return " + JSON.stringify(spriteMap) + "; });"

fs.writeFile("spritemap.js", returnString, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("spritemap.js created!");
    }
}); 

