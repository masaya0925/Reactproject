import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CountryType } from './types';

const useField = (type: string) => {
  const [value, setValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

const useCountry = (name: string) => {
  const [country, setCountry] = useState<CountryType | undefined | null>(null);

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/';

  useEffect(() => {
    void ( async () => {
      if(!name) {
        setCountry(undefined);
        return country;
      }

      try {
        const response = await axios.get(`${baseUrl}${name}`);
        console.log(response.data);
        setCountry({ name: response.data.name.common,
                     capital: response.data.capital,
                     population: response.data.population,
                     flag: response.data.flags.png
                   });
        console.log('set:', country);
        
      } catch (e) {
        setCountry(null);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return country;
};

type PropsCountry = {
  country: CountryType | undefined | null;
};

const Country = ({ country }: PropsCountry) => {
  if(country === undefined) {
    return null;
  };

  if(country === null){
    return (
      <div>not found</div>
    )
  };

  return (
    <div>
      <h3>{country.name}</h3>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <img src={country.flag} height= '100' alt={`flag for ${country.name}`}/>
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
       <input {...nameInput} />
       <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}
export default App;
