"use srict";

// Importar la función de geolocation.js (o como se llame el fichero de Cris)
// import { getUserDate } from "/js/geolocation.js"; uso mejor la versoin beta
import { userLocation } from "./geolocation-beta.js";
import { getUserDate } from "./geolocation-beta.js";

// Obtener la fecha / hora del usuario
const date = getUserDate();
console.log(date);
// {
// 	day: 21,
// 	hours: 2,
// 	isoLocalDate: "2024-11-21T02:48:13",
// 	minutes: 48,
// 	month: 10,
// 	seconds: 13.
// 	year: 2024
// }

// Obtener la ubicación del usuario
const locationData = await userLocation();
console.log(locationData);

// Importar la función de meteo.js (o como se llame el fichero de Jetro)
// import { getWeatherData } from "./1meteo.js"; / esta en node.js

// Obtener el nombre de la ciudad
const cityResponse = await fetch(
	`https://nominatim.openstreetmap.org/reverse?format=json&lat=${locationData.latitude}&lon=${locationData.longitude}`
);
const cityData = await cityResponse.json();
locationData.city =
	cityData.address.city ||
	cityData.address.state ||
	`Ubicacion desconosida (${locationData.latitude} | ${locationData.longitude})`;

// Constantes del contenido HTML
const currentLocation = document.getElementById("location"); // Ciudad o Localidad
const currentTemperature = document.getElementById("temperature"); // Temperatura
const currentWeather = document.getElementById("spoiler"); // Descripcion del clima
const maxTemp = document.getElementById("maxTemp"); // Temperatura maxima
const minTemp = document.getElementById("minTemp"); // Temperatura minima
const col1 = document.getElementById("col1"); // Columna de tiempo 1
const divsCol1 = col1.getElementsByTagName("div"); // Divisiones de tiempo 1
const col2 = document.getElementById("col2"); // Columna de tiempo 2
const divsCol2 = col2.getElementsByTagName("div"); // Divisiones de tiempo 2

// Función principal para obtener datos y actualizar el UI
async function main() {
	try {
		// Obtener datos del clima
		// const weatherData = await getWeatherData();
		// Inyectar los datos en el HTML
		currentLocation.textContent = locationData.city;
		for (let i = 0; i < 4; i++) {
			divsCol1[i].textContent = `${
				String(date.hours + i).padStart(2, "0") +
				":" +
				String(date.minutes).padStart(2, "0")
			}`;
			divsCol2[i].textContent = `${
				String(date.hours + i + 4).padStart(2, "0") +
				":" +
				String(date.minutes).padStart(2, "0")
			}`;
		}
		// updateWeatherUI(weatherData);
	} catch (error) {
		console.error("Error al obtener o mostrar los datos del clima:", error);
	}
}

// Ejecutar la función principal
main();
