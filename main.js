import { pxDB } from "./database.js"
import { turnDB } from "./database.js"
import { especialidadesDB } from "./database.js"
import { profesionalesDB } from "./database.js"


let turnos = JSON.parse(localStorage.getItem("turnos")) || turnDB

let pacientes = JSON.parse(localStorage.getItem("pacientes")) || pxDB

ordenarTurnos()
cargarBDTurnos()


function crearTurno(idPaciente,especialidad,profesional,fecha,hora){
    let arrayDeIDs = turnos.map( (t) =>{
        return t.id
    })
    let maximoID = Math.max(...arrayDeIDs)

    let turno = 
    {
        id: maximoID+1,
        nombre: pacientes[idPaciente].nombre,
        dni: pacientes[idPaciente].dni,
        especialidad: especialidad,
        profesional: profesional,
        fecha: fecha,
        hora: hora
    }
    turnos.push(turno)
    localStorage.setItem("turnos", JSON.stringify(turnos))
    ordenarTurnos()
    cargarBDTurnos()
}


function cargarBDTurnos() {
    let cuerpoTabla  = document.querySelector("table tbody")
    cuerpoTabla.textContent = ""

    //Itera la base de turnos y los va agregando al cuerpo de la tabla
    
    for(let i = 0;i<turnos.length;i++){
        dibujarUnTurno(i)
    } 

}

function dibujarUnTurno(i){
    let cuerpoTabla  = document.querySelector("table tbody")
    
    let nombre = document.createElement("td")
    let dni = document.createElement("td")
    let especialidad = document.createElement("td")
    let profesional = document.createElement("td")
    let fecha = document.createElement("td")
    let hora = document.createElement("td")
    let id = turnos[i].id

    nombre.textContent = `${turnos[i].nombre}`
    dni.textContent = `${turnos[i].dni}`
    especialidad.textContent = `${turnos[i].especialidad}`
    profesional.textContent = `${turnos[i].profesional}`
    fecha.textContent = `${turnos[i].fecha}`
    hora.textContent = `${turnos[i].hora}`
    
    let botonEditar = document.createElement("td")
    let iconoEditar = document.createElement("i")
    iconoEditar.classList.add("fa-solid", "fa-pen")
    botonEditar.appendChild(iconoEditar)
    
    let botonEliminar = document.createElement("td")
    let iconoEliminar = document.createElement("i")
    iconoEliminar.classList.add("fa-solid","fa-trash")
    botonEliminar.appendChild(iconoEliminar)
    
    let nuevoTurno = document.createElement("tr")
    nuevoTurno.appendChild(nombre)
    nuevoTurno.appendChild(dni)
    nuevoTurno.appendChild(especialidad)
    nuevoTurno.appendChild(profesional)
    nuevoTurno.appendChild(fecha)
    nuevoTurno.appendChild(hora)
    nuevoTurno.appendChild(botonEditar)
    nuevoTurno.appendChild(botonEliminar)

    iconoEliminar.addEventListener("click",() => {
        confirmarYEliminarTurno(id)
    })

    iconoEditar.addEventListener("click",() =>{
        editarTurno(id)
    })

    cuerpoTabla.appendChild(nuevoTurno)
}

function confirmarYEliminarTurno(id){
    Swal.fire({
        title: '¿Seguro que desea eliminar este turno?',
        text: "Esta accion no se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Turno Eliminado!',
                '',
                'success'
            )
            eliminarTurno(id)
        }
    })
}

function eliminarTurno(id){
    let indiceAEliminar = turnos.findIndex((t) => t.id == id)
        turnos.splice(indiceAEliminar,1)
        localStorage.setItem("turnos", JSON.stringify(turnos))
        cargarBDTurnos()
}

document.getElementById("agregarTurno").addEventListener("click",() => {
    formCrearTurno()
})

async function editarTurno(id){
    const {} = await Swal.fire({
        title: 'Editar Turno',
        html: editarHtmlTurnos(id),
            focusConfirm: false,
            showCancelButton: false,
            confirmButtonText: "Crear",
            confirmButtonColor: "hsl(195deg, 85%, 41%)",
            allowOutsideClick: false,
            showCloseButton: true,
        preConfirm: () => {
            let indicePx = parseInt(document.getElementById('paciente').value)
            let prof = document.getElementById('profesional').value
            let esp = document.getElementById('especialidad').value
            let fecha = document.getElementById('fecha').value
            let horario = document.getElementById('horario').value
            if(fecha !== "" && horario !== ""){
                crearTurno(indicePx,esp,prof,fecha,horario)
                eliminarTurno(id)
                taskComplete('Turno Modificado')
                //return (pacientes[indicePx].nombre + "<br>" + prof +  "<br>" + esp + "<br>" +  consultorio + "<br>" + fecha + "<br>" + horario)            
            }else{
                return false
            }       
        }
        })
    
}


