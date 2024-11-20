'use strict';
//llamamos a las funciones-----------------------
const express = require('express'); //http 
const axios = require('axios'); //Para poder importar y realizar peticiones http
const app = express();  //Poder descargar cosas
const port = 8000;

//LA CLAVE DE LA API:
const api_key = '8c0d35f0c42de29f952cc74660cacc14';

//Ruta para agarrar el clima de una ciudad en específico
//           1      2             1    2              (async para que termine antes de empezar)
app.get('/weather/:city', async (req,res) => {
    const city = req.params.city; // Obtener el nombre de la ciudad desde la URL
    //                                                           agrega ES | (solo españa) ; sin ES es mundial
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric&lang=es`;

    try {
        //Para pedir a la API (OpenWheather)
        const response = await axios.get(url);
        
        //Que información sobre el clima???:
        const data= response.data;
        const weatherInfo = {
            ciudad: data.city.name,
            temperatura: data.list[0].main.temp,
            descripcion: data.list[0].weather[0].description,
            humedad: data.list[0].main.humidity,
            viento: data.list[0].wind.speed,
            //horaPronostico: new Date(data.list[0].dt * 1000), //añadido ultimo (6 horas adelante???)
        };
        

        //Que enviamos al JASON (información)
        res.json(weatherInfo);

        //PARA SABER ERRORES---------------------------------------------------

        } catch (error) {
            //error de "ciudad no encontrada" o algun problema con la API
            if(error.response && error.response.status === 404){
                res.status(404).json({error:'Ciudad no encontrada'});
                }else {
                res.status(500).json({error:'Error al obtener el clima'});
                }
            }
                
});

// Esto es lo que aparecera en la terminal (abajo)
app.listen (port, () =>{
    console.log(`App saliendo por http://localhost:${port}/weather/)`);
    
});
