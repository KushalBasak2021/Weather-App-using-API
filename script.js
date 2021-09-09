let weather = {
  apiKey: "4a5beb2634828a1816203d050eec5f0c",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".place").innerText = name;
    document.querySelector(".temp").innerText = `${Math.ceil(temp)}°C`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + Math.ceil(humidity) + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + Math.ceil(speed) + " kmph";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`;
  },
  search: function () {
    const cityName = document.querySelector(".search-bar");
    this.fetchWeather(cityName.value);
    cityName.value = "";
  },
};

document.querySelector("button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("balurghat");
