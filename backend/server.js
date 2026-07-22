const express = require("express");
const cors = require("cors");
const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();
const { Api } = require("zadarma-api");

const app = express();


app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 5000;
const api = new Api(
    process.env.ZADARMA_KEY,
    process.env.ZADARMA_SECRET
);


// TEST

app.get("/", (req,res)=>{

res.send("CCSolution Backend Running");

});




// ===============================
// ZADARMA CALL
// ===============================

app.post("/api/call", async (req,res)=>{

const phone = req.body.phone;


if(!phone){

return res.json({

success:false,

message:"Phone number missing"

});

}


try{


const key = process.env.ZADARMA_KEY;

const secret = process.env.ZADARMA_SECRET;


// Zadarma API endpoint

const method = "/v1/request/callback/";



const params = {

from: process.env.ZADARMA_SIP,

to: phone

};



const queryString = new URLSearchParams(params).toString();



const signature = crypto

.createHmac("sha1", secret)

.update(method + queryString)

.digest("base64");



const response = await axios.post(

"https://api.zadarma.com" + method,

queryString,

{

headers:{

"Authorization":

key + ":" + signature,

"Content-Type":

"application/x-www-form-urlencoded"

}

}

);



console.log("Zadarma Response:", response.data);



res.json({

success:true,

message:"Call started",

data:response.data

});



}

catch(error){


console.log(

"Zadarma Error:",

error.response?.data || error.message

);



res.status(500).json({

success:false,

message:"Zadarma call failed"

});


}


});