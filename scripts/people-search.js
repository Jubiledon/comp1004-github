// connect to database
import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseURL = "https://cocezujlwiqskosnyugt.supabase.co";
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvY2V6dWpsd2lxc2tvc255dWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU0NTU1NDcsImV4cCI6MjAzMTAzMTU0N30.rChCfIZPxD6KlN2CxmuHrKbZzhP47IZrMu41IsraeH4';
const supabase = createClient(supabaseURL,apiKey);

// get inputs
let driverName = document.getElementById("name");
let licenseNumber = document.getElementById("license");
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
    if(!(driverName.value || licenseNumber.value) || (driverName.value && licenseNumber.value)){
        message.textContent = "Error";
        return;
    }

    if(driverName.value){
        const { data,error } = await supabase.from("People").select().ilike("Name",`%${driverName.value}%`);
        
        if(data.length === 0){
            message.textContent = "No results found";
            return;
        }

        displayResults(data, error);
    }   
    else if (licenseNumber.value){
        const { data,error } = await supabase.from("People").select().ilike("LicenseNumber",`%${licenseNumber.value}%`);
        
        if(data.length === 0){
            message.textContent = "No results found";
            return;
        }
        
        displayResults(data, error);
    }   

});

// helper function
function displayResults(data, error){
    message.textContent = "Search successful";
    for(let i = 0; i < data.length; i++){
        //create and style each record
        let recordDiv = document.createElement("div");
        recordDiv.style.border = "1px solid black";
        recordDiv.style.padding = "10px";
        recordDiv.style.margin = "10px";

        //store record data
        recordDiv.innerHTML = `personid: ${data[i].PersonID} <br>name: ${data[i].Name} <br>address: ${data[i].Address} <br>dob: ${data[i].DOB} <br>licensenumber: ${data[i].LicenseNumber} <br>expirydate: ${data[i].ExpiryDate}` ;
        
        //append to "results"
        results.appendChild(recordDiv);
    }
}