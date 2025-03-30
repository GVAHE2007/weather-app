const API_KEY = "bfd25d8826394cdf8fd152826253003"
const BASE_URL = "https://api.weatherapi.com/v1/current.json"
const API_URL = `${BASE_URL}?key=${API_KEY}&aqi=no`;





const form = document.querySelector(".form"),
    input = document.querySelector(".form__input"),
    button = document.querySelector(".form__button"),
    main = document.querySelector(".wheater__main"),
    city = document.querySelector(".wheater__location-city"),
    country = document.querySelector(".wheater__location-country"),
    temp = document.querySelector(".wheater__temperature"),
    img = document.querySelector(".wheater__img"),
    dataMonthYear = document.querySelector(".wheater__date-month-year-box"),
    time = document.querySelector(".wheater__time"),
    wind = document.querySelector(".wheater__item-value_wind"),
    hum = document.querySelector(".wheater__item-value_hum");



async function fetchWeather(cityParam = "", lat = "", lon = "") {
    const query = cityParam ? `&q=${cityParam}` : lat && lon ? `&q=${lat},${lon}` : "";
    const res = await fetch(API_URL + query);
    const data = await res.json()
    console.log(data);
    return data

}


window.navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
    const weatherObj = await fetchWeather("", latitude, longitude)
    renderWeather(weatherObj);
    console.log(weatherObj);

});



function renderWeather(obj) {
    temp.append(obj.current.temp_c);
    city.textContent = obj.location.name;
    country.textContent = obj.location.country;
    wind.textContent = obj.current.wind_kph + " kmh";
    hum.textContent = obj.current.humidity + " %";
    img.src = obj.current.condition.icon;

    const index = obj.current["last_updated"].indexOf(" ");
    const dmy =  obj.current["last_updated"].slice(0, index).split("-").join(".");
    dataMonthYear.textContent = dmy;
    const isDay =obj.current.is_Day ? " AM" : " PM"
    time.textContent = obj.current["last_updated"].slice(index) + isDay;

}



button.onclick= async () => {
const data = await fetchWeather(input.value)
renderWeather(data)
}

