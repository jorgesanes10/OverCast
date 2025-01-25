import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../api';
import { CircularProgress, Grid2, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import WeatherWidget from './WeatherWidget.tsx';
import { convertUTCToLocalTime, getPreferredUnitOfMeasurement } from '../utils';

export default function WeatherReport() {
  const [searchValue, setSearchValue] = useState('');
  const [searchNow, setSearchNow] = useState(false);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [searchValue],
    queryFn: async () => {
      setSearchNow(false);
      return await fetchWeatherData(
        searchValue,
        getPreferredUnitOfMeasurement(),
      );
    },
    enabled: searchNow,
  });

  console.log(searchNow);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchNow(true);
  };

  console.log(data);

  return (
    <main>
      <Grid2 container>
        <Grid2 size={12}>
          <header>
            <form onSubmit={handleFormSubmit}>
              <TextField
                value={searchValue}
                onChange={handleSearchChange}
                variant="outlined"
                placeholder="Search for a city..."
              />
            </form>
          </header>
        </Grid2>
        <Grid2 size={12}>
          {data && (
            <div>
              {isFetching ? (
                <CircularProgress />
              ) : (
                <WeatherWidget
                  info={{
                    temperature: data.main.temp,
                    feelsLike: data.main.feels_like,
                    tempMax: data.main.temp_max,
                    tempMin: data.main.temp_min,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    visibility: data.visibility,
                    windSpeed: data.wind.speed,
                    country: data.sys.country,
                    sunrise: convertUTCToLocalTime(
                      data.sys.sunrise,
                      data.timezone,
                    ),
                    sunset: convertUTCToLocalTime(
                      data.sys.sunset,
                      data.timezone,
                    ),
                    clouds: data.clouds.all,
                  }}
                  city={data.name}
                />
              )}
            </div>
          )}
        </Grid2>
      </Grid2>
    </main>
  );
}
