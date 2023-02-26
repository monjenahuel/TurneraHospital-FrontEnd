async function profesionalesQueTienenLaEspecialidad(id){
    
    let url = "http://localhost:8080/demo-1.0-SNAPSHOT/api/especialidad/" + id

    let especialistas = []
    
    try {
        await fetch(url)
            .then((response) => response.json())
            .then(async (data) => await data.forEach(e => {
                especialistas.push(e)
            }));
    } catch (error) {   
    }

    return especialistas
}

async function cargarEspecialidadesSQL(){
    
    let url = "http://localhost:8080/demo-1.0-SNAPSHOT/api/especialidad"

    let especialidades = []
    
    try {
        await fetch(url)
            .then((response) => response.json())
            .then(async (data) => await data.forEach(e => {
                especialidades.push(e)
            }));
    } catch (error) {
        console.log(error)
    }
    return especialidades
}

async function cargarProfesionalesSQL(){
    
    let url = "http://localhost:8080/demo-1.0-SNAPSHOT/api/profesional"

    let profesionales = []
    
    try {
        await fetch(url)
            .then((response) => response.json())
            .then(async (data) => await data.forEach(e => {
                profesionales.push(e)
            }));
    } catch (error) {
        console.log(error)
    }
    return profesionales
}



export {profesionalesQueTienenLaEspecialidad as profWEsp}
export {cargarEspecialidadesSQL as cargarEspecialidadesSQL}
export {cargarProfesionalesSQL}