import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  //Pegando localização do usuário com hook do state location;
  const [location, setLocation] = useState(false);
  //Criado novo state para guardar os dados que veem da API
  const [weather, setWeather] = useState({});

  //Incluido 'function expression': responsável por chamar a API
  let getWeather = async (lat, long) => {
    let res = await axios.get(
      'http://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat,
          lon: long,
          appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
          lang: 'pt',
          units: 'metric',
        },
      }
    );
    setWeather(res.data);
    console.log(res.data);
  };

  // Será executado assim que o app for montado e sempre que muda algo, ele é chamado novamente.
  useEffect(() => {
    //código que pega as coordenadas do usuário, pedindo para o Browser
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords.longitude, position.coords.latitude);
      getWeather(position.coords.longitude, position.coords.latitude);

      setLocation(true);
    });
  }, []);

  //Verificação se o usuário autorizou compartilhar a localização
  return (
    (location && (
      <>
        <h3>
          Clima na sua região (
          {weather &&
            weather.weather &&
            weather.weather[0] &&
            weather.weather[0].description}
          )
        </h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather?.main?.temp} </li>
          <li>Temperatura máxima: {weather?.main?.temp_max} </li>
          <li>Temperatura mínima: {weather?.main?.temp_min} </li>
          <li>Pressão: {weather?.main?.pressure} hpa</li>
          <li>Umidade: {weather?.main?.humidity} %</li>
        </ul>
      </>
    )) || <>Você precisa autorizar sua localização no Browser</>
  );
  // if (location === false) {
  //   return <>Você precisa autorizar sua localização no Browser</>;
  // } else {
  //   return (
  //     <>
  //       <h3>Clima na sua região (Exemplo)</h3>
  //       <hr />
  //       <ul>
  //         <li>Temperatura atual: </li>
  //         <li>Temperatura máxima: </li>
  //         <li>Temperatura mínima: </li>
  //         <li>Pressão: hpa</li>
  //         <li>Umidade: %</li>
  //       </ul>
  //     </>
  //   );
  // }
}

export default App;
