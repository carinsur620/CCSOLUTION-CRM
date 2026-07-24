// ==========================================
// CCSOLUTION CRM DASHBOARD
// ==========================================

// Check login
firebase.auth().onAuthStateChanged(async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    const db = firebase.firestore();

    // Load logged user
    const userDoc = await db.collection("users")
        .doc(user.uid)
        .get();

    if(userDoc.exists){

        const data = userDoc.data();

        // User name
        if(document.querySelector(".user-box strong")){
            document.querySelector(".user-box strong").innerText =
                data.name || "Agent";
        }

        // Role
        if(document.querySelector(".user-box p")){
            document.querySelector(".user-box p").innerText =
                data.role || "Agent";
        }

        // Avatar
        if(document.querySelector(".avatar")){
            document.querySelector(".avatar").innerText =
                (data.name || "A").charAt(0).toUpperCase();
        }

        // Dashboard page
        if(document.getElementById("leadCount")){
           loadDashboard(user, data.role);
        }

        // Leads page
        if(document.getElementById("leadTable")){
            loadLeads(user,data.role);
        }

    }

});

async function loadDashboard(user, role){

    const db = firebase.firestore();

    // LEADS

    let leads;

if(role === "admin"){

    leads = await db.collection("leads").get();

}else{

    leads = await db.collection("leads")
        .where("assignedTo","==",user.uid)
        .get();

}
document.getElementById("leadCount").innerText =
    leads.size;
    // APPOINTMENTS

    const appointments = await db.collection("appointments").get();

    document.getElementById("appointmentsCount").innerText =
        appointments.size;

    // CALLS

    const calls = await db.collection("calls")
        .where("agentId","==",user.uid)
        .get();

    document.getElementById("callsToday").innerText =
        calls.size;

}
// ==========================================
// CCSOLUTION CRM
// LOAD LEADS FROM FIRESTORE
// ==========================================

async function loadLeads(user, role){

    const db = firebase.firestore();

    let leads;


    // ADMIN SEES ALL LEADS
    if(role === "admin"){

        leads = await db.collection("leads").get();

    }

    // AGENTS ONLY SEE THEIR ASSIGNED LEADS
    else{

        leads = await db.collection("leads")
            .where("assignedTo","==",user.uid)
            .get();

    }



    const table = document.getElementById("leadTable");


    table.innerHTML = "";



    if(leads.empty){

        table.innerHTML = `

        <tr>

        <td colspan="7">

        No leads assigned

        </td>

        </tr>

        `;

        return;

    }




    leads.forEach(doc=>{


        const lead = doc.data();



        let assignedName = "Unassigned";

if(lead.assignedTo === "XWXj9uS6RBfsR4YjH7qmwxrE2KD2"){
    assignedName = "Casmel";
}

if(lead.assignedTo === "a8MPvebCNbZFJWHuSG6gecuBmp12"){
    assignedName = "Nicson";
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



    // Update counter

    if(document.getElementById("totalLeads")){

        document.getElementById("totalLeads").innerText =
            leads.size;

    }


}