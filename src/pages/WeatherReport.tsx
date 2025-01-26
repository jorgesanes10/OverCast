import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../api';
import { CircularProgress, Grid2 } from '@mui/material';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import WeatherWidget from '../components/WeatherWidget.tsx';
import { convertUTCToLocalTime, getPreferredUnitOfMeasurement } from '../utils';
import styled from 'styled-components';
import Header from '../components/Header.tsx';
import { StoreContext } from '../context/storeContext.ts';
import { useLocation } from 'react-router';

type Conditions = 'Clear' | 'Clouds' | 'Rain' | 'Snow';

export default function WeatherReport() {
  const location = useLocation();

  const [searchValue, setSearchValue] = useState('');
  const [searchNow, setSearchNow] = useState(false);
  const [conditions, setConditions] = useState<Conditions>('Clear');

  const [currentData, setCurrentData] =
    useState<Awaited<ReturnType<typeof fetchWeatherData>>>();

  const { unit, addToSearchHistory } = useContext(StoreContext);

  const { data, isFetching } = useQuery({
    queryKey: [searchValue, unit],
    queryFn: async () => {
      setSearchNow(false);
      return await fetchWeatherData(
        searchValue,
        unit || getPreferredUnitOfMeasurement(),
      );
    },
    enabled: searchNow,
  });

  useEffect(() => {
    if (data && data.cod === 200) {
      setCurrentData(data);
      setConditions(data.weather[0].main);
      addToSearchHistory(searchValue);
    }
  }, [data, searchValue]);

  useEffect(() => {
    document.body.className = conditions;
  }, [conditions]);

  useEffect(() => {
    setSearchValue(location.search.split('?city=')[1] || '');
    if (searchValue) {
      setSearchNow(true);
    }
  }, [location]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchNow(false);
    setSearchValue(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchValue) {
      setSearchNow(true);
    }
  };

  return (
    <main className="loaded">
      <Grid2 container>
        <Grid2 size={12}>
          <Header
            onFormSubmit={handleFormSubmit}
            onSearchChange={handleSearchChange}
            searchValue={searchValue}
            cleanData={() => setCurrentData(null)}
          />
        </Grid2>
        <Grid2 size={12}>
          {currentData && currentData.cod === 200 ? (
            <div>
              <WeatherWidget
                info={{
                  temperature: currentData.main.temp,
                  feelsLike: currentData.main.feels_like,
                  tempMax: currentData.main.temp_max,
                  tempMin: currentData.main.temp_min,
                  humidity: currentData.main.humidity,
                  pressure: currentData.main.pressure,
                  visibility: currentData.visibility,
                  windSpeed: currentData.wind.speed,
                  country: currentData.sys.country,
                  sunrise: convertUTCToLocalTime(
                    currentData.sys.sunrise,
                    currentData.timezone,
                  ),
                  sunset: convertUTCToLocalTime(
                    currentData.sys.sunset,
                    currentData.timezone,
                  ),
                  clouds: currentData.clouds.all,
                  snow: currentData.snow,
                  rain: currentData.rain,
                }}
                city={currentData.name}
              />
            </div>
          ) : (
            <StyledBigParagraph>
              {currentData && currentData.cod === '404'
                ? 'City not found. Try again with another search term.'
                : 'Search for a city to see what the weather is like'}
            </StyledBigParagraph>
          )}
          {isFetching && <CircularProgress color="inherit" />}
        </Grid2>
      </Grid2>
    </main>
  );
}

const StyledBigParagraph = styled.p`
  font-size: 36px;
  font-weight: 100;
`;
