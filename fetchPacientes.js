async function cargarPxSQL(busqueda){

    if(busqueda == undefined){
        busqueda = ""
    }else{
        busqueda = "?search=" + busqueda
    }
    
    let url = "http://localhost:8080/demo-1.0-SNAPSHOT/api/paciente" + busqueda

    let px = []
    
    try {
        await fetch(url)
            .then((response) => response.json())
            .then(async (data) => await data.forEach(e => {
                px.push(e)
            }));
        console.log("Pacientes cargados de SQL")
    } catch (error) {
        console.log("Error al cargar pacientes de la BBDD")

        px = JSON.parse(localStorage.getItem("pacientes")) //|| pxDB
        
        console.log("Pacientes Hardcodeados")
    }

    return px
}

async function crearPxSQL(px){
    const url = 'http://localhost:8080/demo-1.0-SNAPSHOT/api/paciente'; // URL del endpoint al que está haciendo la solicitud
     // los datos que desea enviar en la solicitud

    await fetch(url, {
        method: 'POST', // especifica que se realizará una solicitud POST
        headers: {
            'Content-Type': 'application/json' // especifica que se está enviando JSON en el cuerpo de la solicitud
        },
        body: JSON.stringify(px) // convierte los datos en formato JSON para enviarlos en la solicitud
    })
    .then(response => response.json()) // analiza la respuesta JSON
    .then(data => console.log(data)) // muestra la respuesta JSON en la consola
    .catch(error => console.error(error)); // maneja cualquier error que se produzca

}

async function editarPxSQL(px){
    let id = px.idPaciente
    const url = "http://localhost:8080/demo-1.0-SNAPSHOT/api/paciente/" + id

    await fetch(url, {
    method: 'PUT', // especifica que se realizará una solicitud PUT
    headers: {
        'Content-Type': 'application/json' // especifica que se está enviando JSON en el cuerpo de la solicitud
    },
    body: JSON.stringify(px) // convierte los datos en formato JSON para enviarlos en la solicitud
    })
    //.then(response => response.json()) // analiza la respuesta JSON
    //.then(data => console.log(data)) // muestra la respuesta JSON en la consola
    //.catch(error => console.error(error)); // maneja cualquier error que se produzca

}

export  {cargarPxSQL as cargarPxSQL}
export  {crearPxSQL as crearPxSQL}
export  {editarPxSQL as editarPxSQL}