function editarHtmlTurnos(id){

    let indiceDelTurnoCliqueado = turnos.findIndex((t) => t.id == id)

    //Label Paciente
    let labelPaciente = document.createElement("label")
    labelPaciente.setAttribute("for","paciente")
    labelPaciente.textContent = "Paciente"

    //Select de pacientes
    let listaPXSelect = document.createElement("select");
    for(let i = 0;i<pacientes.length;i++){
        if(turnos[indiceDelTurnoCliqueado].nombre == pacientes[i].nombre){
            listaPXSelect.innerHTML += `<option selected value="${i}">${pacientes[i].nombre}</option>` 
        }else{
            listaPXSelect.innerHTML += `<option value="${i}">${pacientes[i].nombre}</option>` 
        }  
    }
    listaPXSelect.setAttribute("id","paciente")
    listaPXSelect.setAttribute("name","paciente")

    //Lable de Especialidades
    let labelEspecialidad = document.createElement("label")
    labelEspecialidad.setAttribute("for","especialidad")
    labelEspecialidad.textContent = "Especialidad:"

    //Select de Especialidades
    let listaEspecialidades = document.createElement("select")
    for(let i = 0;i<especialidadesDB.length;i++){
        if(turnos[indiceDelTurnoCliqueado].especialidad == especialidadesDB[i]){
            listaEspecialidades.innerHTML += `<option selected value="${especialidadesDB[i]}">${especialidadesDB[i]}</option>`
        }else{
            listaEspecialidades.innerHTML += `<option value="${especialidadesDB[i]}">${especialidadesDB[i]}</option>`
        }
    }
    listaEspecialidades.setAttribute("id","especialidad")
    listaEspecialidades.setAttribute("name","especialidad")

    //Evento Si cambia el value de Especialidades => Se filtran los Profesionales
    listaEspecialidades.addEventListener("change",() => {
        let selectProfesional = document.getElementById("profesional")
        selectProfesional.innerHTML = ""
        for(let i = 0;i<profesionalesDB.length;i++){
            if(profesionalesDB[i].especialidades.includes(listaEspecialidades.value))
                selectProfesional.innerHTML += `<option value="${profesionalesDB[i].nombre}">${profesionalesDB[i].nombre}</option>`
        }
    })

    //Lable de Profesionales
    let labelProfesionales = document.createElement("label")
    labelProfesionales.setAttribute("for","profesional")
    labelProfesionales.textContent = "Profesional:"

    //Select de Profesionales
    let listaProfesionales = document.createElement("select")
    for(let i = 0;i<profesionalesDB.length;i++){
        if(profesionalesDB[i].especialidades.includes(listaEspecialidades.value))
            listaProfesionales.innerHTML += `<option value="${profesionalesDB[i].nombre}">${profesionalesDB[i].nombre}</option>`
    }
    listaProfesionales.setAttribute("id","profesional")
    listaProfesionales.setAttribute("name","profesional")

    //Label de fecha
    let labelDeFecha = document.createElement("label")
    labelDeFecha.setAttribute("for","fecha")
    labelDeFecha.textContent = "Fecha:"

    //Input de fecha
    let inputDeFecha = document.createElement("input")
    inputDeFecha.setAttribute("value",`${turnos[indiceDelTurnoCliqueado].fecha}`)
    inputDeFecha.setAttribute("type","date")
    inputDeFecha.setAttribute("id","fecha")
    inputDeFecha.setAttribute("name","fecha")


    //Label de hora
    let labelDeHora = document.createElement("label")
    labelDeHora.textContent = "Hora:"
    labelDeHora.setAttribute("for","hora")

    //Input de hora
    let inputDeHora = document.createElement("input")
    inputDeHora.setAttribute("value",`${turnos[indiceDelTurnoCliqueado].hora}`)
    inputDeHora.setAttribute("type","time")
    inputDeHora.setAttribute("id","horario")
    inputDeHora.setAttribute("name","horario")

    let container = document.createElement("div")

    container.appendChild(labelPaciente)
    container.appendChild(listaPXSelect)
    container.appendChild(labelEspecialidad)
    container.appendChild(listaEspecialidades)
    container.appendChild(labelProfesionales)
    container.appendChild(listaProfesionales)
    container.appendChild(labelDeFecha)
    container.appendChild(inputDeFecha)
    container.appendChild(labelDeHora)
    container.appendChild(inputDeHora)

    return (container)
    
    }

