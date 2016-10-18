module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1/obi');
 
    var conn = mongoose.connection;

 
    var model_schema = mongoose.Schema({}, {
        strict: false,
        collection: 'sample'
    });
    var CollectionModel = conn.model('sample', model_schema);
 
    conn.on('error', function (err) {
        console.log(err);
        process.exit();
    })
    return function (req, res, next) {
        req.mongo = conn;
        //req.gfs = gfs;
        req.Collection = CollectionModel;
        next();
    }
 
};