// ===== Popup Control =====
function openAddUserPopup() {
  document.getElementById('addUserPopup').style.display = 'flex';
}

function closeAddUserPopup() {
  document.getElementById('addUserPopup').style.display = 'none';
}

// ===== Add User =====
document.getElementById('addUserForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;

  const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();

  newRow.innerHTML = `
    <td>${table.rows.length}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${username}</td>
    <td>
      <button class="icon-btn edit" title="Edit">✏️</button>
      <button class="icon-btn delete" title="Delete">🗑️</button>
      <button class="icon-btn view" title="View">📘</button>
    </td>
  `;

  document.getElementById('addUserForm').reset();
  closeAddUserPopup();
});

// ===== Search Filter =====
document.getElementById('searchInput').addEventListener('keyup', function () {
  const searchValue = this.value.toLowerCase();
  const rows = document.querySelectorAll('#userTable tbody tr');

  rows.forEach(row => {
    const name = row.cells[1].textContent.toLowerCase();
    const id = row.cells[0].textContent.toLowerCase();
    row.style.display = (name.includes(searchValue) || id.includes(searchValue)) ? '' : 'none';
  });
});
