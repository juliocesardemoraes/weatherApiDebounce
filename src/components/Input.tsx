import { useEffect, useState } from "react";

const fetchCityTemperature = async (cityName: string) => {
  const websiteName = "https://api.openweathermap.org/data/2.5/weather";
  const cityQuery = `?q=${cityName}`;
  const apiKey = `&appid=${import.meta.env.VITE_API_KEY}`;
  const metric = "&units=metric";

  const city = await fetch(`${websiteName}${cityQuery}${apiKey}${metric}`, {
    mode: "cors",
  });

  const cityResult = await city.json();
  return cityResult;
};

const searchCity = async (city: string, setCityCard: (arg0: any) => void) => {
  const cityTemperature = await fetchCityTemperature(city);
  setCityCard(cityTemperature);
};

const debounce = (callback: any) => {
  let timeout: number | undefined;

  return (argument: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(argument), 500);
  };
};

function Input({ setCityCard }: any) {
  const [city, setCity] = useState("");

  useEffect(() => {
    debounce(searchCity(city, setCityCard));
  }, [city]);

  return (
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
  );
}
export default Input;
