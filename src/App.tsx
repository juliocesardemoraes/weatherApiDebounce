import { SetStateAction, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { ICityObject } from "./typeSafe/ICityObject";

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
    (arg0: unknown): void;
  }
) => {
  const cityTemperature = await fetchCityTemperature(city);
  setCityCard(cityTemperature);
};

function App() {
  const [city, setCity] = useState("");
  const [cityCard, setCityCard] = useState<ICityObject | null>(null);

  return (
    <div className="App">
      <h1>WEATHER API</h1>
      <p>Busque aqui a temperatura de qualquer cidade do mundo</p>
      <div className="button__container">
        <input
          placeholder="NOME DA CIDADE"
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
      {cityCard !== null && <Card city={cityCard}></Card>}
    </div>
  );
}

export default App;
