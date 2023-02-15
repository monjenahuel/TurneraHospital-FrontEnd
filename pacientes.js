import { pxDB } from "./database.js"

let pacientes = JSON.parse(localStorage.getItem("pacientes")) || pxDB

cargarBDPacientes()

document.getElementById("agregarPx").addEventListener("click",() => {
    formCrearPX()
})


function crearPX(nombre,dni,telefono,email){
    let arrayDeIDs = pacientes.map( (p) =>{
        return p.id
    })
    let maximoID = Math.max(...arrayDeIDs)
    
    let paciente = 
    {
        id: maximoID+1,
        nombre: nombre,
        dni: dni,
        telefono: telefono,
        email: email
    }
    pacientes.push(paciente)
    localStorage.setItem("pacientes", JSON.stringify(pacientes))
    cargarBDPacientes()
}


function cargarBDPacientes() {
    let cuerpoTabla  = document.querySelector("table tbody")
    cuerpoTabla.textContent = ""

    //Itera la base de px y los va agregando al cuerpo de la tabla
    for(let i = 0;i<pacientes.length;i++){
        // let plantilla = 
        // `<td>${pacientes[i].nombre}</td>
        // <td>${pacientes[i].dni}</td>
        // <td>${pacientes[i].telefono}</td>
        // <td>${pacientes[i].email}</td>
        // <td><i class="fa-solid fa-pen-to-square"></i></td>`
        // let nuevoPX = document.createElement("tr")
        // nuevoPX.innerHTML = plantilla
        // cuerpoTabla.appendChild(nuevoPX)
        dibujarUnPx(i)
    } 

}

function dibujarUnPx(i){
    let cuerpoTabla  = document.querySelector("table tbody")
    
    let nombre = document.createElement("td")
    let dni = document.createElement("td")
    let telefono = document.createElement("td")
    let email = document.createElement("td")
    let id = pacientes[i].id

    nombre.textContent = `${pacientes[i].nombre}`
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
        editarPx(id)
    })

    cuerpoTabla.appendChild(nuevoPX)
}

async function formCrearPX(){
    const {} = await Swal.fire({
        title: 'Ingresar un turno',
        html:
        `<div id="div1">
            <label for="name">Nombre y Apellido:</label>
            <input type:"text" name="name" id="name">
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
            let dni = document.getElementById('dni').value
            let telefono = document.getElementById('telefono').value
            let email = document.getElementById('email').value
            crearPX(name,dni,telefono,email)
            taskComplete()
        }
        })
}

async function editarPx(id){
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
            let dni = document.getElementById('dni').value
            let telefono = document.getElementById('telefono').value
            let email = document.getElementById('email').value
            eliminarPX(id)
            crearPX(name,dni,telefono,email)
            taskComplete()
        }
        })
}

function eliminarPX(id){
    let indiceAEliminar = pacientes.findIndex((t) => t.id == id)
        pacientes.splice(indiceAEliminar,1)
        localStorage.setItem("pacientes", JSON.stringify(pacientes))
        cargarBDPacientes()
}

function editarHtmlPX(id){

    console.log("ID del PX",id)
    console.log(pacientes.map((p) =>{
        p.dni
    }))

    let indicePXCliqueado = pacientes.findIndex((p) => p.id == id) || 0

    console.log("IndiceClickeado",indicePXCliqueado)

    //Label Paciente
    let labelPaciente = document.createElement("label")
    labelPaciente.setAttribute("for","paciente")
    labelPaciente.textContent = "Nombre y Apellido:"

    //Select de pacientes
    let inputPX = document.createElement("input");
    inputPX.setAttribute("id","paciente")
    inputPX.setAttribute("name","paciente")
    inputPX.setAttribute("value",`${pacientes[indicePXCliqueado].nombre}`)

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

