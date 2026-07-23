const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();


app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 5000;



// TEST

app.get("/", (req,res)=>{

res.send("CCSolution Backend Running");

});




// CALL TEST

app.post("/api/call",(req,res)=>{


const phone = req.body.phone;


console.log("Calling:", phone);



res.json({

success:true,

message:"Call request received",

phone:phone

});


});




app.listen(PORT,()=>{

console.log(
`CCSolution Backend running on port ${PORT}`
);

});