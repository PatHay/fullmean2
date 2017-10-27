var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // user: { type: String, required: true },
    // date: { type: Date, required: true },
    // time: { type: String, required: true },
    // complaint: { type: String, required: true },
    bids: [{type: Schema.Types.ObjectId, ref: 'Bid'}], //ref must be set to string inside model
   })

var product = mongoose.model('Product', ProductSchema);
// module.exports = question;