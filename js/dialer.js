/* ==========================================
   CCSOLUTION CRM V2
   PROFESSIONAL DIALER
========================================== */


let currentLead = null;

let dialerLeads = [];

let callStartTime = null;

let callTimerInterval = null;

let callSeconds = 0;



document.addEventListener("DOMContentLoaded", function(){


currentLead =
JSON.parse(localStorage.getItem("currentLead")) || null;



dialerLeads =
JSON.parse(localStorage.getItem("crmLeads")) || [];



console.log("Dialer Lead:", currentLead);



loadDialerLead();


setupCallButton();
setupHangupButton();
// ===============================
// HANG UP CALL
// ===============================

function setupHangupButton(){


const button =
document.getElementById("hangupBtn");



if(!button)
return;



button.addEventListener("click", function(){


if(!callStartTime){

alert("No active call");

return;

}



clearInterval(callTimerInterval);



let duration =
document.getElementById("callTimer").textContent;



saveCallHistory(
"Call Ended - Duration: " + duration
);



alert(
"Call ended\nDuration: " + duration
);



callStartTime = null;



});


}
setupAppointmentButton();

setupOutcomeButtons();

setupSaveButton();



});





// ===============================
// LOAD LEAD
// ===============================

function loadDialerLead(){


if(!currentLead){

console.log("No current lead");

return;

}



const company =
document.getElementById("leadCompany");


const industry =
document.getElementById("leadIndustry");


const phone =
document.getElementById("leadPhone");


const status =
document.getElementById("leadStatus");



if(company)
company.textContent =
currentLead.company || "Unknown Company";


if(industry)
industry.textContent =
currentLead.industry || "Unknown";


if(phone)
phone.textContent =
currentLead.phone || "No Phone";


if(status)
status.textContent =
currentLead.status || "NEW LEAD";


}






// ===============================
// CALL TIMER
// ===============================


function startCallTimer(){


let timer =
document.getElementById("callTimer");



if(!timer)
return;



callSeconds = 0;



clearInterval(callTimerInterval);



callTimerInterval = setInterval(function(){


callSeconds++;



let minutes =
Math.floor(callSeconds / 60);



let seconds =
callSeconds % 60;



timer.textContent =

String(minutes).padStart(2,"0")

+

":"

+

String(seconds).padStart(2,"0");



},1000);



}






// ===============================
// START CALL
// ===============================

function setupCallButton(){


const button =
document.querySelector(".call-btn");



if(!button)
return;



button.addEventListener("click", async function(){


if(!currentLead){

alert("No lead selected");

return;

}



callStartTime = new Date();



startCallTimer();



try {


const response = await fetch(

"https://ccsolution-crm.onrender.com/api/call",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

phone:currentLead.phone

})

}

);



const data =
await response.json();



alert(data.message);



saveCallHistory("Started Call");



}

catch(error){


console.error(error);


alert("Cannot connect to backend.");


}



});


}






// ===============================
// APPOINTMENT
// ===============================

function setupAppointmentButton(){


const button =
document.getElementById("appointmentBtn");



if(!button)
return;



button.onclick=function(){


if(!currentLead){

alert("No lead selected");

return;

}



localStorage.setItem(

"appointmentLead",

JSON.stringify(currentLead)

);



window.location.href="appointments.html";


};



}








// ===============================
// OUTCOME BUTTONS
// ===============================

function setupOutcomeButtons(){


const buttons =
document.querySelectorAll(".outcome-grid button");



buttons.forEach(button=>{


button.onclick=function(){


if(!currentLead){

alert("No lead selected");

return;

}



let result =
this.innerText;



currentLead.status =
result;



updateLead();



saveCallHistory(result);



alert(
"Saved: " + result
);



};


});


}








// ===============================
// SAVE
// ===============================

function setupSaveButton(){


const button =
document.querySelector(".save-btn");



if(!button)
return;



button.onclick=function(){


if(!currentLead){

alert("No lead selected");

return;

}



let notes =
document.getElementById("callNotes");



currentLead.notes =
notes ? notes.value : "";



updateLead();



alert("Lead saved");



nextLead();



};


}








// ===============================
// UPDATE DATABASE
// ===============================

function updateLead(){


let index =
dialerLeads.findIndex(

lead =>

lead.phone === currentLead.phone

);



if(index !== -1){


dialerLeads[index] =
currentLead;



localStorage.setItem(

"crmLeads",

JSON.stringify(dialerLeads)

);


}



localStorage.setItem(

"currentLead",

JSON.stringify(currentLead)

);


}








// ===============================
// NEXT LEAD
// ===============================

function nextLead(){


let index =
dialerLeads.findIndex(

lead =>

lead.phone === currentLead.phone

);



if(index !== -1 && dialerLeads[index+1]){


localStorage.setItem(

"currentLead",

JSON.stringify(

dialerLeads[index+1]

)

);



location.reload();



}

else{


alert("No more leads available");


}


}








// ===============================
// CALL HISTORY
// ===============================

function saveCallHistory(outcome){


let history =

JSON.parse(

localStorage.getItem("callHistory")

) || [];



history.push({


date:
new Date().toLocaleString(),


company:
currentLead.company,


phone:
currentLead.phone,


outcome:
outcome,


agent:
"Cesar",


notes:
currentLead.notes || ""


});



localStorage.setItem(

"callHistory",

JSON.stringify(history)

);


}








// ===============================
// SALES ASSISTANT
// ===============================

window.showScript=function(tabName,button){


document
.querySelectorAll(".script-page")
.forEach(page=>{

page.classList.remove("active");

});



document
.querySelectorAll(".assistant-tab")
.forEach(btn=>{

btn.classList.remove("active");

});



let page =
document.getElementById(tabName);



if(page)

page.classList.add("active");



if(button)

button.classList.add("active");



};