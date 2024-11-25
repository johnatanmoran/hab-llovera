"use-stric";

export function iconoClimas(clima, dia, elemento) {
	const icono = elemento;
	switch (clima) {
		// case "Aguanieve fuerte o moderada" // (D/N)
		// case "Aguanieve moderada a intervalos en las aproximaciones" // (D/N)
		// case "Chubascos de aguanieve fuertes o moderados" // (D/N)
		// case "Chubascos de nieve fuertes o moderados" // (D/N)
		// case "Chubascos de nieve" // (D/N)
		// case "Chubascos fuertes o moderados acompañados de granizo" // (D/N)
		case ("Cielo cubierto", "Neblina", "Nublado", "Parcialmente nublado"):
			if (dia) {
				icono.style.backgroundImage =
					"url(./media/weather-icons/dia-nublado.svg)";
			} else {
				icono.style.backgroundImage =
					"url(./media/weather-icons/noche-nublado.svg)";
			}
			break;
		case ("Cielos tormentosos en las aproximaciones",
		"Lluvias con tormenta fuertes o moderadas en la región"): // (D/N)
			icono.style.backgroundImage =
				"url(./media/weather-icons/tormenta-electrica.svg)";
			break;
			// case "Lluvias heladas fuertes o moderadas" // (D/N)
			// case "Lluvias torrenciales" // (D/N)
			// case "Nevadas intensas" // (D/N)
			// case "Nevadas ligeras a intervalos" // (D/N)
			// case "Nevadas ligeras" // (D/N)
			// case "Niebla helada" // (D/N)
			// case "Niebla moderada" // (D/N)
			if (dia) {
				icono.style.backgroundImage =
					"url(./media/weather-icons/dia-nuebes-dispersas.svg)";
			} else {
				icono.style.backgroundImage =
					"url(./media/weather-icons/noche-nuebes-dispersas.svg)";
			}
			break;
		case "Despejado":
			icono.style.backgroundImage =
				"url(./media/weather-icons/noche-despejado.svg)";
			break;
		// case "Fuerte llovizna helada" // (D/N)
		case ("Fuertes lluvias", "Lluvias fuertes o moderadas"):
			icono.style.backgroundImage =
				"url(./media/weather-icons/dia-lluvia-ligera.svg)";
			break;
		// case "Fuertes nevadas" // (D/N)
		// case "Granizo" // (D/N)
		// case "Intervalos de lluvias ligeras con tomenta en la región" // (D/N)
		// case "Ligeras lluvias heladas" // (D/N)
		// case "Ligeras lluvias" // (D/N)
		// case "Ligeras precipitaciones de aguanieve" // (D/N)
		// case "Ligeras precipitaciones de nieve" // (D/N)
		// case "Ligeras precipitaciones" // (D/N)
		// case "Ligeros chubascos acompañados de granizo" // (D/N)
		// case "Ligeros chubascos de aguanieve" // (D/N)
		// case "Llovizna a intervalos" // (D/N)
		// case "Llovizna helada a intervalos en las aproximaciones" // (D/N)
		// case "Llovizna helada" // (D/N)
		case ("Llovizna",
		"Ligeras lluvias",
		"Lluvias ligeras a intervalos",
		"Lluvia moderada",
		"Lluvia moderada a intervalos",
		"Periodos de fuertes lluvias",
		"Periodos de lluvia moderada"):
			if (dia) {
				icono.style.backgroundImage =
					"url(./media/weather-icons/dia-lluvia-ligera.svg)";
			} else {
				icono.style.backgroundImage =
					"url(./media/weather-icons/noche-lluvia-ligera.svg)";
			}
			break;
		// case "Nieve moderada a intervalos en las aproximaciones" // (D/N)
		// case "Nieve moderada a intervalos" // (D/N)
		// case "Nieve moderada con tormenta en la región" // (D/N)
		// case "Nieve moderada o fuertes nevadas con tormenta en la región" // (D/N)
		// case "Nieve moderada" // (D/N)
		case "Soleado":
			icono.style.backgroundImage =
				"url(./media/weather-icons/dia-despejado.svg)";
			break;
		// case "Ventisca" // (D/N)

		default:
			console.log("Falta Icono para el clima " + clima);
			icono.style.backgroundImage =
				"url(./media/weather-icons/desconocido.svg)";
			icono.textContent = "Falta Icono para el clima " + clima;
			break;
	}
}
