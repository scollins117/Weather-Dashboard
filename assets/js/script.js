var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var cityContainer = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var apiKey = "4d0aaa270e0258f912067cd95be389be"

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if(cityName) {
        getCurrentWeather(cityName)

        cityContainer.textContent = "";
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name.");
    }
};

var getCurrentWeather = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "4d0aaa270e0258f912067cd95be389be";

    fetch(apiUrl)
    .then((response) => {
        return response.json();
        // if(response.ok) {
        //     console.log(response);
        //     response.json().then(function(data) {
        //         console.log(data);
        //         displayWeather();
            // })
        // } else {
            // alert("Error: " + response.statusText);
        // }
    })
    .catch(function(error) {
        alert("Unable to Connect to OpenWeather");
    });
};

var displayWeather = function (searchTerm) {
    console.log
}

cityFormEl.addEventListener("submit", formSubmitHandler);
