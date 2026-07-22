// ==========================================
// CCSOLUTION CRM BACKEND
// ZADARMA CALL INTEGRATION
// ==========================================


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { Api } = require("zadarma-api");



const app = express();


// Middleware

app.use(cors());

app.use(express.json());




// Port

const PORT = process.env.PORT || 5000;




// Zadarma API

const api = new Api(

    process.env.ZADARMA_KEY,

    process.env.ZADARMA_SECRET

);





// ==========================================
// TEST SERVER
// ==========================================


app.get("/", (req,res)=>{


    res.send("CCSolution Backend Running");


});






// ==========================================
// START ZADARMA CALL
// ==========================================


app.post("/api/call", async (req,res)=>{


    const phone = req.body.phone;



    if(!phone){


        return res.json({

            success:false,

            message:"Phone number missing"

        });


    }





    try{


        const result = await api.requestCallback({


            from: process.env.ZADARMA_SIP,


            to: phone


        });




        console.log(
            "Zadarma Response:",
            result
        );




        res.json({


            success:true,


            message:"Call started",


            data:result


        });



    }



    catch(error){



        console.log(

            "Zadarma Error:",

            error

        );




        res.status(500).json({


            success:false,


            message:"Zadarma call failed"


        });



    }



});






// ==========================================
// START SERVER
// ==========================================


app.listen(PORT,()=>{


    console.log(

        `CCSolution Backend running on port ${PORT}`

    );


});