"use strict";

// Clave de la API
const api_key = "ed452b84c18741c7ab0164850242111";

// Función principal para obtener el clima
export async function obtenerClima(city) {
	// el parametro city tambien puedde ser una latitud longotud ~ 48.8567,2.3508
	const url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=2&hours=8&lang=es`;

	// Realizar la solicitud con fetch
	try {
		// Realizar la solicitud con fetch
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Error al obtener los datos del clima");
		}

		const data = await response.json();
		console.log(data);

		// Procesar los datos recibidos
		const currentHour = new Date().getHours();
		const weatherInfo = {
			ciudad: data.location.name,
			region: data.location.region,
			pais: data.location.country,
			temperatura_actual: data.current.temp_c,
			descripcion_actual: data.current.condition.text,
			icono_actual: data.current.condition.icon,
			humedad_actual: data.current.humidity,
			viento_actual: data.current.wind_kph,
			temperatura_max: data.forecast.forecastday[0].day.maxtemp_c,
			temperatura_min: data.forecast.forecastday[0].day.mintemp_c,
			dia: data.current.is_day,
			predicciones_horarias: data.forecast.forecastday[0].hour
				.slice(currentHour, currentHour + 9)
				.map((hour) => ({
					hora: hour.time.split(" ")[1],
					temperatura: hour.temp_c,
					descripcion: hour.condition.text,
					icono: hour.condition.icon,
					humedad: hour.humidity,
					viento: hour.wind_kph,
				})),
		};
		if (currentHour > 15) {
			console.log(currentHour);
			for (let i = 0; i < 8 - (23 - currentHour); i++) {
				weatherInfo.predicciones_horarias.push({
					hora: data.forecast.forecastday[1].hour[i].time.split(
						" "
					)[1],
					temperatura: data.forecast.forecastday[1].hour[i].temp_c,
					descripcion:
						data.forecast.forecastday[1].hour[i].condition.text,
					icono: data.forecast.forecastday[1].hour[i].condition.icon,
					humedad: data.forecast.forecastday[1].hour[i].humidity,
					viento: data.forecast.forecastday[1].hour[i].wind_kph,
				});
			}
		}

		return weatherInfo; // Devuelve el objeto final
	} catch (error) {
		// Devuelve un error manejado
		return { error: error.message };
	}
}

// Función para mostrar los datos en el DOM
function mostrarClima(weatherInfo) {
	const container = document.getElementById("clima-container");
	container.innerHTML = `
		<h2>Clima en ${weatherInfo.ciudad}, ${weatherInfo.region}, ${
		weatherInfo.pais
	}</h2>
		<p>Temperatura actual: ${weatherInfo.temperatura_actual}°C</p>
		<p>Descripción: ${weatherInfo.descripcion_actual}</p>
		<p>Humedad: ${weatherInfo.humedad_actual}%</p>
		<p>Viento: ${weatherInfo.viento_actual} km/h</p>
		<h3>Predicciones para las próximas horas:</h3>
		<ul>
			${weatherInfo.predicciones_horarias
				.map(
					(hour) => `
				<li>
					<strong>${hour.hora}</strong>: ${hour.temperatura}°C, ${hour.descripcion},
					humedad ${hour.humedad}%, viento ${hour.viento} km/h
				</li>
			`
				)
				.join("")}
		</ul>
	`;
}

// Función para mostrar errores
//function mostrarError(mensaje) {
//	const container = document.getElementById("clima-container");
//	container.innerHTML = `<p style="color: red;">Error: ${mensaje}</p>`;
//}

// Escuchar el evento del botón
//document.getElementById("buscar-clima").addEventListener("click", () => {
//	const city = document.getElementById("ciudad-input").value;
//	if (city) {
//		obtenerClima(city);
//	} else {
//		mostrarError("Por favor, escribe una ciudad válida");
//	}
//});
