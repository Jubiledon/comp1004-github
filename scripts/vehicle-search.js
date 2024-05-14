// connect to database
import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseURL = "https://cocezujlwiqskosnyugt.supabase.co";
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvY2V6dWpsd2lxc2tvc255dWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU0NTU1NDcsImV4cCI6MjAzMTAzMTU0N30.rChCfIZPxD6KlN2CxmuHrKbZzhP47IZrMu41IsraeH4';
const supabase = createClient(supabaseURL,apiKey);

// get inputs
let registrationNumber = document.getElementById("rego");
let submitButton = document.querySelector("button");
let message = document.getElementById("message");
let results = document.getElementById("results")

// button handler
submitButton.addEventListener("click",async () => {

    // start by making sure the "results" box is empty
    while(results.firstChild){
        results.removeChild(results.firstChild);
    }
    
    // if both fields are empty or filled
    if(!registrationNumber.value){
        message.textContent = "Error";
        return;
    }

    const { data,error } = await supabase.from("Vehicles").select().ilike("VehicleID",`%${registrationNumber.value}%`);
    
    if(data.length === 0){
        message.textContent = "No results found";
        return;
    }

    message.textContent = "Search successful";
    for(let i = 0; i < data.length; i++){
        //create and style each record
        let recordDiv = document.createElement("div");
        recordDiv.style.border = "1px solid black";
        recordDiv.style.padding = "10px";
        recordDiv.style.margin = "10px";

        //store record data
        recordDiv.innerHTML = `vehicleid: ${data[i].VehicleID} <br>make: ${data[i].Make} <br>model: ${data[i].Model} <br>colour: ${data[i].Colour}  <br>ownerid: ${data[i].OwnerID}`;
        
        //append to "results"
        results.appendChild(recordDiv);
    }

});