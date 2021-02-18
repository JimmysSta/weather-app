import React, {useState} from 'react';
import Axios from 'axios';
import axios from 'axios';


const api = {
  key: '66277bdad85ea3a8f3914ecec2ec5737',
  base: 'http://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState("");
  const [data, setWeather] = useState({});

  const search = event => {
    if(event.key === "Enter") {
      axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(data => {
        setWeather(data)
        setQuery('');
        console.log(data);
      });
    }
  }
  // const search = event => {
  //   if(event.key === "Enter") {
  //       axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${api.key}`)
  //       .then(response => {
  //         console.log(response);
  //       });
  //   }
  // }
  
  const dateBuilder = (data) => {
    let months = ["January", "February", "March", "April", "May", "June" , "July", 
    "August", "September", "October" ,"November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[data.getDay()];
    let date = data.getDate();
    let month = months[data.getMonth()];
    let year = data.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  const changeColor = () => {
    if(data.data.main.temp > 15) {
      console.log("warm");
    } else {
      console.log("cold");
    }
  }

  return (
    <div className={(
      typeof data.data !="undefined") ? ((data.data.main.temp > 15) ? "app warm" : "app") : "app"}
      >
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search city..."
          onChange={event => setQuery(event.target.value)}
          value={query}
          onKeyPress={search}
          
          />
        </div>
        {(typeof data.data != 'undefined') ? ( 
        <div>
          <div className="location-box">
            <div className="location">{data.data.name}, {data.data.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temperature">
              {Math.round(data.data.main.temp)}
            </div>
            <div className="weather">
              {data.data.weather[0].description}
            </div>
            <div className="rest">
            <span className="hum">Humidity :</span> {data.data.main.humidity}
            </div>
            <div className="rest">
             <span className="min"> Min: {Math.round(data.data.main.temp_min)}</span> | <span className="max"> Max: {Math.round(data.data.main.temp_max)}</span>
            
            </div>
          </div>
        </div>  
        ) : ('')}  
      </main>
    </div>
  );
}

export default App;
