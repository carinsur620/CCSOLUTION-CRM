/* ==========================================
   CALL HISTORY
========================================== */

let history =
JSON.parse(localStorage.getItem("callHistory")) || [];

document.addEventListener("DOMContentLoaded", loadHistory);

function loadHistory(){

    let table =
    document.getElementById("historyTable");

    if(!table) return;

    table.innerHTML="";

    if(history.length===0){

        table.innerHTML=`
        <tr>
        <td colspan="5">
        No calls yet
        </td>
        </tr>
        `;

        return;

    }

    history.reverse().forEach(call=>{

        let row=document.createElement("tr");

        row.innerHTML=`

        <td>${call.date}</td>

        <td>${call.company}</td>

        <td>${call.phone}</td>

        <td>

        <span class="status status-interest">

        ${call.outcome}

        </span>

        </td>

        <td>${call.agent}</td>

        `;

        table.appendChild(row);

    });

}