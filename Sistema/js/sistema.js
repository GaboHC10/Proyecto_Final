window.onload = () => {
  if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
  }
};

const headers = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem('token')
  }
};

const url = 'http://localhost:4000/empleado';

function obtenerDatos() {
  return {
    cNombre: document.getElementById('nombre').value,
    cApellidos: document.getElementById('apellidos').value,
    cTelefono: document.getElementById('telefono').value,
    cCorreo: document.getElementById('correo').value,
    cDireccion: document.getElementById('direccion').value,
  };
}

async function agregarEmpleado() {
  const data = obtenerDatos();
  try {
    const res = await axios.post(url, data, headers);
    alert(res.data.message);
  } catch (e) {
    alert("Error al agregar");
  }
}

async function modificarEmpleado() {
  const id = document.getElementById('id').value;
  if (!id) return alert("Ingresa el ID");
  const data = obtenerDatos();
  try {
    const res = await axios.put(`${url}/${id}`, data, headers);
    alert(res.data.message);
  } catch (e) {
    alert("Error al modificar");
  }
}

async function eliminarEmpleado() {
  const id = document.getElementById('eliminarId').value;
  if (!id) return alert("Ingresa el ID");
  try {
    const res = await axios.delete(`${url}/${id}`, headers);
    alert(res.data.message);
  } catch (e) {
    alert("Error al eliminar");
  }
}

async function buscarEmpleado() {
  const name = document.getElementById('buscarNombre').value;
  try {
    const res = await axios.get(`${url}/nombre/${name}`, headers);
    mostrarResultados(res.data.message);
  } catch (e) {
    document.getElementById('resultado').innerText = 'No encontrado';
  }
}

function mostrarResultados(empleados) {
  if (!empleados || empleados.length === 0) {
    document.getElementById('resultado').innerHTML = '<div class="alert alert-warning">No hay empleados encontrados</div>';
    return;
  }

  let html = `
    <table class="table table-bordered table-hover table-striped align-middle mt-3">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Dirección</th>
        </tr>
      </thead>
      <tbody>
  `;

  empleados.forEach(emp => {
    html += `
      <tr>
        <td>${emp.nEmpleadoID}</td>
        <td>${emp.cNombre}</td>
        <td>${emp.cApellidos}</td>
        <td>${emp.cTelefono}</td>
        <td>${emp.cCorreo}</td>
        <td>${emp.cDireccion}</td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  document.getElementById('resultado').innerHTML = html;
}

