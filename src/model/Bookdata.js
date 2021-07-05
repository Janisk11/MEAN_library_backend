
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/Products');
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.qofk2.mongodb.net/AngularLibrary?retryWrites=true&w=majority')
const Schema = mongoose.Schema;

var NewBookSchema = new Schema({
    title: String,
    author : String,
    genere : String,
    imageUrl : String
});

var Bookdata = mongoose.model('bookdatas', NewBookSchema);                   

module.exports = Bookdata;