function crearHtmlTurnos(){
    
    //Label Paciente
    let labelPaciente = document.createElement("label")
    labelPaciente.setAttribute("for","paciente")
    labelPaciente.textContent = "Paciente"
    
    //Select de pacientes
    let listaPXSelect = document.createElement("select");
    for(let i = 0;i<pacientes.length;i++){
        listaPXSelect.innerHTML += `<option value="${i}">${pacientes[i].nombre}</option>`  
    }
    listaPXSelect.setAttribute("id","paciente")
    listaPXSelect.setAttribute("name","paciente")

    //Lable de Especialidades
    let labelEspecialidad = document.createElement("label")
    labelEspecialidad.setAttribute("for","especialidad")
    labelEspecialidad.textContent = "Especialidad:"
    
    //Select de Especialidades
    let listaEspecialidades = document.createElement("select")
    for(let i = 0;i<especialidadesDB.length;i++){
        listaEspecialidades.innerHTML += `<option value="${especialidadesDB[i]}">${especialidadesDB[i]}</option>`
    }
    listaEspecialidades.setAttribute("id","especialidad")
    listaEspecialidades.setAttribute("name","especialidad")
    
    //Evento Si cambia el value de Especialidades => Se filtran los Profesionales
    listaEspecialidades.addEventListener("change",() => {
        let selectProfesional = document.getElementById("profesional")
        selectProfesional.innerHTML = ""
        for(let i = 0;i<profesionalesDB.length;i++){
            if(profesionalesDB[i].especialidades.includes(listaEspecialidades.value))
                selectProfesional.innerHTML += `<option value="${profesionalesDB[i].nombre}">${profesionalesDB[i].nombre}</option>`
        }
    })

    //Lable de Profesionales
    let labelProfesionales = document.createElement("label")
    labelProfesionales.setAttribute("for","profesional")
    labelProfesionales.textContent = "Profesional:"

    //Select de Profesionales
    let listaProfesionales = document.createElement("select")
    for(let i = 0;i<profesionalesDB.length;i++){
        if(profesionalesDB[i].especialidades.includes(listaEspecialidades.value))
            listaProfesionales.innerHTML += `<option value="${profesionalesDB[i].nombre}">${profesionalesDB[i].nombre}</option>`
    }
    listaProfesionales.setAttribute("id","profesional")
    listaProfesionales.setAttribute("name","profesional")

    //Label de fecha
    let labelDeFecha = document.createElement("label")
    labelDeFecha.setAttribute("for","fecha")
    labelDeFecha.textContent = "Fecha:"
    
    //Input de fecha
    let inputDeFecha = document.createElement("input")
    inputDeFecha.setAttribute("value",`${new Date().toJSON().slice(0, 10)}`)
    inputDeFecha.setAttribute("type","date")
    inputDeFecha.setAttribute("id","fecha")
    inputDeFecha.setAttribute("name","fecha")
    
    
    //Label de hora
    let labelDeHora = document.createElement("label")
    labelDeHora.textContent = "Hora:"
    labelDeHora.setAttribute("for","hora")

    //Input de hora
    let inputDeHora = document.createElement("input")
    inputDeHora.setAttribute("value","09:00")
    inputDeHora.setAttribute("type","time")
    inputDeHora.setAttribute("id","horario")
    inputDeHora.setAttribute("name","horario")

    let container = document.createElement("div")

    container.appendChild(labelPaciente)
    container.appendChild(listaPXSelect)
    container.appendChild(labelEspecialidad)
    container.appendChild(listaEspecialidades)
    container.appendChild(labelProfesionales)
    container.appendChild(listaProfesionales)
    container.appendChild(labelDeFecha)
    container.appendChild(inputDeFecha)
    container.appendChild(labelDeHora)
    container.appendChild(inputDeHora)

    return (container)

}

async function formCrearTurno(){
    const {} = await Swal.fire({
        title: 'Ingresar un turno',
        html: await crearHtmlTurnos(),
            focusConfirm: false,
            showCancelButton: false,
            confirmButtonText: "Crear",
            confirmButtonColor: "hsl(195deg, 85%, 41%)",
            allowOutsideClick: false,
            showCloseButton: true,
        preConfirm: () => {
            console.log("PreConfirm")
            let indicePx = parseInt(document.getElementById('paciente').value)
            let prof = document.getElementById('profesional').value
            let esp = document.getElementById('especialidad').value
            let fecha = document.getElementById('fecha').value
            let horario = document.getElementById('horario').value
            if(fecha !== "" && horario !== ""){
                crearTurno(indicePx,esp,prof,fecha,horario)
                taskComplete('Turno creado')
                //return (pacientes[indicePx].nombre + "<br>" + prof +  "<br>" + esp + "<br>" +  consultorio + "<br>" + fecha + "<br>" + horario)            
            }else{
                return false
            }       
        }
        })
}

function taskComplete(mensaje){
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
        title: mensaje
    })
}


function ordenarTurnos(){
    let parseMDY = (string) => {
        let b = string.split("-");
        return new Date(b[2],b[0]-1,b[1]);
    }
    let parseTime = (string) => {
        let a = string.split(':');
        let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60; 
        return seconds;
    }
    

    turnos.sort(function(a,b) {
        if(a.fecha === b.fecha){
            return parseTime(a.hora) - parseTime(b.hora)
        }else{
            return parseMDY(a.fecha) - parseMDY(b.fecha);
        }
    });
}


