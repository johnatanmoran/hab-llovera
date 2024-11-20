'use srict';

// Geolocation

if ('geolocation' in navigator) {
    console.log('Geolocation is avaiable');
} else {
    console.log('Geolocation is NOT Avaiable');
}

const options = {
    enableHigtAcurracy: true,
    timeout: 30000,
    maximumAge: 0,
};
function sucess(pos) {
    const crd = pos.coords;

    console.log(`Latitude: ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`Acurrency: ${crd.accuracy} meters`);
}

function error(error) {
    console.warn(`ERROR (${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(sucess, error, options);

//Date

function getUserDate() {
    const userDate = new Date();

    const year = userDate.getFullYear();
    const month = String(userDate.getMonth() + 1).padStart(2, '0'); // Mes (de 0 a 11)
    const day = String(userDate.getDate()).padStart(2, '0');
    const hours = String(userDate.getHours()).padStart(2, '0');
    const minutes = String(userDate.getMinutes()).padStart(2, '0');
    const seconds = String(userDate.getSeconds()).padStart(2, '0');

    // Construir una cadena en formato ISO con la hora local
    const isoLocalDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    console.log(`${isoLocalDate}`);
}

getUserDate();
