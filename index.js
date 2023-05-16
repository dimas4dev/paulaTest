// Declarar e inicializar variables que representan elementos del DOM

// Array de elementos div, que representan a los recuadros
let recuadros = document.querySelectorAll(".recuadro");

// Elementos HTML donde aparecerán el puntaje actual y el tablero general
let elem_puntaje = document.getElementById("puntaje");
let elem_tablero = document.getElementById("tablero");

// Declarar e inicializar variables que definen el estado del juego
let nombre_usuario = "Grupo Juli y Pau";
let matices = [];

// Declarar variables para registrar el tiempo
let tiempo_inicial;
let tiempo_final;

/* Posibles estados del juego:
      0: Pantalla inicial
      1: Temporizador
      2: Intento enviado 
  */

// Establecer estado inicial del juego
let estado_juego = 0; // Estado 0: Pantalla inicial
console.log("%cNuevo estado: 0. PANTALLA INICIAL 🏁", "font-size: 16px");

// ------------------------ Funciones -------------------------

/**
 * Retorna un valor de texto representando un color con el modelo HSL
 * según el parámetro de matiz recibido. la saturación y la luminosidad son fijas
 *
 * Parámetros:
 * - matiz (numero) : Valor entre 0 y 360 que representa el matiz
 *
 * Retorna: Valor de texto que representa un color usando modelo HSL
 */
function darColor(matiz) {
 return `hsl(${matiz}, 50%, 50%)`;
}

/**
 * Cambia el color del recuadro correspondiente al indice recibido por parámetro.
 * También guarda el valor del matíz en el array matices
 *
 * Parámetros:
 * - indice (numero): Valor entre 0 y 3 que representa el recuadro al cual queremos cambiarle el color
 */
function cambiarColorRecuadro(indice) {
 // Obtener matiz aleatorio

 if (estado_juego === 1) {
  let matiz_aleat = darNumAleatorio(360);

  // Obtener color HSL basado en el matiz aleatorio
  // POR-HACER en Etapa 0<zx
  let color_aleat = darColor(matiz_aleat);
  // Guardar matiz aleatorio en array matices
  // POR-HACER en Etapa 0
  matices[indice] = matiz_aleat;
  // Actualizar color del recuadro correspondiente al parámetro indice
  // POR-HACER en Etapa 0
  recuadros[indice].style["background-color"] = color_aleat;
 } else if (estado_juego === 2) {
  //mejora juego. aparecer juego terminado

  console.log(
   "Juego terminado, Refresca la pagina para iniciar un nuevo juego"
  );
 } else {
 }
}

/**
 * Inicializa los colores, registra el tiempaso de inicio y establece estado inicial
 */
function empezarJuego() {
 // Establecer nombre de usuario en DOM
 // POR-HACER en Etapa 1
 let elemnombre = document.getElementById("nombre-usuario");
 elemnombre.innerText = nombre_usuario;

 // Iniciar colores de recuadros
 // POR-HACER en Etapa 1
 // recuadros[].style = color_aleat

 // Registrar instante de tiempo inicial
 tiempo_inicial = new Date().getTime();

 // Actualizar estado del juego
 // POR-HACER en Etapa 4
 if (estado_juego === 0) {
  estado_juego = 1;
 }
}

/**
 * Recolecta info necesaria para construir el objeto del intento actual
 * que incluye: nombre de usuario, matices elegidos y tiempo transcurrido
 *
 * Retorna: valor objeto correspondiente a intento actual
 */
function recolectarInfoIntento() {
 // Obtener timestamp actual
 tiempo_final = new Date().getTime();

 // Calcular tiempo transcurrido (en segundos)
 // POR-HACER en Etapa 2
 let saveSeg = tiempo_final - tiempo_inicial;
 let segundos = new Date(saveSeg).getSeconds();

 // Construir un objeto intento
 // POR-HACER en Etapa 2

 // Retornar objeto intento
 // POR-HACER en Etapa 2e

 return {
  matices: [matices[0], matices[1], matices[2], matices[3]],
  nombre: nombre_usuario,
  tiempo: segundos,
 };
}

/** procesa el objeto respuesta recibido del servidor y actualiza el DOM
 *
 * Parámetros:
 * - respuesta (objeto): Objeto proviente del servidor que contiene puntajes
 */
