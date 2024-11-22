"use srict";

//Geolocaexporttion

export function getPosition() {
	return new Promise((resolve, reject) => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => resolve(position),
				(error) => reject(error),
				{
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 0,
				}
			);
		} else {
			reject(new Error("Geolocalización no soportada por el navegador."));
		}
	});
}

export async function userLocation() {
	try {
		const position = await getPosition();
		const lat = position.coords.latitude;
		const lng = position.coords.longitude;
		const accuracy = position.coords.accuracy;

		//console.log(`Latitude ${lat}`);
		//console.log(`Longitude ${lng}`);
		//console.log(`Accuracy ${accuracy} meters`);
		return {
			latitude: lat,
			longitude: lng,
			accuracy: accuracy,
			error: null,
		};
	} catch (error) {
		if (error.code) {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					mensajeError =
						"Permiso para acceder a ubicación denegado por el usuario.";
					break;
				case error.POSITION_UNAVAILABLE:
					mensajeError = "Información de ubicación no disponible.";
					break;
				case error.TIMEOUT:
					mensajeError =
						"Tiempo de espera para obtener ubicación agotado.";
					break;
				default:
					mensajeError = "Error desconocido.";
			}
		} else {
			mensajeError = error.message;
		}

		//document.body.innerHTML = `<p>Error: ${mensajeError}</p>`;
		console.error(mensajeError);
		return {
			latitude: null,
			longitude: null,
			accuracy: null,
			error: mensajeError,
		};
	}
}

// Date

export function getUserDate() {
	const userDate = new Date();

	const year = userDate.getFullYear();
	const month = String(userDate.getMonth() + 1).padStart(2, "0"); // Mes (de 0 a 11)
	const day = String(userDate.getDate()).padStart(2, "0");
	const hours = String(userDate.getHours()).padStart(2, "0");
	const minutes = String(userDate.getMinutes()).padStart(2, "0");
	const seconds = String(userDate.getSeconds()).padStart(2, "0");

	// Construir una cadena en formato ISO con la hora local
	const isoLocalDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

	//console.log(`${isoLocalDate}`);
	return {
		year: userDate.getFullYear(),
		month: userDate.getMonth(),
		day: userDate.getDate(),
		hours: userDate.getHours(),
		minutes: userDate.getMinutes(),
		seconds: userDate.getSeconds(),
		isoLocalDate: isoLocalDate,
	};
}

getUserDate();

userLocation();
