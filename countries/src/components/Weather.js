import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({country}) => {

  const [data, setData] = useState(null)

  useEffect(() => {
    const param = {
        appid: process.env.REACT_APP_API_KEY,
            q: country.capital
    }

    axios
      .get(`http://api.openweathermap.org/data/2.5/find?q=${param.q}&units=metric&appid=${param.appid}`)
      .then(response => setData(response.data))
  },[country])
  return (
      <div>
        <h1>Weather in {country.capital}</h1>
        { data ?
           <>
           {data.list.map(result =>
             result.name.toLowerCase() === country.capital.toLowerCase() ?
              <div key = {result.id}>
               <p>Temperture: {result.main.temp}℃</p>
               <img src = {`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`} alt = 'icon'/>
               <p>Wind: {result.wind.speed} m/s | Degrees {result.wind.deg}</p>
             </div>
              :console.log('q')
            )}
           </>
          :<p>wait</p>
        }
      </div>
  )
}

export default Weather
