function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const submitForm = document.querySelector(".btn-submit");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".closeForm");
const modal = document.querySelector(".modal-body");
const birthdateInput = document.getElementById("birthdate");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//event to close modal
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

//close modal
function closeModal(){
  modalbg.style.display = "none";
  modal.querySelector("form").style.display = "block";
  modal.querySelector(".formResult").style.display = "none";
  resetForm(modal.querySelector("form"));
}

//resets the form and all the data-error linked to it
function resetForm(form){
  form.reset();
  form.querySelectorAll("input").forEach((input)=>input.parentElement.setAttribute("data-error-visible", false));
}

//limits the birthdate to 13 years before current date
const AGE_LIMIT = 13;
const currentDate = new Date().toISOString().split("T")[0];
birthdateInput.setAttribute("max", currentDate.split("-",1)-AGE_LIMIT+"-"+currentDate.substring(currentDate.indexOf('-') + 1));

//events to check validity of form inputs when their value changes
formData.forEach((div)=>{
  const inputs = div.querySelectorAll("input");
  inputs.forEach((input)=>input.addEventListener(
    (input.type === "radio") ? "click" : "input", 
    (val)=>checkInput(val.target))
    );
});

//event to submit form : check all inputs validity before sending
submitForm.addEventListener("click", (event)=>{
  event.preventDefault();
  let formValid = true;
  formData.forEach((div)=> !checkInput(div.querySelector("input")) && (formValid=false));
  if(formValid){
    modal.querySelector("form").style.display = "none";
    modal.querySelector(".formResult").style.display = "block";
  } 
});

//check if an input is valid and shows its data error if not valid
function checkInput(input){
  div = input.parentElement;
  const validity= input.validity.valid;
  div.setAttribute("data-error-visible", !validity);
  return validity;
}