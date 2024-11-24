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

export function iconoClimas(clima, dia, elemento) {
	const icono = elemento;
	switch (clima) {
		//Dia
		case "Soleado":
			icono.appendChild(document.createElement("img"));
			icono.lastChild.src = "./media/weather-icons/dia-despejado.svg";
			break;
		case "Parcialmente nublado":
			icono.appendChild(document.createElement("img"));
			icono.lastChild.src = "./media/weather-icons/dia-nublado.svg";
			break;
		case "Lluvia moderada":
			icono.appendChild(document.createElement("img"));
			icono.lastChild.src = "./media/weather-icons/dia-lluvia-ligera.svg";
			break;
		case "Lluvia moderada a intervalos":
			icono.appendChild(document.createElement("img"));
			icono.lastChild.src = "./media/weather-icons/dia-lluvia-ligera.svg";
			break;
		//Noche
		case "Despejado":
			//icono.appendChild(document.createElement("img"));
			icono.prepend(document.createElement("img"));
			icono.firstChild.src = "./media/weather-icons/noche-despejado.svg";
			break;
		case "Ligeras lluvias":
			if (dia) {
				icono.appendChild(document.createElement("img"));
				icono.lastChild.src =
					"./media/weather-icons/dia-lluvia-ligera.svg";
			} else {
				icono.appendChild(document.createElement("img"));
				icono.lastChild.src =
					"./media/weather-icons/noche-lluvia-ligera.svg";
			}
			break;
		default:
			break;
	}
}

/*
DIA
"Soleado",
"Parcialmente nublado",
"Nublado",
"Cielo cubierto",
"Neblina",
"Lluvia  moderada a intervalos",
"Nieve moderada a intervalos en las aproximaciones",
"Aguanieve moderada a intervalos en las aproximaciones",
"Llovizna helada a intervalos en las aproximaciones",
"Cielos tormentosos en las aproximaciones",
"Chubascos de nieve",
"Ventisca",
"Niebla moderada",
"Niebla helada",
"Llovizna a intervalos",
"Llovizna",
"Llovizna helada",
"Fuerte llovizna helada",
"Lluvias ligeras a intervalos",
"Ligeras lluvias",
"Periodos de lluvia moderada",
"Lluvia moderada",
"Periodos de fuertes lluvias",
"Fuertes lluvias",
"Ligeras lluvias heladas",
"Lluvias heladas fuertes o moderadas",
"Ligeras precipitaciones de aguanieve",
"Aguanieve fuerte o moderada",
"Nevadas ligeras a intervalos",
"Nevadas ligeras",
"Nieve moderada a intervalos",
"Nieve moderada",
"Nevadas intensas",
"Fuertes nevadas",
"Granizo",
"Ligeras precipitaciones",
"Lluvias fuertes o moderadas",
"Lluvias torrenciales",
"Ligeros chubascos de aguanieve",
"Chubascos de aguanieve fuertes o moderados",
"Ligeras precipitaciones de nieve",
"Chubascos de nieve fuertes o moderados",
"Ligeros chubascos acompañados de granizo",
"Chubascos fuertes o moderados acompañados de granizo",
"Intervalos de lluvias ligeras con tomenta en la región",
"Lluvias con tormenta fuertes o moderadas en la región",
"Nieve moderada con tormenta en la región",
"Nieve moderada o fuertes nevadas con tormenta en la región",

NOCHE
"Despejado",
"Parcialmente nublado",
"Nublado",
"Cielo cubierto",
"Neblina",
"Lluvia  moderada a intervalos",
"Nieve moderada a intervalos en las aproximaciones",
"Aguanieve moderada a intervalos en las aproximaciones",
"Llovizna helada a intervalos en las aproximaciones",
"Cielos tormentosos en las aproximaciones",
"Chubascos de nieve",
"Ventisca",
"Niebla moderada",
"Niebla helada",
"Llovizna a intervalos",
"Llovizna",
"Llovizna helada",
"Fuerte llovizna helada",
"Lluvias ligeras a intervalos",
"Ligeras lluvias",
"Periodos de lluvia moderada",
"Lluvia moderada",
"Periodos de fuertes lluvias",
"Fuertes lluvias",
"Ligeras lluvias heladas",
"Lluvias heladas fuertes o moderadas",
"Ligeras precipitaciones de aguanieve",
"Aguanieve fuerte o moderada",
"Nevadas ligeras a intervalos",
"Nevadas ligeras",
"Nieve moderada a intervalos",
"Nieve moderada",
"Nevadas intensas",
"Fuertes nevadas",
"Granizo",
"Ligeras precipitaciones",
"Lluvias fuertes o moderadas",
"Lluvias torrenciales",
"Ligeros chubascos de aguanieve",
"Chubascos de aguanieve fuertes o moderados",
"Ligeras precipitaciones de nieve",
"Chubascos de nieve fuertes o moderados",
"Ligeros chubascos acompañados de granizo",
"Chubascos fuertes o moderados acompañados de granizo",
"Intervalos de lluvias ligeras con tomenta en la región",
"Lluvias con tormenta fuertes o moderadas en la región",
"Nieve moderada con tormenta en la región",
"Nieve moderada o fuertes nevadas con tormenta en la región"
*/

