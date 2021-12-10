var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var cityContainer = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var apiKey = "1e980f61679048b9b26be0021ab0b9a6";
var lastCity = "";
var cityExists = false;

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
    console.log(city);
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            saveCity(city);
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayWeather();
            })
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to Connect to OpenWeather");
    });
};

var displayWeather = function (searchTerm) {
    console.log("its working")
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

displayCities();

cityFormEl.addEventListener("submit", formSubmitHandler);
