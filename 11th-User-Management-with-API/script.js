const form = document.getElementById('userForm');
const result = document.getElementById('result');
const url = 'https://jsonplaceholder.typicode.com/posts';

let users = [];
let userIdCounter = 1;


const addForm = document.getElementById('addForm');
const showAddFormBtn = document.getElementById('showAddFormBtn');

showAddFormBtn.addEventListener('click', () => {
  addForm.style.display = addForm.style.display === 'none' ? 'block' : 'none';
});

const updateForm = document.getElementById('updateForm');
const showUpdateFormBtn = document.getElementById('showUpdateFormBtn');

showUpdateFormBtn.addEventListener('click', () => {
  updateForm.style.display = updateForm.style.display === 'none' ? 'block' : 'none';
});

const deleteForm = document.getElementById('deleteForm');
const showDeleteFormBtn = document.getElementById('showDeleteFormBtn');

showDeleteFormBtn.addEventListener('click', () => {
  deleteForm.style.display = deleteForm.style.display === 'none' ? 'block' : 'none';
});


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (users.length >= 10) {
    alert("You can only add up to 10 users.");
    return;
  }

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) {
    alert("Please enter both name and email.");
    return;
  }

  const newId = userIdCounter++;
  const userData = { id: newId, name, email };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await res.json();
    data.id = newId;
    users.push(data);
    users.sort((a, b) => a.id - b.id);

    displayUsers();
    form.reset();
    addForm.style.display = 'none'; 
  } catch (err) {
    result.innerHTML = `Error: ${err.message}`;
  }
});


function displayUsers() {
  result.innerHTML = `<h3>Stored Data</h3>`;

  if (users.length === 0) {
    result.innerHTML += `<p>No users available.</p>`;
    return;
  }

  users.forEach(user => {
    result.innerHTML += `
      <div class="user">
        <strong>ID:</strong> ${user.id}<br>
        <strong>Name:</strong> ${user.name}<br>
        <strong>Email:</strong> ${user.email}
      </div>`;
  });
}


async function updateUser() {
  const id = parseInt(document.getElementById('updateId').value);
  const name = document.getElementById('updateName').value.trim();
  const email = document.getElementById('updateEmail').value.trim();

  if (!id) {
    alert("Please enter a valid ID to update.");
    return;
  }

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    alert("User not found!");
    return;
  }

  const existingUser = users[userIndex];
  const updatedData = {
    name: name || existingUser.name,
    email: email || existingUser.email
  };

  try {
    await fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });

    users[userIndex] = { ...existingUser, ...updatedData };
    users.sort((a, b) => a.id - b.id);
    displayUsers();

    updateForm.style.display = 'none';
    document.getElementById('updateId').value = '';
    document.getElementById('updateName').value = '';
    document.getElementById('updateEmail').value = '';
  } catch (err) {
    result.innerHTML = `Error: ${err.message}`;
  }
}


function deleteUser() {
  const id = parseInt(document.getElementById('deleteId').value);
  if (!id) {
    alert("Please enter a valid ID to delete.");
    return;
  }

  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    alert("User not found!");
    return;
  }

  users.splice(index, 1);

  for (let i = index; i < users.length; i++) {
    users[i].id -= 1;
  }

  userIdCounter--;
  users.sort((a, b) => a.id - b.id);

  displayUsers();

  document.getElementById('deleteId').value = '';
  deleteForm.style.display = 'none';
}


window.updateUser = updateUser;
window.deleteUser = deleteUser;
