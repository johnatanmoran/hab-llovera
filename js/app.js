"use srict";

// Importar la función de geolocation.js (o como se llame el fichero de Cris)
// import { getUserDate } from "/js/geolocation.js"; uso mejor la versoin beta
import { userLocation } from "./geolocation-beta.js";
import { getUserDate } from "./geolocation-beta.js";

// Obtener la fecha / hora del usuario
const date = getUserDate();
/*
	{
		day: 21,
		hours: 2,
		isoLocalDate: "2024-11-21T02:48:13",
		minutes: 48,
		month: 10,
		seconds: 13.
		year: 2024
	}
*/

// Obtener la ubicación del usuario
const locationData = await userLocation();
console.log(locationData);

// Importar funcion de timeline para cambio de fondos
import { fondoClimas } from "./timeline.js";

// Importar la función de meteo.js (o como se llame el fichero de Jetro)
import { obtenerClima } from "./meteo.js";

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
const currentcontainer = document.getElementById("titleArticle"); // Contenedor del pronostoco actual
const currentLocation = document.getElementById("location"); // Ciudad o Localidad
const currentTemperature = document.getElementById("temperature"); // Temperatura
const currentWeather = document.getElementById("spoiler"); // Descripcion del clima
const maxTemp = document.getElementById("maxTemp"); // Temperatura maxima
const minTemp = document.getElementById("minTemp"); // Temperatura minima
const currentTime = document.getElementById("horaUno"); // Hora actual
const col1 = document.getElementById("col1"); // Columna de tiempo 1
const divsCol1 = col1.getElementsByTagName("div"); // Divisiones de tiempo 1
const col2 = document.getElementById("col2"); // Columna de tiempo 2
const divsCol2 = col2.getElementsByTagName("div"); // Divisiones de tiempo 2
const humedad = document.getElementById("humedad"); // Humedad
const viento = document.getElementById("viento"); // Viento

