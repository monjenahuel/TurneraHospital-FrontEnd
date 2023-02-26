import { cargarEspecialidadesSQL } from "./fetchEspecialidades.js"
import { cargarPxSQL } from "./fetchPacientes.js"
import { cargarTurnosSQL } from "./fetchTurnos.js"
import { crearTurnoSQL } from "./fetchTurnos.js"
import { eliminarTurnoSQL} from "./fetchTurnos.js"
import { profWEsp } from "./fetchEspecialidades.js"
import { editarTurnoSQL } from "./fetchTurnos.js"
import { tokenValido } from "./fetchUsuarios.js"

//Validacion del token
document.onreadystatechange = () => {
        if(!tokenValido(sessionStorage.getItem("token"))){
            window.stop()
            document.body.innerHTML = "<h1>INVALID TOKEN<h1>"
        }
    }

//Buscador
let buscador = document.querySelector("#search")
buscador.addEventListener("input",async () => {
turnos = await cargarTurnosSQL(buscador.value)
cargarBDTurnos()
})

let switchTurnos = document.querySelector("#switch-1");

switchTurnos.addEventListener('change', async () => {
if (switchTurnos.checked) {
    turnos = await cargarTurnosSQL(buscador.value)
    cargarBDTurnos()
  } else {
    let currentDate = new Date().toJSON().slice(0, 10);

    let tratandoDeFiltrar = await cargarTurnosSQL(buscador.value)

    turnos = tratandoDeFiltrar.filter( t => t.fechaHora.slice(" ",10) == currentDate)
    cargarBDTurnos()
  }
});



let especialidadesDB = await cargarEspecialidadesSQL();

let turnos = await cargarTurnosSQL()

let pacientes = await cargarPxSQL()


cargarBDTurnos()


async function crearTurno(idPx,idesp,idprof,fechaHora){
    let turno = 
    {
        id: null,
        idPX: idPx,
        idEsp: idesp,
        idProf: idprof,
        fechaHora: fechaHora
    }
    console.log(turno)
    await crearTurnoSQL(turno)
    actualizarRegistros()
    
    
}

async function editarTurno(id,idPX,idEsp,idProf,fechaHora){
    let turno = 
    {
        id: id,
        idPX: idPX,
        idEsp: idEsp,
        idProf: idProf,
        fechaHora: fechaHora
    }
    await editarTurnoSQL(turno)
    actualizarRegistros()
    
}

async function actualizarRegistros(){
    turnos = await cargarTurnosSQL()
    cargarBDTurnos()
}

function cargarBDTurnos() {
    let cuerpoTabla  = document.querySelector("table tbody")
    cuerpoTabla.textContent = ""

    //Itera la base de turnos y los va agregando al cuerpo de la tabla
    let arrayDeFechas = []
    
    for(let i = 0;i<turnos.length;i++){
        dibujarUnTurno(i,arrayDeFechas)
    } 

}

function dibujarUnTurno(i,array){
    let cuerpoTabla  = document.querySelector("table tbody")
    
    let nombre = document.createElement("td")
    let dni = document.createElement("td")
    let especialidad = document.createElement("td")
    let profesional = document.createElement("td")
    let fecha = document.createElement("td")
    let hora = document.createElement("td")
    let id = turnos[i].id

    nombre.textContent = `${turnos[i].nombrePX + " " + turnos[i].apellidoPX}`
    dni.textContent = `${turnos[i].dniPX}` 
    especialidad.textContent = `${turnos[i].especialidad}`
    profesional.textContent = `${turnos[i].profesional}`
    fecha.textContent = `${turnos[i].fechaHora.split(" ",2)[0]}`
    hora.textContent = `${turnos[i].fechaHora.split(" ",2)[1].match(/\d\d:\d\d/)}` //Matchea con expresiones regulares el formato HH:mm
    
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
        formEditarTurno(id)
    })

    let fechaIteracion = turnos[i].fechaHora.split(" ",2)[0]
    if(!array.includes(fechaIteracion)){
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        td.innerHTML = `<p>${fechaIteracion}</p>`
        tr.setAttribute("class","trFecha")
        td.setAttribute("class","tdFecha")


        array.push(fechaIteracion)
        tr.appendChild(document.createElement("td"))
        tr.appendChild(document.createElement("td"))
        tr.appendChild(document.createElement("td"))
        td.innerHTML = `<p>${fechaIteracion}</p>`
        tr.appendChild(td)
        tr.appendChild(document.createElement("td"))
        tr.appendChild(document.createElement("td"))
        tr.appendChild(document.createElement("td"))
        tr.appendChild(document.createElement("td"))
        cuerpoTabla.appendChild(tr)
        cuerpoTabla.appendChild(nuevoTurno)
    }else{
        cuerpoTabla.appendChild(nuevoTurno)
    }
    
    // let fechaIteracion = turnos[i].fechaHora.split(" ",2)[0]
    // if(!array.includes(fechaIteracion)){
    //     let div = document.createElement("div")
    //     div.innerHTML = `<p>${fechaIteracion}</p>`
    //     div.setAttribute("class","divFecha")
    //     div.appendChild(nuevoTurno)
    //     array.push(fechaIteracion)
    //     console.log("Creado div")
    //     cuerpoTabla.appendChild(div)
    // }else{
    //     console.log("Ya existe div del dia")
    //     cuerpoTabla.appendChild(nuevoTurno)
    // }
   
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