/*
DIA
"Soleado",
"Parcialmente nublado",
"Nublado",
"Cielo cubierto",
"Neblina",
"Lluvia  moderada a intervalos",
"Nieve moderada a intervalos en las aproximaciones",
"Aguanieve moderada a intervalos en las aproximaciones",
"Llovizna helada a intervalos en las aproximaciones",
"Cielos tormentosos en las aproximaciones",
"Chubascos de nieve",
"Ventisca",
"Niebla moderada",
"Niebla helada",
"Llovizna a intervalos",
"Llovizna",
"Llovizna helada",
"Fuerte llovizna helada",
"Lluvias ligeras a intervalos",
"Ligeras lluvias",
"Periodos de lluvia moderada",
"Lluvia moderada",
"Periodos de fuertes lluvias",
"Fuertes lluvias",
"Ligeras lluvias heladas",
"Lluvias heladas fuertes o moderadas",
"Ligeras precipitaciones de aguanieve",
"Aguanieve fuerte o moderada",
"Nevadas ligeras a intervalos",
"Nevadas ligeras",
"Nieve moderada a intervalos",
"Nieve moderada",
"Nevadas intensas",
"Fuertes nevadas",
"Granizo",
"Ligeras precipitaciones",
"Lluvias fuertes o moderadas",
"Lluvias torrenciales",
"Ligeros chubascos de aguanieve",
"Chubascos de aguanieve fuertes o moderados",
"Ligeras precipitaciones de nieve",
"Chubascos de nieve fuertes o moderados",
"Ligeros chubascos acompañados de granizo",
"Chubascos fuertes o moderados acompañados de granizo",
"Intervalos de lluvias ligeras con tomenta en la región",
"Lluvias con tormenta fuertes o moderadas en la región",
"Nieve moderada con tormenta en la región",
"Nieve moderada o fuertes nevadas con tormenta en la región",

NOCHE
"Despejado",
"Parcialmente nublado",
"Nublado",
"Cielo cubierto",
"Neblina",
"Lluvia  moderada a intervalos",
"Nieve moderada a intervalos en las aproximaciones",
"Aguanieve moderada a intervalos en las aproximaciones",
"Llovizna helada a intervalos en las aproximaciones",
"Cielos tormentosos en las aproximaciones",
"Chubascos de nieve",
"Ventisca",
"Niebla moderada",
"Niebla helada",
"Llovizna a intervalos",
"Llovizna",
"Llovizna helada",
"Fuerte llovizna helada",
"Lluvias ligeras a intervalos",
"Ligeras lluvias",
"Periodos de lluvia moderada",
"Lluvia moderada",
"Periodos de fuertes lluvias",
"Fuertes lluvias",
"Ligeras lluvias heladas",
"Lluvias heladas fuertes o moderadas",
"Ligeras precipitaciones de aguanieve",
"Aguanieve fuerte o moderada",
"Nevadas ligeras a intervalos",
"Nevadas ligeras",
"Nieve moderada a intervalos",
"Nieve moderada",
"Nevadas intensas",
"Fuertes nevadas",
"Granizo",
"Ligeras precipitaciones",
"Lluvias fuertes o moderadas",
"Lluvias torrenciales",
"Ligeros chubascos de aguanieve",
"Chubascos de aguanieve fuertes o moderados",
"Ligeras precipitaciones de nieve",
"Chubascos de nieve fuertes o moderados",
"Ligeros chubascos acompañados de granizo",
"Chubascos fuertes o moderados acompañados de granizo",
"Intervalos de lluvias ligeras con tomenta en la región",
"Lluvias con tormenta fuertes o moderadas en la región",
"Nieve moderada con tormenta en la región",
"Nieve moderada o fuertes nevadas con tormenta en la región"
*/
