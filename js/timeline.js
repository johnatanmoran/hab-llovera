"use-stric";

export function fondoClimas(clima) {
	const body = document.body;
	if (clima === "Clear") {
		body.style.backgroundImage =
			'url("./media/weather-icons/dia-despejado.svg")';
	} else if (clima === "Clouds") {
		body.style.backgroundImage = 'url("./media/weather-icons/.svg")';
	} else if (clima === "Rain") {
		body.style.backgroundImage = 'url("./media/weather-icons/.svg")';
	} else if (clima === "Snow") {
		body.style.backgroundImage = 'url("./media/weather-icons/.svg")';
	} else if (clima === "Thunderstorm") {
		body.style.backgroundImage = 'url("./media/weather-icons/.svg")';
	} else if (clima === "Drizzle") {
		body.style.backgroundImage = 'url("./media/weather-icons/.svg")';
	} else if (clima === "Mist" || clima === "Haze") {
		body.style.backgroundImage = 'url("./media/weather-icons/.svg")';
	} else {
		body.style.backgroundImage = 'url("./media/weather-icons/.svg")';
	}
} //./media/weather-icons/.svg
