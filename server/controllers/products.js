var mongoose = require('mongoose');


var Bid = mongoose.model('Bid');
var Product = mongoose.model('Product');
var path = require('path');



module.exports = {
    index: function(req, res){
        Product.find({}, function(err, products){
            if (err){
                console.log(`This is the error: ${err}`);
            }
            else{
                res.json({'products': products});
            }
        })
    },
    new: function(req, res){
        var product = new Product({
            name: req.body.name,
        });
        product.save(function (err) {
            if (err) {
                console.log('something went wrong in add product');
                let errors = [];
                for (var key in err.errors){
                    errors.push(err.errors[key].message);
                }
                res.json({message: "Error", error: errors});
            } else {
                res.json({message:  "Success!", product: product});
            }
        });
    },

    // remove: function(req, res){
    //     Appointment.remove({_id: req.params.id}, function(err){
    //         // console.log(req.route)
    //         if(err){
    //             console.log("Did not delete record!");
    //             console.log(req.params.id);
    //         } else {
    //             console.log("Successfully deleted record!");
    //             res.json({message:  "Success!"});
    //         }
    //     })
    // },

    // update: function(req, res){
    //     Question.update({_id: req.params.id},
    //          {text: req.body, created_at: Date.now()},
    //         function(err){
    //         if(err){
    //             console.log("Did not edit record");
    //             console.log(err);
    //             console.log(req.body);
    //         } else {

    //             console.log("Successfully edited record!");
    //             res.json({message: "Successful edit!"});
    //         }
    //     })
    // }
}