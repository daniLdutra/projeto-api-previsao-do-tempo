import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  //Pegando localização do usuário com hook do state location;
  const [location, setLocation] = useState(false);

  // Será executado assim que o app for montado e sempre que muda algo, ele é chamado novamente.

  useEffect(() => {
    //código que pega as coordenadas do usuário, pedindo para o Browser
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.longitude, position.coords.latitude);
      setLocation(true);
    });
  }, []);

  //Verificação se o usuário autorizou compartilhar a localização
  return (
    (location && (
      <>
        <h3>Clima na sua região (Exemplo)</h3>
        <hr />
        <ul>
          <li>Temperatura atual: </li>
          <li>Temperatura máxima: </li>
          <li>Temperatura mínima: </li>
          <li>Pressão: hpa</li>
          <li>Umidade: %</li>
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
