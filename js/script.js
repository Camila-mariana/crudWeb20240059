const API_URL = "https://retoolapi.dev/tViGRM/Integrantes"
async function obtenerIntegrantes() {
    const respuesta = await fetch(API_URL);
    const data = await respuesta.json();
    mostrarDatos(data);
}

function mostrarDatos(datos) {
    const tabla = document.querySelector("#tabla tbody")

    tabla.innerHTML = "";
    datos.forEach(integrante => (
        tabla.innerHTML += `
        <tr>
            <td>${integrante.id}</td>
            <td>${integrante.nombre}</td>
            <td>${integrante.apellido}</td>
            <td>${integrante.correo}</td>
            <td>
                <button>Editar</button>
                <button onclick="EliminarPersona(${integrante.id})">Eliminar</button>
            </td>
        </tr>
        `
    ));


}
obtenerIntegrantes();


const modal = document.getElementById("mdAgregar");
const btnAgregar = document.getElementById("btnAgregar");
const btnCerrar = document.getElementById("btnCerrar");

btnAgregar.addEventListener("click", () => { modal.showModal() });
btnCerrar.addEventListener("click", () => { modal.close() });

document.getElementById("frmAgregar").addEventListener("submit", async e => {
    // "e" Representa a submit. Evita que el fomulario se envie solo
    e.preventDefault;
    //Capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();

    if (!nombre || !apellido || !correo) {
        alert("Ingrese los valores en blanco")
        return; // Para evitar que los datos se envien y lo envia al bloque de codigo principal
    }

    const respuesta = await fetch(API_URL,
        {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({nombre, apellido, correo})

        });

        //verificar si la api responde a los datos que fueron enviados correctamente
        if(respuesta.ok){
            alert("El registro fue agregado correctamente");
        
            //limpiar formulario
            document.getElementById("frmAgregar").reset();

            //cerrar el modal
            modal.close();

            //Recargar la tabla
            obtenerIntegrantes();

        }
        else{
            //en caso que la api devuelva un codigo diferente a 200-299
            alert("El registro no pudo ser agregado");
     
        }
});


//funion para borrar registros
async function EliminarPersona(id){
    const confirmacion = confirm("¿Realmente deseas eliminar el registro?");

    //Validamos si el usario si eligio borrar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        //Recargar la tabla
        obtenerIntegrantes();

    }
}