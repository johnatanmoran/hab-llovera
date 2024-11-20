"use srict";

// Importar la función de meteo.js (o como se llame el fichero de Jetro)
import { getWeatherData } from "js/meteo.js";

// Función para inyectar los datos en el HTML
function updateWeatherUI(data) {
	// Actualizar ubicación
	document.querySelector("#ubicacon").textContent = data.ciudad;

	// Actualizar probabilidad actual de lluvia
	document.querySelector(
		"#probabilidadActual"
	).textContent = `${data.predicción[0]}% de probabilidad de lluvia`;

	// Actualizar descripción meteorológica
	document.querySelector("#meteorologiaActual").textContent =
		data.descripcion;

	// Actualizar la temperatura, humedad y viento
	document.querySelector(
		"#temperatura"
	).textContent = `${data.temperatura}°C`;
	document.querySelector("#humedad").textContent = `${data.humedad}%`;
	document.querySelector("#viento").textContent = `${data.viento} km/h`;

	// Actualizar el pronóstico para las próximas 8 horas
	const pronosticoList = document.querySelector("#pronostico8horas");
	pronosticoList.innerHTML = ""; // Limpiar contenido previo
	for (let i = 1; i <= 8; i++) {
		const li = document.createElement("li");
		li.className = `mas${i}`;
		li.textContent = `${data.predicción[i]}%`;
		pronosticoList.appendChild(li);
	}
}

// Función principal para obtener datos y actualizar el UI
async function main() {
	try {
		// Obtener datos del clima
		const weatherData = await getWeatherData();

		// Inyectar los datos en el HTML
		updateWeatherUI(weatherData);
	} catch (error) {
		console.error("Error al obtener o mostrar los datos del clima:", error);
	}
}

// Ejecutar la función principal
main();
