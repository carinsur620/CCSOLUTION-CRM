/* ==========================================
   ANALYTICS
========================================== */

document.addEventListener("DOMContentLoaded", loadAnalytics);

function loadAnalytics(){

    const leads =
    JSON.parse(localStorage.getItem("crmLeads")) || [];

    const history =
    JSON.parse(localStorage.getItem("callHistory")) || [];

    const appointments =
    JSON.parse(localStorage.getItem("crmAppointments")) || [];

    const followUps =
    JSON.parse(localStorage.getItem("crmFollowUps")) || [];

    document.getElementById("analyticsLeads").textContent =
    leads.length;

    document.getElementById("analyticsCalls").textContent =
    history.length;

    document.getElementById("analyticsAppointments").textContent =
    appointments.length;

    document.getElementById("analyticsFollowUps").textContent =
    followUps.length;

    let conversion = 0;

    if(history.length>0){

        conversion =
        Math.round((appointments.length/history.length)*100);

    }

    let appointmentRate = 0;

    if(leads.length>0){

        appointmentRate =
        Math.round((appointments.length/leads.length)*100);

    }

    document.getElementById("conversionRate").textContent =
    conversion + "%";

    document.getElementById("appointmentRate").textContent =
    appointmentRate + "%";

    document.getElementById("callRate").textContent =
    history.length;

}