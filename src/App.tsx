import { SetStateAction, useState } from "react";
import "./App.css";

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
  setCityCard: { (value: SetStateAction<string>): void; (arg0: any): void }
) => {
  const cityTemperature = await fetchCityTemperature(city);
  console.log(cityTemperature);
  setCityCard(cityTemperature);
};

function App() {
  let [city, setCity] = useState("");
  let [cityCard, setCityCard] = useState("");

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

      <div className="card">{cityCard.main.temp}</div>
    </div>
  );
}

export default App;
