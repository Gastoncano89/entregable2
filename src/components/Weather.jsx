import React, { useState } from "react";

const Weather = ({ weather, temp }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  console.log(weather);

  const changeUnitTemp = () => setIsCelsius(!isCelsius);

  return (
    <section className="text-xl">

      <section className="grid gap-4 sm:grid-cols-two">
        
        <article className="mt-10 bg-slate-300/70 rounded-3xl grid  grid-cols-2 justify-items-center 
        items-center py-2 sm:px-2">
       
        <h2 className="capitalize col-start-1 col-end-3 font-bold text-2xl tracking-wider">
        {/* "ext-center ml-4 mb-4 font-bold text-2xl tracking-wider" */}
        {weather.name}, {weather.sys.country}
          </h2>
          
            <h2 className="text-[45px] font-light sm:text-6xl animate-pulse ">
              {isCelsius ? `${temp.celsius} °C` : `${temp.fahrenheit} °F`}
            </h2>

            <div>
              <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt=""
              />
            </div>
        </article>

        {/* Humedad, Presion, Viento */}
        <article className="mt-10 pr-10 bg-slate-300/60 rounded-3xl grid grid-cols-3 justify-center justify-items-strech py-2 sm:grid-cols-1 sm: px-2 sm:py-0">
          
          <div className="flex gap-2 text-sm justify-center items-center">
            <div>
              <img src="/images/wind.png" alt="" />
            </div>
            <h5>{weather.wind.speed} m/s</h5>
          </div>

          <div className="flex text-sm justify-center items-center">
            <div className="flex gap-2 text-sm justify-center items-center">
              <img src="/images/humidity.png" alt="" />
            </div>
            <h5>{weather.main.humidity} %</h5>
          </div>

          <div className="flex text-sm justify-center items-center">
            <div className="flex gap-2 text-sm justify-center items-center">
              <img src="/images/pressure.png" alt="" />
            </div>
            <h5>{weather.main.pressure} hPa</h5>
          </div>

        </article>
      </section>
      <button
        onClick={changeUnitTemp}
        className="bg-teal-500 hover:border-teal-700 py-2 px-6 text-white font-bond rounded-full hover:bg-teal-700 duration-200 text-sm  block mx-auto mt-4"
      >
       Cambiar °C / °F
      </button>
   
    </section>
  );
};

export default Weather;
