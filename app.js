// cdcfd382ca1c55c9fb69f5695f512073


const date = document.getElementById('date');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const tempImg = document.getElementById('tempImg');
const description = document.getElementById('description');
const tempMax = document.getElementById('tempMax');
const tempMin = document.getElementById('tempMin');
const app = document.getElementById('app');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let dateObj = new Date();
let month = months[dateObj.getUTCMonth()];
let day = dateObj.getUTCDate() - 1;
let year = dateObj.getUTCFullYear();

date.innerHTML = `${month} ${day},${year}`;

const getWeather = async () => {
    try {
        const apiKey = "cdcfd382ca1c55c9fb69f5695f512073"; // API key kamu
        const cityName = document.getElementById('searchBarInput').value;
        // Langkah 1: Dapatkan latitude dan longitude dari nama kota menggunakan API Geocoding
        const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
        const geocodingResponse = await fetch(geocodingUrl);
        const geocodingData = await geocodingResponse.json();

        if (geocodingData.length > 0) {
            const { lat, lon } = geocodingData[0]; // Ambil latitude dan longitude pertama yang ditemukan

            // Langkah 2: Gunakan lat dan lon untuk memanggil API onecall versi 3
            const onecallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            const weatherDataFetch = await fetch(onecallUrl, {
                headers: {
                    Accept: "application/json"
                }
            });
            const weatherData = await weatherDataFetch.json();
            console.log(weatherData);

            city.innerHTML = `${weatherData.timezone}`
            description.innerHTML = `${weatherData.current.weather[0].description}`
            tempImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png"/>`
            temp.innerHTML = `<h2>${Math.round(weatherData.current.temp - 273.15)}°C</h2>`;
            tempMax.innerHTML = `${Math.round(weatherData.current.feels_like - 273.15)}°C`
            tempMin.innerHTML = `${weatherData.current.wind_speed} m/s`
        } else {
            console.log("City not found");
        }


    } catch (error) {
        console.log(error);
    }
}
