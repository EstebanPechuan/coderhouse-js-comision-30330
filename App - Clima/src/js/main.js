const body = document.querySelector('body')
const cardContainer = document.querySelector('.containerCard')
const form = document.querySelector('#formCiudad')
const input = document.querySelector('#city')

const apiKey = "18962b97fd85aa4544014810f8b7e95f";

let estadoClima
let inputCiudad
let inputCiudadValue

var arryClimaTotal = []

form.addEventListener('submit', (e) => buscarCiudad(e))
input.addEventListener('click', (e) => buscarCiudad(e))

const buscarCiudad = (e) => {
    e.preventDefault()
    inputCiudadValue = input.value
    
    buscarClima(inputCiudadValue)
}


const buscarClima = (city) => {
    if (city === '') {
        return
    }

    cardContainer.innerHTML = `
        <div class="loader">
            <span></span>
        </div>
    `

    input.value = ''
    input.focus()

    let apiGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;


    
    window.fetch(apiGeo)
        .then(lat_long => lat_long.json())
        .then(lat_long => {
            let coord_lat = lat_long[0].lat;
            let coord_long = lat_long[0].lon;

            let api = `https://api.openweathermap.org/data/2.5/weather?lat=${coord_lat}&lon=${coord_long}&appid=${apiKey}`;

            window.fetch(api)
                .then(data => data.json())
                .then(data => {
                    estadoClima = data.weather[0].description
                    
                    let actualWeather = {}
                    
                    actualWeather.image = data.weather[0].icon
                    actualWeather.ciudad = data.name
                    actualWeather.pais = data.sys.country
                    actualWeather.temp = Math.round((data.main.temp - 273.15) * 100) / 100
                    actualWeather.maxTemp = Math.round((data.main.temp_max - 273.15) * 100) / 100
                    actualWeather.minTemp = Math.round((data.main.temp_min - 273.15) * 100) / 100
                    actualWeather.cielo = estadoClima

                    console.log(actualWeather);

                    arryClimaTotal.push(actualWeather)

                    let cardClima = `
                        <div class="card">
                            <h2 id="ciudad">${actualWeather.ciudad} - ${actualWeather.pais}</h2>
                
                            <div class="img-info">
                                <div class="img-weather">
                                    <img id="weatherImg"
                                        src="http://openweathermap.org/img/wn/${actualWeather.image}@2x.png"
                                        alt=""
                                    >
                                </div>
                            
                                <div class="info">
                                    <p><span id="temperatura">${actualWeather.temp}</span> °C</p>
                        
                                    <p id="cielo">${actualWeather.cielo}</p>
                                </div>
                            </div>
                        
                            <div class="minmax">
                                <div class="maxTemp">
                                    Temp. máxima: <span id="max">${actualWeather.maxTemp}</span> °C
                                </div>
                                
                                <div class="minTemp">
                                    Temp. mínima: <span id="min">${actualWeather.minTemp}</span> °C
                                </div>
                            </div>
                        </div>
                    `
    
                    cardContainer.innerHTML = cardClima

                    window.localStorage.setItem('lastWeather', JSON.stringify(arryClimaTotal))
                    
                    changeBackground()
                })  
            })
        }

const changeBackground = () => {
    if(estadoClima === 'overcast clouds') {
        body.classList.add('overcast-clouds')
    } else if (estadoClima === 'clear sky') {
        body.classList.add('clear-sky')
    } else if (estadoClima === 'scattered clouds') {
        body.classList.add('clouds')
    }  else if (estadoClima === 'few clouds' || estadoClima === 'broken clouds') {
        body.classList.add('few-clouds')
    } else {
        body.classList.add('clear-sky')
    }
}


var getLocal = JSON.parse(window.localStorage.getItem('lastWeather'))

if ( getLocal ) {
    arryClimaTotal = getLocal
    let ultimaCiudadGuardada = arryClimaTotal[arryClimaTotal.length-1].ciudad
    console.log(ultimaCiudadGuardada);
    buscarClima(ultimaCiudadGuardada)
} else {
    input.value = ''
    input.focus()
    cardContainer.innerHTML = `
        <div class="card">
            <div class="ingresarCiudad">
                <h3>Ingrese una ciudad para comenzar</h3>
            </div>
        </div>
    `
}