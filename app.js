const tituloCancion = document.querySelector('.reproductor-musica h1');

const nombreArtista = document.querySelector('.reproductor-musica p');

const progreso = document.getElementById('progreso');

const cancion = document.getElementById('cancion');

const iconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');


const botonAtras = document.querySelector('.controles button.atras');

const botonAdelante = document.querySelector('.controles button.adelante');

const canciones = [
    {
        titulo:'La Diabla',
        nombre:'Xavi',
        fuente:'music/Xavi - La Diabla.flac'
    },
    {
        titulo:'Amigos con Derecho',
        nombre:'Xavi',
        fuente:'music/Xavi - Amigos con Derecho.flac'
    },
    {
        titulo:'I Wanna Be Yours',
        nombre:'Arctic Monkeys',
        fuente:'music/Arctic Monkeys - I Wanna Be Yours.flac'
    },
    {
        titulo:'Ojos Tumbados',
        nombre:'Alto Linaje',
        fuente:'music/Alto Linaje - Ojos Tumbados.flac'
    },
];

let indiceCancionActual = 0;

function actualizarInfoCancion(){
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente
    cancion.addEventListener('loadeddata', function(){})
};

cancion.addEventListener('loadedmetadata', function(){
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar(){
    if(cancion.paused){
        reproducirCancion();
    } else {
        pausarCancion();
    }
};

function reproducirCancion(){
    cancion.play();
    iconoControl.classList.add('bi-pause-fill')
    iconoControl.classList.remove('bi-play-fill')
}

function pausarCancion(){
    cancion.pause();
    iconoControl.classList.remove('bi-pause-fill')
    iconoControl.classList.add('bi-play-fill')
}

cancion.addEventListener('timeupdate', function(){
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
    }
});

progreso.addEventListener('input', function(){
    cancion.currentTime = progreso.value;
});

botonAdelante.addEventListener('click', function(){
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion()
});

botonAtras.addEventListener('click', function(){
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion()
});

actualizarInfoCancion();