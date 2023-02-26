import { cargarPxSQL } from "./fetchPacientes.js"
import { crearPxSQL } from "./fetchPacientes.js"
import { editarPxSQL } from "./fetchPacientes.js"
import { tokenValido } from "./fetchUsuarios.js"

document.onreadystatechange = () => {
    if(!tokenValido(localStorage.getItem("token"))){
        window.stop()
        document.body.innerHTML = "<h1>INVALID TOKEN<h1>"
    }
}

let buscador = document.getElementById("buscador")

let pacientes = await cargarPxSQL(buscador.value)


DibujarBDPacientes()

document.getElementById("agregarPx").addEventListener("click",() => {
    formCrearPX()
})

buscador.addEventListener("change",() => {
    pacientes = cargarPxSQL(buscador.value)
})


async function actualizarBBDDPX(){
    pacientes = await cargarPxSQL(buscador.value) //Actualiza la referencia a la BBDD
    DibujarBDPacientes()                            //Redibuja los registros
}

async function crearPX(nombre,dni,telefono,email,apellido){
    let paciente = 
    {
        apellido: apellido,
        dni: dni,
        email: email,
        nombre: nombre,
        telefono: telefono,
        idPaciente: null
    }
    await crearPxSQL(paciente) //Sube el PX a la base de datos
    actualizarBBDDPX() // Actualiza la referencia a la Base y vuelve a dibujar los registros
}

async function editarPx(nombre,dni,telefono,email,apellido,idPaciente){
    let paciente = 
    {
        apellido: apellido,
        dni: dni,
        email: email,
        nombre: nombre,
        telefono: telefono,
        idPaciente: idPaciente
    }
    await editarPxSQL(paciente) //Edita el PX de la base de datos
    actualizarBBDDPX() // Actualiza la referencia a la Base y vuelve a dibujar los registros
}


function DibujarBDPacientes() {
    let cuerpoTabla  = document.querySelector("table tbody")
    
    cuerpoTabla.textContent = ""

    //Itera la base de px y los va agregando al cuerpo de la tabla
    for(let i = 0;i<pacientes.length;i++){
        dibujarUnPx(i)
    } 
}

function dibujarUnPx(i){
    let cuerpoTabla  = document.querySelector("table tbody")
    
    let nombre = document.createElement("td")
    let dni = document.createElement("td")
    let telefono = document.createElement("td")
    let email = document.createElement("td")
    let id = pacientes[i].idPaciente

    nombre.textContent = `${pacientes[i].nombre + " " + pacientes[i].apellido}`
    dni.textContent = `${pacientes[i].dni}`
    telefono.textContent = `${pacientes[i].telefono}`
    email.textContent = `${pacientes[i].email}`

    let botonEditar = document.createElement("td")
    let iconoEditar = document.createElement("i")
    iconoEditar.classList.add("fa-solid", "fa-pen-to-square")
    botonEditar.appendChild(iconoEditar)

    let nuevoPX = document.createElement("tr")
    nuevoPX.appendChild(nombre)
    nuevoPX.appendChild(dni)
    nuevoPX.appendChild(telefono)
    nuevoPX.appendChild(email)
    nuevoPX.appendChild(botonEditar)

    iconoEditar.addEventListener("click",() =>{
        formEditarPx(id)
    })

    cuerpoTabla.appendChild(nuevoPX)
}

async function formCrearPX(){
    const {} = await Swal.fire({
        title: 'Ingresar un turno',
        html:
        `<div id="div1">
            <label for="name">Nombre:</label>
            <input type:"text" name="name" id="name">
            <label for="apellido">Apellido:</label>
            <input type:"text" name="apellido" id="apellido">
            <label for="dni">DNI:</label>
            <input type:"number" name="dni" id="dni">
            <label for="telefono">Telefono:</label>
            <input type:"number" name="telefono" id="telefono">
            <label for="email">Email:</label>
            <input type:"email" name="email" id="email">
            `,
            focusConfirm: false,
            showCancelButton: false,
            confirmButtonText: "Crear",
            confirmButtonColor: "hsl(195deg, 85%, 41%)",
            allowOutsideClick: false,
            showCloseButton: true,
        preConfirm: () => {
            let name = document.getElementById('name').value
            let apellido = document.getElementById('apellido').value
            let dni = document.getElementById('dni').value
            let telefono = document.getElementById('telefono').value
            let email = document.getElementById('email').value
            crearPX(name,dni,telefono,email,apellido)
            taskComplete()
        }
        })
}

