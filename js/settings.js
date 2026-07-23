/* ==========================================
   SETTINGS
========================================== */

document.addEventListener("DOMContentLoaded", loadSettings);

function loadSettings(){

    document.getElementById("agentName").value =
    localStorage.getItem("agentName") || "Cesar";

    document.getElementById("agentEmail").value =
    localStorage.getItem("agentEmail") || "";

    document.getElementById("companyName").value =
    localStorage.getItem("companyName") || "CCSolution";

    document.getElementById("zadarmaKey").value =
    localStorage.getItem("zadarmaKey") || "";

    document.getElementById("zadarmaSecret").value =
    localStorage.getItem("zadarmaSecret") || "";

    document.getElementById("callerID").value =
    localStorage.getItem("callerID") || "";

}

function saveSettings(){

    localStorage.setItem(
        "agentName",
        document.getElementById("agentName").value
    );

    localStorage.setItem(
        "agentEmail",
        document.getElementById("agentEmail").value
    );

    localStorage.setItem(
        "companyName",
        document.getElementById("companyName").value
    );

    localStorage.setItem(
        "zadarmaKey",
        document.getElementById("zadarmaKey").value
    );

    localStorage.setItem(
        "zadarmaSecret",
        document.getElementById("zadarmaSecret").value
    );

    localStorage.setItem(
        "callerID",
        document.getElementById("callerID").value
    );

    alert("Settings Saved Successfully.");

}