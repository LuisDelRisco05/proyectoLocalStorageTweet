// variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// event listeners
eventListeners();

function eventListeners() {
    // cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweet') || []);

        console.log(tweets);

        crearHTML();
    });
}




// funciones
function agregarTweet(e) {
    e.preventDefault();

    // textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // validación...
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');

        return; // evita que se ejecuten mas lineas de codigos
    } 

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    
    // una vez agregado vamos a crear el HTML
    crearHTML();

    // reiniciar formulario
    formulario.reset();

}

// mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // inserta en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000)
}

// muestra un listado de los twwets
function crearHTML() {

    limpiarHTML();
   
    if(tweets.length > 0) {
        tweets.forEach( (tweet) => {
            // agregar bonton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // añadir funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // crear el HTML
            const li = document.createElement('li');
            // añadir el texto
            li.textContent = tweet.tweet;

            // asignar el botón
            li.appendChild(btnEliminar);

            // insertarlo en el HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// agrega los tweets actuales a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweet', JSON.stringify(tweets));
}

// elimina el tweet
function borrarTweet(id) {
   tweets = tweets.filter((tweet) => {
       return tweet.id !== id;
   }); 
   crearHTML();
}

// limpiar el HTML
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}