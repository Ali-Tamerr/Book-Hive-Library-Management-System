// Close popup
document.getElementById("cancelBtn").addEventListener("click", () => {
  document.querySelector(".overlay").style.display = "none";
});

// Return action
document.getElementById("returnBtn").addEventListener("click", () => {
  alert("Books have been successfully returned!");
  document.querySelector(".overlay").style.display = "none";
});
