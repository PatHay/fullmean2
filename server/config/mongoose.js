var mongoose = require('mongoose');

var fs = require('fs'); // module for loading models

var path = require('path'); // for getting models path
var models_path = path.join(__dirname, './../models'); // var that points to the path where all models live

mongoose.connect('mongodb://localhost/Test4');



fs.readdirSync(models_path).forEach(function(file){  // read all of the files in the models_path and require (run) each of the javascript files
    if(file.indexOf('.js') >= 0){
        require(models_path + '/' + file);  // require the file (this runs the model file which registers the schema)
    }
});