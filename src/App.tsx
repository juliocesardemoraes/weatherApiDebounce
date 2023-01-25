import { SetStateAction, useState } from "react";
import "./App.css";

interface ICityObject {
  base: string;
  clouds: { all: number };
  cod: 200;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: any;
  timezone: number;
  visibility: number;
  weather: Array<any>;
  wind: any;
}

const fetchCityTemperature = async (cityName: string) => {
  const websiteName = "https://api.openweathermap.org/data/2.5/weather";
  const cityQuery = `?q=${cityName}`;
  const apiKey = "&appid=aaa4b55b9a2bbd6e73ef18b8bbff7416";
  const metric = "&units=metric";

  const city = await fetch(`${websiteName}${cityQuery}${apiKey}${metric}`, {
    mode: "cors",
  });

  const cityResult = await city.json();
  return cityResult;
};

const searchCity = async (
  city: string,
  setCityCard: {
    (value: SetStateAction<ICityObject | null>): void;
    (arg0: any): void;
  }
) => {
  const cityTemperature = await fetchCityTemperature(city);
  console.log(cityTemperature);
  setCityCard(cityTemperature);
};

function App() {
  let [city, setCity] = useState("");
  let [cityCard, setCityCard] = useState<ICityObject | null>(null);

  return (
    <div className="App">
      <h1>WEATHER API</h1>
      <div className="button__container">
        <input
          placeholder="MARIA DA FE"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            searchCity(city, setCityCard);
          }}
        >
          Procurar Temperatura
        </button>
      </div>

      <div className="card">{cityCard?.main?.temp}</div>
    </div>
  );
}

export default App;
