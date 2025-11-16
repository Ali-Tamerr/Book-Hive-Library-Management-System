const overlay = document.querySelector(".overlay");
const closePopup = document.getElementById("closePopup");
const cancelBtn = document.getElementById("cancelBtn");
const form = document.getElementById("credentialsForm");

closePopup.addEventListener("click", () => {
  overlay.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const current = document.getElementById("currentPassword").value.trim();
  const newPass = document.getElementById("newPassword").value.trim();
  const confirm = document.getElementById("confirmPassword").value.trim();

  if (newPass !== confirm) {
    alert("New passwords do not match!");
    return;
  }

  if (!current || !newPass) {
    alert("Please fill all fields!");
    return;
  }

  alert("Credentials changed successfully!");
  overlay.style.display = "none";
});
