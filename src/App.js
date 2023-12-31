import { useState } from "react";
import api from './api'

function App() {
  const[city, setCity] = useState('Campo Grande');
  const[weatherForecast , setWeatherForecast] = useState(null)
  
  const handleChange = (event) => {
   setCity(event.target.value)
  }

  const hendleSearch = () => {
    fetch(`${api.base}weather?q=${city}&lang=pt_br&units=metric&APPID=${api.key}`)
    .then((response) => {
    if(response.status === 200){
      return response.json()
    }
    })
    .then((data) => {
      console.log(data)
      setWeatherForecast(data)
    });
  };

  return (
    <div>
     <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <a className="navbar-brand text-white" href="#top">
        Previsão do tempo
      </a>
     </nav>
     <main className="container">
      <div className="jumbotron">
        <h1>
          Verifique  agora a previsão do tempo em sua cidade!
        </h1>
        <p className="lead">
          Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar.
        </p>
        <div className="row mb-4">
          <div className="col-md-6">

            <input 
            onChange={handleChange}
            className="form-control" 
            value={city}/>

          </div>
        </div>
        <button onClick={hendleSearch} className="btn btn-primary btn-lg">
          Pesquisar
        </button>

        { weatherForecast ? (
            <div>
          <div className="nt-4 d-flex aligh-items-center">
            <div>
             <img src={weatherForecast.current.condition.icon} />
            </div>

            <div>
             <h3>Hoje o dia está: {weatherForecast.current.condition.text}</h3>
             <p className="lead">
              Temp:{weatherForecast.current.temp_c}
             </p>
            </div>


          </div>
        </div>
        ) : null }
        

      </div>

     </main>
    </div>
  );
}

export default App;
