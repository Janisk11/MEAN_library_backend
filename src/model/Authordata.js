
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/Products');
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.qofk2.mongodb.net/AngularLibrary?retryWrites=true&w=majority')
const Schema = mongoose.Schema;

var NewAuthorSchema = new Schema({
    author : String,
    imageUrl : String,
    about : String
});

var Authordata = mongoose.model('authordatas', NewAuthorSchema);                   

module.exports = Authordata;