async function eliminarTurno(id){
    await eliminarTurnoSQL(id)
    actualizarRegistros()
}

document.getElementById("agregarTurno").addEventListener("click",() => {
    formCrearTurno()
})

async function formEditarTurno(id){
    const {} = await Swal.fire({
        title: 'Editar Turno',
        html: await editarHtmlTurnos(id),
            focusConfirm: false,
            showCancelButton: false,
            confirmButtonText: "Editar",
            confirmButtonColor: "hsl(195deg, 85%, 41%)",
            allowOutsideClick: false,
            showCloseButton: true,
        preConfirm: () => {
            let idPx = parseInt(document.getElementById('paciente').value)
            let idProf = parseInt(document.getElementById('profesional').value)
            let idEsp = parseInt(document.getElementById('especialidad').value)
            
            let fecha = document.getElementById('fecha').value
            let horario = document.getElementById('horario').value

            let fechaHora = fecha + " " + horario
            
            let arrayDeParametros = [id,idPx,idEsp,idProf,fecha,horario]

            if(!arrayDeParametros.includes(" ") && !arrayDeParametros.includes("") ){
                editarTurno(id,idPx,idEsp,idProf,fechaHora)
                taskComplete('Turno Modificado')
            }else{
                return false
            }       
        }
        })
    
}

