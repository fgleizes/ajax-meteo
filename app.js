const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}

function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}

async function main(){
    // fetch('https://api.ipify.org?format=json')
    //     .then(resultat => resultat.json())
    //     .then(json => {
    //         const ip = json.ip;

    //         fetch(`http://api.ipstack.com/${ip}?access_key=13d6aa2601f46509be09d76eb59a55ce`)
    //             .then(resultat => resultat.json())
    //             .then(json => {
    //                 const ville = json.city;

    //                 fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&APPID=8e602b9ea28ed4f9f8fc97a5f6d1105c&lang=fr&units=metric`)
    //                 // fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&APPID=b7f13582854c2cf55297dfdbd7b8a665&lang=fr&units=metric`)
    //                     .then(resultat => resultat.json())
    //                     .then(json => {
    //                         // Afficher les informations
    //                         console.log(json);
    //                     })
    //             })
    //     })

    // On récupère l'adresse IP de l'utilisateur grâce à l'API ipfy.org,
    const ip = await fetch('https://api.ipify.org?format=json')
        .then(resultat => resultat.json())
        .then(json => json.ip)

    // pour retrouver la ville de connexion grâce à l'API ipsatck.com,
    const ville = await fetch(`http://api.ipstack.com/${ip}?access_key=13d6aa2601f46509be09d76eb59a55ce`)
        .then(resultat => resultat.json())
        .then(json => json.city)

    //et récupérer les informations météos grâce à l'API openweathermap.org !
    // const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&APPID=8e602b9ea28ed4f9f8fc97a5f6d1105c&lang=fr&units=metric`)
    const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&APPID=b7f13582854c2cf55297dfdbd7b8a665&lang=fr&units=metric`)
        .then(resultat => resultat.json())
        .then(json => json)

    displayWeatherInfos(meteo)
}

function displayWeatherInfos(data){
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(description);
    document.querySelector('i.wi').className = weatherIcons[conditions];
}

main()