/* ==========================================
   CCSOLUTION CRM V2
   MAIN APPLICATION
========================================== */


// ===============================
// DATABASE
// ===============================

let leads =
JSON.parse(localStorage.getItem("crmLeads")) || [];


let appointments =
JSON.parse(localStorage.getItem("crmAppointments")) || [];



// ===============================
// PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", function(){

    loadLeads();

    loadAppointments();

    updateDashboard();

    setupSearch();

});




// ===============================
// LOAD LEADS
// ===============================


function loadLeads(){

let table=document.getElementById("leadTable");

if(!table) return;


table.innerHTML="";


leads.forEach((lead,index)=>{


let row=document.createElement("tr");


row.innerHTML=`

<td>${lead.company}</td>

<td>${lead.industry}</td>

<td>${lead.phone}</td>

<td>${lead.city}</td>

<td>${lead.state}</td>

<td>

<span class="status status-new">

${lead.status}

</span>

</td>


<td>

<button onclick="openDialer(${index})">

<i class="fa-solid fa-phone"></i>

Call

</button>

</td>

`;


table.appendChild(row);


});



let total=document.getElementById("totalLeads");


if(total){

total.textContent=leads.length;

}


}





// ===============================
// CSV IMPORT
// ===============================

let csvInput=document.getElementById("csvFile");


if(csvInput){


csvInput.addEventListener("change",function(e){


let file=e.target.files[0];


if(!file) return;



let reader=new FileReader();



reader.onload=function(event){


let rows=event.target.result.split(/\r?\n/);


// remove header
rows.shift();



rows.forEach(row=>{


if(!row.trim()) return;



let data=row.split(",");



if(data.length >= 5){


let lead={


company:data[0]?.replace(/"/g,"").trim() || "Unknown",


industry:data[1]?.replace(/"/g,"").trim() || "Unknown",


phone:data[2]?.replace(/"/g,"").trim() || "",


city:data[3]?.replace(/"/g,"").trim() || "",


state:data[4]?.replace(/"/g,"").trim() || "",


status:"Not Called"



};


leads.push(lead);


}



});



localStorage.setItem(

"crmLeads",

JSON.stringify(leads)

);



loadLeads();


updateDashboard();


alert("CSV imported successfully");



};



reader.readAsText(file);



});


}




// ===============================
// ADD LEAD
// ===============================


function saveNewLead(){


let lead={


company:companyInput.value,

industry:industryInput.value,

phone:phoneInput.value,

city:cityInput.value,

state:stateInput.value,

status:"Not Called"


};



leads.push(lead);



localStorage.setItem(

"crmLeads",

JSON.stringify(leads)

);



closeLeadModal();


loadLeads();


updateDashboard();


}




// ===============================
// LEAD MODAL
// ===============================


function openLeadModal(){


let modal=document.getElementById("leadModal");


if(modal)

modal.style.display="flex";


}



function closeLeadModal(){


let modal=document.getElementById("leadModal");


if(modal)

modal.style.display="none";


}






// ===============================
// DELETE LEADS
// ===============================


function deleteAllLeads(){


if(confirm("Delete all leads?")){


leads=[];


localStorage.removeItem("crmLeads");


loadLeads();


updateDashboard();


}


}






// ===============================
// OPEN DIALER
// ===============================


function openDialer(index){


let lead = leads[index];


console.log("Sending lead:", lead);



if(!lead){

alert("Lead not found");

return;

}



localStorage.setItem(
"currentLead",
JSON.stringify(lead)
);



window.location.href="dialer.html";


}







// ===============================
// SEARCH
// ===============================


function setupSearch(){


let search=document.querySelector(".search-box input");


if(!search) return;



search.addEventListener("keyup",function(){


let value=this.value.toLowerCase();



document.querySelectorAll("#leadTable tr")

.forEach(row=>{


row.style.display=

row.innerText.toLowerCase().includes(value)

?

""

:

"none";


});


});


}






// ===============================
// EXPORT CSV
// ===============================


function exportCSV(){


let csv="Company,Industry,Phone,City,State,Status\n";



leads.forEach(lead=>{


csv += `${lead.company},${lead.industry},${lead.phone},${lead.city},${lead.state},${lead.status}\n`;


});



let blob=new Blob(

[csv],

{type:"text/csv"}

);



let url=URL.createObjectURL(blob);



let link=document.createElement("a");


link.href=url;


link.download="ccsolution-leads.csv";


link.click();


}






// ===============================
// APPOINTMENTS
// ===============================



function loadAppointments(){


let table=document.getElementById("appointmentTable");


if(!table) return;



table.innerHTML="";



if(appointments.length===0){


table.innerHTML=`

<tr>

<td colspan="5">

No appointments yet

</td>

</tr>

`;


return;

}




appointments.forEach(app=>{


let row=document.createElement("tr");



row.innerHTML=`

<td>${app.company}</td>

<td>${app.phone}</td>

<td>${app.date}</td>

<td>${app.time}</td>

<td>

<span class="status status-interest">

${app.status}

</span>

</td>

`;



table.appendChild(row);



});



let total=document.getElementById("totalAppointments");


if(total){

total.textContent=appointments.length;

}


}





function openAppointmentModal(){


let modal=document.getElementById("appointmentModal");


if(modal)

modal.style.display="flex";


}




function closeAppointmentModal(){


let modal=document.getElementById("appointmentModal");


if(modal)

modal.style.display="none";


}






function saveAppointment(){


let appointment={


company:

document.getElementById("appointmentCompany").value,


phone:

document.getElementById("appointmentPhone").value,


date:

document.getElementById("appointmentDate").value,


time:

document.getElementById("appointmentTime").value,


status:"Pending"


};



appointments.push(appointment);



localStorage.setItem(

"crmAppointments",

JSON.stringify(appointments)

);



closeAppointmentModal();


loadAppointments();


updateDashboard();


alert("Appointment saved successfully");


}







// ===============================
// DASHBOARD
// ===============================


function updateDashboard(){


let total=document.getElementById("totalLeads");


if(total)

total.textContent=leads.length;



let apps=document.getElementById("appointmentsCount");


if(apps)

apps.textContent=appointments.length;



}







// ===============================
// LOGOUT
// ===============================


function logout(){


localStorage.clear();


window.location.href="index.html";


}