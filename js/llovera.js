"use srict";

// Importar la función de geolocation.js (o como se llame el fichero de Cris)
import { userLocation } from "./geolocation-beta.js";
import { getUserDate } from "./geolocation-beta.js";
// Importar la función de meteo.js (o como se llame el fichero de Jetro)
import { obtenerClima } from "./meteo.js";
// Importar funcion de timeline para cambio de iconos por Lovo
import { iconoClimas } from "./timeline.js";

// Obtener la fecha / hora del usuario
const date = getUserDate();

// Obtener la ubicación del usuario
const locationData = await userLocation();

// Constantes del contenido HTML
const mainContainer = document.getElementById("contenedor-principal"); // :34 - Contenedor Principal
const loader = document.getElementById("loader"); // :35 - Cargador
const currentLocation = document.getElementById("location"); // :37 Ciudad o Localidad
const currentWeather = document.getElementById("current-weather"); // :42 Contenedor del clima
const currentWeatherIcon = document.getElementById("current-weather-icon"); // :42 Contenedor del clima
const weatherDescription = document.getElementById("description"); // :43 Descripcion del clima
const currentTemperature = document.getElementById("current-temperature"); // :45 Temperatura
const maxTemp = document.getElementById("max-temperature"); // :47 Temperatura maxima
const minTemp = document.getElementById("min-temperature"); // :48 Temperatura minima
const wind = document.getElementById("wind"); // : 50 Viento
const humidity = document.getElementById("humidity"); // :51 Humedad
const currentTime = document.getElementById("current-time"); // :53 Hora actual
const forecastContainer = document.getElementById("forecast"); // :56 Contenedor del pronóstico
const forecastPlusSections = forecastContainer.getElementsByTagName("div"); // Secciones dentro de Pronostico +1

// Funcion de carga
//console.log(loader);

// Función principal para actualizar el UI
async function main() {
	try {
		// Obtener datos del clima
		const weatherData = await obtenerClima(
			`${locationData.latitude},${locationData.longitude}`
		);
		console.log(weatherData);

		// Inyectar los datos en el HTML

		// Clase si es día o noche
		if (weatherData.dia) {
			mainContainer.classList.add("dia");
			mainContainer.classList.remove("noche");
		} else {
			mainContainer.classList.add("noche");
			mainContainer.classList.remove("dia");
		}

		// Ubicación
		currentLocation.textContent = ``;
		currentLocation.appendChild(document.createElement("h1"));
		currentLocation.lastChild.classList.add("city");
		if (weatherData.ciudad) {
			currentLocation.lastChild.textContent = weatherData.ciudad;
		} else {
			currentLocation.textContent = `${locationData.city}`;
		}

		// Region
		if (weatherData.region) {
			currentLocation.appendChild(document.createElement("h2"));
			currentLocation.lastChild.classList.add("region");
			currentLocation.lastChild.textContent = weatherData.region;
		}

		// Pais
		if (weatherData.pais) {
			currentLocation.appendChild(document.createElement("h3"));
			currentLocation.lastChild.classList.add("country");
			currentLocation.lastChild.textContent = weatherData.pais;
		}

		// Descripcion del clima actual / icono
		weatherDescription.textContent = weatherData.descripcion_actual;
		currentWeather.classList.add(
			weatherData.descripcion_actual.toLowerCase().replace(/ /g, "-")
		);
		iconoClimas(
			weatherData.descripcion_actual,
			weatherData.dia,
			currentWeatherIcon
		);

		/*
		currentWeatherIcon.appendChild(document.createElement("img"));
		currentWeatherIcon.lastChild.src = `https:${weatherData.icono_actual}`;
		currentWeatherIcon.lastChild.alt = weatherData.descripcion_actual;
		*/

		// Temperatura Actual
		currentTemperature.textContent = `${Math.round(
			weatherData.temperatura_actual
		)}°`;

		// Temperatura maxima
		maxTemp.textContent = `${Math.round(weatherData.temperatura_max)}`;

		// Temperatura minima
		minTemp.textContent = `${Math.round(weatherData.temperatura_min)}`;

		// Humedad
		humidity.textContent = `${weatherData.humedad_actual}`;

		// Viento
		wind.textContent = `${weatherData.viento_actual}`;

		currentTime.textContent = `
		${
			String(date.hours).padStart(2, "0") +
			":" +
			String(date.minutes).padStart(2, "0")
		}
		`;

		// Inyectar las horas futuras

		for (let i = 0; i < 8; i++) {
		    console.log(date.hours)
			const htmlInterno = `
				<section id="hora-plus-${i + 1}" class="hora">
				${
				    /*weatherData.predicciones_horarias[i + 1].hora*/
				    String(date.hours + i >= 12 ? ((date.hours + i) - 12 +1) : date.hours + i + 1).padStart(2, "0")
				}
                ${date.hours + i < 11 ? '<br>AM' : '<br>PM'}
                </section>
				<section id="temperatura-plus-${i + 1}" class="temperatura">${Math.round(
				weatherData.predicciones_horarias[i + 1].temperatura
			)}</section>
			<section id="clima-plus-${i + 1}" class="clima">
				<img class="clima-icon" src="https:${
					weatherData.predicciones_horarias[i + 1].icono
				}" alt="${
				weatherData.predicciones_horarias[i + 1].descripcion
			}">
			</section>
			<section id="viento-plus-${i + 1}" class="viento">${
				weatherData.predicciones_horarias[i + 1].viento
			}
			</section>
			<section id="humedad-plus-${i + 1}" class="humedad">${
				weatherData.predicciones_horarias[i + 1].humedad
			}</section>
			`;
			forecastPlusSections[i].innerHTML = "";
			forecastPlusSections[i].innerHTML = htmlInterno;
		}
	} catch (error) {
		console.error("Error al obtener o mostrar los datos del clima:", error);
	}
}

// Ejecutar la función principal
main();
