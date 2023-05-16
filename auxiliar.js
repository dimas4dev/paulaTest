let contador = 1;

function darNumAleatorio(numero) {
    return Math.floor(Math.random() * numero);
}

function probarEnvioIntento(nombre) {
    let url = "https://api-server.davpaez.repl.co/tarea3/intento";
    let intento = {
        nombre: `${nombre} - Prueba ${contador}`,
        matices : [
            darNumAleatorio(100), 
            darNumAleatorio(100), 
            darNumAleatorio(100), 
            darNumAleatorio(100)],
        tiempo: darNumAleatorio(20)
    }

    contador++;

    enviarPeticionPOST(url, intento);
}


// Función para enviar petición HTTP de tipo GET
async function enviarPeticionGET(url) {
    let promesa_info = fetch(url, {method: "GET"})
    .then( respuesta => {
        if (respuesta.ok == true) {
            return respuesta.json();
        } else {
            throw new Error("Hubo un problema enviando la petición HTTP")
        }
    })
    .then(info => {
        // console.log(info);
        return info
    })

    return promesa_info
}


// Función para enviar petición HTTP de tipo POST
async function enviarPeticionPOST(url, intento) {
    console.log("\n--------Info enviada al servidor 🟡: --------")
    console.log(intento);
    console.log("-------------------------------------------------\n\n")

    let opciones = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(intento),
    };

    let peticion = new Request(url, opciones)

    let promesa_info = fetch(peticion)
        .then( respuesta => {
            if (respuesta.ok == true) {
                return respuesta.json();
            } else {
                throw new Error("Hubo un problema enviando la petición HTTP")
            }
        })
        .then(info => {
            console.log("\n------Info recibida del servidor 🟢: --------")
            console.log(info);
            console.log("------------------------------------------------\n\n")
            return info;
        })

    return promesa_info
}