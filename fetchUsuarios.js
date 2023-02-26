async function validarUsuariosSQL(userAValidar){
    const url = 'http://localhost:8080/demo-1.0-SNAPSHOT/api/user/'; 

    let userRespuesta;

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(userAValidar) 
    })
    .then(response => response.json()) 
    .then(data => {
        userRespuesta = data;
        console.log(userRespuesta)
    }) 
    .catch(error => console.error(error));

    return userRespuesta;
}

function tokenValido(token){
    let intToken = parseInt(token)
    
    return intToken >= 137000000 && intToken <= 274000000
}

export {validarUsuariosSQL as validarUsuariosSQL}
export {tokenValido}