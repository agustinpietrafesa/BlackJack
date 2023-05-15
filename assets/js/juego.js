
(() => {

    'use strict'
    
    let baraja       = [],
        puntosJugadores    = [];

    const tipos      = ['C', 'H', 'S', 'D'],
          letras     = ['A', 'J', 'Q', 'K'];
    
    
    /********Referencias al HTML **********/
    
    const nuevoJuego = document.querySelector('.nuevoJuego'),
          nuevaCarta = document.querySelector('.nuevaCarta'),
          detener = document.querySelector('.detener'),
          showPuntos = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');
          


    /********Esta funcion inicializa el juego  *********/
    const inicializarJuego = ( numJugadores = 2) => {
       baraja = crearBaraja();
       for( let i = 0; i < numJugadores; i+=1 ){
        puntosJugadores.push(0);
       }
    };


    /*********Acumular puntos jugadores *******/


    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        showPuntos[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }
    

    /********Funcion que crea la baraja ******/
    const crearBaraja = () => {

        baraja = [];
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
        return _.shuffle( baraja );
    };
    

    
    /********Funcion para pedir carta *********/
    
    const pedirCarta = () => {
    
        if( baraja.length === 0){
            throw "No hay mas cartas"
        }
        return baraja.pop();
    }
    
    
    /********Definir el valor de cada carta ********/
    
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length -1 );
            return ( isNaN( valor ) ) ?
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    
    }


    /******Crear la carta en el html *********/


    const crearCarta = ( carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }
    
    
    /*********Eventos  *********/
    
    /**********Turno computadora ******/
    
    
        const turnoComputadora = ( puntajeMinimo ) => {

            let puntosComputadora = 0

           do {
                const carta = pedirCarta();
                puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
                crearCarta(carta, puntosJugadores.length - 1 );

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
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);
    
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
    
        turnoComputadora( );
        nuevaCarta.disabled = true;
        detener.disabled = true;
    
    } )
    
    
    /*******Nuevo Juego  *******/
    
    
    nuevoJuego.addEventListener('click', () => {
        

        inicializarJuego()

        

        
        
    })
    
}) ();
