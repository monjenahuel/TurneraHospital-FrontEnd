const pacientes = [
    {
        id:0,
        nombre: "Ricardo Di Mortadela",
        dni: "35826931",
        telefono: "4450-4664",
        email: "Mortadela@gmail.com"
    },
    {
        id:1,
        nombre: "Jon Ricardo Darin",
        dni: "99999999",
        telefono: "4459-8888",
        email: "RDarin@gmail.com"
    },
    {
        id:2,
        nombre: "Marcelo Fort",
        dni: "33333333",
        telefono: "1123881095",
        email: "laFortNeta@gmail.com"
    },
    {
        id:3,
        nombre: "Kiro Lazilla",
        dni: "00101101",
        telefono: "1180808080",
        email: "gamerPlease@gmail.com"
    }
]

let turnos = [
    {
        id: 0,
        nombre: pacientes[0].nombre,
        dni: pacientes[0].dni,
        especialidad:"Otorrinolaringologia",
        profesional: "Dr Moreira",
        fecha: "2023-02-17",
        hora: "10:00"
    },
    {
        id: 1,
        nombre: pacientes[1].nombre,
        dni: pacientes[1].dni,
        especialidad:"Cardiologia",
        profesional: "Dr Guitierrez",
        fecha: "2023-02-27",
        hora: "15:00"
    },
    {
        id: 2,
        nombre: pacientes[2].nombre,
        dni: pacientes[2].dni,
        especialidad:"Clinico",
        profesional: "Dr Gonzalez",
        fecha: "2023-02-28",
        hora: "18:00"
    }
]

let especialidades = ["Kinesiologia","Cardiologia","Dermatologia","Otorrinolaringologia","Clinico","Cirugia"]

let profesionales = [
    {
        nombre: "Dr Moreira",
        especialidades: ["Clinico"]
    },
    {
        nombre: "Klgo Fort",
        especialidades: ["Kinesiologia"]
    },
    {
        nombre: "Dr Rivera",
        especialidades: ["Otorrinolaringologia","Cardiologia","Clinico"]
    },
    {
        nombre: "Dr Hibbert",
        especialidades: ["Clinico","Cardiologia","Cirugia"]
    },
    {
        nombre: "Dr House",
        especialidades: especialidades
    }
]

export {pacientes as pxDB}
export {turnos as turnDB}
export {especialidades as especialidadesDB}
export {profesionales as profesionalesDB}