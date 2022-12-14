//DATE
const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString("es", {
        day: "numeric"
    });
    dateText.textContent = date.toLocaleString("es", {
        weekday: "long"
    });
    dateMonth.textContent = date.toLocaleString("es", {
        month: "long"
    });
    dateYear.textContent = date.toLocaleString("es", {
        year: "numeric"
    });
};
setDate()

//////////////////////////////
/////////APIBINANCE///////////
//////////////////////////////

let endpoint = 'https://api.binance.com/api/v3/ticker/price'
fetch(endpoint)
    .then(respuesta => respuesta.json())
    .then(datos => mostrarData(datos))
    .catch(e => console.log(e))

const mostrarData = (data) => {
    //console.log(data)
    let body = ''
    //IMPRIME PRIMEROS 10 ELEMENTOS DE LOS DATOS OBTENIDOS
    for (let i = 0; i <= 10; i++) {
        body += `<tr><td>${data[i].symbol}</td><td>${data[i].price}</td></tr>`
    }
    document.getElementById('data').innerHTML = body
}
////////////////////////////////
///////////APICLIMA/////////////
////////////////////////////////

const vientoTitulo = document.getElementById("vientoTitulo")
const inputCiudad = document.querySelector('input');
const button = document.querySelector('button');
const ciudadContainer = document.querySelector('.ciudad-container');
let ubicaccion = document.getElementById("ubicaccion");
let temperaturaValor = document.getElementById("temperatura-valor");
let temperaturaDescripcion = document.getElementById("temperatura-descripcion");
let vientoVelocidad = document.getElementById("viento-velocidad");
let iconoAnimado = document.getElementById("icono-animado");

button.addEventListener('click', (e) => {
    e.preventDefault()
    traerCiudar(inputCiudad.value)
    //SWEET ALERT
    Swal.fire('Cargando clima de tu ciudad')
    vientoVelocidad.classList.remove("hidden")
    vientoTitulo.classList.remove("hidden")
    iconoAnimado.classList.remove("hidden")
});

const traerCiudar =(ciudad) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&units=metric&appid=d967a4c52a1e50d5115e5dd32bece1c3`)
    .then((res) =>res.json())
    .then((data) => {
        let temp = Math.round(data.main.temp);
        temperaturaValor.textContent = `${temp} °C`;
        console.log(data.weather[0].description);
        let desc = data.weather[0].description
        temperaturaDescripcion.textContent = desc.toUpperCase();

        
        ubicaccion.textContent = data.name;

        let velocidad = data.wind.speed;

        vientoVelocidad.textContent = `${velocidad} km/h`;

        switch (data.weather[0].main) {
            case 'Clear':
                iconoAnimado.src = 'animated/day.svg'
                
                break;
            case 'Clouds':
                iconoAnimado.src = 'animated/cloudy.svg'

                break;
            case 'Rain':
                iconoAnimado.src = 'animated/rain.svg'
                break;
            case 'Snow':
                iconoAnimado.src = 'animated/snow.svg'
                break;
            case 'Thunderstorm':
                iconoAnimado.src = 'animated/thunder.svg'
                break;
            case 'Drizzle':
                iconoAnimado.src = 'animated/drizzle.svg'
                break;

        
            default:
                break;
        }      
    })
    .catch(error => {
        console.log(error);
    })
}

////////////////////////////
////////CRONOMETRO//////////
////////////////////////////

const stopBtn = document.getElementById("stop");
const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const secondsSphere = document.getElementById('seconds-sphere');

playPauseButton.addEventListener("click", () => {
    const isPaused = !playPauseButton.classList.contains('running');
    if (isPaused) {
        playPauseButton.classList.add('running');
        start();
    } else {
        playPauseButton.classList.remove('running');
        pause();
    }
})

let stopwatchInterval;
let runningTime = 0;

const pause = () => {
    secondsSphere.style.animationPlayState = 'paused';
    clearInterval(stopwatchInterval);
}

const stop = () => {
    secondsSphere.style.transform = 'rotate(-90deg) translateX(60px)';
    secondsSphere.style.animation = 'none';
    playPauseButton.classList.remove('running');
    runningTime = 0;
    clearInterval(stopwatchInterval);
    stopwatch.textContent = '00:00';
}

const start = () => {
    secondsSphere.style.animation = 'rotacion 60s linear infinite';
    let startTime = Date.now() - runningTime;
    secondsSphere.style.animationPlayState = 'running';
    stopwatchInterval = setInterval(() => {
        runningTime = Date.now() - startTime;
        stopwatch.textContent = calculateTime(runningTime);
    }, 1000)
}

const calculateTime = runningTime => {
    const total_seconds = Math.floor(runningTime / 1000);
    const total_minutes = Math.floor(total_seconds / 60);
    const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
    const display_minutes = total_minutes.toString().padStart(2, "0");
    return `${display_minutes}:${display_seconds}`
}

///////////////////////////
////////TAREAS/////////////
///////////////////////////

const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST = []
let id

// ADD 

function agregarTarea(tarea, id, realizado, eliminado) {
    if (eliminado) {
        return
    }

    //REALIZADO == TRUE CHECK - ELSE UNCHECK
    const REALIZADO = realizado ? check : uncheck 

    const LINE = realizado ? lineThrough : ''

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend", elemento);
}


function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true //Si
}

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
    console.log(LIST)
}

////////////////
// LOCALSTORAGE
////////////////

botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if (tarea) {
        ///////-AGREGA TAREA

        console.log("Tarea Agregada")
        //ohSnap('Oh Snap! I cannot process your card...', {color: "red"});  // alert will have class 'alert-color'
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
        //SETEANDO ITEMS
        localStorage.setItem('TODO', JSON.stringify(LIST))
        id++
        input.value = ''

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tarea Agregada',
            showConfirmButton: false,
            timer: 1500
          })
    }

})

document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const tarea = input.value
        if (tarea) {
            agregarTarea(tarea, id, false, false)

            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
            //SETEANDO ITEMS
            localStorage.setItem('TODO', JSON.stringify(LIST))

            input.value = ''
            id++
            console.log(LIST)
        }
    }

})

lista.addEventListener('click', function (event) {
    const element = event.target
    const elementData = element.attributes.data.value
    console.log(elementData)
    //ohSnap('Oh Snap! I cannot process your card...', {color: red});  // alert will have class 'alert-color'
    //toastr.success("Message will come here", "Title");
    //toastr["success"]("Tarea Completa!", "Notificacion") //<---------------- toastr

    if (elementData == 'realizado') {
        tareaRealizada(element)
        
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tarea Completada',
            showConfirmButton: false,
            timer: 1500
          })

    } else if (elementData == 'eliminado') {
        
        Swal.fire({
            title: 'Esta seguro que desea eliminar tarea?',
            text: "No podras deshacer los cambios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar'
          }).then((result) => {
            if (result.isConfirmed) {
                //ELIMINA TAREA PRIMERO MUESTRA ALERT
                tareaEliminada(element)
                Swal.fire(
                'Eliminado',
                'Tu tarea ha sido eliminada',
                'success'
              )
            }
          })
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
})

///////////////
//OBTENIENDO LS
///////////////

let data = localStorage.getItem('TODO')
if (data) {
    //JSON A OBJ
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
} else {
    LIST = []
    id = 0
}

function cargarLista(array) {
    array.forEach(function (item) {
        agregarTarea(item.nombre, item.id, item.realizado, item.eliminado)
    })
}