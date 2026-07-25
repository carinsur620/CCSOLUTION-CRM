// ==========================================
// CCSOLUTION CRM
// APP LOGIC
// Firebase Modular SDK
// ==========================================


import { auth, db } from "./firebase-config.js";


import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    doc,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



// ==========================================
// CHECK LOGIN
// ==========================================

onAuthStateChanged(auth, async(user)=>{


    if(!user){

        window.location.href="index.html";
        return;

    }



    const userSnap =
    await getDoc(
        doc(db,"users",user.uid)
    );



    if(userSnap.exists()){


        const data =
        userSnap.data();



        if(document.querySelector(".user-box strong")){

            document.querySelector(".user-box strong").innerText =
            data.name || "Agent";

        }



        if(document.querySelector(".user-box p")){

            document.querySelector(".user-box p").innerText =
            data.role || "Agent";

        }



        if(document.querySelector(".avatar")){

            document.querySelector(".avatar").innerText =
            (data.name || "A")
            .charAt(0)
            .toUpperCase();

        }



        if(document.getElementById("leadCount")){

            loadDashboard(user,data.role);

        }



        if(document.getElementById("leadTable")){

            loadLeads(user,data.role);

        }



    }


});





// ==========================================
// DASHBOARD
// ==========================================


async function loadDashboard(user,role){


    let leads;



    if(role==="admin"){


        leads =
        await getDocs(
            collection(db,"leads")
        );


    }else{


        const q =
        query(
            collection(db,"leads"),
            where("assignedTo","==",user.uid)
        );


        leads =
        await getDocs(q);


    }




    if(document.getElementById("leadCount")){

        document.getElementById("leadCount").innerText =
        leads.size;

    }




    const appointments =
    await getDocs(
        collection(db,"appointments")
    );



    if(document.getElementById("appointmentsCount")){

        document.getElementById("appointmentsCount").innerText =
        appointments.size;

    }




    const calls =
    await getDocs(
        query(
            collection(db,"calls"),
            where("agentId","==",user.uid)
        )
    );



    if(document.getElementById("callsToday")){

        document.getElementById("callsToday").innerText =
        calls.size;

    }


}






// ==========================================
// LOAD LEADS
// ==========================================


async function loadLeads(user,role){


    let leads;



    if(role==="admin"){


        leads =
        await getDocs(
            collection(db,"leads")
        );


    }else{


        leads =
        await getDocs(
            query(
                collection(db,"leads"),
                where(
                    "assignedTo",
                    "==",
                    user.uid
                )
            )
        );


    }



    const table =
    document.getElementById("leadTable");



    table.innerHTML="";




    if(leads.empty){


        table.innerHTML=`

        <tr>
        <td colspan="8">
        No leads assigned
        </td>
        </tr>

        `;


        return;

    }




    leads.forEach((doc)=>{


        const lead =
        doc.data();



        let assignedName =
        "Unassigned";



        if(lead.assignedTo==="XWXj9uS6RBfsR4YjH7qmwxrE2KD2"){

            assignedName="Casmel";

        }



        if(lead.assignedTo==="a8MPvebCNbZFJWHuSG6gecuBmp12"){

            assignedName="Nicson";

        }




        table.innerHTML += `


        <tr>

        <td>${lead.company || ""}</td>

        <td>${lead.industry || ""}</td>

        <td>${lead.phone || ""}</td>

        <td>${lead.city || ""}</td>

        <td>${lead.state || ""}</td>

        <td>${assignedName}</td>

        <td>${lead.status || "Not Called"}</td>


        <td>

        <button onclick="callLead('${lead.phone}')">

        <i class="fa-solid fa-phone"></i>

        Call

        </button>

        </td>


        </tr>


        `;


    });





    if(document.getElementById("totalLeads")){


        document.getElementById("totalLeads").innerText =
        leads.size;


    }



}






// ==========================================
// ADD LEAD
// ==========================================


window.saveNewLead = async function(){



    const company =
    document.getElementById("companyInput").value.trim();



    const industry =
    document.getElementById("industryInput").value.trim();



    const phone =
    document.getElementById("phoneInput").value.trim();



    const city =
    document.getElementById("cityInput").value.trim();



    const state =
    document.getElementById("stateInput").value.trim();



    const assignedTo =
    document.getElementById("assignedToInput").value;




    await addDoc(
        collection(db,"leads"),
        {

            company,
            industry,
            phone,
            city,
            state,

            assignedTo,

            status:"Not Called",

            createdAt:
            serverTimestamp()

        }
    );



    alert("Lead added successfully");

    location.reload();


};
