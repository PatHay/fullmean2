var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BidSchema = new mongoose.Schema({
    user: { type: String, required: true },
    bid: { type: Number, required: true },
    _product: { type: Schema.Types.ObjectId, ref: 'Product' }, //ref must be set to string inside model
   })

var bid = mongoose.model('Bid', BidSchema);
// module.exports = answer;