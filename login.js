document.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value
    let pass = document.getElementById("password").value
    validarInicioDeSesion(email,pass)
})

function validarInicioDeSesion(email,pass){
    if(email === "admin@admin.com" && pass === "1234"){
        animacionLogueo()
        //window.location.href = "index.html"
    }else{
        credencialesIncorrectas();
    }
}

async function pedirEmail(){

    const { value: email } = await Swal.fire({
        title: 'Ingrese su correo',
        input: 'email',
        inputLabel: 'Email',
        inputPlaceholder: 'Ingrese su Email'
    })
    if (email) {
        Swal.fire(`Correo de recuperacion enviado`)
    }
}

const promise1 = new Promise((resolve, reject) => {
    resolve('Success!');
});

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