async function editarHtmlTurnos(id){
    let indiceClickeado = turnos.findIndex((t) => t.id == id)
    let turnoClickeado = turnos[indiceClickeado]


    //Label Paciente
    let labelPaciente = document.createElement("label")
    labelPaciente.setAttribute("for","paciente")
    labelPaciente.textContent = "Paciente"
        
    //Select de pacientes
    let listaPXSelect = document.createElement("select");
    for(let i = 0;i<pacientes.length;i++){
        if(pacientes[i].apellido == turnoClickeado.apellidoPX && pacientes[i].nombre == turnoClickeado.nombrePX){
            listaPXSelect.innerHTML += `<option selected value="${pacientes[i].id}">${pacientes[i].apellido + " " +pacientes[i].nombre}</option>`
        }else{
            listaPXSelect.innerHTML += `<option value="${pacientes[i].id}">${pacientes[i].apellido + " " +pacientes[i].nombre}</option>`
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
        if(especialidadesDB[i].nombre == turnoClickeado.especialidad){
            listaEspecialidades.innerHTML += `<option selected value="${especialidadesDB[i].id}">${especialidadesDB[i].nombre}</option>`
        }else{
            listaEspecialidades.innerHTML += `<option value="${especialidadesDB[i].id}">${especialidadesDB[i].nombre}</option>`
        }
    }

    listaEspecialidades.setAttribute("id","especialidad")
    listaEspecialidades.setAttribute("name","especialidad")
    
    //Evento Si cambia el value de Especialidades => Se filtran los Profesionales
    let profFiltrados = await profWEsp(listaEspecialidades.value)

    
    listaEspecialidades.addEventListener("change",async () => {
        let selectProfesional = document.getElementById("profesional")
        selectProfesional.innerHTML = " "
        profFiltrados = await profWEsp(listaEspecialidades.value)        
        for(let i = 0;i<profFiltrados.length;i++){
            selectProfesional.innerHTML += `<option value="${profFiltrados[i].idProf}">${"Dr."+profFiltrados[i].apellidoProf+" "+profFiltrados[i].nombreProf}</option>`
        }
    })

    //Lable de Profesionales
    let labelProfesionales = document.createElement("label")
    labelProfesionales.setAttribute("for","profesional")
    labelProfesionales.textContent = "Profesional:"

    //Select de Profesionales
    let listaProfesionales = document.createElement("select")
    for(let i = 0;i<profFiltrados.length;i++){
        if(profFiltrados[i].idProfEsp == turnoClickeado.idProfEsp){
            listaProfesionales.innerHTML += `<option selected value="${profFiltrados[i].idProf}">${"Dr."+profFiltrados[i].apellidoProf+" "+profFiltrados[i].nombreProf}</option>`
        }else{
            listaProfesionales.innerHTML += `<option value="${profFiltrados[i].idProf}">${"Dr."+profFiltrados[i].apellidoProf+" "+profFiltrados[i].nombreProf}</option>`
        }
        

    }
    listaProfesionales.setAttribute("id","profesional")
    listaProfesionales.setAttribute("name","profesional")

    //Label de fecha
    let labelDeFecha = document.createElement("label")
    labelDeFecha.setAttribute("for","fecha")
    labelDeFecha.textContent = "Fecha:"
    
    //Input de fecha
    let inputDeFecha = document.createElement("input")
    inputDeFecha.setAttribute("value",`${turnoClickeado.fechaHora.split(" ",2)[0]}`)
    inputDeFecha.setAttribute("type","date")
    inputDeFecha.setAttribute("id","fecha")
    inputDeFecha.setAttribute("name","fecha")
    
    //Label de hora
    let labelDeHora = document.createElement("label")
    labelDeHora.textContent = "Hora:"
    labelDeHora.setAttribute("for","hora")

    //Input de hora
    let inputDeHora = document.createElement("input")
    inputDeHora.setAttribute("value",`${turnoClickeado.fechaHora.split(" ",2)[1]}`)
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

async function crearHtmlTurnos(){
    
    //Label Paciente
    let labelPaciente = document.createElement("label")
    labelPaciente.setAttribute("for","paciente")
    labelPaciente.textContent = "Paciente"
    
    //Select de pacientes
    let listaPXSelect = document.createElement("select");
    for(let i = 0;i<pacientes.length;i++){
        listaPXSelect.innerHTML += `<option value="${pacientes[i].id}">${pacientes[i].apellido + " " +pacientes[i].nombre}</option>`  
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
        listaEspecialidades.innerHTML += `<option value="${especialidadesDB[i].id}">${especialidadesDB[i].nombre}</option>`
    }
    listaEspecialidades.setAttribute("id","especialidad")
    listaEspecialidades.setAttribute("name","especialidad")
    
    //Evento Si cambia el value de Especialidades => Se filtran los Profesionales
    let profFiltrados = await profWEsp(listaEspecialidades.value)

    
    listaEspecialidades.addEventListener("change",async () => {
        let selectProfesional = document.getElementById("profesional")
        selectProfesional.innerHTML = " "
        profFiltrados = await profWEsp(listaEspecialidades.value)        
        for(let i = 0;i<profFiltrados.length;i++){
            selectProfesional.innerHTML += `<option value="${profFiltrados[i].idProf}">${"Dr."+profFiltrados[i].apellidoProf+" "+profFiltrados[i].nombreProf}</option>`
        }
    })

    //Lable de Profesionales
    let labelProfesionales = document.createElement("label")
    labelProfesionales.setAttribute("for","profesional")
    labelProfesionales.textContent = "Profesional:"

    //Select de Profesionales
    let listaProfesionales = document.createElement("select")
    for(let i = 0;i<profFiltrados.length;i++){
        listaProfesionales.innerHTML += `<option value="${profFiltrados[i].idProf}">${"Dr."+profFiltrados[i].apellidoProf+" "+profFiltrados[i].nombreProf}</option>`
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
            let idPx = parseInt(document.getElementById('paciente').value)
            let idProf = document.getElementById('profesional').value
            let idEsp = document.getElementById('especialidad').value
            
            let fecha = document.getElementById('fecha').value
            let horario = document.getElementById('horario').value

            let fechaHora = fecha + " " + horario
            
            let arrayDeParametros = [idPx,idEsp,idProf,fecha,horario]

            if(!arrayDeParametros.includes(" ") && !arrayDeParametros.includes("") ){
                crearTurno(idPx,idEsp,idProf,fechaHora)
                taskComplete('Turno Creado')
            }else{
                return false
            }
            
            // console.log("PreConfirm")
            // let idPx = parseInt(document.getElementById('paciente').value)
            // let idprof = document.getElementById('profesional').value
            // let idesp = document.getElementById('especialidad').value
            // let fechaHora = document.getElementById('fecha').value + " " + document.getElementById('horario').value
            // if(fechaHora !== "" && horario !== ""){
            //     crearTurno(idPx,idesp,idprof,fechaHora)
            //     taskComplete('Turno creado')    
            // }else{
            //     return false
            // }
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