function procesarRespuesta(respuesta) {
 // Actualiza valor de puntaje en DOM
 let containerPuntaje = document.getElementById("puntaje");
 let miPuntaje = respuesta.puntaje;

 containerPuntaje.innerText = miPuntaje;
 // POR-HACER en Etapa 3
 // Eliminar elementos li de tablero (elemento ul)
 let containerTablero = document.getElementById("tablero");

 /**
  * TODO: Formas de que funcione el codigo para remover hijos
  */
 while (containerTablero.firstChild) {
  containerTablero.removeChild(containerTablero.firstChild);
 }

 //  for (let index = containerTablero.children.length - 1; index >= 0; index--) {
 //   containerTablero.removeChild(containerTablero.children[index]);
 //  }

 // POR-HACER en Etapa 3
 // Actualiza elementos li de la lista con la información recibida

 /**
  * TODO: Forma Larga
  */

 for (let index = 0; index < respuesta.tablero.length; index++) {
  let listElement = document.createElement("li");
  let spanElement = document.createElement("span");

  spanElement.innerText =
   "Puntaje " +
   index +
   " " +
   respuesta.tablero[index].nombre +
   " :" +
   respuesta.tablero[index].puntaje;

  listElement.appendChild(spanElement);

  containerTablero.appendChild(listElement);
 }

 /**
  * TODO: Forma corta
  */

 //  for (let index = 0; index < respuesta.tablero.length; index++) {
 //   let listElement = document.createElement("li");
 //   let spanElement = document.createElement("span");

 //   spanElement.innerText = `Puntaje ${index} ${item.nombre} : ${item.puntaje}`;

 //   listElement.appendChild(spanElement);
 //   containerTablero.appendChild(listElement);
 //  }

 // POR-HACER en Etapa 3
}

/**
 * Recolecta información del intento, la envía al servidor y
 */
function enviarIntento() {
 // Obtener objeto de intento actual
 //  let infoIntento = recolectarInfoIntento();
 let infoIntento = {
  puntaje: 3.59,
  tablero: [
   {
    nombre: "Grupo Juli y Pau",
    puntaje: 3.59,
   },
   {
    nombre: "Grupo Juli y Pau",
    puntaje: 4.46,
   },
   {
    nombre: "Grupo Juli y Pau",
    puntaje: 3.25,
   },
   {
    nombre: "Grupo Juli y Pau",
    puntaje: 5.05,
   },
   {
    nombre: "Grupo Juli y Pau",
    puntaje: 3.56,
   },
  ],
 };
 // URL de la API que recibirá la información del intento
 let url = "https://api-server.davpaez.repl.co/tarea3/intento";

 // Utilizar función auxuliar para enviar objeto intento a la API
 // y después procesar la respuesta con la función procesarRespuesta
 //  enviarPeticionPOST(url, infoIntento).then(procesarRespuesta);
 procesarRespuesta(infoIntento);
 // Actualizar estado del juego
 // POR-HACER en Etapa 4
}

/** Reaccionar a pulsación de una tecla (evento keydown)
 *
 * Parámetros:
 * - indice (numero): Valor entre 0 y 3 que representa el recuadro al cual queremos cambiarle el color
 */
function reaccionarAnteTecla() {
 // Obtener valor de tecla pulsada y convertirlo a letra mayúscula
 let tecla = event.key.toUpperCase();

 // Disparar funcion empezarJuego si la tecla oprimida fue E
 if (tecla == "E") {
  console.log("Tecla oprimida: " + tecla);

  // Empezar juego
  // POR-HACER en Etapa 1
  empezarJuego();
 }

 // Disparar funcion cambiarColorRecuadro si la tecla oprimida fue {A,S,D,F}
 // La función recibe un índice dependiendo de la letra oprimida
 if (tecla == "A") {
  console.log("Tecla oprimida: " + tecla);
  cambiarColorRecuadro(0);
 } else if (tecla == "S") {
  console.log("Tecla oprimida: " + tecla);
  cambiarColorRecuadro(1);
 } else if (tecla == "D") {
  console.log("Tecla oprimida: " + tecla);
  cambiarColorRecuadro(2);
 } else if (tecla == "F") {
  console.log("Tecla oprimida: " + tecla);
  cambiarColorRecuadro(3);
 }

 // Disparar función enviarIntento si la tecla oprimida fue ESPACIO
 if (tecla == " ") {
  console.log("Tecla oprimida: " + tecla);
  estado_juego = 2;

  // Enviar intento a servidor remoto
  // POR-HACER en Etapa 2
  enviarIntento();
 }
}

// Añadir event listener al elemento window para reaccionar a
// la pulsación de cualquier tecla
// POR-HACER en Etapa 0
window.addEventListener("keydown", reaccionarAnteTecla);
