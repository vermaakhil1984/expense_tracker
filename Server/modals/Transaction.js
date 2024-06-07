const mongoose = require("mongoose");
const {Schema,model}=mongoose

const TransactionSchema=new Schema({
    name:{type:String,require:true},
    price:{type:String,require:true},
    discription:{type:String,require:true},
    datetime:{type:Date,require:true}
})
const Transaction=model('Transaction',TransactionSchema)
module.exports=Transaction