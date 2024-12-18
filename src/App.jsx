import "./App.css";


import clear from "./assets/clear.png";



import { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";

function App() {
  const [toast, setToast] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [weatherData, setWeatherData] = useState({
    main: {
      temp: 273,
      feels_like: 273,
      temp_min: 273,
      temp_max: 273,
      humidity: 0,
      pressure: 0,
      sea_level: 0,
      grnd_level: 0,
    },
    weather: [{ description: "partly cloudy" }],
    wind: { speed: 0 },
    name: "City Name",
    timezone: 0,
  });

  // Define the state for weather icon
const [weatherIcon, setWeatherIcon] = useState(clear);

// Fetch weather data and update icon based on API response
const fetchWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=59fe6f8350cda8bdb8b5bec4e8abbcd5`
  );
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    setWeatherData(data);

    // Update weather icon based on main weather condition from the response data
    
  } 
};


  // Function to convert timezone offset to local time
  const getLocalTime = (offset) => {
    const utcTime =
      new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utcTime + offset * 1000);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const timeString = localTime.toLocaleTimeString("en-US", options);
    const dayString = localTime.toLocaleDateString("en-US", {
      weekday: "long",
    });
    return `${timeString}`;
  };
  // Function to format date as "25-December-2024"
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(/ /g, "-");
  };

  // Get current date
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const localTime = weatherData ? getLocalTime(weatherData.timezone) : "";

  const sunrise =
    weatherData.sys?.sunrise &&
    new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const sunset =
    weatherData.sys?.sunset &&
    new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bgDiv">
        <div
          style={{ height: "600px", width: "1025px"}}
          className="rounded m-5 d-flex flex-column justify-content-center align-items-center media weatherBody"
        >
          <div
            style={{
              backgroundColor: "#ababab",
              width: "100%",
              height: "150px",
             borderRadius:"20px",
              padding:"50px",
              marginBottom:"10px"
            }}
            className="d-flex  align-items-center justify-content-between searchDiv"
          >
            <div
              style={{
                width: "250px",
                height: "50px",
                backgroundColor: "#cbcbcc",
                borderRadius: "15px",
              }}
              className="d-flex align-items-center justify-content-center  "
            >
              <input
                onChange={(e) => setUserInput(e.target.value)}
                style={{ width: "160px" }}
                type="text"
                placeholder=" Search City"
                className="text-dark"
              />
              <i
                onClick={() => fetchWeather(userInput)}
                className="fa-solid fa-magnifying-glass text-center"
              ></i>
            </div>
            {/* Toast message */}
      <Toast className="toast" onClose={() => setToast(false)} show={toast} delay={5000} autohide>
          <Toast.Header>
           
            <strong className="me-auto">OpenWeather</strong>
          </Toast.Header>
          <Toast.Body>Please Enter City Name Correctly!</Toast.Body>
        </Toast>


            {/* <img
              id="icon"
              src={weatherIcon}
              alt="no image"
              className="climateIcon mb-4"
            /> */}

            {weatherData && (
              <>
                <p className="degree">
                  {Math.round(weatherData.main.temp - 273.15)}
                  <span className="symbol">°</span>C
                </p>
                <p>{weatherData.weather[0].description}</p>
               
                <p className="date">{formattedDate}</p>
                <p
                  style={{ fontSize: "15px" }}
                  className="day"
                >
                  {localTime}
                </p>
                <p style={{
                  fontSize:"20px",
                  fontWeight:"600"
                }}>{weatherData.name}</p>
              </>
            )}
          </div>
          <div className="gridBg">
            
            {/* grid Elements */}
            {weatherData && (
              <>
                <div className="grid mt-2">
                  <div className="gridElement">
                    <p className="insideGridtext">wind</p>
                    <p className="digit">{weatherData.wind.speed} km/h</p>
                  </div>

                  <div className="gridElement">
                    <p className="insideGridtext">Humidity</p>
                    <p className="digit">{weatherData.main.humidity}%</p>
                  </div>

                  <div className="gridElement">
                    <p className="insideGridtext">Real Feels</p>
                    <p className="digit">
                      {Math.round(weatherData.main.feels_like - 273.15)}°c
                    </p>
                  </div>

                  <div className="gridElement">
                    <p className="insideGridtext">Pressure</p>
                    <p className="digit">{weatherData.main.pressure} mb</p>
                  </div>

                  <div className="gridElement">
                    <p className="insideGridtext">Sea Level</p>
                    <p className="digit">{weatherData.main.sea_level}</p>
                  </div>

                  <div className="gridElement">
                    <p className="insideGridtext">Ground Level</p>
                    <p className="digit">{weatherData.main.grnd_level}</p>
                  </div>

                 

                 
                </div>
              </>
            )}
           
          </div>
        </div>
      </div>




      
    </>
  );
}

export default App;
