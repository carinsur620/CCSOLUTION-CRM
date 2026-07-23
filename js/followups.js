/* ==========================================
   CCSOLUTION CRM
   FOLLOW UPS
========================================== */

let followUps =
JSON.parse(localStorage.getItem("crmFollowUps")) || [];

document.addEventListener("DOMContentLoaded", function(){

    loadFollowUps();

});

// ===============================
// LOAD FOLLOW UPS
// ===============================

function loadFollowUps(){

    let table =
    document.getElementById("followUpTable");

    if(!table) return;

    table.innerHTML="";

    if(followUps.length===0){

        table.innerHTML=`
        <tr>
            <td colspan="5">
                No follow ups scheduled
            </td>
        </tr>
        `;

    }else{

        followUps.forEach(function(item){

            let row=document.createElement("tr");

            row.innerHTML=`

            <td>${item.company}</td>

            <td>${item.phone}</td>

            <td>${item.date}</td>

            <td>${item.time}</td>

            <td>

            <span class="status status-interest">

            ${item.status}

            </span>

            </td>

            `;

            table.appendChild(row);

        });

    }

    let today =
    document.getElementById("todayFollowUps");

    if(today){

        today.textContent=
        followUps.length;

    }

}

// ===============================
// OPEN MODAL
// ===============================

function openFollowUpModal(){

    document.getElementById("followUpModal")
    .style.display="flex";

}

// ===============================
// CLOSE MODAL
// ===============================

function closeFollowUpModal(){

    document.getElementById("followUpModal")
    .style.display="none";

}

// ===============================
// SAVE FOLLOW UP
// ===============================

function saveFollowUp(){

    let follow={

        company:
        document.getElementById("followCompany").value,

        phone:
        document.getElementById("followPhone").value,

        date:
        document.getElementById("followDate").value,

        time:
        document.getElementById("followTime").value,

        status:"Pending"

    };

    followUps.push(follow);

    localStorage.setItem(

        "crmFollowUps",

        JSON.stringify(followUps)

    );

    closeFollowUpModal();

    loadFollowUps();

    alert("Follow Up Created Successfully.");

}