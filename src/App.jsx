import { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import Loader from "./components/Loader";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [query, setQuery] = useState("");
  const [isDay, setIsDay] = useState("");

  const success = (pos) => {
    const currentCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    };
    setCoords(currentCoords);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=e2169fd53aafaabe05894921d5b27ab3`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = (celsius * (9 / 5) + 32).toFixed(1);
          const newTemps = {
            celsius,
            fahrenheit,
          };
          setTemp(newTemps);
          setQuery(""); // Limpia la barra de búsqueda después de realizar la búsqueda.

          let dt = res.data.dt;
          let sunrise = res.data.sys.sunrise;
          let sunset = res.data.sys.sunset;

          if (dt >= sunrise && dt <= sunset) {
            setIsDay("bg-[url('/images/back-ground.jpg')]");
          } else {
            setIsDay("bg-[url('/images/back-ground.dark.jpg')]");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=e2169fd53aafaabe05894921d5b27ab3`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = (celsius * (9 / 5) + 32).toFixed(1);
          const newTemps = {
            celsius,
            fahrenheit,
          };
          setTemp(newTemps);
          let dt = res.data.dt;
          let sunrise = res.data.sys.sunrise;
          let sunset = res.data.sys.sunset;

          if (dt >= sunrise && dt <= sunset) {
            setIsDay("bg-[url('/images/back-ground.jpg')]");
          } else {
            setIsDay("bg-[url('/images/back-ground.dark.jpg')]");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  return (
    
    <div className={`App flex flex-col items-center justify-center min-h-screen ${isDay} bg-cover px-3`}>
         <header className="flex gap-2 text-white  p-4 justify-end">
       
      </header>
      <form onSubmit={handleSearch} className="w-full max-w-md mt-8">
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-white"
            type="text"
            placeholder="Buscar Ciudad..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Buscar
          </button>
        </div>
      </form>
      {weather ? <Weather weather={weather} temp={temp} /> : <Loader />}
    </div>
  );
}

export default App;
