// ==========================================
// CCSOLUTION CRM BACKEND
// ZADARMA CALL INTEGRATION
// ==========================================

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();


const app = express();


app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 5000;



// ==========================================
// TEST SERVER
// ==========================================

app.get("/", (req,res)=>{

    res.send("CCSolution Backend Running");

});





// ==========================================
// ZADARMA CALL
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


        const method = "/v1/request/callback/";



        const params = new URLSearchParams({

            from:"929923",

            to:phone

        });



        const signature = crypto

        .createHmac(

            "sha1",

            process.env.ZADARMA_SECRET

        )

        .update(

            method + params.toString()

        )

        .digest("base64");





        const response = await axios.post(

            "https://api.zadarma.com" + method,

            params.toString(),

            {

                headers:{

                    "Authorization":

                    process.env.ZADARMA_KEY + ":" + signature,


                    "Content-Type":

                    "application/x-www-form-urlencoded"

                }

            }

        );




        console.log(

            "Zadarma:",

            response.data

        );




        res.json({

            success:true,

            message:"Call started",

            data:response.data

        });





    }catch(error){



        console.log(

            "Zadarma Error:",

            error.response?.data || error.message

        );



        res.status(500).json({

            success:false,

            message:"Zadarma call failed",

            error:error.response?.data || error.message

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