// Función principal para actualizar el UI
async function main() {
	try {
		// Obtener datos del clima
		//const weatherData = await obtenerClima(locationData.city);
		const weatherData = await obtenerClima(
			`${locationData.latitude},${locationData.longitude}`
		);
		console.log(weatherData);
		/*
			{
				"ciudad": "Ferrol",
				"region": "Galicia",
				"pais": "Spain",
				"temperatura_actual": 10.1,
				"descripcion_actual": "Soleado",
				"humedad_actual": 76,
				"viento_actual": 7.9,
				"temperatura_max": 20,
				"temperatura_min": 5,
				"dia": true,
				"predicciones_horarias": [
					{
						"hora": "12:00",
						"temperatura": 10.1,
						"descripcion": "Soleado",
						"humedad": 76,
						"viento": 7.9
					},
					{
						"hora": "13:00",
						"temperatura": 11.3,
						"descripcion": "Soleado",
						"humedad": 60,
						"viento": 9.7
					},
					{
						"hora": "14:00",
						"temperatura": 11.8,
						"descripcion": "Soleado",
						"humedad": 58,
						"viento": 10.1
					},
					{
						"hora": "15:00",
						"temperatura": 12,
						"descripcion": "Soleado",
						"humedad": 58,
						"viento": 9
					},
					{
						"hora": "16:00",
						"temperatura": 12.2,
						"descripcion": "Soleado",
						"humedad": 60,
						"viento": 7.6
					},
					{
						"hora": "17:00",
						"temperatura": 11.7,
						"descripcion": "Soleado",
						"humedad": 64,
						"viento": 7.6
					},
					{
						"hora": "18:00",
						"temperatura": 10.6,
						"descripcion": "Soleado",
						"humedad": 71,
						"viento": 8.6
					},
					{
						"hora": "19:00",
						"temperatura": 10,
						"descripcion": "Despejado",
						"humedad": 75,
						"viento": 10.4
					}
				]
			}
		*/

		// Inyectar los datos en el HTML

		// Ubicación
		if (weatherData.ciudad) {
			currentLocation.textContent = ``;
			currentLocation.appendChild(document.createElement("h3"));
			currentLocation.lastChild.classList.add("ciudad");
			currentLocation.lastChild.textContent = weatherData.ciudad;
		} else {
			currentLocation.textContent = `${locationData.city}`;
		}
		// Si tenemos pais y region las agregamos

		if (weatherData.region) {
			currentLocation.appendChild(document.createElement("h5"));
			currentLocation.lastChild.classList.add("region");
			currentLocation.lastChild.textContent = weatherData.region;
		}
		if (weatherData.pais) {
			currentLocation.appendChild(document.createElement("h6"));
			currentLocation.lastChild.classList.add("pais");
			currentLocation.lastChild.textContent = weatherData.pais;
		}

		// Temperatura Actual
		currentTemperature.textContent = `${weatherData.temperatura_actual}°C`;

		// Descripcion del clima actual
		currentWeather.textContent = weatherData.descripcion_actual;

		// Temperatura maxima
		maxTemp.textContent = `${weatherData.temperatura_max}`;

		// Temperatura minima
		minTemp.textContent = `${weatherData.temperatura_min}`;

		// Humedad
		humedad.textContent = `${weatherData.humedad_actual}`;

		// Viento
		viento.textContent = `${weatherData.viento_actual}`;

		// Clase si es día o noche
		if (weatherData.dia) {
			currentcontainer.classList.add("dia");
			currentcontainer.classList.remove("noche");
		} else {
			currentcontainer.classList.add("noche");
			currentcontainer.classList.remove("dia");
		}

		currentTime.textContent = `
			${
				String(date.hours).padStart(2, "0") +
				":" +
				String(date.minutes).padStart(2, "0")
			}
		`;

		/*
		del 0 - 7
			": 10.1,
			weatherData.predicciones_horarias[i].descripcion": "Soleado",
			weatherData.predicciones_horarias[i].humedad": 76,
			weatherData.predicciones_horarias[i].viento": 7.9
		*/

		// Inyectar las horas futuras
		for (let i = 0; i < 4; i++) {
			divsCol1[i].textContent = "";
			divsCol1[i].innerHTML = `
				<section id="hora${i}" class="hora">${
				weatherData.predicciones_horarias[i + 1].hora
			}</section>
				<section id="temperatura${i}" class="temperatura">${
				weatherData.predicciones_horarias[i + 1].temperatura
			}°C</section>
				<section id="descripcion${i}" class="clima">${
				weatherData.predicciones_horarias[i + 1].descripcion
			}</section>
				<section id="humedad${i}" class="humedad">${
				weatherData.predicciones_horarias[i + 1].humedad
			}%</section>
				<section id="viento${i}" class="viento">${
				weatherData.predicciones_horarias[i + 1].viento
			} km/h</section>
			`;
			divsCol2[i].textContent = "";
			divsCol2[i].innerHTML = `
				<section id="hora${i + 4}" class="hora">${
				weatherData.predicciones_horarias[i + 5].hora
			}</section>
				<section id="temperatura${i + 4}" class="temperatura">${
				weatherData.predicciones_horarias[i + 5].temperatura
			}°C</section>
				<section id="descripcion${i + 4}" class="clima">${
				weatherData.predicciones_horarias[i + 5].descripcion
			}</section>
				<section id="humedad${i + 4}" class="humedad">${
				weatherData.predicciones_horarias[i + 5].humedad
			}%</section>
				<section id="viento${i + 4}" class="viento">${
				weatherData.predicciones_horarias[i + 5].viento
			} km/h</section>
			`;
		}
	} catch (error) {
		console.error("Error al obtener o mostrar los datos del clima:", error);
	}

	fondoClimas("Clear");
}

// Ejecutar la función principal
main();

/*
		// Inyectar las horas futuras
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
*/

// Obtener el enlace al archivo CSS y el botón
const themeLink = document.getElementById("theme-link");
const toggleButton = document.getElementById("toggle-theme");

// Ruta de los archivos CSS
const style1 = "css/estilos.css";
const style2 = "css/styles.css";

// Alternar entre los estilos
toggleButton.addEventListener("click", () => {
	// Cambiar entre los archivos CSS
	const currentStyle = themeLink.getAttribute("href");
	const newStyle = currentStyle === style1 ? style2 : style1;
	themeLink.setAttribute("href", newStyle);
});
