import { validarUsuariosSQL } from "./fetchUsuarios.js";

window.addEventListener("load",() => sessionStorage.clear());

document.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    let email = document.getElementById("email").value
    let pass = document.getElementById("password").value
    let usuarioIngresado = crearUsuario(email,pass)
    
    await validarInicioDeSesionJS(usuarioIngresado)
})

async function validarInicioDeSesionJS(usuario){
    let usuarioRespuesta = await validarUsuariosSQL(usuario)

    if(usuarioRespuesta.token){
        sessionStorage.setItem('token', usuarioRespuesta.token);
        sessionStorage.setItem('username', usuarioRespuesta.username);
        animacionLogueo()
    }else{
        credencialesIncorrectas();
    }
}


// const promise1 = new Promise((resolve, reject) => {
//     resolve('Success!');
// });

async function credencialesIncorrectas(){
    let inputs = document.getElementsByTagName("input")
    for(let i = 0;i < inputs.length-1;i++){
        inputs[i].value = ""
    }
    await Swal.fire({
        icon: 'error',
        title: 'Credenciales incorrectas',
        text: 'Vuelve a intentarlo',
        footer: '<a href="mailto:nmonje@asjservicios.com">¿Olvidaste tu contraseña?</a>',
    })
}

function animacionLogueo(){
    let timerInterval
    Swal.fire({
    title: 'Ingresando al sistema',
    timer: 2000,
    timerProgressBar: false,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then(() => {
        window.location.href = "turnos.html"
    })
}

function crearUsuario(email,pass){
    let user={
        username: email,
        password: pass
    }
    return user
}