async function formEditarPx(id){
    const {} = await Swal.fire({
        title: 'Editar Paciente',
        html:editarHtmlPX(id),
            focusConfirm: false,
            showCancelButton: false,
            confirmButtonText: "Editar",
            confirmButtonColor: "hsl(195deg, 85%, 41%)",
            allowOutsideClick: false,
            showCloseButton: true,
        preConfirm: () => {
            let name = document.getElementById('paciente').value
            let apellido = document.getElementById('apellido').value
            let dni = document.getElementById('dni').value
            let telefono = document.getElementById('telefono').value
            let email = document.getElementById('email').value
            editarPx(name,dni,telefono,email,apellido,id)
            taskComplete()
        }
        })
}



function eliminarPX(id){
    let indiceAEliminar = pacientes.findIndex((p) => p.idPaciente == id)
        pacientes.splice(indiceAEliminar,1)
        //localStorage.setItem("pacientes", JSON.stringify(pacientes))
        actualizarBBDDPX()
}

function editarHtmlPX(id){
    let indicePXCliqueado = pacientes.findIndex((p) => p.idPaciente == id) || 0

    //Label nombre
    let labelPaciente = document.createElement("label")
    labelPaciente.setAttribute("for","paciente")
    labelPaciente.textContent = "Nombre:"

    //Select de nombre
    let inputPX = document.createElement("input");
    inputPX.setAttribute("id","paciente")
    inputPX.setAttribute("name","paciente")
    inputPX.setAttribute("value",`${pacientes[indicePXCliqueado].nombre}`)

    //Label apellido
    let labelApellido = document.createElement("label")
    labelApellido.setAttribute("for","apellido")
    labelApellido.textContent = "Apellido:"
    
    //Select de apellido
    let inputApellido = document.createElement("input");
    inputApellido.setAttribute("id","apellido")
    inputApellido.setAttribute("name","apellido")
    inputApellido.setAttribute("value",`${pacientes[indicePXCliqueado].apellido}`)

    //Lable de DNI
    let labelDNI = document.createElement("label")
    labelDNI.setAttribute("for","dni")
    labelDNI.textContent = "DNI:"

     //Select de DNI
    let inputDNI = document.createElement("input");
    inputDNI.setAttribute("id","dni")
    inputDNI.setAttribute("name","dni")
    inputDNI.setAttribute("value",`${pacientes[indicePXCliqueado].dni}`)


    //Lable de Telefono
    let labelTelefono = document.createElement("label")
    labelTelefono.setAttribute("for","telefono")
    labelTelefono.textContent = "Telefono:"

    //Select de Telefono
    let inputTelefono = document.createElement("input")
    inputTelefono.setAttribute("id","telefono")
    inputTelefono.setAttribute("name","telefono")
    inputTelefono.setAttribute("value",`${pacientes[indicePXCliqueado].telefono}`)

    //Label de email
    let labelDeEmail = document.createElement("label")
    labelDeEmail.setAttribute("for","email")
    labelDeEmail.textContent = "Email:"

    //Input de email
    let inputDeEmail = document.createElement("input")
    //inputDeEmail.setAttribute("value",``)
    inputDeEmail.setAttribute("type","email")
    inputDeEmail.setAttribute("id","email")
    inputDeEmail.setAttribute("name","email")
    inputDeEmail.setAttribute("value",`${pacientes[indicePXCliqueado].email}`)

    let container = document.createElement("div")

    container.appendChild(labelPaciente)
    container.appendChild(inputPX)
    container.appendChild(labelApellido)
    container.appendChild(inputApellido)
    container.appendChild(labelDNI)
    container.appendChild(inputDNI)
    container.appendChild(labelTelefono)
    container.appendChild(inputTelefono)
    container.appendChild(labelDeEmail)
    container.appendChild(inputDeEmail)

    return (container)
    
    }

function taskComplete(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }   
    })  
    Toast.fire({
        icon: 'success',
        title: 'Paciente cargado'
    })
}

export {pacientes as pacientes}




