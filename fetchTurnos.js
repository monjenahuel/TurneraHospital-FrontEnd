async function cargarTurnosSQL(busqueda){
    
    if(busqueda == undefined){
        busqueda = ""
    }else{
        busqueda = "?search=" + busqueda
    }
    
    let url = "http://localhost:8080/demo-1.0-SNAPSHOT/api/turno" + busqueda

    let turnos = []
    
    try {
        await fetch(url)
            .then((response) => response.json())
            .then(async (data) => await data.forEach(t => {
                turnos.push(t)
            }));
        console.log("Turnos cargados de SQL")
    } catch (error) {
        console.log("Error al cargar turnos de la BBDD")

        turnos = JSON.parse(localStorage.getItem("turnos"))
        
        console.log("Turnos Hardcodeados")
    }

    return turnos
}

async function crearTurnoSQL(turno){
    const url = 'http://localhost:8080/demo-1.0-SNAPSHOT/api/turno'; // URL del endpoint al que está haciendo la solicitud
     // los datos que desea enviar en la solicitud

    await fetch(url, {
        method: 'POST', // especifica que se realizará una solicitud POST
        headers: {
            'Content-Type': 'application/json' // especifica que se está enviando JSON en el cuerpo de la solicitud
        },
        body: JSON.stringify(turno) // convierte los datos en formato JSON para enviarlos en la solicitud
    })
    //.then(response => response.json()) // analiza la respuesta JSON
    //.then(data => console.log(data)) // muestra la respuesta JSON en la consola
    //.catch(error => console.error(error)); // maneja cualquier error que se produzca

}

async function eliminarTurnoSQL(id){
    const url = 'http://localhost:8080/demo-1.0-SNAPSHOT/api/turno/' + id;

    await fetch(url, {
        method: 'DELETE'
    })
    .catch(error => console.error(error));

}

async function editarTurnoSQL(turno){
    let id = turno.id
    const url = 'http://localhost:8080/demo-1.0-SNAPSHOT/api/turno/' + id;

    await fetch(url, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(turno) 
    })
    .then(response => response.json()) 
    //.then(data => console.log(data)) 
    .catch(error => console.error(error)); 

}


export {cargarTurnosSQL as cargarTurnosSQL}
export {crearTurnoSQL as crearTurnoSQL}
export {eliminarTurnoSQL as eliminarTurnoSQL}
export {editarTurnoSQL as editarTurnoSQL}