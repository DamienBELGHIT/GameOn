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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

//close modal form
function closeModal(){
  modalbg.style.display = "none";
}

//form inputs events
formData.forEach((div)=> div.querySelector("input").addEventListener("input", (val)=>checkInput(val.target)));

//submit form event : check all inputs validity before sending
submitForm.addEventListener("click", (event)=>{
  event.preventDefault();
  valid = true;
  formData.forEach((div)=> !checkInput(div.querySelector("input")) && (valid=false));
  if(valid){
    modal.querySelector("form").style.display = "none";
    modal.querySelector(".formResult").style.display = "block";
  } 
});

//check if an input is valid and shows its data error if not valid
function checkInput(input){
  div = input.parentElement;
  if(input.validity.valid){
    div.setAttribute("data-error-visible", false);
    return true;
  }else{
    div.setAttribute("data-error-visible", true);
    return false;
  }
}