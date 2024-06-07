const express =require('express')
const app=express()
const cors=require("cors")
const Transaction=require('./modals/Transaction')
require('dotenv').config()
const mongoose = require('mongoose')
//middlewares
app.use(cors())
app.use(express.json())

//mongodb connection
 mongoose.connect(process.env.MONGO_URL)
 .then(()=>console.log ("db connected"))
 //post api

app.post('/api/transaction',async(req,res)=>{ 
   try {
    const transData=new Transaction(req.body)
    if(!transData){
        return res.json({
            mesage:"transaction failed",
            success:false
        })  
    }
    const savedData= await transData.save()
    console.log(savedData)
    res.json(savedData)
   } catch (error) {
    console.log(error)
   }
})
//get api 
app.get('/api/transaction',async(req,res)=>{
    try {
       const transData= await Transaction.find({})
        res.json(transData)

    } catch (error) {
        console.log(error)
    }
})

port=process.env.PORT || 8000

app.listen(port,()=>{
    console.log ("server is running")
})
//
//email =moneytracker
//password=hg0hodn1NSb8qqmb