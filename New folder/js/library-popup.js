// Close popup
document.getElementById("cancelBtn").addEventListener("click", () => {
  document.querySelector(".overlay").style.display = "none";
});

// Return action
document.getElementById("confirmBtn").addEventListener("click", () => {
  alert("Books have been successfully confirmed!");
  document.querySelector(".overlay").style.display = "none";
});
