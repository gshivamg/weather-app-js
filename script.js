const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city){
    const api_key = "a026e066784a4387b6f134430252506"; // weatherapi key
    const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=yes`;

    const weather_data = await fetch(url).then(response => response.json());

    // Error handling for invalid location
    if(weather_data.error){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log(weather_data);
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    // Display temperature
    temperature.innerHTML = `${weather_data.current.temp_c}°C`;

    // Display weather condition
    description.innerHTML = `${weather_data.current.condition.text}`;

    // Display humidity
    humidity.innerHTML = `${weather_data.current.humidity}%`;

    // Display wind speed in Km/h
    wind_speed.innerHTML = `${weather_data.current.wind_kph} Km/H`;

    // Set weather image based on condition
    const condition = weather_data.current.condition.text.toLowerCase();

    if (condition.includes("cloud")) {
        weather_img.src = "./assets/cloud.png";
    } else if (condition.includes("clear") || condition.includes("sunny")) {
        weather_img.src = "./assets/clear.png";
    } else if (condition.includes("rain")) {
        weather_img.src = "./assets/rain.png";
    } else if (condition.includes("mist") || condition.includes("fog")) {
        weather_img.src = "./assets/mist.png";
    } else if (condition.includes("snow")) {
        weather_img.src = "./assets/snow.png";
    } else {
        weather_img.src = "./assets/cloud.png"; // default
    }
    
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value.trim());
});
