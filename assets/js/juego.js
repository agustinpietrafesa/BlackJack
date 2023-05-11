let baraja       = [];
const tipos      = ['C', 'H', 'S', 'D'];
const letras     = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;




/********Referencias al HTML **********/

const nuevoJuego = document.querySelector('.nuevoJuego');
const nuevaCarta = document.querySelector('.nuevaCarta');
const detener = document.querySelector('.detener');
const showPuntos = document.querySelectorAll('small')
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')

/********Funcion que crea la baraja ******/
const crearBaraja = () => {
    for( let i = 2; i <= 10; i+=1 ){
        for (let tipo of tipos) {
            baraja.push( i + tipo );
            }

    }

    for (let tipo of tipos) {
        for (let letra of letras) {
            baraja.push( letra + tipo);
        }
    }
    baraja = _.shuffle( baraja )
    return baraja;
};

crearBaraja( baraja );

/********Funcion para pedir carta *********/

const pedirCarta = () => {

    if( baraja.length === 0){
        throw "No hay mas cartas"
    }

    let carta = baraja.pop();
    return carta;
}


/********Definir el valor de cada carta ********/

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length -1 );
        return ( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;

}


/*********Eventos  *********/

/**********Turno computadora ******/


    const turnoComputadora = ( puntajeMinimo ) => {
       do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta( carta );
            showPuntos[1].innerText = puntosComputadora;
            const imgCarta = document.createElement('img');
            imgCarta.src = `./assets/cartas/${ carta }.png`;
            divCartasComputadora.append(imgCarta);
            imgCarta.classList.add('carta');

        if( puntajeMinimo > 21){
            break
        }
            
       } while ( (puntosComputadora < puntajeMinimo) && (puntajeMinimo <= 21) );

       /*******Mensaje final ******/

       setTimeout(() => {
           if ( puntajeMinimo > 21) {
               alert('Lo siento, la computadora ha ganado');
           } else if( puntosComputadora === puntajeMinimo){
               alert('Es un empate!!');
           }else if( puntosComputadora > 21){
               alert('Felicidades, ganaste!!');
           }else{
            alert('Computadora gana')
           }

       }, 1500);
    }



/*********Turno jugador *******/

nuevaCarta.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    showPuntos[0].innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/${ carta }.png`;
    divCartasJugador.append(imgCarta);
    imgCarta.classList.add('carta');

    if( puntosJugador > 21){
        nuevaCarta.disabled = true;
        detener.disabled = true;
        turnoComputadora( puntosJugador );

    }else if ( puntosJugador === 21){
        nuevaCarta.disabled = true;
        detener.disabled = true;
        turnoComputadora( puntosJugador );
        

    }
} ) 


/********Boton detener ******/

detener.addEventListener('click', () =>{

    turnoComputadora( puntosJugador );
    nuevaCarta.disabled = true;
    detener.disabled = true;

} )


/*******Nuevo Juego  *******/


nuevoJuego.addEventListener('click', () => {

    baraja = crearBaraja();
    puntosComputadora = 0;
    puntosJugador = 0;
    
    showPuntos[0].innerText = 0;
    showPuntos[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    nuevaCarta.disabled = false;
    detener.disabled = false;
    
    
})


console.log(baraja)