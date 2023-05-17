/**
 * Declaracion Inicial de variables
 */

let recuadros = document.querySelectorAll(".recuadro");

let elem_puntaje = document.getElementById("puntaje");
let elem_tablero = document.getElementById("tablero");

let nombre_usuario = "Grupo Juli y Pau";
let matices = [];

let tiempo_inicial;
let tiempo_final;

/**
 * Posibles estados del juego:
      0: Pantalla inicial
      1: Temporizador
      2: Intento enviado 
*/

let estado_juego = 0; // Estado 0: Pantalla inicial
console.log("%cNuevo estado: 0. PANTALLA INICIAL 🏁", "font-size: 16px");

/**
 * * ------------------------- Funciones -------------------------
 */

/**
 *Retorna un valor de texto representando un color con el modelo HSL
 * según el parámetro de matiz recibido. la saturación y la luminosidad son fijas
 *
 * @param {number} matiz:Valor entre 0 y 360 que representa el matiz
 * @returns {String}: Valor de texto que representa un color usando modelo HSL
 */
function darColor(matiz) {
 return `hsl(${matiz}, 50%, 50%)`;
}

/**
 * Cambia el color del recuadro correspondiente al indice recibido por parámetro.
 * También guarda el valor del matíz en el array matices
 *
 * @param {number}:Valor entre 0 y 3 que representa el recuadro al cual queremos cambiarle el color
 */
function cambiarColorRecuadro(indice) {
 if (estado_juego === 1) {
  let matiz_aleat = darNumAleatorio(360);

  let color_aleat = darColor(matiz_aleat);

  matices[indice] = matiz_aleat;

  recuadros[indice].style["background-color"] = color_aleat;
 } else if (estado_juego === 2) {
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
 let elemnombre = document.getElementById("nombre-usuario");
 elemnombre.innerText = nombre_usuario;

 tiempo_inicial = new Date().getTime();

 if (estado_juego === 0) {
  estado_juego = 1;
 }
}

/**
 * Recolecta info necesaria para construir el objeto del intento actual
 * que incluye: nombre de usuario, matices elegidos y tiempo transcurrido
 *
 * @returns {object}: Valor objeto correspondiente a intento actual
 */
function recolectarInfoIntento() {
 tiempo_final = new Date().getTime();

 let saveSeg = tiempo_final - tiempo_inicial;
 let segundos = new Date(saveSeg).getSeconds();

 return {
  matices: [matices[0], matices[1], matices[2], matices[3]],
  nombre: nombre_usuario,
  tiempo: segundos,
 };
}

/** procesa el objeto respuesta recibido del servidor y lo organiza segun el puntaje obtenido
 *
 * @param {object}a: Objeto proviente del servidor que contiene puntajes
 * @param {object}b: Objeto proviente del servidor que contiene puntajes
 */
function compararPorPropiedad(a, b) {
 return a.puntaje - b.puntaje;
}

/** procesa el objeto respuesta recibido del servidor y actualiza el DOM
 *
 * @param {object}respuesta: Objeto proviente del servidor que contiene puntajes
 */
function procesarRespuesta(respuesta) {
 let containerPuntaje = document.getElementById("puntaje");
 let miPuntaje = respuesta.puntaje;
 respuesta.tablero.sort(compararPorPropiedad);

 containerPuntaje.innerText = miPuntaje;

 let containerTablero = document.getElementById("tablero");

 while (containerTablero.firstChild) {
  containerTablero.removeChild(containerTablero.firstChild);
 }

 let contadorPuntaje = 1;
 for (let index = 0; index < respuesta.tablero.length; index++) {
  let listElement = document.createElement("li");
  let spanElement = document.createElement("span");

  spanElement.innerText = `Pocision ${contadorPuntaje} ${respuesta.tablero[index].nombre} : ${respuesta.tablero[index].puntaje}`;
  contadorPuntaje++;
  listElement.appendChild(spanElement);
  containerTablero.appendChild(listElement);
 }
}

/**
 * Recolecta información del intento, la envía al servidor y
 */
function enviarIntento() {
 let url = "https://api-server.davpaez.repl.co/tarea3/intento";
 let infoIntento = recolectarInfoIntento();

 enviarPeticionPOST(url, infoIntento).then(procesarRespuesta);

 estado_juego = 2;
}

/** Reaccionar a pulsación de una tecla (evento keydown)
 *
 * @param {number} indice: Valor entre 0 y 3 que representa el recuadro al cual queremos cambiarle el color
 */
function reaccionarAnteTecla() {
 let tecla = event.key.toUpperCase();

 if (tecla == "E") {
  console.log("Tecla oprimida: " + tecla);

  empezarJuego();
 }

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

 if (tecla == " ") {
  console.log("Tecla oprimida: " + tecla);
  enviarIntento();
 }
}

window.addEventListener("keydown", reaccionarAnteTecla);
