// Variables globales
let departments = [];

// Fetch y renderizado
async function fetchDepartments() {
  try {
    const response = await fetch('/api/departments');
    departments = await response.json();
    renderTable(departments);
  } catch (error) {
    console.error('Error al obtener los departamentos:', error);
  }
}

function renderTable(data) {
  const tableBody = document.getElementById('departments-table-body');
  tableBody.innerHTML = '';

  data.forEach(department => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${department._id}</td>
      <td>${department.name}</td>
      <td>${department.numEmployees}</td>
      <td>
        <button class="edit" onclick="editDepartment('${department._id}')">Editar</button>
        <button class="delete" onclick="deleteDepartment('${department._id}')">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function filterDepartments() {
  const query = document.getElementById('search-id').value.trim();
  const filtered = query
    ? departments.filter(dept => dept._id.includes(query))
    : departments;
  renderTable(filtered);
}

// CRUD
async function deleteDepartment(id) {
  if (!confirm('¿Estás seguro de eliminar este departamento?')) return;

  try {
    const response = await fetch(`/api/departments/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error al eliminar el departamento.');

    departments = departments.filter(dept => dept._id !== id);
    renderTable(departments);
  } catch (error) {
    alert('Error al eliminar el departamento.');
    console.error(error);
  }
}

function editDepartment(id) {
  window.location.href = `UpdateDepartment.html?id=${id}`;
}

async function handleCreateDepartment(event) {
  event.preventDefault();
  const id = document.getElementById('department-id').value.trim();
  const name = document.getElementById('department-name').value.trim();
  const numEmployees = parseInt(document.getElementById('department-num-employees').value.trim(), 10);

  const resultMessage = document.getElementById('result-message');
  resultMessage.textContent = '';
  resultMessage.className = 'message';

  if (!id || !name || isNaN(numEmployees)) {
    resultMessage.textContent = 'Por favor, completa todos los campos.';
    resultMessage.classList.add('error');
    return;
  }

  try {
    const response = await fetch('/api/departments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, numEmployees }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear el departamento.');
    }

    const createdDepartment = await response.json();
    resultMessage.textContent = `Departamento "${createdDepartment.name}" creado con éxito.`;
    resultMessage.classList.add('success');
    document.getElementById('create-department-form').reset();
  } catch (error) {
    resultMessage.textContent = error.message;
    resultMessage.classList.add('error');
  }
}

async function handleUpdateDepartment(event) {
  event.preventDefault();

  const id = document.getElementById('department-id').value.trim();
  const name = document.getElementById('department-name').value.trim();
  const numEmployees = parseInt(document.getElementById('department-num-employees').value.trim(), 10);
  const resultMessage = document.getElementById('result-message');

  resultMessage.textContent = '';
  resultMessage.className = 'message';

  if (!id || !name || isNaN(numEmployees)) {
    resultMessage.textContent = 'Por favor, completa todos los campos correctamente.';
    resultMessage.classList.add('error');
    return;
  }

  try {
    const response = await fetch(`/api/departments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, numEmployees }),
    });

    if (!response.ok) throw new Error('Error al actualizar el departamento.');

    resultMessage.textContent = 'Departamento actualizado con éxito.';
    resultMessage.classList.add('success');
  } catch (error) {
    resultMessage.textContent = error.message;
    resultMessage.classList.add('error');
  }
}

// Eventos de carga
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('departments-table-body')) {
    fetchDepartments();
  }

  if (document.getElementById('create-department-form')) {
    document.getElementById('create-department-form').addEventListener('submit', handleCreateDepartment);
  }

  if (document.getElementById('update-department-form')) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    fetch(`/api/departments/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Departamento no encontrado.');
        return response.json();
      })
      .then(department => {
        document.getElementById('department-id').value = department._id;
        document.getElementById('department-name').value = department.name;
        document.getElementById('department-num-employees').value = department.numEmployees;
      })
      .catch(error => {
        const resultMessage = document.getElementById('result-message');
        resultMessage.textContent = error.message;
        resultMessage.classList.add('error');
      });

    document.getElementById('update-department-form').addEventListener('submit', handleUpdateDepartment);
  }
});
