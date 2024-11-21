'use strict';

// Clave de la API
const api_key = 'ed452b84c18741c7ab0164850242111';

// Función principal para obtener el clima
function obtenerClima(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days&hours=1&lang=es`;

    // Realizar la solicitud con fetch
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del clima');
            }
            return response.json();
        })
        .then((data) => {
            // Procesar los datos recibidos
            const currentHour = new Date().getHours();
            const predicciones_horarias = data.forecast.forecastday[0].hour
            const weatherInfo = {
                ciudad: data.location.name,
                region: data.location.region,
                pais: data.location.country,
                temperatura_actual: data.current.temp_c,
                descripcion_actual: data.current.condition.text,
                humedad_actual: data.current.humidity,
                viento_actual: data.current.wind_kph,
                predicciones_horarias: data.forecast.forecastday[0].hour
                .slice(currentHour, currentHour + 8 )
                .map((hour) => ({
                    hora: hour.time.split(' ')[1], // Solo la hora
                    temperatura: hour.temp_c,
                    descripcion: hour.condition.text,
                    humedad: hour.humidity,
                    viento: hour.wind_kph,
                    predicciones_horarias,
                    })),
            };

            // Mostrar los datos en la consola o manipular el DOM
            console.log(weatherInfo);
            mostrarClima(weatherInfo);
        })
        .catch((error) => {
            console.error('Error al obtener el clima:', error.message);
            mostrarError(error.message);
        });
}

// Función para mostrar los datos en el DOM
function mostrarClima(weatherInfo) {
    const container = document.getElementById('clima-container');
    container.innerHTML = `
        <h2>Clima en ${weatherInfo.ciudad}, ${weatherInfo.region}, ${weatherInfo.pais}</h2>
        <p>Temperatura actual: ${weatherInfo.temperatura_actual}°C</p>
        <p>Descripción: ${weatherInfo.descripcion_actual}</p>
        <p>Humedad: ${weatherInfo.humedad_actual}%</p>
        <p>Viento: ${weatherInfo.viento_actual} km/h</p>
        <h3>Predicciones para las próximas horas:</h3>
        <ul>
            ${weatherInfo.predicciones_horarias.map((hour) => `
                <li>
                    <strong>${hour.hora}</strong>: ${hour.temperatura}°C, ${hour.descripcion},
                    humedad ${hour.humedad}%, viento ${hour.viento} km/h
                </li>
            `).join('')}
        </ul>
    `;
}

// Función para mostrar errores
function mostrarError(mensaje) {
    const container = document.getElementById('clima-container');
    container.innerHTML = `<p style="color: red;">Error: ${mensaje}</p>`;
}

// Escuchar el evento del botón
document.getElementById('buscar-clima').addEventListener('click', () => {
    const city = document.getElementById('ciudad-input').value;
    if (city) {
        obtenerClima(city);
    } else {
        mostrarError('Por favor, escribe una ciudad válida');
    }
});
