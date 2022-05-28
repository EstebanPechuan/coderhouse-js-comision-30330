const body = document.querySelector('body')
const cardContainer = document.querySelector('.containerCards')
const ciudad = document.querySelector('#ciudad')
const imagen = document.querySelector('#weatherImg')
const temperatura = document.querySelector('#temperatura')
const maxTemp = document.querySelector('#max')
const minTemp = document.querySelector('#min')
const cielo = document.querySelector('#cielo')
let estadoClima

let inputCiudad
let inputCiudadValue
let form = document.querySelector('#formCiudad')
let input = document.querySelector('#city')

let arrayFav = []
let arryClimaTotal = []

function buscarCiudad(e) {
    e.preventDefault()
    inputCiudad = document.querySelector('#city')
    inputCiudadValue = document.querySelector('#city').value
    
    buscarClima(inputCiudadValue)
}

form.addEventListener('submit', (e) => buscarCiudad(e))

input.addEventListener('click', (e) => buscarCiudad(e))

const apiKey = "18962b97fd85aa4544014810f8b7e95f";

const buscarClima = (city) => {
    const inputDOM = document.querySelector('#city')
    inputDOM.value = ''
    inputDOM.focus()

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
                    console.log(data);
                    
                    let actualWeather = {
                         favorito: false
                    }
                    
                    actualWeather.image = data.weather[0].icon
                    actualWeather.ciudad = data.name
                    actualWeather.pais = data.sys.country
                    actualWeather.temp = Math.round((data.main.temp - 273.15) * 100) / 100
                    actualWeather.maxTemp = Math.round((data.main.temp_max - 273.15) * 100) / 100
                    actualWeather.minTemp = Math.round((data.main.temp_min - 273.15) * 100) / 100
                    actualWeather.cielo = data.weather[0].description

                    arryClimaTotal.push(actualWeather)
                    
                    imagen.src = `http://openweathermap.org/img/wn/${actualWeather.image}@2x.png`
                    ciudad.innerText = `${actualWeather.ciudad} - ${actualWeather.pais}`
                    temperatura.innerText = actualWeather.temp
                    maxTemp.innerText = actualWeather.maxTemp
                    minTemp.innerText = actualWeather.minTemp
                    cielo.innerText = actualWeather.cielo

                    window.localStorage.setItem('lastWeather', JSON.stringify(arryClimaTotal[arryClimaTotal.length-1]))

                    const changeBackground = () => {
                        if(estadoClima === 'overcast clouds') {
                            body.classList.add('overcast-clouds')
                        } else if (estadoClima === 'clear sky') {
                            body.classList.add('clear-sky')
                        } else if (estadoClima === 'scattered clouds') {
                            body.classList.add('clouds')
                        }  else if (estadoClima === 'few clouds') {
                            body.classList.add('few-clouds')
                        } else {
                            body.setAttribute('class', '')
                        }
                    }
                    
                    changeBackground()
                })
                
            })
        }




const getLocal = JSON.parse(window.localStorage.getItem('lastWeather'))
if ( getLocal ) {
    buscarClima(getLocal.ciudad)
}