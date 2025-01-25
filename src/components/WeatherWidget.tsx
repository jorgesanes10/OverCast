import styled from 'styled-components';
import { Grid2 } from '@mui/material';
import {
  AcUnit,
  Air,
  Cloud,
  CloudDownload,
  Thermostat,
  Visibility,
  Water,
  WaterDrop,
  WbSunny,
  WbTwilight,
} from '@mui/icons-material';
import WidgetSm from './WidgetSm.tsx';
import WidgetMaxMin from './WidgetMaxMin.tsx';
import { useContext } from 'react';
import { UnitsContext } from '../context/UnitsContext.ts';

interface WeatherWidgetProps {
  city: string;
  info: {
    temperature: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    pressure: number;
    visibility: number;
    windSpeed: number;
    sunrise: string;
    sunset: string;
    clouds: number;
    country: string;
    rain?: {
      '1h': number;
    };
    snow?: {
      '1h': number;
    };
  };
}

export default function WeatherWidget({ city, info }: WeatherWidgetProps) {
  const { unit } = useContext(UnitsContext);

  const degrees = `°${unit === 'imperial' ? 'F' : 'C'}`;

  return (
    <section>
      <article>
        <PageTitle aria-label={`${city} ${info.country}`}>
          {city} ({info.country})
        </PageTitle>
        <Grid2 container className="widgets-container">
          <StyledGrid size={{ xs: 12, sm: 4, md: 3 }}>
            <WidgetSm
              label="Temperature"
              value={
                <>
                  {info.temperature} <small>{degrees}</small>
                </>
              }
              ariaLabel={`Temperature: ${info.temperature} ${degrees}`}
              icon={<Thermostat />}
            />
          </StyledGrid>
          <StyledGrid size={{ xs: 12, sm: 4, md: 3 }}>
            <WidgetSm
              label="Feels like"
              value={
                <>
                  {info.feelsLike} <small>{degrees}</small>
                </>
              }
              ariaLabel={`Feels like ${info.feelsLike} ${degrees}`}
              icon={<Thermostat />}
            />
          </StyledGrid>
          <StyledGrid size={{ xs: 12, md: 6 }}>
            <WidgetMaxMin
              maxTemperature={
                <>
                  {info.tempMax} <small>{degrees}</small>
                </>
              }
              minTemperature={
                <>
                  {info.tempMin} <small>{degrees}</small>
                </>
              }
              ariaLabel={`Min temperature: ${info.tempMin} ${degrees}. Max temperature: ${info.tempMax} ${degrees}`}
            />
          </StyledGrid>
          <StyledGrid size={{ xs: 12, sm: 4, md: 3 }}>
            <WidgetSm
              label="Humidity"
              value={
                <>
                  {info.humidity}
                  <small>%</small>
                </>
              }
              ariaLabel={`Humidity: ${info.humidity}%`}
              icon={<Water />}
            />
          </StyledGrid>
          <StyledGrid size={{ xs: 12, sm: 4, md: 3 }}>
            <WidgetSm
              label="Atm. pressure"
              value={
                <>
                  {info.pressure} <small>hPa</small>
                </>
              }
              ariaLabel={`Atmospheric pressure: ${info.pressure} hPa`}
              icon={<CloudDownload />}
            />
          </StyledGrid>
          <StyledGrid size={{ xs: 12, sm: 4, md: 3 }}>
            <WidgetSm
              label="Visibility"
              value={
                <>
                  {info.visibility / 1000}
                  <small>km</small>
                </>
              }
              ariaLabel={`Visibility: ${info.visibility / 1000} km`}
              icon={<Visibility />}
            />
          </StyledGrid>
          <StyledGrid size={{ xs: 12, sm: 4, md: 3 }}>
            <WidgetSm
              label="Wind speed"
              value={
                <>
                  {info.windSpeed}{' '}
                  <small>{unit === 'imperial' ? 'mph' : 'm/s'}</small>
                </>
              }
              ariaLabel={`Wind speed: ${info.windSpeed} ${
                unit === 'imperial' ? 'mph' : 'm/s'
              }`}
              icon={<Air />}
            />
          </StyledGrid>
          <StyledGrid size={{ xs: 12, sm: 4, md: 3 }}>
            <WidgetSm
              label="Cloudiness"
              value={
                <>
                  {info.clouds}
                  <small>%</small>
                </>
              }
              ariaLabel={`Cloudiness: ${info.clouds}%`}
              icon={<Cloud />}
            />
          </StyledGrid>
          <StyledGrid size={{ xs: 12, sm: 4, md: 3 }}>
            <WidgetSm
              label="Sunrise"
              value={<>{info.sunrise}</>}
              ariaLabel={`Sunrise at ${info.sunrise}`}
              icon={<WbSunny />}
            />
          </StyledGrid>
          <StyledGrid size={{ xs: 12, sm: 4, md: 3 }}>
            <WidgetSm
              label="Sunset"
              value={<>{info.sunset}</>}
              ariaLabel={`Sunset at ${info.sunset}`}
              icon={<WbTwilight />}
            />
          </StyledGrid>
          {info.rain && (
            <StyledGrid size={{ xs: 12, sm: 4, md: 3 }}>
              <WidgetSm
                label="Rain"
                value={
                  <>
                    {info.rain['1h']} <small>mm/h</small>
                  </>
                }
                ariaLabel={`Rain: ${info.rain['1h']} millimeters per hour`}
                icon={<WaterDrop />}
              />
            </StyledGrid>
          )}
          {info.snow && (
            <StyledGrid size={{ xs: 12, sm: 4, md: 3 }}>
              <WidgetSm
                label="Snow"
                value={
                  <>
                    {info.snow['1h']} <small>mm/h</small>
                  </>
                }
                ariaLabel={`Snow: ${info.snow['1h']} millimeters per hour`}
                icon={<AcUnit />}
              />
            </StyledGrid>
          )}
        </Grid2>
      </article>
    </section>
  );
}

const PageTitle = styled.h1`
  font-size: 30px;
  font-weight: 100;
  color: #fff;
`;

const StyledGrid = styled(Grid2)`
  padding: 5px;
`;
