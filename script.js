let jugador1 = true;
let casillas = document.querySelectorAll(".casilla");
let tiempoInicio = Date.now();
let juegoTerminado = false;
let intervaloCronometro;
let jugador1Nombre;
let jugador2Nombre;

document.getElementById("iniciarBtn").addEventListener("click", iniciarJuego);
document
  .getElementById("reiniciarBtn")
  .addEventListener("click", reiniciarJuego);

function iniciarJuego() {
  jugador1Nombre = document.getElementById("jugador1").value;
  jugador2Nombre = document.getElementById("jugador2").value;

  document.getElementById(
    "mensaje"
  ).textContent = `Es el turno de: ${jugador1Nombre}`;

  casillas.forEach((casilla) =>
    casilla.addEventListener("click", movimientoJugador)
  );

  clearInterval(intervaloCronometro);
  intervaloCronometro = setInterval(actualizarCronometro, 1000);

  casillas.forEach((casilla) => casilla.removeAttribute("disabled"));
}

function movimientoJugador(event) {
  if (!juegoTerminado) {
    let valorCasilla = event.target.style.backgroundImage;
    if (!valorCasilla.length) {
      event.target.style.backgroundImage = `url('${
        jugador1 ? "./img/Gatobanana.jpeg" : "./img/Gatorana.png"
      }')`;
      jugador1 = !jugador1;

      validarLinea(0, 1, 2);
      validarLinea(3, 4, 5);
      validarLinea(6, 7, 8);
      validarLinea(0, 3, 6);
      validarLinea(1, 4, 7);
      validarLinea(2, 5, 8);
      validarLinea(0, 4, 8);
      validarLinea(2, 4, 6);

      const turnoActual = jugador1 ? jugador1Nombre : jugador2Nombre;
      document.getElementById(
        "mensaje"
      ).textContent = `Es el turno de: ${turnoActual}`;

      if (
        Array.from(casillas).every((casilla) => casilla.style.backgroundImage)
      ) {
        mostrarEmpate();
      }
    }
  }
}

function validarLinea(c1, c2, c3) {
  if (
    casillas[c1].style.backgroundImage.length &&
    casillas[c1].style.backgroundImage === casillas[c2].style.backgroundImage &&
    casillas[c2].style.backgroundImage === casillas[c3].style.backgroundImage
  ) {
    mostrarGanador(casillas[c1].style.backgroundImage);
  }
}

function mostrarGanador(jugador) {
  const nombreGanador = jugador ? jugador1Nombre : jugador2Nombre;
  document.getElementById(
    "msjGanador"
  ).textContent = `${nombreGanador} ganó la ronda!`;
  juegoTerminado = true;
  clearInterval(intervaloCronometro);
}

function mostrarEmpate() {
  if (!juegoTerminado) {
    const ganador = jugador1 ? jugador2Nombre : jugador1Nombre;
    document.getElementById("mensaje").textContent = `¡Empate!`;
    juegoTerminado = true;
    clearInterval(intervaloCronometro);
  }
}

function actualizarCronometro() {
  const tiempoActual = Math.floor((Date.now() - tiempoInicio) / 1000);
  document.getElementById(
    "cronometro"
  ).textContent = `Tiempo: ${tiempoActual} segundos`;
}

function reiniciarJuego() {
  casillas.forEach((casilla) => (casilla.style.backgroundImage = ""));
  jugador1 = true;
  tiempoInicio = Date.now();
  juegoTerminado = false;
  clearInterval(intervaloCronometro);
  intervaloCronometro = setInterval(actualizarCronometro, 1000);
  document.getElementById(
    "mensaje"
  ).textContent = `Es el turno de: ${jugador1Nombre}`;
  document.getElementById("cronometro").textContent = "Tiempo: 0 segundos";
  document.getElementById("msjGanador").textContent = "";
  document.getElementById("mensaje").textContent = "Siguiente turno:";

  casillas.forEach((casilla) => casilla.removeAttribute("disabled"));
}
