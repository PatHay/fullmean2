var mongoose = require('mongoose');


var Bid = mongoose.model('Bid');
var Product = mongoose.model('Product');
var path = require('path');


module.exports = {
    showAll: (req, res, next)=> {
        Product.findOne({_id: req.params.id})
        .populate('bids')
        .exec(function(err, results){
            if(err) { 
                res.json(`This is the error in showall bids ${err}`);
            } else {
                res.json(results);
            }
        })
    },
    new: (req, res, next) => {
        Product.findOne({ _id: req.params.id }, function (err, product) {
            if (err) {
                res.json(err);
            } else {
                var bid = new Bid({
                    
                    user: req.body.user,
                    bid: req.body.bid,
                    _product: req.params.id
                }
            );
                console.log(`Req.body in Bid creation`, req.body);
                bid._product = product._id;

                bid.save(function (err) {
                    product.bids.push(bid);
                    product.save(function (err) {
                        if (err) {
                            console.log('Error')
                        } else {
                            res.json("Bid successfully added to Product!")
                        }
                    })
                })
            }
        })
        // var answer = new Answer({ user: req.body.user,
        //     answer: req.body.answer,
        //     desc: req.body.desc,
        //     like: req.body.like,
        //     created_at: new Date(),
        //     _question: req.params.id });
        // answer.save(function (err, result) {
        //     if (err) {
        //         res.json(`Error in Answer ${err}`)
        //     } else {
        //         res.json(`Success in answer ${result}`);
        //     }
        // });
    },
    showOne: (req,res,next) => {
        Answer.findOne({answer: req.params.answer}, function(err, result){
            if(err) { 
                res.json(`This is the error in showall answers ${err}`);
            } else {
                res.json(`This is the result in showall answers ${results}`);
            }
        });
    },

    update: (req, res) => {
        Answer.findOne({_id: req.params.id}, (err, answer) => {
            if(answer){
                answer.like = req.body.like;
                answer.save((err) => {
                    if(err){
                        res.json(err)
                    }
                    else{
                        res.json({message: 'Answer updated!'})
                    }
                })
            }
            else{
                res.json(err)
            }
        });
    },

}