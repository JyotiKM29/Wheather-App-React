import React, { useEffect, useState } from "react";

// import './style.css'; // Import your CSS file

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Retrieve data from local storage when component mounts
    const storedCity = localStorage.getItem("lastSearchedCity");
    if (storedCity) {
      setCity(storedCity);
      checkWeather(storedCity);
    }
  }, []);

  const apiKey = "caaa079a04538143b03294429fb63d55";
  const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// const apiKey = process.env.REACT_APP_API_KEY;
// const apiUrl = process.env.REACT_APP_API_URL;


  

  const checkWeather = async (cityName) => {
    console.log(apiKey,apiUrl)
    try {
      const response = await fetch(`${apiUrl}${cityName}&appid=${apiKey}`);
      const data = await response.json();

      if (!response.ok) {
        setError(true);
        setErrorMessage("Enter Valid City Name");
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError(false);
        setErrorMessage("");

        // Save the last searched city to local storage
        localStorage.setItem("lastSearchedCity", cityName);
      }
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setError(true);
      setErrorMessage("An error occurred while fetching weather data.");
      setWeatherData(null);
    }
  };

  const handleSearch = () => {
    if (!city) {
      setError(true);
      setErrorMessage("Please enter a city name.");
      setWeatherData(null);
      return;
    }

    checkWeather(city);
  };

  return (
    <div className="bg-gray-700 h-screen w-screen py-12 px-6 mx-auto md:p-64 flex flex-col   items-center">
        <h1 className="text-white Class
Properties font-serif text-3xl
md:text-4xl mb-4 ">
        What's the weather? 👀 
       </h1>
      <div className="card flex flex-col justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 h-min w-max p-4 md:p-12">
      
        {/* Search box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="searchBox flex flex-row space-x-4 md:justify-between md:space-x-6"
        >
          <label className="search flex relative">
          <img
              src="images/search.png"
              alt="search icon"
              className="absolute left-3 top-3 h-4 p-0 md:h-8 md:p-1"
            />
            <input
              type="text"
              placeholder="Enter City Name..."
              spellCheck="false"
              className="rounded-full px-8 py-2 w-50 md:py-4 md:px-12 md:w-96"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <button
            className="button rounded-full border px-6  w-max md:w-full"
            type="submit"
          >
          <p className="text-white font-bold"> Submit</p>
          
          </button>
        </form>
        {/* Error */}
        {error && (
          <h2
            id="error"
            className="text-white flex flex-start justify-start px-6 py-2"
          >
            ⚠️ {errorMessage}
          </h2>
        )}

        {/* Weather details */}
        {weatherData && (
          <div
            id="main"
            className="flex flex-col justify-center items-center space-y-6"
          >
            {/* Image */}
            <img
              src={`images/${weatherData.weather[0].main.toLowerCase()}.png`}
              alt="climate img"
              className="weather-icon h-30 w-30 md:h-40 md:w-40"
            />

            {/* Temp */}
            <h2 className="temp text-white font-bold text-5xl md:text-6xl">
              {Math.round(weatherData.main.temp)} °C
            </h2>
            {/* City name */}
            <h4 className="city text-white font-light text-4xl">
              {weatherData.name}
            </h4>
          </div>
        )}
        {/* Climate and wind speed */}
        {weatherData && (
          <div
            id="main2"
            className="flex flex-row justify-center space-x-12 md:space-x-24 py-12"
          >
            {/* Climate */}
            <div className="flex flex-row">
              <img
                src="images/humidity.png"
                alt="humidity"
                className="h-6 md:h-10"
              />
              <div className="flex flex-col justify-center">
                <h6 className="humidity text-white font-light text-baseline md:text-2xl ml-4">
                  {weatherData.main.humidity}%
                </h6>
                <h6 className="text-white font-light text-baseline md:text-2xl ml-4">
                  Humidity
                </h6>
              </div>
            </div>
            {/* Wind Speed*/}
            <div className="flex flex-row">
              <img src="images/wind.png" alt="wind" className="h-6 md:h-10" />
              <div className="flex flex-col justify-center">
                <h6 className="wind text-white font-light text-baseline md:text-2xl ml-4 whitespace-nowrap">
                  {weatherData.wind.speed} m/s
                </h6>
                <h6 className="text-white font-light text-baseline md:text-2xl ml-4 whitespace-nowrap">
                  Wind Speed
                </h6>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
