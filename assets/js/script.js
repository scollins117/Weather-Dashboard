var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-name");
var cityContainer = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var apiKey = "1e980f61679048b9b26be0021ab0b9a6";
var lastCity = "";
var cityExists = false;
var cityName = document.querySelector(".city");
var cityTemp = document.querySelector(".temp");
var cityHumidity = document.querySelector(".humidity");
var cityWind = document.querySelector(".wind");
var cityIcon = document.querySelector(".icon");
var cityUV = document.querySelector(".uv");

var cityNameOne = document.querySelector(".dayOne");
var cityTempOne = document.querySelector(".tempOne");
var cityHumidityOne = document.querySelector(".humidityOne");
var cityWindOne = document.querySelector(".windOne");
var cityIconOne = document.querySelector(".iconOne");

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if(cityName) {
        getCurrentWeather(cityName);
        getWeatherForecast(cityName);
        // cityContainer.textContent = "";
        // cityInputEl.value = "";
    } else {
        alert("Please enter a city name.");
    }

    displayCities();
};

var getCurrentWeather = function(city) {
    console.log(city);
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            saveCity(city);
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayWeather(data);
            })
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to Connect to OpenWeather");
    });
};

var getUVIndex = function(lat, lon) {
    var uvAPI = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

    fetch(uvAPI).then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayUVIndex(data);
            })
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to Connect to OpenWeather");
    });
};

var getWeatherForecast = function(city) {
    console.log(city);
    var forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(forecastAPI).then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayWeatherForecast(data);
            })
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to Connect to OpenWeather");
    });
};

var displayWeatherForecast = function (data) {
    console.log(data);

    var nameOne = data["city"]["name"];
    var tempOne = data["list"][0]["main"]["temp"];
    var speedOne = data["list"][0]["wind"]["speed"];
    var humidityOne = data["list"][0]["main"]["humidity"]
    var descriptionOne = data["list"][0]["weather"][0]["description"];
    var iconOne = data["list"][0]["weather"][0]["icon"];

    console.log(nameOne, tempOne, speedOne, humidityOne, iconOne);

    cityNameOne.innerText = "Weather in " + nameOne;
    cityIconOne.src = "http://openweathermap.org/img/wn/" +iconOne+ ".png";
    cityTempOne.innerText = tempOne + "°F";
    cityHumidityOne.innerText = "Humidity: " + humidityOne + "%";
    cityWindOne.innerText = "Wind Speed: " + speedOne + "mph";

};

var displayUVIndex = function (data) {
    console.log("also working");
    var uvIndex = data["value"];
    console.log(uvIndex);
    cityUV.innerText = "UV Index: " + uvIndex;
};

var displayWeather = function (data) {
    console.log("its working")
    var name = data["name"];
    var temp = data["main"]["temp"];
    var speed = data["wind"]["speed"];
    var humidity = data["main"]["humidity"]
    var description = data["weather"][0]["description"];
    var icon = data["weather"][0]["icon"];
    var lattitude = data["coord"]["lat"]
    var longitude = data["coord"]["lon"];

    console.log(name);
    console.log(temp);
    console.log(description);
    console.log(speed);
    console.log(humidity);
    console.log(lattitude);
    console.log(longitude);

    cityName.innerText = "Weather in " + name;
    cityIcon.src = "http://openweathermap.org/img/wn/" +icon+ ".png";
    cityTemp.innerText = temp + "°F";
    cityHumidity.innerText = "Humidity: " + humidity + "%";
    cityWind.innerText = "Wind Speed: " + speed + "mph";

    getUVIndex(lattitude, longitude);

}

var saveCity = function(newCity) {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage["cities" + i] === newCity) {
            cityExists = true;
            break;
        }
    }
        if (cityExists === false) {
        localStorage.setItem('cities' + localStorage.length, newCity);
    }
}

var displayCities = function() {
    $('#city-results').empty();
    if (localStorage.length===0){
        if (lastCity){
            $('#city').attr("value", lastCity);
        } else {
            $('#city').attr("value", "");
        }
    } else {
        var lastCityKey="cities"+(localStorage.length-1);

        lastCity=localStorage.getItem(lastCityKey);
        $('#city').attr("value", lastCity);

        for (let i = 0; i < localStorage.length; i++) {
            let city = localStorage.getItem("cities" + i);
            let cityEl;

            if (cityInputEl===""){
                cityInputEl=lastCity;
            }

            if (city === cityInputEl) {
                cityEl = `<button type="button" class="list-group-item list-group-item-action active">${city}</button></li>`;
            } else {
                cityEl = `<button type="button" class="list-group-item list-group-item-action">${city}</button></li>`;
            } 
            $('#city-results').prepend(cityEl);
        }

        if (localStorage.length>0){
            $('#clear-storage').html($('<a id="clear-storage" href="#">clear</a>'));
        } else {
            $('#clear-storage').html('');
        }
    }
    
}

$("#clear-storage").on("click", (event) => {
    localStorage.clear();
    displayCities();
});

// var handleButtonClick = function() {
//     displayCities();
//     formSubmitHandler();
// }

// displayCities();

cityFormEl.addEventListener("submit", formSubmitHandler);
