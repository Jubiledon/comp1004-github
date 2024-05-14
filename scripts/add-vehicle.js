// connect to database
import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseURL = "https://cocezujlwiqskosnyugt.supabase.co";
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvY2V6dWpsd2lxc2tvc255dWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU0NTU1NDcsImV4cCI6MjAzMTAzMTU0N30.rChCfIZPxD6KlN2CxmuHrKbZzhP47IZrMu41IsraeH4';
const supabase = createClient(supabaseURL,apiKey);

// add vehicle inputs
let registrationNumber = document.getElementById("rego");
let make = document.getElementById("make");
let model = document.getElementById("model");
let colour = document.getElementById("colour");
let owner = document.getElementById("owner");
let addVehicleButton = document.getElementById("add-vehicle-button");

// add owner inputs
let addOwnerForm = document.getElementById("add-owner-form");
let personid = document.getElementById("personid");
let name = document.getElementById("name");
let address = document.getElementById("address");
let dob = document.getElementById("dob");
let license = document.getElementById("license");
let expire = document.getElementById("expire");
let addOwnerButton = document.getElementById("add-owner-button");

// add-vehicle button handler
addVehicleButton.addEventListener("click",async () => {
    
    // if any of the input fields are empty
    if(!(registrationNumber.value && make.value && model.value && colour.value && owner.value)){
        message.textContent = "Error";
        return;
    }

    // add validation to ensure that "owner" is an int
    if (!parseInt(owner.value)){
        message.textContent = "Owner must be a number";
        return;
    }
    
    // check if vehicle already exists
    else{
        const {data,error} = await supabase.from("Vehicles").select().eq("VehicleID",`${registrationNumber.value}`);
        console.log(data);
        if (data.length !== 0){
        message.textContent = "Vehicle already exists";
        return;
        }
    }
  
    // check if personid does not exist
    const { data,error } = await supabase.from("People").select().eq("PersonID",`${owner.value}`);
    if(data.length === 0){
        addOwnerForm.style.display = "block";
        addVehicleButton.style.display = "none";
        addVehicleButton.disabled = true;
        personid.value = owner.value;

        // add-owner button handler
        addOwnerButton.addEventListener("click", async () => {

            // if any input fields are empty
            if(!(name.value && address.value && dob.value && license.value && expire.value)){
                message.textContent = "Error";
                return;
            }

            const {error } = await supabase.from("People").insert({PersonID: personid.value, Name: name.value, Address: address.value, DOB: dob.value, LicenseNumber: license.value, ExpiryDate: expire.value});
            addVehicle();
       });
    }
    
    // if person exists, add vehicle successfully
    addVehicle();
});

// helper function
async function addVehicle(){
    const {error } = await supabase.from("Vehicles").insert({VehicleID: registrationNumber.value, Make:make.value, Model:model.value, Colour:colour.value, OwnerID:owner.value});
    message.textContent = "Vehicle Added Successfully";
    return;
}